/* eslint-disable */
import axios from "axios";
import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS,
  UPDATE_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from "./actions";

export function requestHeaders() {
  return { AUTHORIZATION: `Bearer ${sessionStorage.jwt}` };
}

export function loadPlacesSuccess(places) {
  return { type: LOAD_PLACES_SUCCESS, payload: places };
}

export function loadPlaces() {
  const headers = requestHeaders();
  return dispatch => {
    axios
      .get(`http://localhost:5000/places`, { headers })
      .then(response => {
        dispatch(loadPlacesSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}

export function getPlaceSuccess(place) {
  const headers = requestHeaders();
  return { type: GET_PLACE_SUCCESS, payload: place };
}

export function getPlaceById(id) {
  const headers = requestHeaders();
  return dispatch => {
    axios
      .get(`http://localhost:5000/places/` + id, { headers })
      .then(response => {
        dispatch(getPlaceSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}

export function createPlaceSuccess(place) {
  return { type: CREATE_PLACE_SUCCESS, payload: place };
}

export function createPlace(place) {
  const headers = requestHeaders();
  return dispatch => {
    axios
      .post(`http://localhost:5000/places`, { place }, { headers })
      .then(response => {
        dispatch(createPlaceSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}

export function updatePlaceSuccess(place) {
  return { type: UPDATE_PLACE_SUCCESS, payload: place };
}

export function updatePlace(place) {
  const headers = requestHeaders();
  return dispatch => {
    axios
      .put(`http://localhost:5000/places/` + place.id, { place }, { headers })
      .then(response => {
        dispatch(updatePlaceSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}

export function deletePlaceSuccess(place) {
  return { type: DELETE_PLACE_SUCCESS, payload: place };
}

export function deletePlace(id) {
  const headers = requestHeaders();
  return dispatch => {
    axios
      .delete(`http://localhost:5000/places/` + id, { headers })
      .then(response => {
        dispatch(deletePlaceSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}
