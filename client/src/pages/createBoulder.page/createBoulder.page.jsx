
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Flex, Rate } from 'antd';
import { Wrapper} from "@googlemaps/react-wrapper";
import FormItem from "antd/es/form/FormItem";
import { useNavigate } from "react-router-dom";
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


const CreateBoulderPage = () => {
    const [coordinates, setCoordinates] = useState([]);
    const navigate = useNavigate();
    const render = (status) => {
        return <h1>{status}</h1>;
      };

      const center = { lat: -33.817054, lng: -70.018062 };
      const zoom = 15;
  
  
      function MyMapComponent({
          center,
          zoom,
          name
        }) {
          const ref = useRef();
        
          useEffect(() => {
            const map = new window.google.maps.Map(ref.current, {
              center,
              zoom,
              mapTypeId: 'satellite'
            });
            if(coordinates.length == 0){
                const draggableMarker = new window.google.maps.Marker({
                    position: { lat: -33.817054, lng: -70.018062  },
                    map,
                    title: name,
                    draggable:true,
                })
                draggableMarker.addListener("dragend", (event) => {
                    const position = draggableMarker.position;
                    setCoordinates([parseFloat(position.lat().toFixed(5)), parseFloat(position.lng().toFixed(5))])
                    });
            }else{
                const draggableMarker = new window.google.maps.Marker({
                    position: { lat: coordinates[0], lng: coordinates[1] },
                    map,
                    title: name,
                    draggable:true,
                })
                draggableMarker.addListener("dragend", (event) => {
                    const position = draggableMarker.position;
                    setCoordinates([parseFloat(position.lat().toFixed(5)), parseFloat(position.lng().toFixed(5))])
                    });
            }           
          }, [center, zoom]);
        
          return <div ref={ref} id="map" 
            style={{
            width:350,
            height:350,
            marginLeft: 30,
            marginBottom: 12,
            borderRadius: 5,
          }}/>;
      }


    const onFinish = async (values) => {
        if(coordinates.length == 0){
            alert('Choose boulder position.')
            return;
        }
        values.boulder['geolocation'] = {
            "type": "Point",
            "coordinates": [
                coordinates[0], 
                coordinates[1]
            ]
        }
        
        console.log(values.boulder);
        try {
            var result = await axios.post("http://localhost:8000/api/boulders/create", values.boulder);
            if(result.status == 200){
                // console.log(result);
                navigate("/boulders");
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
    }, [])
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
                name={['boulder', 'boulderName']}
                label="Boulder Name"
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
                    name={['boulder', 'grade']}
                    label="Grade"
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
                    name={['boulder', 'meanRating']}
                    label="Calification"
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
                    name={['boulder', 'description']} 
                    label="Description"
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
                    onClick={() => navigate("/boulders")}
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
            <MyMapComponent center={center} zoom={zoom} name={'New Boulder'}/>
        </Wrapper>

        </Flex>
    );
};
export default CreateBoulderPage;