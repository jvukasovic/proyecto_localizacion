
import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Flex, Rate } from 'antd';
import FormItem from "antd/es/form/FormItem";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

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


const CreateReviewPage = () => {
    const [boulderName, setBoulderName] = useState('');
    const [meanRating, setMeanRating] = useState('');
    const [newMeanRating, setNewMeanRating] = useState('');
    const [numReviews, setNumReviews] = useState('');
    const [calification, setCalification] = useState('');
    const [userName, setUserName] = useState('');

    const params = useParams();
    const navigate = useNavigate();

    const idBoulder = params.idBoulder

    const getBoulderData = async () => {
        try {
            const getOneResult = await axios.get("http://localhost:8000/api/boulders/getOne/" + idBoulder);
            setBoulderName(getOneResult.data.boulderName);
            setMeanRating(getOneResult.data.meanRating);
            setCalification(getOneResult.data.calification);
            setNumReviews(getOneResult.data.calification.length)
        } catch (e) {
            alert(e.response.data.message);
        }
    }

    const getNewMean = (oldMean, oldN, newCalification, califications) => {
        if (oldN == 0){
            setNewMeanRating(newCalification);
            return;
        }
        const sum = calification.reduce((partialSum, a) => partialSum + a.rating, 0) + newCalification
        const newMean = sum/(oldN+1)

        setNewMeanRating(newMean);

    }

    const onFinish = async (values) => {
        const newCalification = {
            'rating':values.boulder.newRating,
            'comment': values.boulder.description,
            'userName': userName
        }
        calification.push(newCalification)

        const editData = {
            'meanRating': newMeanRating,
            'calification': calification
        }
        
        try {
            console.log(editData);
            const result = await axios.put("http://localhost:8000/api/boulders/update/"+idBoulder, editData);
            if(result.status == 200){
                console.log(result);
                navigate(`/boulders/${idBoulder}`);
            }
        } catch(e) {
            alert(e.response.data.message);
        }
      };

    useEffect(() => {
        const isLogged = localStorage.getItem('type')
        setUserName(localStorage.getItem('userName'))
        if (isLogged == null){
            navigate('/login')
        }
        getBoulderData();
    }, []);  
    
    return (
        <>
            <div>
                <h1>New review for {boulderName} </h1>
            </div>
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

                    <FormItem
                        name={['boulder', 'newRating']}
                        label="Calification"
                        rules={[
                            {
                            required: true,
                            },
                        ]}
                    >
                        <Rate onChange={e => getNewMean(meanRating, numReviews, e, calification)}
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
                        onClick={() => navigate(`/boulders/${idBoulder}`)}
                        style={{
                            marginLeft:18
                        }}
                    >
                        Cancel
                    </Button>
                    </Form.Item>
                </Form>
            </Flex>
        </>
    );
};
export default CreateReviewPage;