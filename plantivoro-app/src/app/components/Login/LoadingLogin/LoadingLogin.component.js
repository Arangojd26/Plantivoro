import React from 'react'
import './LoadingLogin.scss'

const LoadingLogin = ({openLoading}) => {
    return (
        <div className={openLoading ? "container-loader" : "d-none"}>
            <div className="title-loading o-font-medium">Cargando</div>
            <div className="loader"></div>
        </div>
    )
}

export default LoadingLogin
