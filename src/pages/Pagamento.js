import { useState } from "react"

function Pagamento(){
    const [metodo, setMet] = useState("pix")

    const mudancaMetodo = (event) => {
        setMet(event.target.value)
    }

    return(
        <main>
            <div className="informacoesPessoais">
                <form>
                    <label>Nome:</label>
                    <input></input>
                    <label>E-mail:</label>
                    <input></input>
                    <label>CPF:</label>
                    <input></input>
                    <label>Telefone:</label>
                    <input></input>
                </form>
            </div>
            <div className="informacoesPagamento">
                <form>
                    <label>Método:</label>
                    <select value={metodo} onChange={mudancaMetodo}>
                        <option value={"pix"}>Pix</option>
                        <option value={"cartao"}>Cartão</option>
                        <option value={"boleto"}>Boleto</option>
                    </select>
                </form>
            </div>
        </main>
    )
}

export default Pagamento