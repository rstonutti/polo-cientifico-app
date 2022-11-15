import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../pages/routes/AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const uid = false;

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/auth/*"
          element={
            <PublicRoutes isLogged={!!uid}>
              <AuthRoutes />
            </PublicRoutes>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoutes isLogged={!!uid}>
              <Home />
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
