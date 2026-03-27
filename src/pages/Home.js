import { Link } from 'react-router-dom'
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding, faUser, faUserGroup, faDollarSign, faCheckSquare, faChartLine, faLayerGroup, faBolt, faShieldHalved, faCheck } from '@fortawesome/free-solid-svg-icons'
import { useLocation } from "react-router-dom";

function Home(){
    const location = useLocation();

    useEffect(() => {
    if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) {
            el.scrollIntoView({ behavior: "smooth" });
        }
    }
    }, [location]);
    return(
        <div className="home">
            <section id="inicio">
                <div id='inicio-texto'>
                    <h2>Atlas — Onde sua empresa <strong> ganha controle.</strong></h2>
                    <p>Gerencie clientes, finanças, tarefas e equipes em uma plataforma única, simples e eficiente. Tudo que sua empresa precisa para crescer.</p>
                    <div className='botoes'>
                        <Link id='cadastroEmpresa' to='/Cadastro'><FontAwesomeIcon icon={faBuilding} />  Cadastre sua empresa</Link>
                        <Link id='cadastroFuncionario' to ='/Cadastro-funcionario'><FontAwesomeIcon icon={faUser} />  Cadastre como funcionário</Link>
                    </div>
                </div>
                <img src='/imagens/home1.png' alt='Imagem do Altas'/>
            </section>
            <section id='funcionalidades'>
                <h4>FUNCIONALIDADES</h4>
                <h3>Tudo o que você precisa para gerenciar</h3>
                <div className='func-container'>
                    <div className='cardF'>
                        <FontAwesomeIcon className='funcIcon' icon={faUserGroup} />
                        <h2>Gestão de Clientes</h2>
                        <p>Organize e acompanhe todos os seus clientes em um só lugar, com histórico completo.</p>
                    </div>
                    <div className='cardF'>
                        <FontAwesomeIcon className='funcIcon' icon={faDollarSign} />
                        <h2>Controle Financeiro</h2>
                        <p>Monitore receitas, despesas e fluxo de caixa com dashboards intuitivos.</p>
                    </div>
                    <div className='cardF'>
                        <FontAwesomeIcon className='funcIcon' icon={faCheckSquare} />
                        <h2>Organização de Tarefas</h2>
                        <p>Crie, atribua e acompanhe tarefas com prazos, prioridades e status.</p>
                    </div>
                    <div className='cardF'>
                        <FontAwesomeIcon className='funcIcon' icon={faChartLine} />
                        <h2>Relatórios e Métricas</h2>
                        <p>Gere relatórios detalhados para tomar decisões baseadas em dados reais.</p>
                    </div>
                </div>
            </section>
            <section id="beneficios">
                <h4>BENEFICIOS</h4>
                <h3>Por que escolher o Atlas?</h3>
                <div className='bene-container'>
                    <div className='cardB'>
                        <FontAwesomeIcon className='beneIcon' icon={faLayerGroup} />
                        <h2>Centralize tudo em um só lugar</h2>
                        <p>Elimine planilhas e ferramentas dispersas. Tudo o que sua empresa precisa, integrado.</p>
                    </div>
                    <div className='cardB'>
                        <FontAwesomeIcon className='beneIcon' icon={faBolt} />
                        <h2>Aumente sua produtividade</h2>
                        <p>Automatize processos repetitivos e foque no que realmente importa para crescer.</p>
                    </div>
                    <div className='cardB'>
                        <FontAwesomeIcon className='beneIcon' icon={faShieldHalved} />
                        <h2>Tenha controle total da sua empresa</h2>
                        <p>Visibilidade completa sobre operações, finanças e desempenho da equipe.</p>
                    </div>
                </div>
            </section>
            <section id="planos">
                <h4>PLANOS</h4>
                <h3 className='planoT'>Planos que crescem com sua empresa</h3>
                <div className='planos-container'>
                    <div className='cardP'>
                        <FontAwesomeIcon className='planosIcon' icon={faUser}/>
                        <h2>Starter</h2>
                        <p>Para pequenas startups que estão começando.</p>
                        <h3>Grátis</h3>
                        <ul>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Até 12 usuários</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Gestão de tarefas</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Dashboard completo</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Suporte 24 horas</li>
                        </ul>
                        <Link to='/cadastro' className='botaoPlanos'>Comece Agora</Link>
                    </div>
                    <div className='cardP' id='popular'>
                        <span className='maisPopular'>Mais Popular</span>
                        <FontAwesomeIcon className='planosIcon' icon={faChartLine}/>
                        <h2>Growth</h2>
                        <p>Para empresas em crescimento acelerado</p>
                        <h3>R$ 39,99 <strong> /mês</strong></h3>
                        <ul>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Até 35 usuários</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Relatórios gerados mais rápido</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Suporte prioritário</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Suporte prioritário</li>
                        </ul>
                        <Link to='/pagamento' className='botaoPlanos'>Comece Agora</Link>
                    </div>
                    <div className='cardP'>
                        <FontAwesomeIcon className='planosIcon' icon={faBuilding}/>
                        <h2>Enterprise</h2>
                        <p>Para grandes empresas com necessidades robustas.</p>
                        <h3>Sob consulta</h3>
                        <ul>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Sob consulta</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Onboarding personalizado</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>APIs dedicadas</li>
                            <li> <FontAwesomeIcon className='checkIcon' icon={faCheck}/>Servidor dedicado</li>
                        </ul>
                        <a href='#contato' className='botaoPlanos'>Nos Contate</a>
                    </div>
                </div>  
            </section>
            <section id="sobre">
                <h4>SOBRE</h4>
                <h3>Saiba mais sobre nossa aplicação</h3>
                <p>O Atlas é uma plataforma que centraliza a gestão de empresas, equipes e projetos em um só lugar, trazendo mais organização e controle para o dia a dia.</p>

                <div className="sobre-container">
                    <div className="cardS">
                        <h3>Simples</h3>
                        <p>Fácil de usar, sem complicação.</p>
                    </div>

                    <div className="cardS">
                        <h3>Completo</h3>
                        <p>Projetos, equipes e tarefas no mesmo sistema.</p>
                    </div>

                    <div className="cardS">
                        <h3>Eficiente</h3>
                        <p>Mais produtividade e organização.</p>
                    </div>
                </div>
            </section>
            <section id="contato">
                <h4>CONTATO</h4>
                <h3>Tem alguma dúvida? Nos conte!</h3>
                <h2>Contato</h2>

                <div className="faq">
                    <h3>Perguntas Frequentes</h3>

                    <div className="faq-item">
                    <h4>O Atlas é gratuito?</h4>
                    <p>Oferecemos planos gratuitos e pagos, dependendo das necessidades da sua empresa.</p>
                    </div>

                    <div className="faq-item">
                    <h4>Posso cancelar a qualquer momento?</h4>
                    <p>Sim, você pode cancelar ou alterar seu plano quando quiser.</p>
                    </div>

                    <div className="faq-item">
                    <h4>Preciso instalar algo?</h4>
                    <p>Não, o Atlas funciona totalmente online.</p>
                    </div>
                </div>

<div className="formulario">
    <h3>Reportar Problema</h3>
    <p className="subtitulo">Detalhes do problema</p>
    <p className="instrucao">Preencha os campos abaixo para que possamos ajudá-lo.</p>

    <form>
        
        <div className="row">
            <input type="text" placeholder="Seu nome" required />
            <input type="text" placeholder="Sobrenome" required />
        </div>

        <input type="email" placeholder="Email" required />

        <div className="row">
            <div className="field-group">
                <label>Categoria</label>
                <select required>
                    <option value="">Selecione</option>
                    <option value="suporte">Suporte Técnico</option>
                    <option value="financeiro">Financeiro</option>
                    <option value="sugestao">Sugestão</option>
                </select>
            </div>
            <div className="field-group">
                <label>Assunto</label>
                <input type="text" placeholder="Seu problema resumido" required />
            </div>
        </div>

        <div className="field-group">
            <label>Descrição</label>
            <textarea 
                placeholder="Descreva o erro com o máximo de detalhes possível: o que estava fazendo, o que esperava acontecer e o que aconteceu..." 
                required
            ></textarea>
        </div>

        <button type="submit">
            <span className="icon-send">➤</span> Enviar
        </button>
    </form>
</div>
            </section>
        </div>
    )
}

export default Home;