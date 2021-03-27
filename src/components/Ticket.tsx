import * as React from "react";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {DeleteOutlined, EditOutlined, SettingOutlined} from '@ant-design/icons';
import './ticketList.css';
import {Avatar, Card, Typography} from "antd";
import {getLocale} from "../constants/languageType";
import {selectTicketByKey} from "../redux/data/selectors";
import {onTicketDelete} from "../redux/data/actions";

const {Text, Title} = Typography;
const {Meta} = Card;

interface TicketProps {
  ticketId: string
}

const Ticket: React.FC<TicketProps> = ({ticketId}) => {
  const {ticket, language} = useSelector((state: AppStateType) =>
    ({
      ticket: selectTicketByKey(state, ticketId),
      language: state.app.language
    }));
  const [isEditing, setEditing] = useState(null);
  const [editVal, setEditVal] = useState('');
  const dispatch = useDispatch();

  const deleteItem = useCallback(() => {
    if (ticket) {
      dispatch(onTicketDelete(ticket))
    }
  }, [isEditing]);

  return !ticket ? null : (
    <Card
      style={{width: 300}}
      actions={[
        <SettingOutlined key="setting"/>,
        <EditOutlined key="edit"/>,
      ]}
    >
      <div className="ticket-item-wrapper">

        <Title editable={{icon: <EditOutlined style={{fontSize: '1rem'}} />, onChange: setEditVal }}>{ticket.title}</Title>
        <Text editable={{ onChange: setEditVal }}>{editVal}</Text>

        <DeleteOutlined style={{color: "#ff0000"}} onClick={deleteItem} className="fixed-delete-button"/>
      </div>
      <Meta
        avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"/>}
        title="Card title"
        description={`Last Time Edited ${ticket.lastModified.format(getLocale(language, 'time_format'))}`}
      />
    </Card>
  )
};

export default Ticket;