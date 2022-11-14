import "./navbar.scss";

const Navbar = () => {
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
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
          </ul>
          <ul className="navbar-nav mb-2 mb-lg-0 ms-auto bd-highlight">
            <li className="nav-item">
              <div className="nav-link step-0" to="/auth/login">
                Rodrigo
              </div>
            </li>
            <li className="nav-item">
              <div className="nav-link step-0" to="/">
                cerrar sesión
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
