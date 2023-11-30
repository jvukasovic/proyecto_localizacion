import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/registerPage/register.page';
import LoginPage from './pages/loginPage/login.page';
import MainPage from './pages/mainPage/main.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
          <Route path='/boulders' element={<MainPage></MainPage>}></Route>
          
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
