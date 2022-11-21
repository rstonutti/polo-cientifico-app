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
    case types.addPosts:
      return {
        ...state,
        posts: [...state.posts, action.payload],
        loading: false,
      };
    case types.deletePosts:
      const updatePost = state.posts.filter(
        (post) => post.uid != action.payload.uid
      );
      return {
        ...state,
        posts: updatePost,
        loading: false,
      };
    case types.addComments:
      const index = state.posts.findIndex(
        (post) => post.uid == action.payload.uid
      );
      state.posts[index] = action.payload;

      return {
        ...state,
      };
    case types.deleteComments:
      return {
        ...state,
        posts: state.posts.map((items) => ({
          ...items,
          comentario: items.comentario.filter(
            (item) => item._id != action.payload._id
          ),
        })),
        loading: false,
      };
    case types.errorPost:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case types.fetch:
      return {
        ...state,
        loading: false,
      };
    case types.success:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
