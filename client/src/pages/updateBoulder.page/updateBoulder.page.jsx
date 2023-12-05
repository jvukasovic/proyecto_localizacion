
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Flex, Rate } from 'antd';
import { Wrapper} from "@googlemaps/react-wrapper";
import FormItem from "antd/es/form/FormItem";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const apikey = process.env.REACT_APP_MAPS_API_KEY

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const validateMessages = {
  required: '${label} is required!',
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
        mapTypeId: 'satellite'
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

const UpdateBoulderPage = () => {
    const [boulderName, setBoulderName] = useState('');
    const [grade, setGrade] = useState('');
    const [meanRating, setMeanRating] = useState();
    const [description, setDescription] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const render = (status) => {
        return <h1>{status}</h1>;
      };

    const idBoulder = params.idBoulder;

    const center = { lat: -33.817054, lng: -70.018062 };
    const zoom = 15;

    const getBoulderData = async () => {
        try {
            const getOneResult = await axios.get("http://localhost:8000/api/boulders/getOne/" + idBoulder);
            setBoulderName(getOneResult.data.boulderName);
            setGrade(getOneResult.data.grade);
            setMeanRating(getOneResult.data.meanRating);
            setDescription(getOneResult.data.description);
        } catch (e) {
            alert(e.response.data.message);
        }
    }


    const onFinish = async (values) => {
        values['geolocation'] = {
            "type": "Point",
            "coordinates": [
                1,
                2
            ]
        }
        try {
            var result = await axios.put("http://localhost:8000/api/boulders/update/"+idBoulder, values);
            if(result.status == 200){
                console.log(result);
                navigate(`/boulders/${idBoulder}`);
            }
        } catch(e) {
            alert(e.response.data.message);
        }
      };

      useEffect(() => {
        const isLogged = localStorage.getItem('type');
        if (isLogged == null){
            navigate('/login')
        }
        getBoulderData();
    }, []); 
    
    return (
        (boulderName !== '') && (<Flex justify={'center'} align={'flex-start'} wrap='wrap'>
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
                name='boulderName'
                label="Boulder Name"
                initialValue={boulderName}
                rules={[
                    {
                    required: true,
                    },
                ]}
                >
                    <Input 
                    />
                </Form.Item>
                <Form.Item
                    name='grade'
                    label="Grade"
                    initialValue={grade}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input 
                    />
                </Form.Item>
                <FormItem
                    name='meanRating'
                    label="Calification"
                    initialValue={meanRating}
                    rules={[
                        {
                        required: true,
                        },
                    ]}
                >
                    <Rate 
                    />
                </FormItem>
                <Form.Item 
                    name='description'
                    label="Description"
                    initialValue={description}
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >

                    <Input.TextArea 
                        rows={5}
                    />
                </Form.Item>
                <Form.Item
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 8,
                }}
                >
                <Button 
                    type="primary" 
                    htmlType="submit"
                >
                    Submit
                </Button>
                <Button 
                    type="primary" 
                    onClick={() => navigate(`/boulders/${idBoulder}`)}
                    style={{
                        marginLeft:18
                    }}
                >
                    Cancel
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
    ))
};
export default UpdateBoulderPage;