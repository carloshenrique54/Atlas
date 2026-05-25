import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";
import "../styles/CadastroStartup.css";

function CadastroFuncionario() {
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const navigate = useNavigate();
    const [codigoConvite, setCodigoConvite] = useState("");
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cpf, setCpf] = useState("");
    const [abrirModal, setAbrirModal] = useState(false);
    const [alertModal, setAlertModal] = useState("");
    const [abrirToast, setAbrirToast] = useState(false);
    const [alertToast, setAlertToast] = useState("");

    const mudarTelefone = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        const formatted = input
            .replace(/^(\d{2})(\d)/, "($1) $2")
            .replace(/(\d)(\d{4})$/, "$1-$2");
        setTelefone(formatted);
    };

    const mudarCpf = (e) => {
        let input = e.target.value.replace(/\D/g, "");
        const formatted = input
            .replace(/^(\d{3})(\d{3})(\d{3})/, "$1.$2.$3")
            .replace(/(\d)(\d{2})$/, "$1-$2");
        setCpf(formatted);
    };

    async function RealizarCadastro(e) {
        e.preventDefault();
        const cpfLimpo = cpf.replace(/\D/g, "");
        const telLimpo = telefone.replace(/\D/g, "");

        if (codigoConvite.length < 5)   { setAlertModal("Insira o código de convite"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (!nome)                       { setAlertModal("Insira o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (!email)                      { setAlertModal("Insira o seu email"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (senha.length < 8)            { setAlertModal("A senha precisa ter no mínimo 8 caracteres"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (confirmarSenha !== senha)    { setAlertModal("As senhas não coincidem"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (telLimpo.length < 10)        { setAlertModal("Insira seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }
        if (cpfLimpo.length < 11)        { setAlertModal("Insira seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return; }

        const { data: respostaCpf } = await supabase
            .from("usuarios").select("cpf").eq("cpf", cpfLimpo).maybeSingle();
        if (respostaCpf) { setAlertModal("Este CPF já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const { data: respostaEmail } = await supabase
            .from("usuarios").select("cpf").eq("email", email).maybeSingle();
        if (respostaEmail) { setAlertModal("Este email já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const { data: respostaFuncCpf } = await supabase
            .from("funcionarios").select("cpf").eq("cpf", cpfLimpo).maybeSingle();
        if (respostaFuncCpf) { setAlertModal("Este CPF já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        const { data: respostaFuncEmail } = await supabase
            .from("funcionarios").select("email").eq("email", email).maybeSingle();
        if (respostaFuncEmail) { setAlertModal("Este email já está cadastrado"); setAbrirModal(true); await delay(3000); setAbrirModal(false); return; }

        let empresaId = null;
        let startupId = null;

        const { data: respostaEmpresa, error: errorEmpresa } = await supabase
            .from("empresas").select("id").eq("codigoconvite", codigoConvite).maybeSingle();
        if (errorEmpresa) { alert("Erro: " + errorEmpresa.message); return; }

        if (!respostaEmpresa) {
            const { data: respostaStartup, error: errorStartup } = await supabase
                .from("startups").select("id").eq("codigoconvite", codigoConvite).maybeSingle();
            if (errorStartup) { alert("Erro: " + errorStartup.message); return; }
            if (!respostaStartup) {
                setAlertModal("Código inválido, insira um código válido");
                setAbrirModal(true); await delay(3000); setAbrirModal(false); return;
            }
            startupId = respostaStartup.id;
        } else {
            empresaId = respostaEmpresa.id;
        }

        const { error } = await supabase
            .from("funcionarios")
            .insert([{ nome, email, telefone: telLimpo, cpf: cpfLimpo, empresa_id: empresaId, startup_id: startupId, senha }]);
        if (error) { alert("Erro: " + error.message); return; }

        setAlertToast("Cadastro realizado com sucesso! Realize o Login");
        setAbrirToast(true);
        await delay(3000);
        setAbrirToast(false);
        navigate("/loginfuncionario");
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
                            <h1>Cadastro de Funcionário</h1>
                            <p>Preencha os dados abaixo para criar sua conta</p>
                        </div>
                        <div className="links">
                            <Link to="/cadastrostartup">Sou startup</Link>
                            <button type="button" onClick={() => navigate("/")}>Já tenho conta</button>
                            <Link to="/cadastroempresa">Sou empresa</Link>
                        </div>
                    </div>

                    <form onSubmit={RealizarCadastro}>
                        <div className="form-section-title">Código da Empresa</div>
                        <div className="gridBox" style={{ gridTemplateColumns: "1fr" }}>
                            <div className="inputBox">
                                <label>Código de convite</label>
                                <input onChange={e => setCodigoConvite(e.target.value)} value={codigoConvite} maxLength={5} type="text" placeholder="Ex: 86225" />
                            </div>
                        </div>

                        <div className="form-section-title">Dados Pessoais</div>
                        <div className="gridBox">
                            <div className="inputBox">
                                <label>Nome Completo</label>
                                <input onChange={e => setNome(e.target.value)} value={nome} type="text" placeholder="Seu nome completo" />
                            </div>
                            <div className="inputBox">
                                <label>E-mail</label>
                                <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="exemplo@gmail.com" />
                            </div>
                            <div className="inputBox">
                                <label>Telefone</label>
                                <input maxLength={14} onChange={mudarTelefone} value={telefone} type="text" placeholder="(11) 99999-9999" />
                            </div>
                            <div className="inputBox">
                                <label>CPF</label>
                                <input maxLength={14} onChange={mudarCpf} value={cpf} type="text" placeholder="000.000.000-00" />
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
                                <input onChange={e => setConfirmarSenha(e.target.value)} value={confirmarSenha} type="password" placeholder="Repita a senha" />
                            </div>
                        </div>

                        <button className="Cadastrar" type="submit">Fazer cadastro</button>

                        
                    </form>
                </div>
            </main>
        </>
    );
}

export default CadastroFuncionario;