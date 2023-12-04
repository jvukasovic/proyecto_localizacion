
import {List, Flex, Rate, Button} from 'antd';

import { Wrapper} from "@googlemaps/react-wrapper";

import React, { useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';




const apikey = process.env.REACT_APP_MAPS_API_KEY

const data = [
  'Boulder 1',
  'Boulder 2',
  'Boulder 3',
  'Boulder 4',
  'Boulder 5',
  'Boulder 1',
  'Boulder 2',
  'Boulder 3',
  'Boulder 4',
  'Boulder 5',
  'Boulder 1',
  'Boulder 2',
  'Boulder 3',
  'Boulder 4',
  'Boulder 5',
  'Boulder 1',
  'Boulder 2',
  'Boulder 3',
  'Boulder 4',
  'Boulder 5',
];

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
    width:450,
    height:450,
    marginLeft: 30,
    borderRadius: 5,
  }}/>;
}

const MainPage = () => {
  const navigate = useNavigate();
  const render = (status) => {
    return <h1>{status}</h1>;
  };
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
   
    <Flex justify={'center'} align={'flex-start'} wrap='wrap'>
      <List
        style={{
          maxWidth: 450,
          width:300,
          marginRight: 30,
          overflow: 'auto',
        }}
        itemLayout="horizontal"
        dataSource={data}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href="https://ant.design">{item}</a>}
              description="V12"
            />
            <div><Rate /></div>
          </List.Item>
        )}
      />
      <div
        style={{
          textAlign:'center'
      }}
      >
      <Wrapper 
        apiKey={apikey} 
        render={render}
      >
          <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>
      <Button
          type="primary"
          onClick={()=>navigate('/boulders/new')}
          style={{
              margin:8
          }}
      >
          New Boulder
      </Button>
      </div>

    </Flex>

  );
};
export default MainPage;


