/* eslint-disable */
import axios from "axios";
import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS
} from "./actions";

export function loadPlacesSuccess(places) {
  return { type: LOAD_PLACES_SUCCESS, payload: places };
}

export function loadPlaces() {
  return dispatch => {
    axios
      .get(`http://localhost:5000/places.json`)
      .then(response => {
        dispatch(loadPlacesSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}

export function getPlaceSuccess(place) {
  return { type: GET_PLACE_SUCCESS, payload: place };
}

export function getPlaceById(id) {
  return dispatch => {
    axios
      .get(`http://localhost:5000/api/v1/places/` + id)
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
  return dispatch => {
    axios
      .post(`http://localhost:5000/api/v1/places`, { place })
      .then(response => {
        dispatch(createPlaceSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}