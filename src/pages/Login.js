function Login(){
    return(
        <main>
            <img src="/imagens/forms.png" alt="imagem do atlas"/>
            <div className="loginForms">
                <form>
                    <label>E-mail:</label>
                    <input required type="email" placeholder="exemplo@gmail.com"></input>
                    <label>Senha:</label>
                    <input required type="password" placeholder="Insira sua senha"></input>
                    <button>Fazer Login</button>
                    <div className="links">
                        <a href="#">Esqueceu sua senha?</a>
                        <a href="/#planos">Conheça nossos planos!</a>
                    </div>
                </form> 
            </div>
        </main>
    )
}

export default Login;