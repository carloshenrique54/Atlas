import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './styles/App.css';
import './styles/Header.css';
import './styles/Home.css';
import './styles/Footer.css'
import './styles/Login.css'
import './styles/Pagamento.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Pagamento from './pages/Pagamento'
import Cadastro from './pages/Cadastro'

import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  
  return (
    <BrowserRouter>

      <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cadastro' element={<Cadastro />} />
        <Route path='/pagamento' element={<Pagamento />} />
      </Routes>

      <Footer />
    </BrowserRouter>
    
  );
}

export default App;
