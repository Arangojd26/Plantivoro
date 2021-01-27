import React from 'react'
import iconCheck from '../../../../assets/icons/check.svg'
import './CheckLogin.scss'

const CheckLogin = (props) => {
    return (
        <>
            {
                props.esCheck ? (
                    <div className="check-container p-4 text-left">
                        <p className="check-title pb-4">Tu contraseña debe:</p>
                        <div className="d-flex">

                            {
                                props.es8Caracteres ? (
                                    <>
                                        <p className="check-parrafo pb-3 pr-4">Ser de mínimo 8 caracteres</p>
                                        <img src={iconCheck} width="19.3" height="19.3" alt="" />
                                    </>
                                ) : (
                                        <p className="check-parrafo pb-3 pr-4 text-muted">Ser de mínimo 8 caracteres</p>
                                    )
                            }

                        </div>
                        <div className="d-flex">
                            {
                                props.esCaracterEspecial ? (
                                    <>
                                        <p className="check-parrafo pb-3 pr-4">Tener al menos un carácter especial</p>
                                        <img src={iconCheck} width="19.3" height="19.3" alt="" />
                                    </>
                                ) : <p className="check-parrafo pb-3 pr-4 text-muted">Tener al menos un carácter especial</p>

                            }
                        </div>
                        <div className="d-flex">
                            {
                                props.esMayuscula ? (
                                    <>
                                        <p className="check-parrafo pb-3 pr-4">Tener al menos una mayúscula</p>
                                        <img src={iconCheck} width="19.3" height="19.3" alt="" />
                                    </>
                                ) : <p className="check-parrafo pb-3 pr-4 text-muted">Tener al menos una mayúscula</p>

                            }
                        </div>
                        <div className="d-flex">
                            {
                                props.esNumero ? (
                                    <>
                                        <p className="check-parrafo pb-3 pr-4">Tener  al menos un número</p>
                                        <img src={iconCheck} width="19.3" height="19.3" alt="" />
                                    </>
                                ) : <p className="check-parrafo pb-3 pr-4 text-muted">Tener  al menos un número</p>

                            }
                        </div>
                    </div>
                ) : null
            }
        </>
    )
}

export default CheckLogin
