export interface I_ticketData {
  name: string
  phone: string
  surname: string
}

export interface I_ticket extends I_ticketData {
  id: string
}

export type I_ticketsState = {
  tickets: {
    [key: string]: I_ticket
  }
  ticketsIds: string[]
  editingTicketId: string | null
}