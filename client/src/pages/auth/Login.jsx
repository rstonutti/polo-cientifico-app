import logo from "../../assets/uni.png";
import "./login.scss";

const Login = () => {
  return (
    <div className="login-container">
      <div className="left d-flex">
        <div className="left-img">
          <img src={logo} alt="" />
        </div>
        <div className="left-text step-5 fw-bold">ipf-devs</div>
      </div>
      <div className="right d-flex">
        <div className="right-container">
          <div className="right-welcome step-3 fw-bold">Bienvenidos</div>
          <div className="right-input">
            <label htmlFor="">Usuario</label>
            <input className="step--1" type="text" />
          </div>
          <div className="right-input">
            <label htmlFor="">Contraseña</label>
            <input className="step--1" type="text" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
