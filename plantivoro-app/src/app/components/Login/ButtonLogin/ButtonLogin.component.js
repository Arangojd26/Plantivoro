import React from "react";
import "./ButtonLogin.scss";

const ButtonLogin = (props) => {
  return (
    <div className="text-center">
      <button
        className="btn btn-iniciar-sesion"
        type="submit"
        // onClick={(e) => signIn(e)}
        disabled={props.loading}
      >
        {props.esRegistro ? "Registrarse" : "Iniciar sesión"}
      </button>
    </div>
  );
};

export default ButtonLogin;
