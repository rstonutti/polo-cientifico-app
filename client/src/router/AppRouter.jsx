import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../pages/routes/AuthRoutes";
import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";
import Navbar from "../components/navbar/Navbar";
import Home from "../pages/home/Home";
import { useDispatch, useSelector } from "react-redux";

import { startChecking } from "../redux/actions/auth";

const AppRouter = () => {
  const dispatch = useDispatch();
  const { checking, uid } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  if (checking) {
    return <h5 className="d-flex justify-content-center mt-5">Espere...</h5>;
  }

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
          path="/*"
          element={
            <PrivateRoutes isLogged={!!uid}>
              <div className="container">
                <Navbar />
                <Routes>
                  <Route path="/" element={<Home />} />
                </Routes>
              </div>
            </PrivateRoutes>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
