import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { supabase } from "../services/supabase";
import { useNavigate } from 'react-router-dom';
import jsPDF from "jspdf";

function Pagamento(){


    const navigate = useNavigate();
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
    const [abrirToast, setAbrirToast] = useState(false);
    const [alertToast, setAlertToast] = useState("a");

    function gerarBoleto() {
        const doc = new jsPDF();

        const hoje = new Date();
        const vencimento = new Date();
        vencimento.setDate(hoje.getDate() + 3);

        const formatarData = (data) =>
            data.toLocaleDateString("pt-BR");

        const valor = "39,99";

        const linhaDigitavel = `${Math.floor(Math.random() * 99999)}.${Math.floor(Math.random() * 99999)} ${Math.floor(Math.random() * 99999)}.${Math.floor(Math.random() * 999999)} ${Math.floor(Math.random() * 99999)}.${Math.floor(Math.random() * 999999)} 0 ${Math.floor(Math.random() * 99999999999999)}`;

        doc.setFontSize(18);
        doc.text("BOLETO BANCÁRIO", 60, 20);

        doc.setFontSize(12);

        doc.text(`Nome: ${nome}`, 20, 40);
        doc.text(`CPF: ${cpf}`, 20, 50);
        doc.text(`Email: ${email}`, 20, 60);
        doc.text(`Telefone: ${telefone}`, 20, 70);

        doc.text(`Endereço: ${rua}, ${bairro}`, 20, 85);
        doc.text(`CEP: ${cep}`, 20, 95);

        doc.text(`Valor: R$ ${valor}`, 20, 110);
        doc.text(`Vencimento: ${formatarData(vencimento)}`, 20, 120);

        doc.text("Linha Digitável:", 20, 140);
        doc.setFontSize(10);
        doc.text(linhaDigitavel, 20, 150);

        doc.rect(20, 160, 170, 25);
        doc.text("||| |||||| || ||| ||||||| ||| |||||", 30, 175);

        doc.save("boleto.pdf");
}

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

    async function copiarPix() {
        navigator.clipboard.writeText(codigoPix);
        setAlertToast("Código pix copiado")

        setAbrirToast(true);
        await delay(2000);
        setAbrirToast(false);
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
        setCep(cep.replace(/\D/g, ''))
        setCep(cpf.replace(/\D/g, ''))
        if (!nome) {setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (cpf.length < 11) {setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!telefone) {setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false);}
        if (!email) {setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (cep.length < 8) {setAlertModal("Preencha o seu CEP"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

        switch(metodo){
            case "pix": 

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
                console.log(resposta)
                if (error) {
                    alert("Erro ao realizar o pagamento: " + error.message);
                    return;
                }
                setAlertToast("Pagamento realizado!")
                setAbrirToast(true);
                await delay(2000);
                setAbrirToast(false);
                await delay(1000);
                navigate('/cadastroempresa')
                break
            case "cartao":
                if(numeroCartao.length < 19) {setAlertModal("Preencha o número do cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
                if(!nomeCartao) {setAlertModal("Preencha o nome no cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
                if(validade.length < 5){ setAlertModal("Preencha a validade do cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
                if(codigoCartao.length < 3) {setAlertModal("Preencha o código de segurança do cartão"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

                const {data: resposta1, error1} = await supabase
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

                console.log(resposta1)
                if (error1) {
                    alert("Erro ao realizar o pagamento: " + error1.message);
                    return;
                }
                setAlertToast("Pagamento realizado! Utilize seu CPF para criar a conta")
                setAbrirToast(true);
                await delay(5000);
                setAbrirToast(false);
                await delay(2000);
                navigate('/cadastroempresa')
                break

            case "boleto":

                const {data: resposta2, error2} = await supabase
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

                console.log(resposta2)
                if (error2) {
                    alert("Erro ao realizar o pagamento: " + error2.message);
                    return;
                }
                setAlertToast("Boleto gerado!")
                gerarBoleto()
                setAbrirToast(true);
                await delay(2000);
                setAbrirToast(false);
                await delay(1000);
                navigate('/cadastroempresa')
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
        <div className={!abrirToast ? "toast" : "toast ativo"}>
            {alertToast}
        </div>

        <main>
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