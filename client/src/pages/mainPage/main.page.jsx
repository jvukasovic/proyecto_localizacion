
import { Divider, List, Flex, Rate} from 'antd';
import { Link } from 'react-router-dom';

import { Wrapper} from "@googlemaps/react-wrapper";

import React, { useEffect, useRef } from "react";




const apikey = process.env.REACT_APP_MAPS_API_KEY

const data = [
  'Boulder 1',
  'Boulder 2',
  'Boulder 3',
  'Boulder 4',
  'Boulder 5',
  'Boulder 1',
  'Boulder 2',
  // 'Boulder 3',
  // 'Boulder 4',
  // 'Boulder 5',
  // 'Boulder 1',
  // 'Boulder 2',
  // 'Boulder 3',
  // 'Boulder 4',
  // 'Boulder 5',
  // 'Boulder 1',
  // 'Boulder 2',
  // 'Boulder 3',
  // 'Boulder 4',
  // 'Boulder 5',
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
    position: 'sticky'
  }}/>;
}

const MainPage = () => {
  const render = (status) => {
    return <h1>{status}</h1>;
  };
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;
   

  return (
    <>
    {/* <Divider 
      orientation="left"
    >
    </Divider> */}
    <Flex justify={'center'} align={'flex-start'} wrap='wrap'>

      <List
        // pagination={{
        //   onChange: (page) => {
        //     console.log(page);
        //   },
        //   pageSize: 6,
        // }}

        style={{
          maxWidth: 450,
          width:300,
          marginRight: 30,
          overflow: 'auto',
        }}

        dataSource={data}
        renderItem={(item) => (
          <List.Item
          // actions={[ <Link to={'/idBoulder'}>more</Link>, <Link to={'update/idBoulder'}>edit</Link> ]}
          >
            
            <List.Item.Meta
              title={<a href="https://ant.design">{item}</a>}
              description="V12"
            />
            <div><Rate /></div>
            
          </List.Item>
        )}
      />

      <Wrapper 
        apiKey={apikey} 
        render={render}
        style={{position: 'sticky'}}
      >
          <MyMapComponent center={center} zoom={zoom} />
      </Wrapper>

    </Flex>
    </> 
  );
};
export default MainPage;


