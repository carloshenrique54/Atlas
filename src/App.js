import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/Footer.css'

import Home from './pages/Home'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Pagamento from './pages/Pagamento'

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Login' element={<Login />} />
        <Route path='/Pagamento' element={<Pagamento />}></Route>
        <Route path='/Cadastro' element={<Cadastro />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
