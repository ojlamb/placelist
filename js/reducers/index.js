import { combineReducers } from "redux";
import places from "./placeReducer";
import sessions from "./sessionReducer";
import users from "./userReducer";

const rootReducer = combineReducers({ places, sessions, users });

export default rootReducer;
