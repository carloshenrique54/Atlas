import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../services/supabase";

function CadastroFuncionario(){
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const navigate = useNavigate()
    const [codigoConvite, setCodigoConvite] = useState("")
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [idEmpresa, setIdEmpresa] = useState(null)
    const [idStartup, setIdStartup] = useState(null)
    const [telefone, setTelefone] = useState("")
    const [cpf, setCpf] = useState("")
    const [abrirModal, setAbrirModal] = useState(false)
    const [alertModal, setAlertModal] = useState(false)
    const [abrirToast, setAbrirToast] = useState(false)
    const [alertToast, setAlertToast] = useState(false)

    const mudarTelefone = (e) => {
        let inputTel = e.target.value.replace(/\D/g, '');
        
        const formattedValue = inputTel.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
        
        setTelefone(formattedValue);
    }

    const mudarCpf = (e) => {
        let inputCpf = e.target.value.replace(/\D/g, '')

        const formattedValue = inputCpf.replace(/^(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3').replace(/(\d)(\d{2})$/, '$1-$2');

        setCpf(formattedValue)
    }

    async function RealizarCadastro(e){
        setCpf(cpf.replace(/\D/g, ''))
        setTelefone(telefone.replace(/\D/g, ''))
        e.preventDefault();
        if(codigoConvite.length < 5){setAlertModal("Insira o código de convite"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if(!nome){setAlertModal("Insira o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if(!email){setAlertModal("Insira o seu email"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if(senha.length < 8){setAlertModal("A senha precisa ter no mínimo 8 caracteres"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if(confirmarSenha !== senha){setAlertModal("As senhas não coencidem"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if(telefone < 10){setAlertModal("Insira seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if(cpf < 11){setAlertModal("Insira seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

        const {data: respostaCpf, errorCpf} = await supabase
        .from("usuarios")
        .select("cpf")
        .eq("cpf", cpf)
        .maybeSingle()

        if(respostaCpf){
            setAlertModal("Este CPF já esta cadastrado")
            setAbrirModal(true)
            await delay(3000)
            setAbrirModal(false)
            return
        }

        const {data: respostaEmail, errorEmail} = await supabase
        .from("usuarios")
        .select("cpf")
        .eq("email", email)
        .maybeSingle()

        if(respostaEmail){
            setAlertModal("Este email já esta cadastrado")
            setAbrirModal(true)
            await delay(3000)
            setAbrirModal(false)
            return
        }


        const {data: respostaFuncCpf, errorFuncCpf} = await supabase
        .from("funcionarios")
        .select("cpf")
        .eq("cpf", cpf)
        .maybeSingle()

        if(respostaFuncCpf){
            setAlertModal("Este CPF já esta cadastrado")
            setAbrirModal(true)
            await delay(3000)
            setAbrirModal(false)
            return
        }

        const {data: respostaFuncEmail, errorFuncEmail} = await supabase
        .from("funcionarios")
        .select("email")
        .eq("email", email)
        .maybeSingle()

        if(respostaFuncCpf){
            setAlertModal("Este email já esta cadastrado")
            setAbrirModal(true)
            await delay(3000)
            setAbrirModal(false)
            return
        }

        const { data: respostaEmpresa, error: errorEmpresa } = await supabase
            .from("empresas")
            .select("id")
            .eq("codigoconvite", codigoConvite)
            .maybeSingle()

        if (errorEmpresa){
            alert("Erro: " + errorEmpresa.message)
            return
        }

        if (!respostaEmpresa){
            const { data: respostaStartup, error: errorStartup } = await supabase
                .from("startups")
                .select("id")
                .eq("codigoconvite", codigoConvite)
                .maybeSingle()

            if (errorStartup){
                alert("Erro: " + errorStartup.message)
                return
            }

            if (!respostaStartup){
                setAlertModal("Este código não existe, insira um válido")
                setAbrirModal(true)
                await delay(3000)
                setAbrirModal(false)
                return
            }

            setIdStartup(respostaStartup.id)
            setIdEmpresa(null)
            } 
        else {
            setIdEmpresa(respostaEmpresa.id)
            setIdStartup(null)
        }    
        const {data: resposta, error} = await supabase
        .from("funcionarios")
        .insert([
            {
                nome: nome,
                email: email,
                telefone: telefone,
                cpf: cpf,
                empresa_id: idEmpresa,
                startup_id: idStartup,
                senha: senha
            }
        ])
        console.log(resposta)
        if (error){
            alert("Erro: " + error)
            return
        }

        setAlertToast("Cadastro realizado com sucesso! Realize o Login")
        setAbrirToast(true)
        await delay(3000)
        setAbrirToast(false)
        navigate("localhost:loginfuncionario")
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
            <img className="imagemCadastro" src="/imagens/forms.png" alt="Imagem de cadastro" />
            <div id="cadastroFuncForms">
                <form onSubmit={RealizarCadastro}>
                    <label>Código da empresa:</label>
                    <input onChange={e => setCodigoConvite(e.target.value)} value={codigoConvite} maxLength={5} type="text" placeholder="Ex: 86225"></input>
                    <label>Nome Completo:</label>
                    <input onChange={e => setNome(e.target.value)} value={nome} type="text"></input>
                    <label>E-mail:</label>
                    <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="exemplo@gmail.com"></input>
                    <label>Senha:</label>
                    <input onChange={e => setSenha(e.target.value)} value={senha} type="password" placeholder="Mínimo de 8 digitos"></input>
                    <label>Confirmar Senha:</label>
                    <input onChange={e => setConfirmarSenha(e.target.value)} value={confirmarSenha} type="password" placeholder=""></input>
                    <div id="numbersCadastro">
                        <div className="inputNumber">
                            <label>Telefone:</label>
                            <input maxLength={14} onChange={mudarTelefone} value={telefone} type="text" placeholder="(11) 1234-5678"></input>
                        </div>
                        <div className="inputNumber">
                            <label>CPF:</label>
                            <input maxLength={14} onChange={mudarCpf} value={cpf} type="text" placeholder="Apenas números"></input>
                        </div>
                    </div>
                    <button className="Cadastrar">Fazer cadastro</button>
                    <div className="links">
                        <Link to={"/cadastrostartup"}>Cadastrar Empresa</Link>
                    </div>
                </form>
            </div>
        </main>
        </>
    )
}

export default CadastroFuncionario;