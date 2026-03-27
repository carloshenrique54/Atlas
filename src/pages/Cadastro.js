import { Link } from 'react-router-dom'

function Cadastro(){
    return(
        <main>
            <img src="/imagens/forms.png" alt="imagem do atlas"/>
            <div className="loginForms">
                <form>
                    <label>E-mail:</label>
                    <input required type="email" placeholder="exemplo@gmail.com"></input>
                    <label>Senha:</label>
                    <input required type="password" placeholder="Insira sua senha"></input>
                    <label>Senha:</label>
                    <input required type="password" placeholder="Insira sua senha"></input>
                    <button>Fazer Login</button>
                </form>
                <div className="links">
                    <p>Ja tem uma conta? <Link to="/login"> Faça login </Link></p>
                    <Link to="/cadastrofunc">Quero me cadastrar como funcionario </Link>
                </div>
            </div>
        </main>
    )
}

export default Cadastro;