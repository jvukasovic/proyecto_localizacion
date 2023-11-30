import React from 'react';
import { Divider, List, Typography } from 'antd';
import { Link } from 'react-router-dom';


const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

const MainPage = () => (
  <>
    <Divider orientation="left">Boulders</Divider>
    <List
      bordered
      style={{
        maxWidth: 300,
        marginTop: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
        actions={[ <Link to={'/idBoulder'}>more</Link>, <Link to={'update/idBoulder'}>edit</Link>]}
        >
          {item}
        </List.Item>
      )}
    />
  </>
);
export default MainPage;