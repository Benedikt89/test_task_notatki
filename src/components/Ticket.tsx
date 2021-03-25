import * as React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {UserOutlined, DeleteOutlined, CloseCircleOutlined} from '@ant-design/icons';
import {selectIsEditing, selectTicketByKey} from "../redux/tickets/selectors";
import TicketForm from "./TicketForm";
import './ticketList.css';
import {useCallback} from "react";
import {onTicketDelete, setEditingTicket} from "../redux/tickets/actions";

interface TicketProps {
  ticketId: string
}

const Ticket: React.FC<TicketProps> = ({ticketId}) => {
  const {ticket, isEditing} = useSelector((state:AppStateType) =>
    ({
      ticket: selectTicketByKey(state, ticketId),
      isEditing: selectIsEditing(state, ticketId)
    }));
  const dispatch = useDispatch();

  const setEditing = useCallback(() => {
    dispatch(setEditingTicket(isEditing ? null : ticketId))
  }, [isEditing]);

  const deleteItem = useCallback(() => {
    dispatch(onTicketDelete(ticketId))
  }, [isEditing]);

  return !ticket ? null : isEditing ? (
    <div className="ticket-item-wrapper">
      <TicketForm ticket={ticket}/>
      <CloseCircleOutlined onClick={setEditing} className="fixed-delete-button"/>
    </div>
) : (
    <div className="ticket-item-wrapper">
      <UserOutlined className="ticket-info-icon"/>
      <div className="row ticket-info" onDoubleClick={setEditing}>
        <span>
          <small style={{margin: '0 1rem'}}>Name:</small>
            {ticket.name}
        </span>
        <span>
          <small style={{margin: '0 1rem'}}>Phone:</small>
          {ticket.phone}
        </span>
      </div>
    <DeleteOutlined style={{color: "#ff0000"}} onClick={deleteItem} className="fixed-delete-button"/>
  </div>
)
};

export default Ticket;