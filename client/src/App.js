import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import { Layout, Menu, theme } from 'antd';
import { UserOutlined } from '@ant-design/icons';

import RegisterPage from './pages/registerPage/register.page';
import LoginPage from './pages/loginPage/login.page';
import MainPage from './pages/mainPage/main.page';
import DetailBoulderPage from './pages/detailBoulder.page/detailBoulder.page';
import CreateBoulderPage from './pages/createBoulder.page/createBoulder.page';


const { Header, Content, Footer } = Layout;

function App() {
  
  const pathname = window.location.pathname;

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const items = [
    {
      label: 'Profile',
      key: 'profile',
      icon: <UserOutlined />,
    }]

  return (

    <Layout style={{justifyContent: 'center', alignItems: 'center'}}>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          textAlign: 'left',
          justifyContent: 'center'
        }}
      >
        <div className="demo-logo" style={{width:850}} > <h1 style={{color:'#FFFFFFD9'}}>La Silla del Diablo</h1> </div>
        
        {
          pathname == '/login' || pathname == '/'
          ? <></>
          : <Menu theme='dark' mode="vertical" items={items}/>
        }
        
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          width:1000,
          overflow: 'auto'
        }}
      >

        <div
          style={{
            padding: 24,
            minHeight: 380,
            background: colorBgContainer,
          }}
        >
          <BrowserRouter>
            <Routes>
              <Route path='/' element={<RegisterPage></RegisterPage>}></Route>
              <Route path='/login' element={<LoginPage></LoginPage>}></Route>
              <Route path='/boulders' element={<MainPage></MainPage>}></Route>
              <Route path='/boulders/:idBoulder' element={<DetailBoulderPage></DetailBoulderPage>}></Route>
              <Route path='/boulders/new' element={<CreateBoulderPage></CreateBoulderPage>}></Route>
              
              
              
            </Routes>
          </BrowserRouter>

        </div>

      </Content>
      <Footer
        style={{
          textAlign: 'center',
        }}
      >
        Made with ❤ ©2023 
      </Footer>
    </Layout>


  );
}

export default App;




