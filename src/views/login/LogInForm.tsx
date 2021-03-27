import {Button, Form, Input} from 'antd';
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import {getLocale} from "../../constants/languageType";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Link, Redirect} from "react-router-dom";
import {logInThunk} from "../../redux/app/actions";
import {selectFetchingByKey, selectUserData} from "../../redux/app/selectors";
import * as React from "react";

const LoginForm = () => {
  const {language, loading, userData} = useSelector((state: AppStateType) => ({
    language: state.app.language,
    loading: selectFetchingByKey(state, 'logInThunk'),
    userData: selectUserData(state)
  }));
  const dispatch = useDispatch();
  const onFinish = (values: any) => {
    dispatch(logInThunk({name: values.name, password: values.password}));
    console.log('Received values of form: ', values);
  };

  return userData && userData.id ? <Redirect to={'/'}/> : (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        label="login"
        name="name"
        rules={[{ required: true, message: 'Please input your Email!', type: 'email' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input.Password
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          {getLocale(language,'log_in')}
        </Button>
        <span style={{float: 'right'}}>
          Or <Link to={'/register'}>{getLocale(language, 'register_now')}</Link>
        </span>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;