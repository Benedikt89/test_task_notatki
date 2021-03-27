import {AppStateType} from "../store";
import {I_listType, I_ticket} from "../../types/ticket-types";

export const selectListsArr = (state: AppStateType): I_listType[] => {
  let res:I_listType[] = [];
  Object.keys(state.data.lists).forEach((key: string) => res.push(state.data.lists[key]));
  return res;
};

export const selectList = (state: AppStateType, listId: string): I_listType => {
  return state.data.lists[listId];
};

export const selectTickersIds = (state: AppStateType, listId: string): string[] => {
  let list = state.data.lists[listId];
  if (list) {
    return list.order;
  }
  return [];
};

export const selectTicketByKey = (state: AppStateType, key: string): I_ticket | null =>
  !!state.data.tickets[key] ? state.data.tickets[key] as I_ticket : null;
