import {ticketsActionTypes} from "./actions";
import {I_ticketsState} from "../../types/ticket-types";
import {AppActionsType} from "../store";

export const newTicketId = '_NEW_TICKET';
export const newTicket = {
  id: newTicketId,
  name: '',
  surname: '',
  phone: ''
};
const initialState:I_ticketsState = {
  tickets: {
    [newTicketId]: newTicket
  },
  ticketsIds: [],
  editingTicketId: null
};

const ticketsReducer = (state: I_ticketsState = initialState, action: AppActionsType): I_ticketsState => {
  switch (action.type) {
    //adding fetched data
    case ticketsActionTypes.SET_FETCHED_TICKETS: {
      let newState = {...state};
      const idsArr: string[] = [];
      action.data.forEach(d => {
        newState.tickets[d.id] = d;
        idsArr.push(d.id);
      });
      newState.ticketsIds = idsArr;
      return newState;
    }
    case ticketsActionTypes.UPDATE_TICKET_SUCCESS: {
      let newState = {...state};
      if (state.tickets[action.data.id]) {
        newState.tickets[action.data.id] = {
          ...newState.tickets[action.data.id],
          ...action.data
        }
      } else {
        newState.ticketsIds = [...newState.ticketsIds, action.data.id];
        newState.tickets[action.data.id] = action.data
      }
      if (state.editingTicketId) {
        newState.editingTicketId = null;
      }
      return newState;
    }
    case ticketsActionTypes.DELETE_TICKET_SUCCESS: {
      let newState = {...state};
      delete newState.tickets[action.ticketId];
      newState.ticketsIds = newState.ticketsIds.filter(id => id !== action.ticketId);
      return newState;
    }
    case ticketsActionTypes.SET_EDITING_TICKET: {
      return {
        ...state,
        editingTicketId: action.data
      }
    }
    default:
      return state;
  }
};

export default ticketsReducer;