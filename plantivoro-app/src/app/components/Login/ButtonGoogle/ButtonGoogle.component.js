import React from 'react'
import './ButtonGoogle.scss'
import { ingresarUsuarioGoogleAccion } from '../../../Redux/Login/usuarioDucks'
import { useDispatch } from 'react-redux'

const ButtonGoogle = (props) => {

    const dispatch = useDispatch()

    const signInGoogle = (e) => {

        e.preventDefault()
        dispatch(ingresarUsuarioGoogleAccion())
        props.setOpenLoading(true) 
    }

    return (
        <a href="/#" className="google btn-google text-center mt-4" onClick={(e) => signInGoogle(e)} disabled={props.loading}>
            <i className="fa fa-google fa-fw"></i>
            Iniciar sesión con Google
        </a>
    )
}

export default ButtonGoogle