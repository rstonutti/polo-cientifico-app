import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const startLogin = (correo, password) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "api/v1/auth/login",
      { correo, password },
      "POST"
    );
    const { usuario, token, msg } = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login(usuario));
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const startRegister = (correo, password, usuario) => {
  return async (dispatch) => {
    const resp = await fetchSinToken(
      "auth/new",
      { correo, password, usuario },
      "POST"
    );
    const body = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", body.token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(
        login({
          uid: body.uid,
          name: body.name,
        })
      );
    } else {
      Swal.fire("Error", body.msg, "error");
    }
  };
};

export const startChecking = () => {
  return async (dispatch) => {
    const resp = await fetchConToken("api/v1/auth");
    const { usuario, token } = await resp.json();

    if (resp.ok) {
      localStorage.setItem("token", token);
      localStorage.setItem("token-init-date", new Date().getTime());

      dispatch(login(usuario));
    } else {
      dispatch(checkingFinish());
    }
  };
};

const checkingFinish = () => ({ type: types.authCheckingFinish });

const login = (user) => ({
  type: types.authLogin,
  payload: user,
});

export const startLogout = () => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(logout());
  };
};

const logout = () => ({ type: types.authLogout });
