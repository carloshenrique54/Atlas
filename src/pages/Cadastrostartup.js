import { Link } from 'react-router-dom'
import { useState } from 'react';
import { supabase } from '../services/supabase';

function Cadastro(){
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [nomeStartup, setNomeStartup] = useState("")
    const [nomeUsuario, setNomeUsuario] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmar, setSenhaConfirmar] = useState("")
    const [cpf, setCpf ] = useState("")
    const [area, setAreaAtuacao ] = useState("")
    const [abrirModal, setAbrirModal] = useState(false)
    const [alertModal, setAlertModal] = useState(false)
    const [abrirToast, setAbrirToast] = useState(false)
    const [alertToast, setAlertToast] = useState(false)

    async function FazerCadastro(e){
        e.preventDefault()

        if (!nomeUsuario) {setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!nomeStartup) {setAlertModal("Preencha o nome da StartUp"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (cpf.length < 11) {setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!telefone) {setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false);}
        if (!email) {setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!area) {setAlertModal("Coloque a sua área de atuação"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!senha) {setAlertModal("Preencha a sua senha"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (senha.length < 8) {setAlertModal("Senha precisa ter no mínimo 8 caracteres"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (senha !== senhaConfirmar) {setAlertModal("As senhas não coencidem"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

        const {data: resposta, error} = await supabase
        .from("pagamentos")
        .select('usuario_cpf')
        .eq('usuario_cpf', cpf)
        .maybeSingle();

        if (resposta){
            console.log("Viadinho")
        }
        else{
            console.log("Viadinho só q 2")
            return
        }

        const {data: respostaStartup, errorStartup} = await supabase
        .from("startups")
        .insert([
            {
                nome: nomeStartup,
                areaatuacao: area,
                dono_cpf: cpf,
                dono_email: email
            }
        ]);

        const {data: respostaUsuario, errorUsuario} = await supabase
        .from("usuarios")
        .insert([
            {
                cpf: cpf,
                nome: nomeUsuario,
                email: email,
                senha: senha,
                telefone: telefone
            }
        ]);
    }
    return(
        <>
        <div className={!abrirModal ? "modalAviso" : "modalAviso ativo"}>
            <h3>{alertModal}</h3>
        </div>
        <div className={!abrirToast ? "toast" : "toast ativo"}>
            {alertToast}
        </div>
        <main>
            <img className="imagemCadastro" src="/imagens/forms.png" alt="imagem do atlas"/>
            <div className="cadastroForms">
                <form onSubmit={FazerCadastro}>
                    <div className='gridBox'>

                        <div className='inputBox'>
                            <label>Nome da StartUp:</label>
                            <input onChange={(e) => setNomeStartup(e.target.value)} value={nomeStartup} type="text" placeholder="Coloque o nome de sua Startup"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Nome do responsavel:</label>
                            <input onChange={(e) => setNomeUsuario(e.target.value)} value={nomeUsuario} type="text" placeholder="Insira seu nome completo"></input>
                        </div>

                        <div className='inputBox'>
                            <label>E-mail:</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="exemplo@gmail.com"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Telefone:</label>
                            <input onChange={(e) => setTelefone(e.target.value)} value={telefone} type="text" placeholder="(11) 1234-5678"></input>
                        </div>
                        
                        <div className='inputBox'>
                            <label>Senha:</label>
                            <input onChange={(e) => setSenha(e.target.value)} value={senha} type="password" placeholder="Insira sua senha"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Confirmar Senha:</label>
                            <input onChange={(e) => setSenhaConfirmar(e.target.value)} value={senhaConfirmar} type="password" placeholder="Insira sua senha"></input>
                        </div>

                        <div className='inputBox'>
                            <label>CPF:</label>
                            <input onChange={(e) => setCpf(e.target.value)} value={cpf} type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Área de Atuação:</label>
                            <input onChange={(e) => setAreaAtuacao(e.target.value)} value={area} type="text" placeholder="Ex: Marketing Digital"></input>
                        </div>
                    </div>
                    <button className='Cadastrar'>Fazer cadastro</button>
                    <div className="links">
                        <Link to="/cadastrofuncionario">Cadastrar como funcionario</Link>
                        <Link to="/cadastroempresa">Cadastrar como empresa</Link>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}

export default Cadastro;