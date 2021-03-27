import * as React from "react";
import {useCallback} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {SettingOutlined, EditOutlined} from '@ant-design/icons';
import {selectListsArr} from "../../redux/data/selectors";
import {onTicketUpdate, onUpdateList} from "../../redux/data/actions";
import './TickersPage.css';
import {Collapse, Tooltip} from "antd";
import {newTicket} from "../../redux/data/reducer";
import {I_listType} from "../../types/ticket-types";
import {getLocale} from "../../constants/languageType";
import Text from "antd/lib/typography/Text";
import Ticket from "../../components/Ticket";

const {Panel} = Collapse;

interface PageProps {
}

const TicketPage: React.FC<PageProps> = () => {
  const {lists, language} = useSelector((state: AppStateType) =>
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
    <div>
      <h1>Notatki</h1>
      <div className="page-wrapper">
        {lists.map(list => (
          <Collapse defaultActiveKey={[list.id]}
                    style={{margin: '0 2rem 3rem 0'}}>
            <Panel
              header={

                  <Text style={{fontSize: '1.2rem', maxWidth: '80%'}} editable={{
                    icon: <EditOutlined style={{fontSize: '1rem'}}/>,
                    onChange: (val: string) => updateList({...list, title: val})
                  }}>
                    {list.title}
                  </Text>

              }
              key={list.id}
              extra={getExtra(list.id)}
              style={{maxHeight: "80vh", minWidth: "350px"}}
            >
              <div className="ticket-list-wrapper">
                {list.order.map(id => <Ticket ticketId={id}/>)}
              </div>
            </Panel>
          </Collapse>))}
      </div>
    </div>
  )
};

export default TicketPage;