import * as React from "react";
import '../../components/ticketList.css';
import {I_listType} from "../../types/ticket-types";
import Ticket from "../../components/Ticket";
import Title from "antd/lib/typography/Title";
import {useState} from "react";
import {EditOutlined} from '@ant-design/icons';

interface I_Props {
  ticketList: I_listType,
  onUpdate: (title: string) => void
}

const TicketList = React.memo(({ticketList, onUpdate}: I_Props) => {
  const [editable, setEditVal] = useState(ticketList.title);
  return (
    <div>
      <Title editable={{
        icon: <EditOutlined style={{fontSize: '1rem'}} />,
        onChange: setEditVal,
        onEnd: () => onUpdate(editable)
      }}>
        {editable}
      </Title>
      <div className="ticket-list-wrapper">
        {ticketList.order.map(id => <Ticket ticketId={id}/>)}
      </div>
    </div>
  )
});

export default TicketList;