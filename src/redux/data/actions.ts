import {ThunkDispatch} from "redux-thunk";
import {AppActionsType, GetStateType} from "../store";
import {DataPayloadType, DataType, I_listType, I_ticket} from "../../types/ticket-types";
import {ticketsAPI} from "./api";
import {fetchHandler} from "./fetchHandler";
import {newTicketId} from "./reducer";
import {selectList} from "./selectors";

export const ticketsActionTypes: {
  SET_FETCHED_TICKETS: 'tickets/SET_FETCHED_TICKETS'
  SET_FETCHED_LISTS: 'tickets/SET_FETCHED_LISTS'
  SET_EDITING_TICKET: 'tickets/SET_EDITING_TICKET'
  UPDATE_ITEM_SUCCESS: 'tickets/UPDATE_ITEM_SUCCESS'
  DELETE_TICKET_SUCCESS: 'tickets/DELETE_TICKET_SUCCESS'
} = {
  SET_FETCHED_TICKETS: 'tickets/SET_FETCHED_TICKETS',
  SET_FETCHED_LISTS: 'tickets/SET_FETCHED_LISTS',
  SET_EDITING_TICKET: 'tickets/SET_EDITING_TICKET',
  UPDATE_ITEM_SUCCESS: 'tickets/UPDATE_ITEM_SUCCESS',
  DELETE_TICKET_SUCCESS: 'tickets/DELETE_TICKET_SUCCESS'
};

export type I_dataActions = I_setFetchedTickets | I_setEditingTicket | I_updateItemSuccess |
  I_deleteTicketSuccess | I_setFetchedLists

//interfaces
interface I_setFetchedTickets {
  type: typeof ticketsActionTypes.SET_FETCHED_TICKETS,
  data: Array<I_ticket>
}
interface I_setFetchedLists {
  type: typeof ticketsActionTypes.SET_FETCHED_LISTS,
  data: Array<I_listType>
}
interface I_setEditingTicket {
  type: typeof ticketsActionTypes.SET_EDITING_TICKET,
  data: string | null
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
export const setEditingTicket = (ticket: string | null): I_setEditingTicket =>
  ({type: ticketsActionTypes.SET_EDITING_TICKET, data: ticket});

export const _updateItemSuccess = (data: DataPayloadType, dataType: DataType): I_updateItemSuccess =>
  ({type: ticketsActionTypes.UPDATE_ITEM_SUCCESS, data, dataType});

export const _deleteTicketSuccess = (data: I_ticket): I_deleteTicketSuccess =>
  ({type: ticketsActionTypes.DELETE_TICKET_SUCCESS, data});

export const _setFetchedTickets = (data: I_ticket[]): I_setFetchedTickets =>
  ({type: ticketsActionTypes.SET_FETCHED_TICKETS, data});

export const _setFetchedLists = (data: I_listType[]): I_setFetchedLists =>
  ({type: ticketsActionTypes.SET_FETCHED_LISTS, data});


//API ACTIONS
export const fetchTickets = () =>
  fetchHandler(
    'fetchTickets',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.getTickets();
      const lists = await ticketsAPI.getLists();
      if (res) {
        dispatch(_setFetchedTickets(res));
        dispatch(_setFetchedLists(lists));
        return true;
      }
  });


export const onTicketUpdate = (ticket: I_ticket) =>
  fetchHandler(
    'ticket',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>, getState: GetStateType) => {
      let isNew = ticket.id === newTicketId;
      let res;
      if (isNew) {
        res = await ticketsAPI.addTicket(ticket);
      } else {
        res = await ticketsAPI.updateTicket(ticket);
      }
      if (res) {
        if (isNew) {
          let list = selectList(getState(), ticket.listId);
          onUpdateList({...list, order: [res.id, ...list.order]})
        }

        dispatch(_updateItemSuccess(res, 'ticket'));
        return true;
      }
    });

export const onUpdateList = (list: I_listType) =>
  fetchHandler(
    'updateList',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.updateList(list);
      if (res) {
        dispatch(_updateItemSuccess(res, 'list'));
        return true;
      }
    });

export const onTicketDelete = (data: I_ticket) =>
  fetchHandler(
    'ticket',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.deleteTicket(data);
      if (res) {
        dispatch(_deleteTicketSuccess(data));
        return true;
      }
    });