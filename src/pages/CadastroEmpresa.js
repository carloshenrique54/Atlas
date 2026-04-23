import { useNavigate, Link } from "react-router-dom"
import { supabase } from "../services/supabase.js"
import { useState } from "react";

function CadastroEmpresa(){
    const [nomeEmpresa, setNomeEmpresa] = useState("")
    const [emailEmpresa, setEmailEmpresa] = useState("")
    const [cnpjEmpresa, setCpnjEmpresa] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmar, setSenhaConfirmar] = useState("")

async function FazerCadastro(e) {
    e.preventDefault();
    

    const {data: resposta, error} = await supabase
    .from("empresas")
    .insert([
        {

        }
    ]);
    console.log(resposta)
    if (error){
        alert("Erro: " + error)
        return
    }
    
}

    return(
        <>
        <main>
            <img className="imagemCadastro" src="/imagens/forms.png" alt="imagem do atlas"/>
            <div className="cadastroForms">
                <form onSubmit={FazerCadastro}>
                    <div className='gridBox'>

                        <div className='inputBox'>
                            <label>Nome da Empresa:</label>
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
                            <label>CNPJ:</label>
                            <input required type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>CEP:</label>
                            <input required type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Área de Atuação:</label>
                            <input required type="text" placeholder="Ex: Marketing Digital"></input>
                        </div>
                    </div>
                    <button className='Cadastrar'>Fazer cadastro</button>
                    <div className="links">
                        <Link to="/cadastrofuncionario">Cadastrar como funcionario</Link>
                        <Link to="/cadastrostartup">Cadastrar como StartUp</Link>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}

export default CadastroEmpresa