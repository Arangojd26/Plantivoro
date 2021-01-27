import React from 'react'
import './SwitchLogin.scss'

const SwitchLogin = ({ esRegistro, setEsRegistro }) => {
    return (
        <div className={esRegistro ? "pb-3 pt-4" : "pb-5 pt-4"}>
            <a
                href="#help"
                className="text-recovery-pass"
                onClick={() => setEsRegistro(!esRegistro)}
                type="button"
            >
                {esRegistro ? "¿Ya estás registrado?" : "Crear cuenta"}
            </a>
        </div>
    )
}

export default SwitchLogin
