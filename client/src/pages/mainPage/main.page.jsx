
import {List, Flex, Rate, Button} from 'antd';
import { Wrapper} from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const apikey = process.env.REACT_APP_MAPS_API_KEY

function MyMapComponent({
  center,
  zoom,
  boulderList
}) {
  const ref = useRef();

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom,
      mapTypeId: 'satellite'
    });
   
    boulderList.map((boulder, idx) => {
      const coord = boulder.geolocation.coordinates
      new window.google.maps.Marker({
        position: { lat: coord[0], lng: coord[1]},
        map,
        title: boulder.boulderName,
        animation: window.google.maps.Animation.DROP
      })
    })
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
  const [boulderList, setBoulderList] = useState([]);
  const navigate = useNavigate();
  const render = (status) => {
    return <h1>{status}</h1>;
  };

  const center = { lat: -33.817054, lng: -70.018062 };
  const zoom = 15;

  const callBoulderList = async () => {
    try {
      const result = await axios.get("http://localhost:8000/api/boulders/get");
      const sortedList = result.data.sort((a,b) => b.meanRating - a.meanRating);
      setBoulderList(sortedList);
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  useEffect(() =>{
    const isLogged = localStorage.getItem('type');
    if (isLogged == null){
        navigate('/login')
    }
    callBoulderList();
  }, []);

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
        dataSource={boulderList}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              title={<a href={"http://localhost:3000/boulders/"+item._id}>{item.boulderName}</a>}
              description={item.grade}
            />
            <div><Rate disabled defaultValue={item.meanRating} /></div>
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
          <MyMapComponent center={center} zoom={zoom} boulderList={boulderList} />
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


