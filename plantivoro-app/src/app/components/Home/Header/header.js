import React from "react";
import { withRouter } from "react-router-dom";
import { useDispatch } from "react-redux";
import { cerrarSesionAccion } from "../../../Redux/Login/usuarioDucks";

const Header = (props) => {

  const dispatch = useDispatch();

  const closeSesion = () => {
    dispatch(cerrarSesionAccion());
    props.history.push("/login");
  };

  return (
    <nav>
      <div className="logo">Mandivoro</div>
      <ul>
        <li>Inicio</li>
        <li>Nuestros Productos</li>
        <li>Sobre Nosotros</li>
        <li>Contáctanos</li>
      </ul>
      <div className="search">
        <i className="fa fa-search"></i>
        <i className="fas fa-shopping-basket"></i>
      </div>
      <button onClick={() => closeSesion()}>Cerrar sesión</button>
    </nav>
  );
}

export default withRouter(Header)
