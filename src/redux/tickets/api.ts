import db from '../firebase';
import {I_ticket, I_ticketData} from "../../types/ticket-types";
export const ticketsAPI = {
  getTickets: async (): Promise<never | I_ticket[]> => {
    let res:I_ticket[] = [];
    const snapshot = await  db.collection("tickets").get();
    snapshot.forEach((doc) => {
      let id = doc.id;
      let ticket = doc.data() as I_ticket;
      res.push({...ticket, id});
    });
    return res;
  },
  async addTicket(ticket: I_ticket): Promise<never | undefined | I_ticket> {
    let toSend: I_ticketData = {
      name: ticket.name,
      phone: ticket.phone,
      surname: 'surname',
    };
    const res = await db.collection("tickets").add(toSend);
    if (res && res.id) {
      return {...toSend, id: res.id};
    }
  },
  async updateTicket(ticket: I_ticket): Promise<never | I_ticket> {
    await db.collection("tickets").doc(ticket.id).set(ticket);
    return ticket;
  },
  async deleteTicket(ticketId: string): Promise<never | boolean> {
    await db.collection("tickets").doc(ticketId).delete();
    return true;
  }
};