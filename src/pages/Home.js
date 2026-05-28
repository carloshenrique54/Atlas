import { Link } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faDesktop, faCircleCheck, faBuilding, faUser,
  faUserGroup, faDollarSign, faCheckSquare, faChartLine,
  faLayerGroup, faBolt, faShieldHalved, faCheck,
  faChevronDown, faRocket, faArrowRight, faStar
} from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router-dom';

function Home() {
  const location = useLocation();
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const el = document.querySelector(location.hash);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, {
      threshold: 0.2
    });

    reveals.forEach((el) => observer.observe(el));
  }, []);

  const features = [
    { icon: faUserGroup, title: 'Gestão de Clientes', desc: 'Organize e acompanhe todos os seus clientes em um só lugar com visibilidade total.' },
    { icon: faDollarSign, title: 'Controle Financeiro', desc: 'Monitore receitas, despesas e fluxo de caixa com dashboards intuitivos.' },
    { icon: faCheckSquare, title: 'Organização de Tarefas', desc: 'Crie, atribua e acompanhe tarefas com prazos, prioridades e status.' },
    { icon: faChartLine, title: 'Relatórios e Métricas', desc: 'Gere relatórios detalhados para decisões baseadas em dados reais.' },
  ];

  const benefits = [
    { icon: faLayerGroup, title: 'Centralize tudo em um só lugar', desc: 'Elimine planilhas e ferramentas dispersas. Tudo que sua empresa precisa, integrado.' },
    { icon: faBolt, title: 'Aumente sua produtividade', desc: 'Automatize processos repetitivos e foque no que realmente importa para crescer.' },
    { icon: faShieldHalved, title: 'Tenha controle total', desc: 'Visibilidade completa sobre operações, finanças e desempenho da equipe.' },
  ];

  const faqs = [
    { q: 'O Atlas é gratuito?', a: 'Oferecemos planos gratuitos e pagos, dependendo das necessidades da sua empresa.' },
    { q: 'Posso cancelar a qualquer momento?', a: 'Sim, você pode cancelar ou alterar seu plano quando quiser, sem multas.' },
    { q: 'Preciso instalar algo?', a: 'Não, o Atlas funciona totalmente online. Acesse de qualquer dispositivo.' },
    { q: 'Meus dados estão seguros?', a: 'Sim, utilizamos criptografia e boas práticas de segurança para proteger suas informações.' },
    { q: 'Posso adicionar mais usuários depois?', a: 'Claro, você pode aumentar ou reduzir a quantidade de usuários conforme necessário.' },
    { q: 'O Atlas integra com outras ferramentas?', a: 'Sim, estamos trabalhando em integrações com ferramentas populares do mercado.' },
    { q: 'Tem suporte ao cliente?', a: 'Sim, oferecemos suporte para todos os planos, com prioridade nos planos pagos.' },
  ];

  return (
    <div className="home">

      {/* ── Hero ── */}
      <section id="inicio" className="hero-section">
        <div className="hero-bg">
          <div className="hero-orb hero-orb-1" />
          <div className="hero-orb hero-orb-2" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div className="hero-text">
            <span className="hero-badge">
              <FontAwesomeIcon icon={faRocket} />
              Plataforma de Gestão Empresarial
            </span>
            <h1 className="hero-title">
              Atlas — Onde sua empresa
              <span className="gradient-text"> ganha controle.</span>
            </h1>
            <p className="hero-desc">
              Gerencie clientes, finanças, tarefas e equipes em uma plataforma única, simples e eficiente. Tudo que sua empresa precisa para crescer.
            </p>
            <div className="hero-actions">
              <Link id="cadastroStartup" to="/cadastrostartup" className="hero-btn-primary">
                <FontAwesomeIcon icon={faBuilding} />
                Cadastre sua empresa
                <FontAwesomeIcon icon={faArrowRight} className="btn-arrow" />
              </Link>
              <Link id="cadastroFuncionario" to="/cadastrofuncionario" className="hero-btn-outline">
                <FontAwesomeIcon icon={faUser} />
                Entrar como funcionário
              </Link>
            </div>
            <div className="hero-stats">
              <div className="hero-stat">
                <span className="stat-number">+500</span>
                <span className="stat-label">Empresas</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="stat-number">+12k</span>
                <span className="stat-label">Usuários</span>
              </div>
              <div className="hero-stat-divider" />
              <div className="hero-stat">
                <span className="stat-number">99.9%</span>
                <span className="stat-label">Uptime</span>
              </div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image-wrapper">
              <img src="/imagens/home1.png" alt="Dashboard do Atlas" />
              <div className="hero-image-glow" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Funcionalidades ── */}
      <section id="funcionalidades" className="features-section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-label reveal">Funcionalidades</span>
            <h2 className="section-title light reveal">Tudo o que você precisa para gerenciar</h2>
            <p className="section-subtitle light reveal">Uma plataforma completa que centraliza toda a operação da sua empresa</p>
          </div>
          <div className="features-grid reveal">
            {features.map((f, i) => (
              <div className="feature-card" key={i}>
                <div className="feature-icon-wrap">
                  <FontAwesomeIcon icon={f.icon} className="feature-icon" />
                </div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Benefícios ── */}
      <section id="beneficios" className="benefits-section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-label reveal">Benefícios</span>
            <h2 className="section-title reveal">Por que escolher o Atlas?</h2>
            <p className="section-subtitle reveal">Transforme a forma como sua empresa opera, do primeiro dia</p>
          </div>
          <div className="benefits-grid reveal">
            {benefits.map((b, i) => (
              <div className="benefit-card" key={i}>
                <div className="benefit-icon-wrap">
                  <FontAwesomeIcon icon={b.icon} className="benefit-icon" />
                </div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Planos ── */}
      <section id="planos" className="plans-section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-label reveal">Planos</span>
            <h2 className="section-title light reveal">Planos que crescem com sua empresa</h2>
            <p className="section-subtitle light reveal">Comece gratuitamente e escale conforme suas necessidades</p>
          </div>
          <div className="plans-grid reveal">

            <div className="plan-card">
              <div className="plan-icon-wrap">
                <FontAwesomeIcon icon={faUser} />
              </div>
              <h3 className="plan-name">Starter</h3>
              <p className="plan-desc">Para pequenas startups que estão começando.</p>
              <div className="plan-price">
                <span className="price-value">Grátis</span>
              </div>
              <ul className="plan-features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Até 12 usuários</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Gestão de tarefas</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Dashboard completo</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Suporte 24 horas</li>
              </ul>
              <Link to="/cadastrostartup" className="plan-btn plan-btn-outline">Começar Grátis</Link>
            </div>

            <div className="plan-card plan-popular">
              <div className="plan-badge"><FontAwesomeIcon icon={faStar} /> Mais Popular</div>
              <div className="plan-icon-wrap">
                <FontAwesomeIcon icon={faChartLine} />
              </div>
              <h3 className="plan-name">Growth</h3>
              <p className="plan-desc">Para empresas em crescimento acelerado</p>
              <div className="plan-price">
                <span className="price-currency">R$</span>
                <span className="price-value">39</span>
                <span className="price-cents">,99</span>
                <span className="price-period">/mês</span>
              </div>
              <ul className="plan-features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Até 35 usuários</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Relatórios avançados</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Suporte prioritário</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Integrações premium</li>
              </ul>
              <Link to="/pagamento" className="plan-btn plan-btn-primary">Assinar Agora</Link>
            </div>

            <div className="plan-card">
              <div className="plan-icon-wrap">
                <FontAwesomeIcon icon={faBuilding} />
              </div>
              <h3 className="plan-name">Enterprise</h3>
              <p className="plan-desc">Para grandes empresas com necessidades robustas.</p>
              <div className="plan-price">
                <span className="price-value">Sob consulta</span>
              </div>
              <ul className="plan-features">
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Usuários ilimitados</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Onboarding personalizado</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />APIs dedicadas</li>
                <li><FontAwesomeIcon icon={faCheck} className="check-icon" />Servidor dedicado</li>
              </ul>
              <a href="#contato" className="plan-btn plan-btn-outline">Nos Contate</a>
            </div>

          </div>
        </div>
      </section>

      {/* ── Sobre ── */}
      <section id="sobre" className="about-section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-label reveal">Sobre</span>
            <h2 className="section-title reveal">Saiba mais sobre nossa aplicação</h2>
            <p className="section-subtitle about-desc reveal">
              O Atlas é uma plataforma que centraliza a gestão de empresas, equipes e projetos em um só lugar,
              trazendo mais organização e controle para o dia a dia.
            </p>
          </div>
          <div className="about-grid reveal">
            <div className="about-card">
              <div className="about-icon-wrap">
                <FontAwesomeIcon icon={faDesktop} />
              </div>
              <h3>Simples</h3>
              <p>Fácil de usar, com interface intuitiva e curva de aprendizado pequena.</p>
            </div>
            <div className="about-card">
              <div className="about-icon-wrap">
                <FontAwesomeIcon icon={faCircleCheck} />
              </div>
              <h3>Completo</h3>
              <p>Projetos, equipes e tarefas em um mesmo sistema integrado.</p>
            </div>
            <div className="about-card">
              <div className="about-icon-wrap">
                <FontAwesomeIcon icon={faBolt} />
              </div>
              <h3>Eficiente</h3>
              <p>Aumente sua produtividade com o máximo de organização e automação.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contato ── */}
      <section id="contato" className="contact-section">
        <div className="section-inner">
          <div className="section-header reveal">
            <span className="section-label reveal">Contato</span>
            <h2 className="section-title light reveal">Tem alguma dúvida? Nos conte!</h2>
          </div>

          <div className="contact-layout">
            <div className="faq-col">
              <h3 className="faq-heading reveal">Perguntas Frequentes</h3>
              <div className="faq-list reveal">
                {faqs.map((faq, i) => (
                  <div
                    key={i}
                    className={`faq-item ${openIndex === i ? 'active' : ''}`}
                    onClick={() => toggle(i)}
                  >
                    <div className="faq-question">
                      <span>{faq.q}</span>
                      <FontAwesomeIcon icon={faChevronDown} className="faq-chevron" />
                    </div>
                    <div className="faq-answer">
                      <p>{faq.a}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-form-col">
              <div className="contact-form-card reveal">
                <h3>Entre em contato</h3>
                <p className="form-subtitle">Preencha os campos abaixo para que possamos ajudá-lo.</p>
                <form>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Nome</label>
                      <input type="text" placeholder="Seu nome" required />
                    </div>
                    <div className="form-group">
                      <label>Sobrenome</label>
                      <input type="text" placeholder="Sobrenome" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="exemplo@email.com" required />
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Categoria</label>
                      <select required>
                        <option value="">Selecione</option>
                        <option value="">Cadastrar Empresa</option>
                        <option value="suporte">Suporte Técnico</option>
                        <option value="financeiro">Financeiro</option>
                        <option value="sugestao">Sugestão</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Assunto</label>
                      <input type="text" placeholder="Resumo do assunto" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Descrição</label>
                    <textarea
                      rows={4}
                      placeholder="Descreva com mais detalhes sua dúvida ou sugestão..."
                      required
                    />
                  </div>
                  <button type="submit" className="form-submit-btn">
                    <span>Enviar Mensagem</span>
                    <FontAwesomeIcon icon={faArrowRight} />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;