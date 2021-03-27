import db from '../firebase';
import {I_listType, I_ticket} from "../../types/ticket-types";
import moment from "moment";
import firebase from "firebase";

const {Timestamp} = firebase.firestore;

const ticketConverter = (data: I_ticket) => {
  return {
    creatorId: '',
    lastModified: Timestamp.fromDate(new Date()),
    lastModifiedId: '',
    listId: data.listId,
    title: data.title,
    content: data.content,
    expireTime: Timestamp.fromDate(new Date()),
  }
};

export const ticketsAPI = {
  getTickets: async (): Promise<never | I_ticket[]> => {
    let res:I_ticket[] = [];
    const snapshot = await  db.collection("tickets").get();
    snapshot.forEach((doc) => {
      let id = doc.id;
      let ticket = doc.data() as I_ticket;
      res.push({...ticket, id, lastModified: moment(ticket.lastModified.toDate()), expireTime: moment(ticket.expireTime.toDate())});
    });
    console.log(res);
    return res;
  },
  getLists: async (): Promise<never | I_listType[]> => {
    let res:I_listType[] = [];
    const snapshot = await  db.collection("tickerList").get();
    snapshot.forEach((doc) => {
      let id = doc.id;
      let ticket = doc.data() as I_listType;
      res.push({...ticket, id});
    });
    console.log(res);
    return res;
  },
  updateList: async (list: I_listType): Promise<never | I_listType> => {
    await db.collection("tickerList").doc(list.id).set(list);
    return list;
  },
  async addTicket(ticket: I_ticket): Promise<never | undefined | I_ticket> {
    let toSend: any = ticketConverter(ticket);
    const res = await db.collection("tickets").add(toSend);
    if (res && res.id) {
      return {...ticket, id: res.id};
    }
  },
  async updateTicket(ticket: I_ticket): Promise<never | I_ticket> {
    await db.collection("tickets").doc(ticket.id).set(ticket);
    return ticket;
  },
  async deleteTicket(ticket: I_ticket): Promise<never | boolean> {
    await db.collection("tickets").doc(ticket.id).delete();
    return true;
  }
};