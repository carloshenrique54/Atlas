import { useNavigate, Link } from "react-router-dom";
import { supabase } from "../services/supabase.js";
import { useState } from "react";
import "../styles/CadastroStartup.css";
import bcrypt from "bcryptjs";

function CadastroEmpresa() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const navigate = useNavigate();
    const [nomeEmpresa, setNomeEmpresa] = useState("");
    const [nomeUsuario, setNomeUsuario] = useState("");
    const [telefone, setTelefone] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [senhaConfirmar, setSenhaConfirmar] = useState("");
    const [cpf, setCpf] = useState("");
    const [cnpj, setCnpj] = useState("");
    const [abrirModal, setAbrirModal] = useState(false);
    const [alertModal, setAlertModal] = useState("");
    const [abrirToast, setAbrirToast] = useState(false);
    const [alertToast, setAlertToast] = useState("");

    const mudarCpf = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        const formatted = input
            .replace(/^(\d{3})(\d{3})(\d{3})/, "$1.$2.$3")
            .replace(/(\d)(\d{2})$/, "$1-$2");
        setCpf(formatted);
    };

    const mudarTelefone = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        const formatted = input
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d)(\d{4})$/, "$1-$2");
        setTelefone(formatted);
    };

    const mudarCnpj = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        const formatted = input
            .replace(/^(\d{2})(\d)/, "$1.$2")
            .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
            .replace(/\.(\d{3})(\d)/, ".$1/$2")
            .replace(/(\d{4})(\d)/, "$1-$2")
            .replace(/(-\d{2})\d+?$/, "$1");
        setCnpj(formatted);
    };

    async function FazerCadastro(e) {
        e.preventDefault();
        const cpfLimpo = cpf.replace(/\D/g, "");
        const telLimpo = telefone.replace(/\D/g, "");

        if (!nomeUsuario)         { setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (!nomeEmpresa)         { setAlertModal("Preencha o nome da Empresa"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (cpfLimpo.length < 11) { setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (!telLimpo)            { setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (!email)               { setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (!senha)               { setAlertModal("Preencha a sua senha"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (senha.length < 8)     { setAlertModal("A senha precisa ter no mínimo 8 caracteres"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (senha !== senhaConfirmar) { setAlertModal("As senhas não coincidem"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }

        const { data: resposta, error } = await supabase
            .from("pagamentos").select("usuario_cpf").eq("usuario_cpf", cpfLimpo).maybeSingle();
        if (error) { alert("Erro: " + error.message); return; }
        if (!resposta) {
            setAlertModal("Assine o plano Growth para ter acesso a este cadastro");
            setAbrirModal(true); await delay(4000); setAbrirModal(false); return;
        }

        const { data: resCpf } = await supabase
            .from("usuarios").select("cpf").eq("cpf", cpfLimpo).maybeSingle();
        if (resCpf) { setAlertModal("Este CPF já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const { data: resEmail } = await supabase
            .from("usuarios").select("cpf").eq("email", email).maybeSingle();
        if (resEmail) { setAlertModal("Este email já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const { data: resFuncCpf } = await supabase
            .from("funcionarios").select("cpf").eq("cpf", cpfLimpo).maybeSingle();
        if (resFuncCpf) { setAlertModal("Este CPF já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const { data: resFuncEmail } = await supabase
            .from("funcionarios").select("email").eq("email", email).maybeSingle();
        if (resFuncEmail) { setAlertModal("Este email já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const codigo = Math.floor(Math.random() * 100000).toString().padStart(5, "0");

        const { error: errorEmpresa } = await supabase
            .from("empresas")
            .insert([{ nome: nomeEmpresa, cnpj, numerofuncionarios: 1, dono_cpf: cpfLimpo, dono_email: email, codigoconvite: codigo }]);
        if (errorEmpresa) { alert("Erro: " + errorEmpresa.message); return; }

        const senhaHash = await bcrypt.hash(senha, 10)

        const { error: errorUsuario } = await supabase
            .from("usuarios")
            .insert([{ cpf: cpfLimpo, nome: nomeUsuario, email: email, plano: "Growth", senha: senhaHash, telefone: telLimpo }]);
        if (errorUsuario) { alert("Erro: " + errorUsuario.message); return; }

        setAlertToast("Cadastro realizado com sucesso! Realize o Login");
        setAbrirToast(true);
        await delay(4000);
        setAbrirToast(false);
        navigate("https://localhost:5174/");
    }

    return (
        <>
            <div className={abrirModal ? "modalAviso ativo" : "modalAviso"}>
                <h3>{alertModal}</h3>
            </div>
            <div className={abrirToast ? "toast ativo" : "toast"}>
                {alertToast}
            </div>

            <main className="cadastro-main"
            onMouseMove={(e) => {
            const { clientX, clientY } = e

            e.currentTarget.style.setProperty('--x', `${clientX}px`)
            e.currentTarget.style.setProperty('--y', `${clientY}px`)
        }}
        >

                <div className="cadastroForms">
                    <div className="cadastro-form-header">
                        <div>
                            <h1>Cadastro de Empresa</h1>
                            <p>Preencha os dados abaixo para criar sua conta</p>
                        </div>
                        <div className="links">
                            <Link to="/cadastrofuncionario">Sou funcionário</Link>
                            <button type="button" onClick={() => navigate("/")}>Já tenho conta</button>
                            <Link to="/cadastrostartup">Sou startup</Link>
                        </div>
                    </div>

                    <form onSubmit={FazerCadastro}>
                        <div className="form-section-title">Dados da Empresa</div>
                        <div className="gridBox">
                            <div className="inputBox">
                                <label>Nome da Empresa</label>
                                <input onChange={e => setNomeEmpresa(e.target.value)} value={nomeEmpresa} type="text" placeholder="Nome da sua empresa" />
                            </div>
                            <div className="inputBox">
                                <label>CNPJ</label>
                                <input maxLength={18} onChange={mudarCnpj} value={cnpj} type="text" placeholder="00.000.000/0000-00" />
                            </div>
                        </div>

                        <div className="form-section-title">Dados do Responsável</div>
                        <div className="gridBox">
                            <div className="inputBox">
                                <label>Nome do Responsável</label>
                                <input onChange={e => setNomeUsuario(e.target.value)} value={nomeUsuario} type="text" placeholder="Seu nome completo" />
                            </div>
                            <div className="inputBox">
                                <label>CPF</label>
                                <input maxLength={14} onChange={mudarCpf} value={cpf} type="text" placeholder="000.000.000-00" />
                            </div>
                            <div className="inputBox">
                                <label>E-mail</label>
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="exemplo@gmail.com" />
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
                                <input onChange={e => setSenha(e.target.value)} value={senha} type="password" placeholder="Mínimo 8 caracteres" />
                            </div>
                            <div className="inputBox">
                                <label>Confirmar Senha</label>
                                <input onChange={e => setSenhaConfirmar(e.target.value)} value={senhaConfirmar} type="password" placeholder="Repita a senha" />
                            </div>
                        </div>

                        <button className="Cadastrar" type="submit">Fazer cadastro</button>

                        
                    </form>
                </div>
            </main>
        </>
    );
}

export default CadastroEmpresa;