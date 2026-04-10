import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCopy } from '@fortawesome/free-solid-svg-icons';

function Pagamento(){

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

    function realizarPagamento(){
        
    }

    function renderMetodo(){
        switch(metodo){
            case "pix":
                return(<div className="pix">
                        <img src="./imagens/Pixqrcode.png"/>
                        <p> {codigoPix} <FontAwesomeIcon onClick={copiarPix} className="iconeCopia" icon={faCopy} /></p>
                        <button>Realizar Pagamento</button>
                    </div>
                )
            case "cartao":
                return(<div className="cartao">
                    <input type="text" placeholder="Número do cartão" />
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
                        <input required type="text" placeholder="Nome completo"></input>
                        <label>E-mail:</label>
                        <input required type="text" placeholder="exemplo@gmail.com"></input>
                        <label>CPF:</label>
                        <input required type="text" placeholder="Apenas números"></input>
                        <label>Telefone:</label>
                        <input required type="tel" placeholder="99 9999-9999"></input>
                    <div className="endereco">
                        <div className="enderecoInput">
                            <label>CEP:</label>
                            <input 
                                value={cep} 
                                onChange={(e) => setCep(e.target.value.replace(/\D/g, ''))}required 
                                type="text" 
                                placeholder="Apenas números"
                                maxLength={8}
                                >
                            </input>
                        </div>
                        <div className="enderecoInput">
                            <label>Numero:</label>
                            <input maxLength={3} required type="text"></input>
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