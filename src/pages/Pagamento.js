import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy, faCreditCard, faQrcode, faFileInvoice, faLock, faCheck } from '@fortawesome/free-solid-svg-icons';
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
    const [numeroCasa, setNumeroCasa] = useState("")
    const [cardFlipped, setCardFlipped] = useState(false)

    function gerarBoleto() {
        const doc = new jsPDF();
        const hoje = new Date();
        const vencimento = new Date();
        vencimento.setDate(hoje.getDate() + 3);
        const formatarData = (data) => data.toLocaleDateString("pt-BR");
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
        setCardFlipped(false);
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
        setCpf(cpf.replace(/\D/g, ''))
        if (!nome) {setAlertModal("Preencha o seu nome"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (cpf.length < 11) {setAlertModal("Preencha o seu CPF"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!telefone) {setAlertModal("Preencha o seu telefone"); setAbrirModal(true); await delay(2000); setAbrirModal(false);}
        if (!email) {setAlertModal("Preencha o seu e-mail"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (cep.length < 8) {setAlertModal("Preencha o seu CEP"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}
        if (!numeroCasa) {setAlertModal("Preencha o numero de sua casa"); setAbrirModal(true); await delay(2000); setAbrirModal(false); return}

        switch(metodo){
            case "pix":
                const {data: resposta, error} = await supabase
                    .from('pagamentos')
                    .insert([{ usuario_cpf: cpf, valor: 39.99, metodopagamento: metodo, status: "concluido", plano: "Growth", usuario_email: email, usuario_cep: cep }]);
                if (error) { alert("Erro ao realizar o pagamento: " + error.message); return; }
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
                    .insert([{ usuario_cpf: cpf, valor: 39.99, metodopagamento: metodo, status: "concluido", plano: "Growth", usuario_email: email, usuario_cep: cep }]);
                if (error1) { alert("Erro ao realizar o pagamento: " + error1.message); return; }
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
                    .insert([{ usuario_cpf: cpf, valor: 39.99, metodopagamento: metodo, status: "concluido", plano: "Growth", usuario_email: email, usuario_cep: cep }]);
                if (error2) { alert("Erro ao realizar o pagamento: " + error2.message); return; }
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

    // Formata número do cartão para exibição (grupos de 4)
    const displayNumero = () => {
        const raw = numeroCartao.replace(/\s/g, '');
        const groups = [];
        for (let i = 0; i < 4; i++) {
            const chunk = raw.substring(i * 4, i * 4 + 4);
            groups.push(chunk || '••••');
        }
        return groups.join('  ');
    }

    function renderMetodo(){
        switch(metodo){
            case "pix":
                return(
                    <div className="pix">
                        <div className="pix-qr-wrap">
                            <img className="qrCode" alt="Qrcode do pagamento" src="./imagens/Pixqrcode.png"/>
                        </div>
                        <p className="pix-label">Escaneie o QR Code ou copie o código abaixo</p>
                        <div className="pix-code-box">
                            <span className="pix-code-text">{codigoPix}</span>
                            <button type="button" className="pix-copy-btn" onClick={copiarPix}>
                                <FontAwesomeIcon icon={faCopy} /> Copiar
                            </button>
                        </div>
                        <button type="submit" className="btn-pagamento">
                            <FontAwesomeIcon icon={faCheck} /> Confirmar Pagamento
                        </button>
                    </div>
                )
            case "cartao":
                return(
                    <div className="cartao">
                        {/* Cartão Visual */}
                        <div className={`card-scene`}>
                            <div className={`card-3d ${cardFlipped ? 'is-flipped' : ''}`}>
                                {/* Frente */}
                                <div className="card-face card-front">
                                    <div className="card-front-header">
                                        <div className="card-chip"></div>
                                        <div className="card-logo-brand">
                                            <span className="card-circle card-circle-left"></span>
                                            <span className="card-circle card-circle-right"></span>
                                        </div>
                                    </div>
                                    <div className="card-number-display">
                                        {displayNumero()}
                                    </div>
                                    <div className="card-front-footer">
                                        <div className="card-holder">
                                            <span className="card-label">Titular</span>
                                            <span className="card-value">{nomeCartao || 'NOME DO TITULAR'}</span>
                                        </div>
                                        <div className="card-expiry">
                                            <span className="card-label">Validade</span>
                                            <span className="card-value">{validade || 'MM/AA'}</span>
                                        </div>
                                    </div>
                                </div>
                                {/* Verso */}
                                <div className="card-face card-back">
                                    <div className="card-back-stripe"></div>
                                    <div className="card-back-cvv-area">
                                        <div className="card-back-cvv-label">CVV</div>
                                        <div className="card-back-cvv-box">
                                            {codigoCartao ? codigoCartao.replace(/./g, '•') : '•••'}
                                        </div>
                                    </div>
                                    <p className="card-back-disclaimer">Este cartão é de propriedade do emissor e deve ser devolvido se encontrado.</p>
                                </div>
                            </div>
                        </div>

                        {/* Inputs */}
                        <div className="cartao-inputs">
                            <div className="cartao-input-group">
                                <label>Número do Cartão</label>
                                <input
                                    onChange={mudarCartao}
                                    value={numeroCartao}
                                    maxLength={19}
                                    type="text"
                                    placeholder="0000 0000 0000 0000"
                                    onFocus={() => setCardFlipped(false)}
                                />
                            </div>
                            <div className="cartao-input-group">
                                <label>Nome no Cartão</label>
                                <input
                                    onChange={(e) => setNomeCartao(e.target.value.toUpperCase())}
                                    value={nomeCartao}
                                    type="text"
                                    placeholder="Como aparece no cartão"
                                    onFocus={() => setCardFlipped(false)}
                                />
                            </div>
                            <div className="cartao-row">
                                <div className="cartao-input-group">
                                    <label>Validade</label>
                                    <input
                                        maxLength={5}
                                        value={validade}
                                        onChange={mudarValidade}
                                        type="text"
                                        placeholder="MM/AA"
                                        onFocus={() => setCardFlipped(false)}
                                    />
                                </div>
                                <div className="cartao-input-group">
                                    <label>CVV</label>
                                    <input
                                        onChange={(e) => setCodigoCartao(e.target.value)}
                                        value={codigoCartao}
                                        maxLength={3}
                                        type="text"
                                        placeholder="•••"
                                        onFocus={() => setCardFlipped(true)}
                                        onBlur={() => setCardFlipped(false)}
                                    />
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn-pagamento">
                            <FontAwesomeIcon icon={faLock} /> Pagar com Segurança
                        </button>
                    </div>
                )
            case "boleto":
                return(
                    <div className="boleto-area">
                        <div className="boleto-info">
                        <FontAwesomeIcon icon={faFileInvoice} className="boleto-icon" />
                        <div>
                            <strong>Boleto Bancário</strong>
                            <p>Clique em <strong>Gerar Boleto</strong> para baixar o PDF. Vencimento em <strong>3 dias úteis</strong>.</p>
                        </div>
                    </div>
                        <button type="submit" className="btn-pagamento">
                            <FontAwesomeIcon icon={faFileInvoice} /> Gerar Boleto
                        </button>
                    </div>
                )
            default:
                return(<p>Selecione um método</p>)
        }
    }

    const metodosConfig = [
        { value: "pix", label: "Pix", icon: faQrcode },
        { value: "cartao", label: "Cartão", icon: faCreditCard },
        { value: "boleto", label: "Boleto", icon: faFileInvoice },
    ];

    return(
        <>
        <div className={!abrirModal ? "modalAviso" : "modalAviso ativo"}>
            <h3>{alertModal}</h3>
        </div>
        <div className={!abrirToast ? "toast" : "toast ativo"}>
            {alertToast}
        </div>

        <main className="payment-page">
            <form onSubmit={RealizarPagamento} className="payment-form">
                {/* Painel Esquerdo — Dados Pessoais */}
                <div className="informacoesPessoais">
                    <div className="panel-title">
                        <span className="panel-step">01</span>
                        <h2>Informações Pessoais</h2>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label>Nome completo</label>
                            <input value={nome} onChange={(e) => setNome(e.target.value)} type="text" placeholder="Seu nome completo" />
                        </div>
                        <div className="form-field">
                            <label>Telefone</label>
                            <input maxLength={14} onChange={mudarTelefone} value={telefone} type="tel" placeholder="(11) 99999-9999" />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label>E-mail</label>
                            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="exemplo@gmail.com" />
                        </div>
                        <div className="form-field">
                            <label>CPF</label>
                            <input value={cpf} onChange={mudarCpf} type="text" maxLength={14} placeholder="000.000.000-00" />
                        </div>
                    </div>

                    <div className="panel-section-title">Endereço de cobrança</div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label>CEP</label>
                            <input value={cep} onChange={mudarCep} type="text" placeholder="00000-000" maxLength={9} />
                        </div>
                        <div className="form-field">
                            <label>Número</label>
                            <input value={numeroCasa} onChange={e => setNumeroCasa(e.target.value)} placeholder="Ex: 123" maxLength={5} type="text" />
                        </div>
                    </div>

                    <div className="form-grid-2">
                        <div className="form-field">
                            <label>Rua</label>
                            <input value={rua} placeholder="Preenchido pelo CEP" className="desativados" disabled type="text" />
                        </div>
                        <div className="form-field">
                            <label>Bairro</label>
                            <input value={bairro} placeholder="Preenchido pelo CEP" className="desativados" disabled type="text" />
                        </div>
                    </div>
                </div>

                {/* Painel Direito — Pagamento */}
                <div className="informacoesPagamento">
                    <div className="panel-title">
                        <span className="panel-step">02</span>
                        <h2>Forma de Pagamento</h2>
                    </div>

                    {/* Seletor de método */}
                    <div className="metodo-selector">
                        {metodosConfig.map(m => (
                            <button
                                key={m.value}
                                type="button"
                                className={`metodo-btn ${metodo === m.value ? 'active' : ''}`}
                                onClick={() => setMet(m.value)}
                            >
                                <FontAwesomeIcon icon={m.icon} />
                                <span>{m.label}</span>
                            </button>
                        ))}
                    </div>

                    {renderMetodo()}


                </div>
            </form>
        </main>
        </>
    )
}

export default Pagamento