import { fetchSinToken, fetchConToken } from "../../helpers/fetch";
import { types } from "../types/types";
import Swal from "sweetalert2";

export const getPosts = () => {
  return async (dispatch) => {
    try {
      const resp = await fetchSinToken("api/v1/publicaciones");

      console.log(resp);

      const { publicaciones } = await resp.json();

      dispatch({
        type: types.getPosts,
        payload: publicaciones,
      });
    } catch (err) {
      dispatch({
        type: types.errorPost,
        payload: {
          msg: err.response.statusText,
          status: err.response.status,
        },
      });
    }
  };
};
