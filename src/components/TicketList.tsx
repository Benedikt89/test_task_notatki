import * as React from "react";
import './ticketList.css';
import TicketForm from "./TicketForm";
import Ticket from "./Ticket";

interface TicketsProps {
  ticketIds: string[]
}

// @react-firebase/database firebase

const TicketList: React.FC<TicketsProps> = ({ticketIds}) => {
  return (
    <div className="ticket-list-page">
      <div style={{padding: '20px'}}>
        <h2>Add new ticket.</h2>
        <TicketForm />
      </div>
      <div className="ticket-list-wrapper">
        {ticketIds.map(id => <Ticket ticketId={id}/>)}
      </div>
    </div>
  )
};

export default TicketList;