import {I_ticket} from "../types/ticket-types";
import * as React from "react";
import {Button, Form, Input, Select} from 'antd';
import './common/common.css';
import {newTicketId} from "../redux/tickets/reducer";
import {useDispatch, useSelector} from "react-redux";
import {onTicketUpdate} from "../redux/tickets/actions";
import {selectFetchingByKey} from "../redux/app/selectors";
import {AppStateType} from "../redux/store";

interface TicketFormProps {
  ticket?: I_ticket
}

const TicketForm: React.FC<TicketFormProps> = ({ticket}) => {
  const dispatch = useDispatch();
  const {loading} = useSelector((state: AppStateType) => ({
    loading: selectFetchingByKey(state, 'ticket')
  }));

  const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const defaultPrefix = "86";

  const onFinish = (values: any) => {
    dispatch(onTicketUpdate({
      ...values,
      id: ticket ? ticket.id : newTicketId,
      phone: `+${values.prefix ? values.prefix : defaultPrefix}-${values.phone}`,
    }));
    console.log('Success:', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={defaultPrefix}>
        <Select.Option value="86">+86</Select.Option>
        <Select.Option value="87">+87</Select.Option>
      </Select>
    </Form.Item>
  );
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  let getSplittedPhone = (string: string) => {
    let [prefix, ...rest] = string.split("-");
    let validPrefix = prefix.length === 3;
    if (!validPrefix) {
      rest.unshift(prefix)
    }
    return {prefix: validPrefix ? prefix : defaultPrefix, phone: rest.join('')};
  };

  let defaults = ticket ? {
    ...ticket,
    ...getSplittedPhone(ticket.phone)
  } : {};
  return (
    <Form
      className="row"
      name="ticket"
      initialValues={defaults}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        rules={[{required: true, message: 'Please input your ticketname!'}]}
      >
        <Input placeholder="Ticketname"/>
      </Form.Item>

      <Form.Item
        name="phone"
        rules={[
          {required: true, message: 'Please input your phone!'},
          {pattern: phoneRegExp,
            message: 'Please enter a valid Phone *** *** ****',}
          ]}
      >
        <Input addonBefore={prefixSelector} style={{ width: '100%' }} placeholder="Phone" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default TicketForm;