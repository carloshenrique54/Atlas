import { Link } from "react-router-dom";

function CadastroFuncionario(){
    return(
        <main>
            <img className="imagemCadastro" src="/imagens/forms.png" alt="Imagem de cadastro" />
            <div id="cadastroFuncForms">
                <form>
                    <label>Código da empresa:</label>
                    <input required type="password" placeholder="Ex: QEC25"></input>
                    <label>Nome Completo:</label>
                    <input required type="text"></input>
                    <label>E-mail:</label>
                    <input required type="email" placeholder="exemplo@gmail.com"></input>
                    <label>Senha:</label>
                    <input required type="password" placeholder="Mínimo de 8 digitos"></input>
                    <label>Confirmar Senha:</label>
                    <input required type="password" placeholder=""></input>
                    <div id="numbersCadastro">
                        <div className="inputNumber">
                            <label>Telefone:</label>
                            <input required type="text" placeholder="(11) 1234-5678"></input>
                        </div>
                        <div className="inputNumber">
                            <label>CPF:</label>
                            <input required type="text" placeholder="Apenas números"></input>
                        </div>
                    </div>
                    <button className="Cadastrar">Fazer cadastro</button>
                    <div className="links">
                        <Link to={"/Cadastrostartup"}>Cadastrar Empresa</Link>
                        <p>Ja tem uma conta? <Link to={"/login"}>Faça Login</Link></p>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CadastroFuncionario;