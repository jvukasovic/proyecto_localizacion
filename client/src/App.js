import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RegisterPage from './pages/register.page';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RegisterPage></RegisterPage>}></Route>
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
