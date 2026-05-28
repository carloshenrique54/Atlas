import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0)
  const [posicaoTela, setProsicaoTela] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    };

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll);
  },[])

  useEffect(() => {

    switch (true){
    case scrollY > 3700:
      setProsicaoTela("contato")
      break
    case scrollY > 3000:
      setProsicaoTela("sobre")
      break
    case scrollY > 2100:
      setProsicaoTela("planos")
      break
    case scrollY > 1300:
      setProsicaoTela("beneficios")
      break
    case scrollY > 600:
      setProsicaoTela("funcionalidades")
      break
    default:
      setProsicaoTela("inicio")
      break
    }
  }, [scrollY])

  useEffect(() => {
    if (window.location.pathname === "/pagamento" || window.location.pathname === "/cadastrofuncionario" || window.location.pathname === "/cadastroempresa" || window.location.pathname === "/cadastrostartup"){
    setProsicaoTela(null)
  }
  })

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className={scrolled ? 'scrolled' : ''}>
        <div className="header-inner">
          <a href="/#inicio" className="header-logo" onClick={closeMenu}>
            <img className="logoHeader" src="/imagens/Logo Header.png" alt="Logo do Atlas" />
            <span className="header-logo-name">Atlas</span>
          </a>

          <nav className="header-nav">
            <a href="/#inicio" className={posicaoTela === "inicio" ? "ativo" : null } >Início</a>
            <a href="/#funcionalidades" className={posicaoTela === "funcionalidades" ? "ativo" : null } >Funcionalidades</a>
            <a href="/#beneficios" className={posicaoTela === "beneficios" ? "ativo" : null } >Benefícios</a>
            <a href="/#planos" className={posicaoTela === "planos" ? "ativo" : null } >Planos</a>
            <a href="/#sobre" className={posicaoTela === "sobre" ? "ativo" : null } >Sobre</a>
            <a href="/#contato" className={posicaoTela === "contato" ? "ativo" : null } >Contato</a>
          </nav>

          <nav className="header-actions">
            <a href="localhost:5173/" className="btn-login">Entrar</a>
            <a href="/#planos" className="btn-cta">Começar Agora</a>
          </nav>

          <button
            className="hamburger"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
          >
            <FontAwesomeIcon icon={menuOpen ? faXmark : faBars} />
          </button>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        <nav className="mobile-nav">
          <a href="/#inicio" onClick={closeMenu}>Início</a>
          <a href="/#funcionalidades" onClick={closeMenu}>Funcionalidades</a>
          <a href="/#beneficios" onClick={closeMenu}>Benefícios</a>
          <a href="/#planos" onClick={closeMenu}>Planos</a>
          <a href="/#sobre" onClick={closeMenu}>Sobre</a>
          <a href="/#contato" onClick={closeMenu}>Contato</a>
          <div className="mobile-actions">
            <a href="localhost:5173/" className="btn-login" onClick={closeMenu}>Entrar</a>
            <a href="/#planos" className="btn-cta" onClick={closeMenu}>Começar Agora</a>
          </div>
        </nav>
      </div>
    </>
  );
}

export default Header;
