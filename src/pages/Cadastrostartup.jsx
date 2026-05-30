import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { supabase } from '../services/supabase';
import bcrypt from "bcryptjs"
import "../styles/CadastroStartup.css";

function Cadastro(){
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const navigate = useNavigate()
    const [nomeStartup, setNomeStartup] = useState("")
    const [nomeUsuario, setNomeUsuario] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmar, setSenhaConfirmar] = useState("")
    const [cpf, setCpf] = useState("")
    const [area, setAreaAtuacao] = useState("")
    const [abrirModal, setAbrirModal] = useState(false)
    const [alertModal, setAlertModal] = useState("")
    const [abrirToast, setAbrirToast] = useState(false)
    const [alertToast, setAlertToast] = useState("")

    const mudarCpf = (e) => {
        let input = e.target.value.replace(/\D/g, '')
        const formatted = input
            .replace(/^(\d{3})(\d{3})(\d{3})/, '$1.$2.$3')
            .replace(/(\d)(\d{2})$/, '$1-$2');
        setCpf(formatted)
    }

    const mudarTelefone = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        const formatted = input
            .replace(/^(\d{2})(\d)/, '($1) $2')
            .replace(/(\d)(\d{4})$/, '$1-$2');
        setTelefone(formatted);
    }

    async function FazerCadastro(e){
        e.preventDefault()
        const cpfLimpo = cpf.replace(/\D/g, '')
        const telLimpo = telefone.replace(/\D/g, '')

        if (!nomeUsuario)         { setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (!nomeStartup)         { setAlertModal("Preencha o nome da StartUp"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (cpfLimpo.length < 11) { setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (!telLimpo)            { setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (!email)               { setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (!area)                { setAlertModal("Coloque a sua área de atuação"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (!senha)               { setAlertModal("Preencha a sua senha"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (senha.length < 8)     { setAlertModal("Senha precisa ter no mínimo 8 caracteres"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }
        if (senha !== senhaConfirmar) { setAlertModal("As senhas não coincidem"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return }

        const { data: respostaCpf, error: errorCpf } = await supabase
            .from("usuarios").select("cpf").eq("cpf", cpfLimpo).maybeSingle()
        if (errorCpf)    { alert("Erro: " + errorCpf.message); return }
        if (respostaCpf) { setAlertModal("Este CPF já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return }

        const { data: respostaEmail, error: errorEmail } = await supabase
            .from("usuarios").select("cpf").eq("email", email).maybeSingle()
        if (errorEmail)    { alert("Erro Resposta Email: " + errorEmail.message); return }
        if (respostaEmail) { setAlertModal("Este email já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return }

        const { data: respostaFuncCpf, error: errorFuncCpf } = await supabase
            .from("funcionarios").select("cpf").eq("cpf", cpfLimpo).maybeSingle()
        if (errorFuncCpf)    { alert("Erro Resposta CPF: " + errorFuncCpf.message); return }
        if (respostaFuncCpf) { setAlertModal("Este CPF já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return }

        const codigo = Math.floor(Math.random() * 100000).toString().padStart(5, "0")

        const { error: errorStartup } = await supabase
            .from("startups")
            .insert([{ nome: nomeStartup, areaatuacao: area, dono_cpf: cpfLimpo, dono_email: email, codigoconvite: codigo }])
        if (errorStartup) { alert("Erro Startup: " + errorStartup.message); return }

        const senhaHash = await bcrypt.hash(senha, 10)

        const { error: errorUsuario } = await supabase
            .from("usuarios")
            .insert([{ cpf: cpfLimpo, nome: nomeUsuario, email: email, senha: senhaHash, plano: "Starter", telefone: telLimpo }])
        if (errorUsuario) { alert("Erro Usuario: " + errorUsuario.message); return }

        setAlertToast("Cadastro realizado com sucesso! Realize o login")
        setAbrirToast(true)
        await delay(5000)
        setAbrirToast(false)
        navigate("https://localhost/5173")
    }

    return(
        <>
        <div className={abrirModal ? "modalAviso ativo" : "modalAviso"}>
            <h3>{alertModal}</h3>
        </div>
        <div className={abrirToast ? "toast ativo" : "toast"}>
            {alertToast}
        </div>

        <main
         className="cadastro-main"
         onMouseMove={(e) => {
            const { clientX, clientY } = e

            e.currentTarget.style.setProperty('--x', `${clientX}px`)
            e.currentTarget.style.setProperty('--y', `${clientY}px`)
        }}
        >
            <div className="cadastroForms">
                <div className="cadastro-form-header">
                    <div className='cadastro-header-titulo'>
                        <h1>Cadastro de Startup</h1>
                        <p>Preencha os dados abaixo para começar</p>
                    </div>
                    <div className="links">
                        <Link to="/cadastrofuncionario">Sou funcionário</Link>
                        <button type="button" onClick={() => navigate("https://instagram.com/")}>Já tenho conta</button>
                        <Link to="/cadastroempresa">Sou empresa</Link>
                    </div>
                </div>

                <form onSubmit={FazerCadastro}>
                    <div className="form-section-title">Startup</div>
                    <div className="gridBox">
                        <div className="inputBox">
                            <label>Nome da Startup</label>
                            <input onChange={(e) => setNomeStartup(e.target.value)} value={nomeStartup} type="text" placeholder="Nome da sua startup" />
                        </div>
                        <div className="inputBox">
                            <label>Área de Atuação</label>
                            <input onChange={(e) => setAreaAtuacao(e.target.value)} value={area} type="text" placeholder="Ex: Marketing Digital" />
                        </div>
                    </div>

                    <div className="form-section-title">Dados Pessoais</div>
                    <div className="gridBox">
                        <div className="inputBox">
                            <label>Nome completo</label>
                            <input onChange={(e) => setNomeUsuario(e.target.value)} value={nomeUsuario} type="text" placeholder="Seu nome completo" />
                        </div>
                        <div className="inputBox">
                            <label>CPF</label>
                            <input maxLength={14} onChange={mudarCpf} value={cpf} type="text" placeholder="000.000.000-00" />
                        </div>
                        <div className="inputBox">
                            <label>E-mail</label>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" placeholder="exemplo@gmail.com" />
                        </div>
                        <div className="inputBox">
                            <label>Telefone</label>
                            <input maxLength={14} onChange={mudarTelefone} value={telefone} type="text" placeholder="(11) 99999-9999" />
                        </div>
                    </div>

                    <div className="form-section-title">Segurança</div>
                    <div className="gridBox">
                        <div className="inputBox">
                            <label>Senha</label>
                            <input onChange={(e) => setSenha(e.target.value)} value={senha} type="password" placeholder="Mínimo 8 caracteres" />
                        </div>
                        <div className="inputBox">
                            <label>Confirmar Senha</label>
                            <input onChange={(e) => setSenhaConfirmar(e.target.value)} value={senhaConfirmar} type="password" placeholder="Repita a senha" />
                        </div>
                    </div>

                    <button className="Cadastrar" type="submit">Fazer cadastro</button>

                </form>
            </div>
        </main>
        </>
    )
}

export default Cadastro;