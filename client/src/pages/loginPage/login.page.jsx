import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 0,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};

const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 12,
      offset: 6,
    },
  },
};

const App = () => {
  const navigate = useNavigate();

  const onFinish = async(values) => {
    try {
      const result = await axios.post("http://localhost:8000/api/user/login", values);
      console.log(result);
      if (!result.data.resultcompare){
        alert('User or password not found.');
        return;
      }
      localStorage.setItem('type', result.data.userType)
      navigate("/boulders");
    } catch (e) {
      alert('User or password not found.');
    }
  };


  return (
    <Form
      {...formItemLayout}
      name="normal_login"
      className="login-form"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginTop: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
    >
      <Form.Item
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your Password!',
          },
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item 
        {...tailFormItemLayout}
        style={{
          textAlign: 'center'
        }}
      >
        <Button type="primary" htmlType="submit" className="login-form-button">
          Sign in
        </Button>
      </Form.Item>
        <p 
          style={{
            textAlign: 'center'
          }}
        >
          Or <Link to='/'>register now!</Link>
        </p>
    </Form>
  );
};
export default App;