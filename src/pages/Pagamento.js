import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { supabase } from "../services/supabase";

function Pagamento(){

    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");
    const [metodo, setMet] = useState("pix");
    const [validade, setValidade] = useState("");
    const [nomeCartao, setNomeCartao] = useState("");
    const [numeroCartao, setNumeroCartao] = useState("");
    const [codigoCartao, setCodigoCartao] = useState("");
    const [abrirModal, setAbrirModal] = useState(false);
    const [alertModal, setAlertModal] = useState("");

    useEffect(() => {
        if (cep.length === 9){
            const cepPesquisa = cep.replace(/\D/g, '');

            fetch(`https://viacep.com.br/ws/${cepPesquisa}/json/`)
            .then(res => res.json())
            .then(dados => {
            setRua(dados.logradouro);
            setBairro(dados.bairro);
            });
        }
    }, [cep]);

    const codigoPix = "00020126580014BR.GOV.BCB.PIX0136atlas@pix.com520400005303986540650.005802BR5912ATLAS LTDA6009SAO PAULO62070503***6304CAFE";

    const [mostrarToast, setMostrarToast] = useState(false);

    function copiarPix() {
        navigator.clipboard.writeText(codigoPix);

        setMostrarToast(true);
        setTimeout(() => setMostrarToast(false), 2000);
    }

    const mudarCartao = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        
        const formattedValue = input.replace(/(.{4})/g, '$1 ').trim();
        
        setNumeroCartao(formattedValue);
    }

    const mudarTelefone = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        
        const formattedValue = input.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
        
        setTelefone(formattedValue);
    }

    const mudarValidade = (e) => {
        let input = e.target.value.replace(/\D/g, '')

        const formattedValue = input.replace(/^(\d{2})(\d)/g, '$1/$2')

        setValidade(formattedValue)
    }

    const mudarCep = (e) => {
        let input = e.target.value.replace(/\D/g, '')

        const formattedValue = input.replace(/^(\d{5})(\d)/g, '$1-$2')

        setCep(formattedValue)
    }

    const mudarCpf = (e) => {
        let input = e.target.value.replace(/\D/g, '')

        const formattedValue = input.replace(/^(\d{3})(\d{3})(\d{3})/g, '$1.$2.$3').replace(/(\d)(\d{2})$/, '$1-$2');

        setCpf(formattedValue)
    }

    async function RealizarPagamento(e) {
        e.preventDefault();
        if (!nome) {setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!cpf) {setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!telefone) {setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false);}
        if (!email) {setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!cep) {setAlertModal("Preencha o seu CEP"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

        switch(metodo){
            case "pix":
                setCep(cep.replace(/\D/g, ''))
                setCpf(cpf.replace(/\D/g, ''))
                const {data: resposta, error} = await supabase
                    .from('pagamentos')
                    .insert([
                        {
                            usuario_cpf: cpf,
                            valor:  39.99,
                            metodopagamento: metodo,
                            status: "concluido",
                            plano: "Growth",
                            usuario_email: email,
                            usuario_cep: cep
                        }
                    ]);
                if (error) {
                    alert("Erro ao realizar o pagamento: " + error.message);
                    return;
                }
                alert("Cadastro realizado com sucesso!");
                break
            case "cartao":
                if(numeroCartao.length < 19) {setAlertModal("Preencha o número do cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
                if(!nomeCartao) {setAlertModal("Preencha o nome no cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
                if(validade.length < 5){ setAlertModal("Preencha a validade do cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
                if(codigoCartao.length < 3) {setAlertModal("Preencha o código de segurança do cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

                break
            case "boleto":

                break
            default:
                break
        }
    }

    function renderMetodo(){
        switch(metodo){
            case "pix":
                return(<div className="pix">
                        <img className="qrCode" alt="Qrcode do pagamento" src="./imagens/Pixqrcode.png"/>
                        <p> {codigoPix} <FontAwesomeIcon onClick={copiarPix} className="iconeCopia" icon={faCopy} /></p>
                        <button type="submit">Realizar Pagamento</button>
                    </div>
                )
            case "cartao":
                return(<div className="cartao">
                    <input onChange={mudarCartao} value ={numeroCartao} maxLength={19} type="text" placeholder="Número do cartão" />
                    <input onChange={(e) => setNomeCartao(e.target.value)} value={nomeCartao} type="text" placeholder="Nome no cartão" />
                    <input maxLength={5} value={validade} onChange={mudarValidade} type="text" placeholder="MM/AA" />
                    <input onChange={(e) => setCodigoCartao(e.target.value)} value={codigoCartao} maxLength={3} type="text" placeholder="CVV" />
                    <button type="submit">Realizar Pagamento</button>
                </div>)
            case "boleto":
                return(<div>
                        <p>
                            Após clicar em <strong>Gerar Boleto</strong>, você poderá visualizar e pagar o boleto.
                        </p>
                        <button type="submit">Gerar Boleto</button>
                    </div>)
            default:
                return(<p>Selecione um método</p>)
        }
    }

    return(
        <>
        <div className={!abrirModal ? "modalAviso" : "modalAviso ativo"}>
            <h3>{alertModal}</h3>
        </div>

        <main>
            {mostrarToast && (
            <div className="toast">
                Código Pix copiado!
            </div>
            )}
            <span className="copiado">Código copiado</span>
                <form onSubmit={RealizarPagamento}>
                    <div className="informacoesPessoais">
                        <h2>Informações Pessoais</h2>
                        <label>Nome:</label>
                        <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" placeholder="Nome completo"></input>
                        <label>E-mail:</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com"></input>
                        <label>CPF:</label>
                        <input value={cpf} onChange={mudarCpf} type="text" maxLength={14} placeholder="Apenas números"></input>
                        <label>Telefone:</label>
                        <input maxLength={14} onChange={mudarTelefone} value={telefone} type="tel" placeholder="(11) 1234-5678"></input>
                    <div className="endereco">
                        <div className="enderecoInput">
                            <label>CEP:</label>
                            <input 
                                value={cep} 
                                onChange={(mudarCep)} 
                                type="text" 
                                placeholder="Apenas números"
                                maxLength={9}
                                >
                            </input>
                        </div>
                        <div className="enderecoInput">
                            <label>Numero:</label>
                            <input placeholder="Ex: 123" maxLength={3} required type="text"></input>
                        </div>
                        <div className="enderecoInput">
                            <label>Rua:</label>
                            <input value={rua} placeholder="Insira um CEP válido para pesquisa automática" className="desativados" required disabled type="text"></input>
                        </div>
                        <div className="enderecoInput">
                            <label>Bairro:</label>
                            <input value={bairro} placeholder="Insira um CEP válido para pesquisa automática" className="desativados" required disabled type="text"></input>
                        </div>
                    </div>
            </div>
            <div className="informacoesPagamento">
                <h2>Informações Pagamento</h2>
                    <label>Método:</label>
                    <select value={metodo} onChange={(e) => setMet(e.target.value)}>
                        <option value={"pix"}>Pix</option>
                        <option value={"cartao"}>Cartão</option>
                        <option value={"boleto"}>Boleto</option>
                    </select>
                    {renderMetodo()}
            
            </div>
            </form>
        </main>
        </>
    )
}

export default Pagamento