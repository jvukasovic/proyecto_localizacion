
import {List, Flex, Rate, Button} from 'antd';
import { Wrapper} from "@googlemaps/react-wrapper";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const apikey = process.env.REACT_APP_MAPS_API_KEY

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
    marginBottom: 12,
    borderRadius: 5,
  }}/>;
}

const DetailBoulderPage = () => {
    const [boulderName, setBoulderName] = useState('');
    const [grade, setGrade] = useState('');
    const [meanRating, setMeanRating] = useState();
    const [description, setDescription] = useState('');
    const [reviews, setReviews] = useState([]);
    const [type, setType] = useState('');

    const render = (status) => {
        return <h1>{status}</h1>;
    };
    const center = { lat: -34.397, lng: 150.644 };
    const zoom = 4;

    const params = useParams();
    const navigate = useNavigate();

    const idBoulder = params.idBoulder

    const getBoulderData = async () => {
        try {
            const getOneResult = await axios.get("http://localhost:8000/api/boulders/getOne/" + idBoulder);
            setBoulderName(getOneResult.data.boulderName);
            setGrade(getOneResult.data.grade);
            setMeanRating(getOneResult.data.meanRating);
            setDescription(getOneResult.data.description);
            setReviews(getOneResult.data.calification);
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    const handleDelete = async (idBoulder) => {
        try {
            const deleteResult = await axios.delete("http://localhost:8000/api/boulders/delete/" + idBoulder);
            if(deleteResult.status == 200){
                alert("Deleted correctly");
                navigate('/boulders');
            } else {
                alert("Error");
            }
        } catch (e) {
            
        }
    }

    useEffect(() => {
        getBoulderData();
        const isLogged = localStorage.getItem('type');
        setType(isLogged)
        if (isLogged == null){
            navigate('/login')
        }
    }, []);  

    return (
        <Flex justify={'space-between'} align={'flex-start'} wrap='wrap'>
            <div>
                <div style={{marginBottom:8}}> 
                    <h1 style={{display:'inline', marginRight:16}} >
                        {boulderName} 
                    </h1> 

                    <h2 style={{ display:'inline', color:'#000000A6'}}>
                        {grade}
                    </h2>
                </div>

                <Rate 
                    disabled 
                    value={meanRating}
                    style={{
                        marginTop:8
                    }}
                />
                <p>{description}</p>

                <h2 style={{
                marginTop:30
                }}>
                    Reviews
                </h2>
                <List
                    style={{
                        maxWidth: 450,
                        width:450,
                    }}
                    itemLayout="vertical"
                    size="small"
                    dataSource={reviews}
                    renderItem={(item) => (
                        <List.Item
                            extra={
                                <Rate disabled defaultValue={item.rating} />
                            }
                        >
                        <List.Item.Meta
                            title={item.userName}
                            description={item.comment}
                        />
                        
                      
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
                    onClick={()=>navigate(`/boulders/${idBoulder}/newReview`)}
                >
                    Add review
                </Button>
                <Button
                    type="primary"
                    onClick={()=>navigate('/boulders')}
                    style={{
                        margin:8
                    }}
                >
                    Back
                </Button>
                {
                    type == 'admin' 
                    ? <div >
                            <Button
                                type="primary"
                                onClick={()=>navigate(`/boulders/${idBoulder}/update`)}
                                style={{
                                    margin:8
                                }}
                            >
                                Edit Boulder
                            </Button>
                            <Button
                                type="primary"
                                onClick={()=>handleDelete(idBoulder)}
                                style={{
                                    margin:8
                                }}
                            >
                                Delete
                            </Button>
                        </div>
                    : <></>
                }
                
            </div>
        </Flex>
  )
};
export default DetailBoulderPage;


