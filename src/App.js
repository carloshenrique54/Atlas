import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

import './styles/Header.css';
import './styles/Footer.css';
import './styles/Home.css'
import './styles/CadastroStartup.css'
import './styles/CadastroFuncionario.css'
import './styles/Login.css'
import './styles/Pagamento.css'
import './styles/Splash.css'
import './styles/App.css';

import Home from './pages/Home';
import Pagamento from './pages/Pagamento';
import CadastroFuncionario from './pages/Cadastro-funcionario';
import CadastroStartup from './pages/Cadastrostartup';
import CadastroEmpresa from './pages/CadastroEmpresa';
import RedefinirSenha from './pages/RedefinirSenha';

import Header from './components/Header';
import Footer from './components/Footer';
import Splash from './components/Splash';

export function AnimatedRoutes() {
  const routerLocation = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes
        location={routerLocation}
        key={routerLocation.pathname}
      >
        <Route path='/' element={<Home />} />
        <Route path='/cadastrostartup' element={<CadastroStartup />} />
        <Route path='/pagamento' element={<Pagamento />} />
        <Route path='/cadastrofuncionario' element={<CadastroFuncionario />} />
        <Route path='/cadastroempresa' element={<CadastroEmpresa />} />
        <Route path='/redefinirsenha' element={<RedefinirSenha />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [showSplash, setShowSplash] = useState(false);

  const location = useLocation()

  let mostrarFooter = true

  if (location.pathname === "/cadastrofuncionario" || location.pathname === "/cadastrostartup" || location.pathname === "/pagamento" || location.pathname === "/cadastroempresa" || location.pathname === "/redefinirsenha") {
    mostrarFooter = false
  }
  else{
    mostrarFooter = true
  }

  useEffect(() => {
    const seen = localStorage.getItem("seenSplash");

    if (!seen) {
      setShowSplash(true);
      localStorage.setItem("seenSplash", "true");

      setTimeout(() => {
        setShowSplash(false);
      }, 2000); 
    }
  }, []);

  if (showSplash) return <Splash />;


  return (
    <>
      <Header />

      <AnimatedRoutes />

      {mostrarFooter && <Footer />}
    </>
  );
}

export default App;