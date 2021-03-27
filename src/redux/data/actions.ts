import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, GetStateType} from "../store";
import {DataPayloadType, DataType, I_listType, I_ticket} from "../../types/ticket-types";
import {ticketsAPI} from "./api";
import {fetchHandler} from "./fetchHandler";
import {newTicketId} from "./reducer";
import {selectList, selectListsArr} from "./selectors";
import {selectUserData} from "../app/selectors";
import {batch} from "react-redux";

export const ticketsActionTypes: {
  SET_FETCHED_DATA: "tickets/SET_FETCHED_DATA"
  UPDATE_ITEM_SUCCESS: "tickets/UPDATE_ITEM_SUCCESS"
  DELETE_TICKET_SUCCESS: "tickets/DELETE_TICKET_SUCCESS"
} = {
  SET_FETCHED_DATA: "tickets/SET_FETCHED_DATA",
  UPDATE_ITEM_SUCCESS: "tickets/UPDATE_ITEM_SUCCESS",
  DELETE_TICKET_SUCCESS: "tickets/DELETE_TICKET_SUCCESS"
};

export type I_dataActions = I_setFetchedData | I_updateItemSuccess |
  I_deleteTicketSuccess

//interfaces
interface I_setFetchedData {
  type: typeof ticketsActionTypes.SET_FETCHED_DATA,
  data: Array<DataPayloadType>
  dataType: DataType
}
interface I_updateItemSuccess {
  type: typeof ticketsActionTypes.UPDATE_ITEM_SUCCESS,
  data: DataPayloadType
  dataType: DataType
}

interface I_deleteTicketSuccess {
  type: typeof ticketsActionTypes.DELETE_TICKET_SUCCESS,
  data: I_ticket
}

//Internal ACTIONS CREATORS

export const _updateItemSuccess = (data: DataPayloadType, dataType: DataType): I_updateItemSuccess =>
  ({type: ticketsActionTypes.UPDATE_ITEM_SUCCESS, data, dataType});

export const _deleteTicketSuccess = (data: I_ticket): I_deleteTicketSuccess =>
  ({type: ticketsActionTypes.DELETE_TICKET_SUCCESS, data});

export const _setFetchedData = (data: DataPayloadType[], dataType: DataType): I_setFetchedData =>
  ({type: ticketsActionTypes.SET_FETCHED_DATA, data, dataType});


//API ACTIONS
export const fetchAllData = () =>
  fetchHandler(
    "fetchAllData",
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const datas: DataType[] = ["ticket", "list", "user"];
      let fetch = async (type: DataType) => {
        let res = await ticketsAPI[
          type === "ticket" ? "getTickets"
          : type === "list" ? "getLists" : "getUsers"]();
        if (res) {
          dispatch(_setFetchedData(res, type));
          return true;
        }
      };
      const success = await Promise.race(datas.map(d => fetch(d)));
      if (success) {
        return true;
      }
  });


export const onTicketUpdate = (ticket: I_ticket) =>
  fetchHandler(
    `ticket${ticket.id}`,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      let isNew = ticket.id === newTicketId;
      let res;
      let userData = selectUserData(getState());
      if (userData) {
        if (isNew) {
          res = await ticketsAPI.addTicket({
            ...ticket,
            creatorId: userData.id,
            lastModifiedId: userData.id,
          });
        } else {
          res = await ticketsAPI.updateTicket({...ticket, lastModifiedId: userData.id});
        }
        if (res) {
          if (isNew) {
            let list = selectList(getState(), ticket.listId);
            let listRes = await ticketsAPI.updateList({...list, order: [res.id, ...list.order]});
            if (listRes) {
              dispatch(_updateItemSuccess({...list, order: [res.id, ...list.order]}, "list"));
            }
          }
          dispatch(_updateItemSuccess(res, "ticket"));
          return true;
        }
      }
    });

export const onUpdateList = (list: I_listType) =>
  fetchHandler(
    "updateList",
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.updateList(list);
      if (res) {
        dispatch(_updateItemSuccess(res, "list"));
        return true;
      }
    });

export const onTicketDelete = (data: I_ticket) =>
  fetchHandler(
    `ticket${data.id}`,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.deleteTicket(data);
      if (res) {
        dispatch(_deleteTicketSuccess(data));
        return true;
      }
    });

export const onTicketMove = (data: I_ticket) =>
  fetchHandler(
    `ticket${data.id}`,
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      const lists = selectListsArr(getState());
      let userData = selectUserData(getState());
      let removeFrom: I_listType | null  = null;
      let addTo: I_listType | null = null;
      let addToId: string = '';
      lists.forEach((l: I_listType )=> {
        if (l.id === data.listId) {
          ///set list that should be cleared
          removeFrom = {...l, order: l.order.filter(id => id !== data.id)};
        } else {
          ///set list where to add
          addTo = {...l, order: [data.id, ...l.order]} as I_listType;
          addToId = l.id;
        }
      });
      ///if we have both lists
      if (removeFrom && addToId && addTo && userData) {
        const res = await ticketsAPI.updateTicket({
          ...data, listId: addToId,
          lastModifiedId: userData.id
        });
        const resFrom = await ticketsAPI.updateList(removeFrom);
        const resTo = await ticketsAPI.updateList(addTo);
        if (res && resFrom && resTo) {
          batch(() => {
            dispatch(_updateItemSuccess(res, 'ticket'));
            dispatch(_updateItemSuccess(resFrom, 'list'));
            dispatch(_updateItemSuccess(resTo, 'list'));
          });
          return true;
        }
      }

    });