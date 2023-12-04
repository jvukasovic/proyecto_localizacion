
import React, { useEffect, useRef } from "react";
import { Button, Form, Input, InputNumber } from 'antd';

import {Flex, Rate} from 'antd';

import { Wrapper} from "@googlemaps/react-wrapper";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";

const apikey = process.env.REACT_APP_MAPS_API_KEY

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
  required: '${label} is required!',
  types: {
    email: '${label} is not a valid email!',
    number: '${label} is not a valid number!',
  },
  number: {
    range: '${label} must be between ${min} and ${max}',
  },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
  console.log(values);
};


function MyMapComponent({
    center,
    zoom,
  }) {
    const ref = useRef();
  
    useEffect(() => {
      new window.google.maps.Map(ref.current, {
        center,
        zoom,
      });
    }, [center, zoom]);
  
    return <div ref={ref} id="map" 
      style={{
      width:350,
      height:350,
      marginLeft: 30,
      borderRadius: 5,
    }}/>;
  }

const CreateBoulderPage = () => {

    const navigate = useNavigate();

    const render = (status) => {
        return <h1>{status}</h1>;
      };
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;
    
    return (
        <Flex justify={'center'} align={'flex-start'} wrap='wrap'>
            <Form
                {...layout}
                name="nest-messages"
                onFinish={onFinish}
                style={{
                maxWidth: 600,
                width:350,
                marginRight: 30,
                overflow: 'auto',
                }}
                validateMessages={validateMessages}
            >
                <Form.Item
                name={['boulder', 'name']}
                label="Boulder Name"
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <Form.Item
                name={['boulder', 'grade']}
                label="Grade"
                rules={[
                    {
                        required: true,
                    },
                ]}
                >
                <Input />
                </Form.Item>
                <FormItem
                    name={['boulder', 'calification']}
                    label="Calification"
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                <Rate />
                {/* onChange={setValue} value={value} */}
                </FormItem>
                <Form.Item 
                    name={['boulder', 'description']} 
                    label="Description"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >

                <Input.TextArea rows={5}/>
                </Form.Item>
                <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
                >
                <Button type="primary" onClick={() => navigate("/boulders")}>
                    Submit
                </Button>
                </Form.Item>
            </Form>

            <Wrapper 
            apiKey={apikey} 
            render={render}
        >
            <MyMapComponent center={center} zoom={zoom} />
        </Wrapper>

        </Flex>
    );
};
export default CreateBoulderPage;