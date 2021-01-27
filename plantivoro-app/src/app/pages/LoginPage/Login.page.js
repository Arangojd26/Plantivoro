import React from "react";
import CardLogin from "../../components/Login/CardLogin/CardLogin.component";
import LoadingLogin from "../../components/Login/LoadingLogin/LoadingLogin.component";
import "./LoginPage.scss";

const Login = () => {

  const [openLoading, setOpenLoading] = React.useState(false);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center h-100">
        <div className="col-xl-8 col-lg-7 fondoLogin">
          <div className="layer w-100" />
          {/* <div className="container-logo text-center">
            <img className="logoLogin" src={LogoLowBeat} alt="" />
          </div> */}
        </div>
        <div className="col-xl-4 col-lg-5 o-fondo-card">
          <LoadingLogin openLoading={openLoading} />

          <div className="row pt-md-2 justify-content-center">
            <div className="col-xl-12 col-lg-12">
              <CardLogin setOpenLoading={setOpenLoading} />
            </div>
          </div>
          {/* <Footer /> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
