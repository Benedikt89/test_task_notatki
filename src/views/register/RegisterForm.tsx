import * as React from "react";
import {Button, Form, Input, Select} from 'antd';
import {I_UserData} from "../../types/app-types";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {selectFetchingByKey, selectUserData} from "../../redux/app/selectors";
import {newUserId} from "../../redux/app/reducer";
import {onUserRegister} from "../../redux/app/actions";
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {useState} from "react";
import {getRandomAvatar} from "../../constants/avatarImages";
import {Redirect} from "react-router";

interface UserFormProps {
  user?: I_UserData | null
}

const UserRegisterForm: React.FC<UserFormProps> = ({user}) => {
  const dispatch = useDispatch();
  const {loading, userData, language} = useSelector((state: AppStateType) => ({
    language: state.app.language,
    loading: selectFetchingByKey(state, 'onUserRegister'),
    userData: selectUserData(state)
  }));

  ///TODO Languages
  const [touched, setTouched] = useState(false);
  const phoneRegExp = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  const defaultPrefix = "86";

  const onFinish = (values: any) => {
    dispatch(onUserRegister({
      id: user ? user.id : newUserId,
      name: values.name,
      avatar: getRandomAvatar(),
      phone: `+${values.prefix ? values.prefix : defaultPrefix}-${values.phone}`,
      password: values.password
    }));
    console.log('Success:', values);
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
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

  let defaults = user ? {
    ...user,
    ...getSplittedPhone(user.phone)
  } : {
    prefix: defaultPrefix,
  };

  return userData ? <Redirect to={'/'} /> : (
    <Form
      onValuesChange={() => setTouched(true)}
      name="user"
      initialValues={defaults}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        name="name"
        rules={[{required: true, message: 'Please input correct email!', type: 'email'}]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="e-mail"/>
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
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading} disabled={!touched}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
};

export default UserRegisterForm;
