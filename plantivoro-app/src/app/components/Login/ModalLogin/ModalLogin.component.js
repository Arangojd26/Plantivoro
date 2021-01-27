import React from 'react'
import {Modal, ModalBody, ModalFooter} from 'reactstrap';
import './ModalLogin.scss'
import IconCheckBig from '../../../../assets/icons/checkBig.svg'
// import { useDispatch } from 'react-redux'
// import { ingresarPorRegistroAccion } from '../../../Redux/Login/usuarioDucks'
import { withRouter } from "react-router-dom";

const ModalLogin = (props) => {

    // const dispatch = useDispatch()

    const [modal, setModal] = React.useState(false);

    React.useEffect(() => {
        
        setModal(props.open)

    }, [props.open])

    // const goHome = () => {

    //     dispatch(ingresarPorRegistroAccion())
    //     setModal(false)
    //     props.history.push("/");
    // }

    return (
        <Modal isOpen={modal} className="modal-dialog modal-dialog-centered modal-lg modal-login">
            <ModalBody>
                <div className="text-center">
                    <img src={IconCheckBig} width="99.2" height="99.2" className="mb-1" alt="" />
                    <p className="message-modal-login tex-center px-4">Se ha creado la cuenta correctamente</p>
                </div>
            </ModalBody>
            <ModalFooter className="modal-footer row justify-content-center">
                {/* <Button className="btn-modal-login" onClick={() => goHome()}>Aceptar</Button> */}
            </ModalFooter>
        </Modal>
    )
}

export default withRouter(ModalLogin)
