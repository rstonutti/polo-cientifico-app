import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../auth/Login";

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route path="/*" element={<Navigate to="/auth/login" />} />
    </Routes>
  );
};
