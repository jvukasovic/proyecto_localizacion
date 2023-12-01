import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Breadcrumb, Layout, Menu, theme } from 'antd';

import RegisterPage from './pages/registerPage/register.page';
import LoginPage from './pages/loginPage/login.page';
import MainPage from './pages/mainPage/main.page';


const { Header, Content, Footer } = Layout;

function App() {

  const {
    token: { colorBgContainer },
  } = theme.useToken();

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
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: '0 50px',
          width:1000,
          // height: 700,
          overflow: 'auto'
        }}
      >
        {/* <Breadcrumb
          style={{
            margin: '16px 0',
          }}
        >
        </Breadcrumb> */}

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




