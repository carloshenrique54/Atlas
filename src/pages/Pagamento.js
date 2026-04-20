import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { supabase } from "../services/supabase";

function Pagamento(){


    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [telefone, setTelefone] = useState("");
    const [cartao, setCartao] = useState("");
    const [cep, setCep] = useState("");
    const [rua, setRua] = useState("");
    const [bairro, setBairro] = useState("");

    useEffect(() => {
        if (cep.length === 8){
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
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

    const [metodo, setMet] = useState("pix")

    const mudancaMetodo = (event) => {
        setMet(event.target.value)
    }

    const mudarCartao = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        
        const formattedValue = input.replace(/(.{4})/g, '$1 ').trim();
        
        setCartao(formattedValue);
    }

    const mudarTelefone = (e) => {
        let input = e.target.value.replace(/\D/g, '');
        
        const formattedValue = input.replace(/^(\d{2})(\d)/g, '($1) $2').replace(/(\d)(\d{4})$/, '$1-$2');
        
        setTelefone(formattedValue);
    }

    function renderMetodo(){
        switch(metodo){
            case "pix":
                return(<div className="pix">
                        <img alt="Qrcode do pagamento" src="./imagens/Pixqrcode.png"/>
                        <p> {codigoPix} <FontAwesomeIcon onClick={copiarPix} className="iconeCopia" icon={faCopy} /></p>
                        <button>Realizar Pagamento</button>
                    </div>
                )
            case "cartao":
                return(<div className="cartao">
                    <input onChange={mudarCartao} value ={cartao} maxLength={19} type="text" placeholder="Número do cartão" />
                    <input type="text" placeholder="Nome no cartão" />
                    <input type="text" placeholder="MM/AA" />
                    <input type="text" placeholder="CVV" />
                    <button>Realizar Pagamento</button>
                </div>)
            case "boleto":
                return(<div>
                        <p>
                            Após clicar em <strong>Gerar Boleto</strong>, você poderá visualizar e pagar o boleto.
                        </p>
                        <button>Gerar Boleto</button>
                    </div>)
            default:
                return(<p>Selecione um método</p>)
        }
    }

    return(
        <main>
            {mostrarToast && (
            <div className="toast">
                Código Pix copiado!
            </div>
            )}
            <span className="copiado">Código copiado</span>
                <form>
                    <div className="informacoesPessoais">
                        <h2>Informações Pessoais</h2>
                        <label>Nome:</label>
                        <input value={nome} required type="text" placeholder="Nome completo"></input>
                        <label>E-mail:</label>
                        <input value={email} required type="text" placeholder="exemplo@gmail.com"></input>
                        <label>CPF:</label>
                        <input value={cpf} required type="text" placeholder="Apenas números"></input>
                        <label>Telefone:</label>
                        <input maxLength={14} onChange={mudarTelefone} value={telefone} required type="tel" placeholder="(11) 1234-5678"></input>
                    <div className="endereco">
                        <div className="enderecoInput">
                            <label>CEP:</label>
                            <input 
                                value={cep} 
                                format="###.###.###-##"
                                mask="_"
                                onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}required 
                                type="text" 
                                placeholder="Apenas números"
                                maxLength={8}
                                >
                            </input>
                        </div>
                        <div className="enderecoInput">
                            <label>Numero:</label>
                            <input placeholder="Ex: 123" maxLength={3} required type="text"></input>
                        </div>
                        <div className="enderecoInput">
                            <label>Rua:</label>
                            <input value={rua} placeholder="Coloque o CEP para pesquisa automática" className="desativados" required disabled type="text"></input>
                        </div>
                        <div className="enderecoInput">
                            <label>Bairro:</label>
                            <input value={bairro} placeholder="Coloque o CEP para pesquisa automática" className="desativados" required disabled type="text"></input>
                        </div>
                    </div>
            </div>
            <div className="informacoesPagamento">
                <h2>Informações Pagamento</h2>
                    <label>Método:</label>
                    <select value={metodo} onChange={mudancaMetodo}>
                        <option value={"pix"}>Pix</option>
                        <option value={"cartao"}>Cartão</option>
                        <option value={"boleto"}>Boleto</option>
                    </select>
                    {renderMetodo()}
            
            </div>
            </form>
        </main>
    )
}

export default Pagamento