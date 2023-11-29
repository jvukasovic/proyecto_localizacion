import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/register.page';
import LoginPage from './pages/login.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage></RegisterPage>}></Route>
          <Route path='/login' element={<LoginPage></LoginPage>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
