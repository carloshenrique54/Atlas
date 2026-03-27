import { Link } from 'react-router-dom'

function Header(){
    return(
      <header>
        <h1>Atlas</h1>
        <nav>
          <a href='/#inicio'>Início</a>
          <a href='/#funcionalidades'>Funcionalidades</a>
          <a href='/#beneficios'>Benefícios</a>
          <a href='/#planos'>Planos</a>
          <a href='/#sobre'>Sobre</a>
          <a href='/#contato'>Contato</a>
        </nav>
        <nav>
          <Link className='login' to='/login'>Entrar</Link>
          <a className='cadastro' href='/#planos'>Começar Agora</a>
        </nav>
      </header>
    )
}

export default Header;