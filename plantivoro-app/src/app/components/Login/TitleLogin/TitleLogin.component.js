import React from 'react'
import './TitleLogin.scss'

const TitleLogin = ({ esRegistro }) => {
    return (
        <>
            <div className={esRegistro ? "text-center title-register o-font-medium pb-2" : "text-center title-sign-in o-font-medium pb-2 pt-3"}>
                {esRegistro ? "Crea una cuenta en Lowbeat" : "Iniciar sesión"}
            </div>
            <div className="text-welcome-login o-font-medium text-center pb-4">
                {esRegistro ? "¡Hola!, regístrate y relájate un poco" : "¡Hola!, ingresa y relájate un poco"}
            </div>
        </>
    )
}

export default TitleLogin
