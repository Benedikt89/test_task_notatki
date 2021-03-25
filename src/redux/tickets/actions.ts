import {ThunkDispatch} from "redux-thunk";
import {AppActionsType} from "../store";
import {I_ticket} from "../../types/ticket-types";
import {ticketsAPI} from "./api";
import {fetchHandler} from "./fetchHandler";
import {newTicketId} from "./reducer";

export const ticketsActionTypes: {
  SET_FETCHED_TICKETS: 'tickets/SET_FETCHED_TICKETS'
  SET_EDITING_TICKET: 'tickets/SET_EDITING_TICKET'
  UPDATE_TICKET_SUCCESS: 'tickets/UPDATE_TICKET_SUCCESS'
  DELETE_TICKET_SUCCESS: 'tickets/DELETE_TICKET_SUCCESS'
} = {
  SET_FETCHED_TICKETS: 'tickets/SET_FETCHED_TICKETS',
  SET_EDITING_TICKET: 'tickets/SET_EDITING_TICKET',
  UPDATE_TICKET_SUCCESS: 'tickets/UPDATE_TICKET_SUCCESS',
  DELETE_TICKET_SUCCESS: 'tickets/DELETE_TICKET_SUCCESS'
};

export type I_ticketsActions = I_setFetchedTickets | I_setEditingTicket | I_updateTicketSuccess |
  I_deleteTicketSuccess

//interfaces
interface I_setFetchedTickets {
  type: typeof ticketsActionTypes.SET_FETCHED_TICKETS,
  data: Array<I_ticket>
}
interface I_setEditingTicket {
  type: typeof ticketsActionTypes.SET_EDITING_TICKET,
  data: string | null
}
interface I_updateTicketSuccess {
  type: typeof ticketsActionTypes.UPDATE_TICKET_SUCCESS,
  data: I_ticket
}

interface I_deleteTicketSuccess {
  type: typeof ticketsActionTypes.DELETE_TICKET_SUCCESS,
  ticketId: string
}

//Internal ACTIONS CREATORS
export const setEditingTicket = (data: string | null): I_setEditingTicket =>
  ({type: ticketsActionTypes.SET_EDITING_TICKET, data});

export const _updateTicketSuccess = (data: I_ticket): I_updateTicketSuccess =>
  ({type: ticketsActionTypes.UPDATE_TICKET_SUCCESS, data});

export const _deleteTicketSuccess = (ticketId: string): I_deleteTicketSuccess =>
  ({type: ticketsActionTypes.DELETE_TICKET_SUCCESS, ticketId});

export const _setFetchedTickets = (data: I_ticket[]): I_setFetchedTickets =>
  ({type: ticketsActionTypes.SET_FETCHED_TICKETS, data});


//API ACTIONS
export const fetchTickets = () =>
  fetchHandler(
    'fetchTickets',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.getTickets();
      if (res) {
        dispatch(_setFetchedTickets(res));
        return true;
      }
  });


export const onTicketUpdate = (ticket: I_ticket) =>
  fetchHandler(
    'ticket',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      let res;
      if (ticket.id === newTicketId) {
        res = await ticketsAPI.addTicket(ticket);
      } else {
        res = await ticketsAPI.updateTicket(ticket);
      }
      if (res) {
        dispatch(_updateTicketSuccess(res));
        return true;
      }
    });

export const onTicketDelete = (ticketId: string) =>
  fetchHandler(
    'ticket',
    async (dispatch: ThunkDispatch<{}, {}, AppActionsType>) => {
      const res = await ticketsAPI.deleteTicket(ticketId);
      if (res) {
        dispatch(_deleteTicketSuccess(ticketId));
        return true;
      }
    });