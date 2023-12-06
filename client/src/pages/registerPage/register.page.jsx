import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {Button, Form, Input} from 'antd';
import axios from 'axios';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 12,
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
const RegisterPage = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    console.log('Received values of form: ', values);
    try{
      var obj = {
          "userName": values.userName,
          "email": values.email,
          "password": values.password,
          "type":'read'
      };

      var response = await axios.post("http://localhost:8000/api/user/register", obj);
      if(response.status != 200){
          alert("Hubo un error");
          return;
      }
      localStorage.setItem('type', 'read');
      localStorage.setItem('userName', values.userName);
      alert("Se registro correctamente");
      navigate("/boulders");
  }catch(e){
      alert(e.response.data.message);
  }
  };

  return (
    <Form
      {...formItemLayout}
      form={form}
      name="register"
      onFinish={onFinish}
      style={{
        maxWidth: 600,
        marginTop: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      scrollToFirstError
    >
      <Form.Item
        name="userName"
        label="Name"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>

      {/* <Form.Item
        name="nickname"
        label="Nickname"
        tooltip="What do you want others to call you?"
        rules={[
          {
            required: true,
            message: 'Please input your nickname!',
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item> */}
    
      <Form.Item 
        {...tailFormItemLayout}
        style={{
          textAlign: 'center'
        }}
      >
        <Button type="primary" htmlType="submit">
          Create account
        </Button>
      </Form.Item>
      <p
        style={{
          textAlign: 'center'
        }}
      >
        Already have an account? <Link to='/login'>Sign in</Link>
      </p>
    </Form>
  );
};
export default RegisterPage;