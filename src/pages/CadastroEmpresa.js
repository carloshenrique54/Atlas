import { useNavigate, Link, Navigate } from "react-router-dom"
import { supabase } from "../services/supabase.js"
import { useState, useEffect } from "react";

function CadastroEmpresa(){
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const navigate = useNavigate
    const [nomeEmpresa, setNomeEmpresa] = useState("")
    const [nomeUsuario, setNomeUsuario] = useState("")
    const [telefone, setTelefone] = useState("")
    const [email, setEmail] = useState("")
    const [senha, setSenha] = useState("")
    const [senhaConfirmar, setSenhaConfirmar] = useState("")
    const [cpf, setCpf ] = useState("")
    const [cnpj, setCnpj ] = useState("")
    const [area, setAreaAtuacao ] = useState("")
    const [abrirModal, setAbrirModal] = useState(false)
    const [alertModal, setAlertModal] = useState(false)
    const [abrirToast, setAbrirToast] = useState(false)
    const [alertToast, setAlertToast] = useState(false)
    const [cep, setCep] = useState("")
    const [cepCerto, setCepCerto] = useState(false)

    const mudarCpf = (e) => {
        let input = e.target.value.replace(/\D/g, '')

        const formattedValue = input.replace(/^(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3').replace(/(\d)(\d{2})$/, '$1-$2');

        setCpf(formattedValue)
    }

    useEffect(() => {
        if (cep.length === 9){
            const cepPesquisa = cep.replace(/\D/g, '');

            fetch(`https://viacep.com.br/ws/${cepPesquisa}/json/`)
            .then(res => res.json())
            .then(dados => {
                if (dados.erro){
                    setCepCerto(false)
                }
                else{
                    setCepCerto(true)
                }
            });
        }
    }, [cep]);

    const mudarTelefone = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        
        const formattedValue = input.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
        
        setTelefone(formattedValue);
    }

    const mudarCep = (e) => {
        let input = e.target.value.replace(/\D/g, '')

        const formattedValue = input.replace(/^(\d{5})(\d)/g, '$1-$2')

        setCep(formattedValue)
    }

    function mudarCnpj(e) {

        let input = e.target.value.replace(/\D/g, '')

        const formattedValue = input
        .replace(/\D/g, "") 
        .replace(/^(\d{2})(\d)/, "$1.$2") 
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3")
        .replace(/\.(\d{3})(\d)/, ".$1/$2") 
        .replace(/(\d{4})(\d)/, "$1-$2") 
        .replace(/(-\d{2})\d+?$/, "$1");

        setCnpj(formattedValue)
}

async function FazerCadastro(e) {
    e.preventDefault();
    setTelefone(telefone.replace(/\D/g, ''))
    setCpf(cpf.replace(/\D/g, ''))

    if (!nomeUsuario) {setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (!nomeEmpresa) {setAlertModal("Preencha o nome da Empresa"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (cpf.length < 11) {setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (!telefone) {setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false);}
    if (!email) {setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (!area) {setAlertModal("Coloque a sua área de atuação"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (!senha) {setAlertModal("Preencha a sua senha"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (senha.length < 8) {setAlertModal("A senha precisa ter no mínimo 8 caracteres"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (senha !== senhaConfirmar) {setAlertModal("As senhas não coencidem"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
    if (!cepCerto){setAlertModal("Insira um cep valido"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

    const {data: resposta, error} = await supabase
        .from("pagamentos")
        .select('usuario_cpf')
        .eq('usuario_cpf', cpf)
        .maybeSingle();

    if (!resposta){
        setAlertModal("Assine o plano Growth para ter acesso à este cadastro");
        setAbrirModal(true)
        await delay(4000)
        setAbrirModal(false)
        return
    }

    if (error){
        alert("Erro:" + error)
        return
    }

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

    const codigo = Math.floor(Math.random() * 100000)
        .toString()
        .padStart(5, '0');

    
    const {data: respostaEmpresa, errorEmpresa} = await supabase
        .from("empresas")
        .insert([
            {
                nome: nomeEmpresa,
                cnpj: cnpj,
                cep: cep,
                numerofuncionarios: 1,
                dono_cpf: cpf,
                dono_email: email,
                areaatuacao: area,
                codigoconvite: codigo
            }
        ]);

    console.log(respostaEmpresa)
    if (errorEmpresa){
        alert("Erro: " + errorEmpresa)
        return
    }

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
    ])
    console.log(respostaUsuario)
    if (errorUsuario){
        alert("Erro: " + errorUsuario)
        return
    }

    setAlertToast("Cadastro realizado com sucesso! Realize Login");
    setAbrirToast(true)
    await delay(4000)
    setAbrirToast(false)
    return <Navigate to="localhost:5173" replace />
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
                            <label>Nome da Empresa:</label>
                            <input onChange={e => setNomeEmpresa(e.target.value)} value={nomeEmpresa} type="text" placeholder="Coloque o nome de sua Startup"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Nome do responsavel:</label>
                            <input onChange={e => setNomeUsuario(e.target.value)} value={nomeUsuario} type="text" placeholder="Insira seu nome completo"></input>
                        </div>

                        <div className='inputBox'>
                            <label>E-mail:</label>
                            <input onChange={e => setEmail(e.target.value)} value={email} type="email" placeholder="exemplo@gmail.com"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Telefone:</label>
                            <input maxLength={14} onChange={mudarTelefone} value={telefone} type="text" placeholder="(11) 1234-5678"></input>
                        </div>
                        
                        <div className='inputBox'>
                            <label>Senha:</label>
                            <input onChange={e => setSenha(e.target.value)} value={senha} type="password" placeholder="Insira sua senha"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Confirmar Senha:</label>
                            <input onChange={e => setSenhaConfirmar(e.target.value)} value={senhaConfirmar} type="password" placeholder="Insira sua senha"></input>
                        </div>

                        <div className='inputBox'>
                            <label>CPF:</label>
                            <input maxLength={14} onChange={mudarCpf} value={cpf} type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>CNPJ:</label>
                            <input maxLength={18} onChange={mudarCnpj} value={cnpj} type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>CEP:</label>
                            <input maxLength={9} onChange={mudarCep} value={cep} type="text" placeholder="Apenas números"></input>
                        </div>

                        <div className='inputBox'>
                            <label>Área de Atuação:</label>
                            <input onChange={e => setAreaAtuacao(e.target.value)} value={area} type="text" placeholder="Ex: Marketing Digital"></input>
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