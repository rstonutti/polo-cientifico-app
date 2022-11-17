import { useDispatch } from "react-redux";
import { useForm } from "../../hooks/useForm";
import { startLogin } from "../../redux/actions/auth";
import logo from "../../assets/uni.png";
import "./login.scss";

const Login = () => {
  const dispatch = useDispatch();

  const [formLoginValues, handleChange] = useForm({
    correo: "",
    password: "",
  });

  const { correo, password } = formLoginValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(correo, password));
  };

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
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Correo</label>
              <input
                type="email"
                className="form-control step-0"
                name="correo"
                aria-describedby="emailHelp"
                placeholder="Ingrese su correo..."
                value={correo}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label>Contraseña</label>
              <input
                type="password"
                className="form-control step-0"
                name="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-success step-0">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
