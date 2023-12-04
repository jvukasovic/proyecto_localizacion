
import {List, Flex, Rate, Button} from 'antd';

import { Wrapper} from "@googlemaps/react-wrapper";

import React, { useEffect, useRef } from "react";




const apikey = process.env.REACT_APP_MAPS_API_KEY

const data = {
        "boulderName": "prueba3",
        "grade": "V32",
        "description": "prueba 1234",
        "geolocation": {
            "type": "Point",
            "coordinates": [
                1,
                2
            ]
        },
        "calification": [
            {
                "rating": 5,
                "comment": "muy bueno",
                "_id": "656dfa01d3e24590e63689eb"
            },
            {
                "rating": 2,
                "comment": "maleno",
                "_id": "656dfa01d3e24590e63689ec"
            }
        ],
        "_id": "656dfa01d3e24590e63689ea",
        "createdAt": "2023-12-04T16:10:41.511Z",
        "updatedAt": "2023-12-04T16:10:41.511Z",
        "__v": 0
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

const DetailBoulderPage = () => {
  const render = (status) => {
    return <h1>{status}</h1>;
  };
  const center = { lat: -34.397, lng: 150.644 };
  const zoom = 4;

  return (
    <>
    <Flex justify={'space-between'} align={'flex-start'} wrap='wrap'>
        <div>
            <div 
                style={{
                        marginBottom:8
                    }}
            >
                
                <h1 
                    style={{
                        display:'inline',
                        marginRight:16
                        }}
                >
                    {data.boulderName} 
                </h1> 

                <h2 
                    style={{
                        display:'inline',
                        color:'#000000A6'
                    }}
                >
                    {data.grade}
                </h2>

            </div>

            <Rate 
                disabled 
                defaultValue={0} 
                style={{
                    margin:8
                }}
            />
            <p>Calcular promedio de ratings</p> 
            <p>{data.description}</p>

            <h2 style={{
            marginTop:30
            }}>
                Comentarios
            </h2>
            <List
                style={{
                    maxWidth: 450,
                    width:450,
                }}
                itemLayout="vertical"
                size="small"
                dataSource={data.calification}
                renderItem={(item) => (
                    <List.Item
                        extra={
                            <Rate disabled defaultValue={item.rating} />
                        }
                    >
                    <List.Item.Meta
                        title={item._id}
                    />
                    
                    <div>
                        {item.comment}
                    </div>
                    </List.Item>
                )}
            />
        </div>
        
        <div
            style={{
                textAlign: 'center'
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
                style={{
                    margin:8
                }}
            >
                Edit Boulder
            </Button>
        </div>


    </Flex>
    
    </> 
  );
};
export default DetailBoulderPage;


