import {
  LOAD_PLACES_SUCCESS,
  CREATE_PLACE_SUCCESS,
  GET_PLACE_SUCCESS
} from "../actions/actions";

const placeReducer = (state = [], action) => {
  if (action.type === LOAD_PLACES_SUCCESS) {
    return action.payload;
  }

  if (action.type === GET_PLACE_SUCCESS) {
    return [
      ...state.filter(place => place.id !== action.payload.id),
      Object.assign({}, action.payload)
    ];
  }

  if (action.type === CREATE_PLACE_SUCCESS) {
    return [...state, Object.assign({}, action.payload)];
  }

  return state;
};

export default placeReducer;
