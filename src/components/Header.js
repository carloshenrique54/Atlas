import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom'
import { useState } from "react";

function Header(){
  const [abrirModal, setAbrirModal] = useState(false)

    return(
      <>
      <header>
        <div className="headerTitulo">
          <img className="logoHeader" src="/imagens/Logo Header.png" alt="Logo do Atlas"/>
          <h1>Atlas</h1>
        </div>
        <nav>
          <a href='/#inicio'>Início</a>
          <a href='/#funcionalidades'>Funcionalidades</a>
          <a href='/#beneficios'>Benefícios</a>
          <a href='/#planos'>Planos</a>
          <a href='/#sobre'>Sobre</a>
          <a href='/#contato'>Contato</a>
        </nav>
        <nav>
          <button className='login' onClick={() => setAbrirModal(true)}>Entrar</button>
          <a className='cadastro' href='/#planos'>Começar Agora</a>
        </nav>
      </header>
      <div className={abrirModal ? "loginForms active" : "loginForms"}>
        <form>
            <div className="tituloLogin">
                <h2>Fazer Login</h2>
                <button className='fecharModal' onClick={() => setAbrirModal(false)}><FontAwesomeIcon icon={faCircleXmark} /></button>
            </div>
            <label>E-mail:</label>
            <input required type="email" placeholder="exemplo@gmail.com"></input>
            <label>Senha:</label>
            <input required type="password" placeholder="Insira sua senha"></input>
            <button className='logar'>Fazer Login</button>
            <div className="links">
                <Link onClick={() => setAbrirModal(false)} to="/redefinirsenha">Esqueceu sua senha?</Link>
                <Link onClick={() => setAbrirModal(false)} to="/cadastrostartup">Crie uma conta gratuita!</Link>
            </div>
        </form> 
    </div>
        </>
    )
}

export default Header;