import {AppStateType} from "../store";
import {I_ticket} from "../../types/ticket-types";

export const selectTicketByKey = (state: AppStateType, key: string): I_ticket | null =>
  !!state.tickets.tickets[key] ? state.tickets.tickets[key] as I_ticket : null;

export const selectIsEditing = (state: AppStateType, id: string): boolean =>
  state.tickets.editingTicketId === id;