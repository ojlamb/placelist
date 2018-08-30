/* eslint-disable */
import axios from "axios";
import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS,
  UPDATE_PLACE_SUCCESS,
  DELETE_PLACE_SUCCESS
} from "./actions";

export function loadPlacesSuccess(places) {
  return { type: LOAD_PLACES_SUCCESS, payload: places };
}

export function loadPlaces() {
  return dispatch => {
    axios
      .get(`http://localhost:5000/places`)
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
      .get(`http://localhost:5000/places/` + id)
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
      .post(`http://localhost:5000/places`, { place })
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
  return dispatch => {
    axios
      .put(`http://localhost:5000/places/` + place.id, { place })
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
  return dispatch => {
    axios
      .delete(`http://localhost:5000/places/` + id)
      .then(response => {
        dispatch(deletePlaceSuccess(response.data));
      })
      .catch(error => {
        console.error("axios error", error); // eslint-disable-line no-console
      });
  };
}
