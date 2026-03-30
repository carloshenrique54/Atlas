import { Link } from 'react-router-dom'

function Cadastro(){
    return(
        <main>
            <img src="/imagens/forms.png" alt="imagem do atlas"/>
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
                            <input required type="text" placeholder="99 9999-9999"></input>
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
                    <button>Fazer Login</button>
                    <div className="links">
                        <p>Ja tem uma conta? <Link to="/login">Faça login</Link></p>
                        <Link to="/cadastrofuncionario">Cadastrar como funcionario</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Cadastro;