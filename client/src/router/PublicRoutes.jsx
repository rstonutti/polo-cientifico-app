import { Navigate } from "react-router-dom";

const PublicRoutes = ({ isLogged, children }) => {
  return isLogged ? <Navigate to="/" /> : children;
};

export default PublicRoutes;
