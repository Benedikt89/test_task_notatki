import * as React from "react";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../redux/store";
import {DeleteOutlined, EditOutlined, EllipsisOutlined, ClockCircleOutlined, ArrowsAltOutlined} from '@ant-design/icons';
import './ticketList.css';
import {Avatar, Button, Card, DatePicker, Dropdown, Menu, Spin, Tooltip, Typography} from "antd";
import {getLocale} from "../constants/languageType";
import {selectTicketByKey, selectUser} from "../redux/data/selectors";
import {onTicketDelete, onTicketMove, onTicketUpdate} from "../redux/data/actions";
import {hasOwnProperty} from "../types/typeHelpers";
import {selectFetchingByKey} from "../redux/app/selectors";
import moment, {Moment} from "moment";
import {getRandomAvatar} from "../constants/avatarImages";


const {Text, Title} = Typography;
const {Meta} = Card;

interface TicketProps {
  ticketId: string
}

interface I_MenuItem {
  action: () => void,
  title: string,
  icon: React.ReactElement
}

function disabledDate(current: Moment) {
  // Can not select days before today and today
  return current && current < moment().endOf('day');
}

const Ticket: React.FC<TicketProps> = ({ticketId}) => {
  const {ticket, language, loading} = useSelector((state: AppStateType) =>
    ({
      ticket: selectTicketByKey(state, ticketId),
      loading: selectFetchingByKey(state, `ticket${ticketId}`),
      language: state.app.language
    }));
  const [editField, setEditField] = useState<null | 'title' | 'content' | 'expireTime'>(null);
  const dispatch = useDispatch();

  const deleteItem = useCallback(() => {
    if (ticket) {
      dispatch(onTicketDelete(ticket))
    }
  }, [editField]);

  const moveItem = useCallback(() => {
    if (ticket) {
      dispatch(onTicketMove(ticket))
    }
  }, [ticket]);

  const menu: I_MenuItem[] = [
    {
      action: () => setEditField('title'),
      title: getLocale(language, 'ticket_edit_title'),
      icon: <EditOutlined style={{fontSize: '1rem'}}/>
    },
    {
      action: () => setEditField('content'),
      title: getLocale(language, 'ticket_edit_content'),
      icon: <EditOutlined style={{fontSize: '1rem'}}/>
    },
    {
      action: () => setEditField('expireTime'),
      title: getLocale(language, 'ticket_edit_expire_time'),
      icon: <ClockCircleOutlined style={{fontSize: '1rem'}}/>
    },
    {
      action: () => moveItem(),
      title: getLocale(language, 'ticket_edit_move'),
      icon: <ArrowsAltOutlined style={{fontSize: '1rem'}}/>
    },
    {
      action: () => deleteItem(),
      title: getLocale(language, 'ticket_edit_delete'),
      icon: <DeleteOutlined style={{fontSize: '1rem', color: "#ff0000"}}/>
    },
  ];

  const onUpdate = (val: string | Moment) => {
    console.log('onUpdate => ' + editField);
    if (ticket && editField && val && hasOwnProperty(ticket, editField)) {
      if (typeof val === 'string') {
        if (val !== ticket[editField]) {
          dispatch(onTicketUpdate({...ticket, [editField]: val}))
        }
      } else {
        dispatch(onTicketUpdate({...ticket, [editField]: val}))
      }
    }
    setEditField(null);
  };

  return !ticket ? null : (
    <Spin spinning={loading}>
      <Card
          title={editField === 'expireTime' ? <DatePicker
          format="YYYY-MM-DD"
          disabledDate={disabledDate}
          defaultValue={ticket.expireTime}
          showTime={false}
          onChange={(val) => val && onUpdate(val)}
        /> : <Title
          style={{fontSize: '1.2rem'}}
          editable={{
            icon: <span/>,
            editing: editField === 'title',
            onChange: (val) => onUpdate(val),
          }}>
          {ticket.title}
        </Title>}
        extra={<Dropdown
          trigger={['click']}
          overlay={<Menu>
            {menu.map((it, i: number) => (
              <Menu.Item key={"menu" + i}>
                <Button type="text" onClick={it.action}>
                  {it.icon}
                  {it.title}
                </Button>
              </Menu.Item>
            ))}
          </Menu>}
        >
          <EllipsisOutlined key="menu"/>
        </Dropdown>}
        style={{width: 330, margin: '2rem 0.2rem'}}
          actions={[
            <Tooltip
              title={`${ticket.expireTime.format(getLocale(language, 'time_format'))}`}
            >
          <span
            style={ticket.expireTime.isBefore(moment()) ? {color: 'red'} : {}}
          >
            {getLocale(language, 'ticket_meta_expire_time')}:
          </span>
            </Tooltip>,
            <span
              style={ticket.expireTime.isBefore(moment()) ? {color: 'red'} : {}}
            >
            <ClockCircleOutlined style={{fontSize: '1rem', margin: '0 0.3rem'}}/>
              {`${ticket.expireTime.format(getLocale(language, 'time_format'))}`}
          </span>
          ]}
      >
        <div className="ticket-content-wrapper">
          <Text
            editable={{
              editing: editField === 'content',
              icon: <span/>,
              onChange: (val) => onUpdate(val),
            }}
          >
            {ticket.content}
          </Text>
        </div>
        <CardMeta
          userId={ticket.lastModifiedId}
          lastModified={`${getLocale(language, 'ticket_meta_last_time')} ${ticket.lastModified.format(getLocale(language, 'time_format'))}`}
        />
      </Card>
    </Spin>
  )
};

interface I_MetaProps {
  lastModified: string,
  userId: string
}

const CardMeta: React.FC<I_MetaProps> = ({lastModified, userId}) => {
  const user = useSelector((state: AppStateType) => selectUser(state, userId));
  return (
    <Meta
      avatar={<Avatar src={user && user.avatar ? user.avatar : getRandomAvatar()}/>}
      title={user && user.name ? user.name : "no name"}
      description={lastModified}
    />
  )
};

export default Ticket;