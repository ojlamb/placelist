/* eslint-disable */
import axios from "axios";
import { LOGIN_USER_SUCCESS, LOG_OUT } from "./actions";

export function LoginUserSuccess(place) {
  return { type: LOGIN_USER_SUCCESS, payload: place };
}

export function loginUser(credentials) {
  return dispatch => {
    axios
      .post(`http://localhost:5000/login`, { credentials })
      .then(response => {
        sessionStorage.setItem("jwt", response.jwt);
        dispatch(LoginUserSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}

export function logOutUser() {
  sessionStorage.removeItem("jwt");
  return { type: LOG_OUT };
}
