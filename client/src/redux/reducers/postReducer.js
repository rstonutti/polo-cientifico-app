import { types } from "../types/types";

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.getPosts:
      return {
        ...state,
        posts: action.payload,
        loading: false,
      };
    case types.errorPost:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.addPost:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loading: false,
      };
    case types.addComment:
      return {
        ...state,
        post: { ...state.post, comments: action.payload },
        loading: false,
      };
    default:
      return state;
  }
}
