import { useState } from "react";
import "../styles/RedefinirSenha.css"

function RedefinirSenha(){
    const [abrirModal, setAbrirModal] = useState("")
    const [alertModal, setAlertModal] = useState("")
    const [abrirToast, setAbrirToast] = useState("")
    const [alertToast, setAlertToast] = useState("")
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
                <div className="redefinirForms">
                    <form>
                        <div className="inputBox">
                            <label>E-mail:</label>
                            <input></input>
                        </div>
                        <div className="inputBox">
                            <label>Nova Senha:</label>
                            <input></input>
                        </div>
                        <div className="inputBox">
                            <label>Confirmar Nova Senha:</label>
                            <input></input>
                        </div>
                        <button className="TrocarSenha">Confirmar</button>
                    </form>
                </div>
            </main>
        </>
    )
}

export default RedefinirSenha;