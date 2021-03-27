import {Moment} from "moment";

export type DataType = 'list' | 'ticket'
export type DataPayloadType = I_listType | I_ticket

export type I_dataState = {
  tickets: {
    [key: string]: I_ticket
  }
  lists: {
    [key: string]: I_listType
  }
}

export interface I_ticketData {
  creatorId: string,
  lastModified: Moment,
  lastModifiedId: string,
  listId: string
  title: string
  content: string
  expireTime: Moment
}

export interface I_ticket extends I_ticketData {
  id: string
}

export type I_listType = {
  id: string,
  order: string[],
  title: string,
}