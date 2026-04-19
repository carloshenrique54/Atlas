import { Link } from 'react-router-dom'
import abrirModal from '../functions/abrirModal';
import fecharModal from '../functions/fecharModal';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

function Cadastro(){
    return(
        <>
        <div className="loginForms">
            <form>
                <div className="tituloLogin">
                    <h2>Fazer Login</h2>
                    <button className='fecharModal' onClick={fecharModal}><FontAwesomeIcon icon={faCircleXmark} /></button>
                </div>
                <label>E-mail:</label>
                <input required type="email" placeholder="exemplo@gmail.com"></input>
                <label>Senha:</label>
                <input required type="password" placeholder="Insira sua senha"></input>
                <button className='logar'>Fazer Login</button>
                <div className="links">
                    <a href="#">Esqueceu sua senha?</a>
                    <a href="/#planos">Conheça nossos planos!</a>
                </div>
            </form> 
        </div>
        <main>
            <img className="imagemCadastro" src="/imagens/forms.png" alt="imagem do atlas"/>
            <div className="cadastroForms">
                <form>
                    <div className='gridBox'>

                        <div className='inputBox'>
                            <label>Nome da StartUp:</label>
                            <input required type="text" placeholder="Coloque o nome de sua Startup"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Nome do responsavel:</label>
                            <input required type="text" placeholder="Insira seu nome completo"></input>
                        </div>

                        <div className='inputBox'>
                            <label>E-mail da empresa:</label>
                            <input required type="email" placeholder="exemplo@gmail.com"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Telefone:</label>
                            <input required type="text" placeholder="(11) 1234-5678"></input>
                        </div>
                        
                        <div className='inputBox'>
                            <label>Senha:</label>
                            <input required type="password" placeholder="Insira sua senha"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Confirmar Senha:</label>
                            <input required type="password" placeholder="Insira sua senha"></input>
                        </div>

                        <div className='inputBox'>
                            <label>CPF:</label>
                            <input required type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Área de Atuação:</label>
                            <input required type="text" placeholder="Ex: Marketing Digital"></input>
                        </div>
                    </div>
                    <button className='Cadastrar'>Fazer cadastro</button>
                    <div className="links">
                        <button className='linkLogin' onClick={abrirModal}>Ja tem uma conta? Faça login</button>
                        <Link to="/cadastrofuncionario">Cadastrar como funcionario</Link>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}

export default Cadastro;