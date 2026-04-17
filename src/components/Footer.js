function Footer(){
    return(
        <footer>
            <div className="footer-container">
            
            <div className="footer-section">
                <h2>Atlas</h2>
                <p>Plataforma de gestão de equipes e projetos. Organize tarefas, acompanhe o progresso e colabore com eficiência</p>
            </div>

            <div className="footer-section">
                <h3>Links</h3>
                <ul>
                    <li><a href="/#inicio">Início</a></li>
                    <li><a href="/#sobre">Sobre</a></li>
                    <li><a href="/#contato">Contato</a></li>
                    <li><a href="/#planos">Planos</a></li>
                </ul>
            </div>

                <div className="footer-section">
                    <h3>Contato</h3>
                    <p>Email: contatoAtlas@gmail.com</p>
                    <p>Telefone: (12) 99646-7015</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© 2026 Atlas. Todos os direitos reservados.</p>
            </div>
        </footer>
    )
}

export default Footer;