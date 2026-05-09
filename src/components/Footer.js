import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faInstagram, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-brand">
          <h2 className="footer-logo">Atlas</h2>
          <p>Plataforma de gestão de empresas e equipes. Organize tarefas, acompanhe o progresso e colabore com eficiência.</p>
          <div className="footer-socials">
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FontAwesomeIcon icon={faLinkedin} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><FontAwesomeIcon icon={faInstagram} /></a>
            <a href="https://github.com" target="_blank" rel="noreferrer" aria-label="GitHub"><FontAwesomeIcon icon={faGithub} /></a>
          </div>
        </div>

        <div className="footer-links">
          <h4>Navegação</h4>
          <ul>
            <li><a href="/#inicio">Início</a></li>
            <li><a href="/#funcionalidades">Funcionalidades</a></li>
            <li><a href="/#beneficios">Benefícios</a></li>
            <li><a href="/#planos">Planos</a></li>
            <li><a href="/#sobre">Sobre</a></li>
            <li><a href="/#contato">Contato</a></li>
          </ul>
        </div>

        <div className="footer-links">
          <h4>Planos</h4>
          <ul>
            <li><a href="/#planos">Starter — Grátis</a></li>
            <li><a href="/#planos">Growth — R$39,99/mês</a></li>
            <li><a href="/#planos">Enterprise — Sob consulta</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h4>Contato</h4>
          <p><FontAwesomeIcon icon={faEnvelope} /> contatoAtlas@gmail.com</p>
          <p><FontAwesomeIcon icon={faPhone} /> (12) 99646-7015</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Atlas. Todos os direitos reservados.</p>
        <p className="footer-tagline">Feito com ♥ para empresas que querem crescer.</p>
      </div>
    </footer>
  );
}

export default Footer;