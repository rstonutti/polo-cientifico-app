import { combineReducers } from "redux";

import { authReducer } from "./autoReducer";
import postReducer from "./postReducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
});
