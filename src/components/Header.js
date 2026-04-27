function Header(){

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
          <a href="localhost:5173/">Entrar</a>
          <a className='cadastro' href='/#planos'>Começar Agora</a>
        </nav>
      </header>
        </>
    )
}

export default Header;
