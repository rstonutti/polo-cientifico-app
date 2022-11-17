import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import logo from "../../assets/uni.png";
import { startLogout } from "../../redux/actions/auth";
import "./navbar.scss";

const Navbar = () => {
  const dispatch = useDispatch();
  const { alias } = useSelector((state) => state.auth);

  console.log(alias);

  const handleLogout = () => {
    dispatch(startLogout());
  };

  return (
    <nav className="navbar sticky-top navbar-expand navbar-light bg-light">
      <div className="container-fluid">
        <div>
          <img className="mx-2" src={logo} alt="Universidad" width="35px" />
        </div>
        <div className="navbar-brand" to="/">
          <span className="fw-bold step-2">ipf-devs</span>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto bd-highlight">
            <li className="nav-item">
              <div className="nav-link step-0 mx-3" to="/adopciones">
                General
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link step-0 mx-3" to="/busquedas">
                Materias
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link step-0 mx-3" to="/busquedas">
                Asistencias
              </div>
            </li>
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto bd-highlight">
            <li className="nav-item">
              <div className="nav-link step-0" to="/auth/login">
                <b>{alias}</b>
              </div>
            </li>
            <li className="nav-item">
              <Link className="nav-link step-0" to="/" onClick={handleLogout}>
                logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
