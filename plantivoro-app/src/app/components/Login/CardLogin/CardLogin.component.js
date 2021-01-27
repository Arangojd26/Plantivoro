import React from "react";
import { withRouter } from "react-router-dom";
import iconPassHide from '../../../../assets/icons/passHide.svg'
import iconPassShow from '../../../../assets/icons/passShow.svg'
import "./CardLogin.scss";
import { useDispatch, useSelector } from 'react-redux'
import { ingresarUsuarioNormalAccion, registrarUsuarioNormalAccion } from '../../../Redux/Login/usuarioDucks'
import CheckLogin from '../CheckLogin/CheckLogin.component';
import ModalLoginComponent from '../ModalLogin/ModalLogin.component';
import ButtonLogin from '../ButtonLogin/ButtonLogin.component';
import ButtonGoogle from '../ButtonGoogle/ButtonGoogle.component';
import SwitchLogin from '../SwitchLogin/SwitchLogin.component';
import TitleLogin from '../TitleLogin/TitleLogin.component';

const CardLogin = (props) => {

  const dispatch = useDispatch();

  const loading = useSelector((store) => store.usuario.loading);
  const activo = useSelector((store) => store.usuario.activo);

  const [labelEmail, setLabelEmail] = React.useState(false);
  const [labelPass, setLabelPass] = React.useState(false);
  const [LabelPassConfirm, setLabelPassConfirm] = React.useState(false);
  const [labelNombre, setLabelNombre] = React.useState(false);
  const [verIconViewPass, setVerIconViewPass] = React.useState(
    "iconpass d-none"
  );
  const [verIconViewPassConfirm, setVerIconViewPassConfirm] = React.useState(
    "iconpass d-none"
  );
  const [changeIconPass, setChangeIconPass] = React.useState(false);
  const [changeIconPassConfirm, setChangeIconPassConfirm] = React.useState(
    false
  );

  const [nombre, setNombre] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pass, setPass] = React.useState("");
  const [passConfirm, setPassConfirm] = React.useState("");
  const [errorUser, setErrorUser] = React.useState(null);
  const [esCheck, setEsCheck] = React.useState(false);
  const [es8Caracteres, set8Caracteres] = React.useState(false);
  const [esCaracterEspecial, setCaracterEspecial] = React.useState(false);
  const [esMayuscula, setMayuscula] = React.useState(false);
  const [esNumero, setNumero] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  const [esRegistro, setEsRegistro] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [ingresar, setIngresar] = React.useState(false);

  React.useEffect(() => {
    if (activo) {
      props.history.push("/");
    }
  });

  const controlAnimacionLabelNombre = (val) =>
    val === "" ? setLabelNombre(false) : setLabelNombre(true);
  const controlAnimacionLabelEmail = (val) =>
    val === "" ? setLabelEmail(false) : setLabelEmail(true);

  const controlAnimacionLabelPass = (val) => {
    if (val === "") {
      setLabelPass(false);
      setVerIconViewPass("iconpass d-none");
    } else {
      setLabelPass(true);
    }
  };
  const controlAnimacionLabelPassRegister = (val) => {
    setEsCheck(!esCheck);
    if (val === "") {
      setLabelPass(false);
      setVerIconViewPass("iconpass d-none");
    } else {
      setLabelPass(true);
    }
  };
  const controlAnimacionLabelPassConfirm = (val) => {
    if (val === "") {
      setLabelPassConfirm(false);
      setVerIconViewPassConfirm("iconpass d-none");
    } else {
      setLabelPassConfirm(true);
    }
  };
  const focusPass = (val) => {
    setLabelPass(true);
    setVerIconViewPass("iconpass");
  };
  const focusPassRegistro = (val) => {
    setLabelPass(true);
    setVerIconViewPass("iconpass");
    setEsCheck(true);
  };
  const focusPassConfirm = (val) => {
    setLabelPassConfirm(true);
    setVerIconViewPassConfirm("iconpass");
  };

  const procesarDatos = (e) => {
    e.preventDefault();
    let contandor = 0;

    if (!nombre.trim() && esRegistro) {
      setError("Ingrese nombre");
      contandor++;
    }
    if (!email.trim()) {
      setError("Ingrese email");
      contandor++;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorUser("El correo introducido no es valido");
      contandor++;
    }
    if (!/com/.test(email) && esRegistro) {
      setErrorUser("El email debe terminar en .com");
      contandor++;
    }
    if (!pass.trim()) {
      setError("Ingrese Constraseña");
      contandor++;
    }
    if (pass.length < 8 && esRegistro) {
      set8Caracteres(false);
      contandor++;
    } else {
      set8Caracteres(true);
    }

    if (!/^[^A-Z]*[A-Z][^A-Z]*$/.test(pass) && esRegistro) {
      setMayuscula(false);
      contandor++;
    } else {
      setMayuscula(true);
    }

    if (!/[0-9]/.test(pass) && esRegistro) {
      setNumero(false);
      contandor++;
    } else {
      setNumero(true);
    }

    if (!/[!@#$%^&*]/.test(pass) && esRegistro) {
      setCaracterEspecial(false);
      contandor++;
    } else {
      setCaracterEspecial(true);
    }

    if (pass !== passConfirm && esRegistro) {
      setError("Las contraseñas no coinciden");
      contandor++;
    }

    if (contandor > 0) {
      return;
    } else {
      setError(null);
      setErrorUser(null);
      console.log("Correcto...");
      setIngresar(true);
      puedeIngresar(e);
    }
  };

  const puedeIngresar = (e) => {
    e.preventDefault();
    if (esRegistro && ingresar) {
      registrar();
      setIngresar(false);
    } else if (!esRegistro) {
      login();
    }
  };

  const login = React.useCallback(async () => {
    try {
      dispatch(ingresarUsuarioNormalAccion(email, pass));
      console.log("se activa login");
      props.history.push("/");
      setEmail("");
      setPass("");
      setError(null);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no válido");
      }
      if (error.code === "auth/user-not-found") {
        setError("Usuario no registrado");
      }
      if (error.code === "auth/wrong-password") {
        setError("La contraseña que ingresaste es incorrecta");
      }
    }
  }, [email, pass, dispatch, props.history]);

  const registrar = React.useCallback(async () => {
    try {
      dispatch(registrarUsuarioNormalAccion(nombre, email, pass));
      console.log("se activa Registro");
      setNombre("");
      setEmail("");
      setPass("");
      setError(null);
      setErrorUser(null);
      setModal(true);
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        setError("Email no válido");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("El email ya está en uso");
      }
    }
  }, [nombre, email, pass, dispatch]);

  return (
    <>
      <ModalLoginComponent open={modal} />
      <div className="card Card-Login" id="Position-Card">
        <div className="card-body">
          <TitleLogin esRegistro={esRegistro} />
          <div className="container-form">
            <form onSubmit={procesarDatos}>
              <CheckLogin
                esCheck={esCheck}
                es8Caracteres={es8Caracteres}
                esCaracterEspecial={esCaracterEspecial}
                esMayuscula={esMayuscula}
                esNumero={esNumero}
              />
              {esRegistro ? (
                <div
                  className={
                    labelNombre
                      ? "input-group pt-4 focused"
                      : "input-group pt-4"
                  }
                >
                  <label className="form-label" htmlFor="first">
                    Nombre
                  </label>
                  <input
                    type="text"
                    className="form-control input-login"
                    onChange={(e) => setNombre(e.target.value)}
                    value={nombre}
                    onClick={() => setLabelNombre(true)}
                    onBlur={(e) => controlAnimacionLabelNombre(e.target.value)}
                    onFocus={() => setLabelNombre(true)}
                    // onKeyUp={(e) => procesarDatos(e)}
                  />
                </div>
              ) : null}
              <div
                className={
                  labelEmail ? "input-group pt-4 focused" : "input-group pt-4"
                }
              >
                <label className="form-label" htmlFor="first">
                  Correo electrónico
                </label>
                <input
                  type="text"
                  className="form-control input-login"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onClick={() => setLabelEmail(true)}
                  onBlur={(e) => controlAnimacionLabelEmail(e.target.value)}
                  onFocus={() => setLabelEmail(true)}
                />
              </div>
              {errorUser && (
                <p className="text-danger text-left ml-3 pt-1">
                  <small>{errorUser}</small>
                </p>
              )}
              {esRegistro ? (
                <>
                  <div
                    className={
                      labelPass
                        ? "input-group pt-4 focused"
                        : "input-group pt-4"
                    }
                  >
                    <label className="form-label" htmlFor="last">
                      Contraseña
                    </label>
                    <input
                      type={changeIconPass ? "text" : "password"}
                      className="form-control input-login"
                      onChange={(e) => setPass(e.target.value)}
                      value={pass}
                      onClick={() => focusPassRegistro()}
                      onFocus={() => focusPassRegistro()}
                      onBlur={(e) =>
                        controlAnimacionLabelPassRegister(e.target.value)
                      }
                      onKeyUp={(e) => procesarDatos(e)}
                    />
                    <span className="input-group-append">
                      <div className="input-group-text bg-transparent">
                        <img
                          className={verIconViewPass}
                          src={changeIconPass ? iconPassShow : iconPassHide}
                          width="18"
                          height="18"
                          alt=""
                          onClick={() => setChangeIconPass(!changeIconPass)}
                        />
                      </div>
                    </span>
                  </div>
                  <div
                    className={
                      LabelPassConfirm
                        ? "input-group pt-4 focused"
                        : "input-group pt-4"
                    }
                  >
                    <label className="form-label" htmlFor="last">
                      Confirmar contraseña
                    </label>
                    <input
                      type={changeIconPassConfirm ? "text" : "password"}
                      className="form-control input-login"
                      onChange={(e) => setPassConfirm(e.target.value)}
                      value={passConfirm}
                      onClick={() => focusPassConfirm()}
                      onFocus={() => focusPassConfirm()}
                      onBlur={(e) =>
                        controlAnimacionLabelPassConfirm(e.target.value)
                      }
                      onKeyUp={(e) => procesarDatos(e)}
                    />
                    <span className="input-group-append">
                      <div className="input-group-text bg-transparent">
                        <img
                          className={verIconViewPassConfirm}
                          src={
                            changeIconPassConfirm ? iconPassShow : iconPassHide
                          }
                          width="18"
                          height="18"
                          alt=""
                          onClick={() =>
                            setChangeIconPassConfirm(!changeIconPassConfirm)
                          }
                        />
                      </div>
                    </span>
                  </div>
                </>
              ) : (
                <div
                  className={
                    labelPass ? "input-group pt-4 focused" : "input-group pt-4"
                  }
                >
                  <label className="form-label" htmlFor="last">
                    Contraseña
                  </label>
                  <input
                    type={changeIconPass ? "text" : "password"}
                    className="form-control input-login"
                    onChange={(e) => setPass(e.target.value)}
                    value={pass}
                    onClick={() => focusPass()}
                    onFocus={() => focusPass()}
                    onBlur={(e) => controlAnimacionLabelPass(e.target.value)}
                  />
                  <span className="input-group-append">
                    <div className="input-group-text bg-transparent">
                      <img
                        className={verIconViewPass}
                        src={changeIconPass ? iconPassShow : iconPassHide}
                        width="18"
                        height="18"
                        alt=""
                        onClick={() => setChangeIconPass(!changeIconPass)}
                      />
                    </div>
                  </span>
                </div>
              )}
              {error && (
                <p className="text-danger text-left ml-3 pt-2">
                  <small>{error}</small>
                </p>
              )}
              <SwitchLogin
                esRegistro={esRegistro}
                setEsRegistro={setEsRegistro}
              />
              <ButtonLogin esRegistro={esRegistro} loading={loading} />
              <ButtonGoogle
                setOpenLoading={props.setOpenLoading}
                loading={loading}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default withRouter(CardLogin);
