////TYPE Checkers
import {I_ticket, I_ticketData} from "./ticket-types";

export function hasOwnProperty<X extends {}, Y extends PropertyKey>
(obj: X, prop: Y): obj is X & Record<Y, unknown> {
  return obj.hasOwnProperty(prop)
}

export function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key]; // Inferred type is T[K]
}

export function isUser(data: I_ticket | I_ticketData): data is I_ticket {
  return hasOwnProperty(data, 'id');
}
