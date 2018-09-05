import { LOGIN_USER_SUCCESS, LOG_OUT } from "../actions/actions";
import initialState from "./initialState";

const sessionReducer = (state = initialState.session, action) => {
  if (action.type === LOGIN_USER_SUCCESS) {
    sessionStorage.setItem("jwt", action.payload.jwt);
    return !!sessionStorage.jwt;
  }
  if (action.type === LOG_OUT) {
    sessionStorage.removeItem("jwt");
    return !!sessionStorage.jwt;
  }
  return state;
};

export default sessionReducer;
