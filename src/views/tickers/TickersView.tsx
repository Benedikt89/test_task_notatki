import * as React from "react";
import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {SettingOutlined} from '@ant-design/icons';
import {selectListsArr} from "../../redux/data/selectors";
import {onTicketUpdate, onUpdateList} from "../../redux/data/actions";
import TicketList from "./TicketList";
import './TickersPage.css';
import {Collapse, Tooltip} from "antd";
import {newTicket} from "../../redux/data/reducer";
import {I_listType} from "../../types/ticket-types";
import {getLocale} from "../../constants/languageType";

const {Panel} = Collapse;

interface PageProps {}

const TicketPage: React.FC<PageProps> = () => {
  const {lists, language} = useSelector((state:AppStateType) =>
    ({
      language: state.app.language,
      lists: selectListsArr(state),
    }));
  const dispatch = useDispatch();

  const updateList = useCallback((list: I_listType) =>
    dispatch(onUpdateList(list)), []);

  const getExtra = (listId: string) => (
    <Tooltip title={getLocale(language, 'add_ticket')}>
    <SettingOutlined
      onClick={event => {
        event.stopPropagation();
        dispatch(onTicketUpdate({...newTicket, listId}));
      }}
    />
    </Tooltip>
  );

  return (
    <div className="page-wrapper">
      <h1>Notatki</h1>
      <Collapse defaultActiveKey={['1']}>
        {lists.map(list => (
          <Panel
            header={list.title}
            key="1"
            extra={getExtra(list.id)}
          >
            <TicketList ticketList={list} onUpdate={(val) => updateList({...list, title: val})}/>
          </Panel>
        ))}
      </Collapse>


    </div>
  )
};

export default TicketPage;