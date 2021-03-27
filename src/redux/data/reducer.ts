import {ticketsActionTypes} from "./actions";
import {I_dataState, I_listType, I_ticket} from "../../types/ticket-types";
import {AppActionsType} from "../store";
import moment from "moment";
import {isTicket} from "../../types/typeHelpers";

export const newTicketId = '_NEW_TICKET';

export const newTicket = {
  id: newTicketId,
  creatorId: '',
  lastModified: moment(),
  lastModifiedId: '',
  listId: '',
  title: 'Untitled',
  content: 'no content',
  expireTime: moment(),
};

const initialState:I_dataState = {
  tickets: {
    [newTicketId]: newTicket
  },
  lists: {},
};

const dataReducer = (state: I_dataState = initialState, action: AppActionsType): I_dataState => {
  switch (action.type) {
    //adding fetched data
    case ticketsActionTypes.SET_FETCHED_TICKETS: {
      let newState = {...state};
      action.data.forEach((d: I_ticket) => {
        newState.tickets[d.id] = d;
        if (newState.lists[d.listId] && !newState.lists[d.listId].order.includes(d.id)) {
          newState.lists[d.listId].order.push(d.id)
        }
      });
      return newState;
    }
    case ticketsActionTypes.SET_FETCHED_LISTS: {
      let newState = {...state};
      action.data.forEach((d: I_listType) => {
        newState.lists[d.id] = d;
      });
      return newState;
    }
    case ticketsActionTypes.UPDATE_ITEM_SUCCESS: {
      let newState = {...state};
      let newData = action.dataType === 'ticket' ? {...state.tickets} : {...state.lists};
      let ticket = isTicket(action.data) ? action.data : null;
      if (newData[action.data.id]) {
        newData[action.data.id] = {
          ...newData[action.data.id],
          ...action.data
        }
      } else if (ticket) {
        if (newState.lists[ticket.listId] && !newState.lists[ticket.listId].order.includes(ticket.id)) {
          newState.lists[ticket.listId].order.push(ticket.id)
        }
        newState.tickets[ticket.id] = ticket
      }
      return newState;
    }
    case ticketsActionTypes.DELETE_TICKET_SUCCESS: {
      let newState = {...state};
      delete newState.tickets[action.data.id];
      if (newState.lists[action.data.listId]) {
        newState.lists[action.data.listId].order =
          newState.lists[action.data.listId].order.filter(id => id !== action.data.id)
      }
      return newState;
    }
    default:
      return state;
  }
};

export default dataReducer;