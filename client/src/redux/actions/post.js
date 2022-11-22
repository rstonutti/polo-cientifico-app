import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const getPosts = () => {
  return async (dispatch) => {
    const resp = await fetchSinToken("api/v1/publicaciones");

    const { publicaciones } = await resp.json();

    if (resp.ok) {
      dispatch({
        type: types.getPosts,
        payload: publicaciones,
      });
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const addPosts = (values) => {
  return async (dispatch) => {
    const resp = await fetchConToken("api/v1/publicaciones", values, "POST");

    const { publicacion, msg } = await resp.json();

    if (resp.ok) {
      dispatch({
        type: types.addPosts,
        payload: publicacion,
      });
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const deletePosts = (_id) => {
  return async (dispatch) => {
    const resp = await fetchConToken("api/v1/publicaciones", _id, "DELETE");

    const { msg } = await resp.json();

    if (resp.ok) {
      dispatch({
        type: types.deletePosts,
        payload: _id,
      });
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const addComments = (values) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "api/v1/publicaciones/commentario",
      values,
      "POST"
    );

    const { newComment, msg } = await resp.json();

    if (resp.ok) {
      dispatch({
        type: types.addComments,
        payload: newComment,
      });
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

export const deleteComment = (uid) => {
  return async (dispatch) => {
    const resp = await fetchConToken(
      "api/v1/publicaciones/comentario",
      uid,
      "DELETE"
    );

    const { msg } = await resp.json();

    if (resp.ok) {
      dispatch(
        dispatch({
          type: types.deleteComments,
          payload: uid,
        })
      );
    } else {
      Swal.fire("Error", msg, "error");
    }
  };
};

const fetch = () => ({
  type: types.fetch,
});

const success = () => ({
  type: types.success,
});
