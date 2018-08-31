import { LOGIN_USER_SUCCESS } from "../actions/actions";

const sessionReducer = (state = [], action) => {
  if (action.type === LOGIN_USER_SUCCESS) {
    sessionStorage.setItem("jwt", action.payload.jwt);
    return !!sessionStorage.jwt;
  }

  return state;
};

export default sessionReducer;
