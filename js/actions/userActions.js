/* eslint-disable */
import axios from "axios";
import { CREATE_USER_SUCCESS } from "./actions";

export function CreateUserSuccess(place) {
  return { type: CREATE_USER_SUCCESS, payload: place };
}

export function createUser(user) {
  return dispatch => {
    axios
      .post(`http://localhost:5000/users`, { user })
      .then(response => {
        dispatch(CreateUserSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}
