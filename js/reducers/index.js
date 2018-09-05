import { combineReducers } from "redux";
import places from "./placeReducer";
import session from "./sessionReducer";
import users from "./userReducer";

const rootReducer = combineReducers({ places, session, users });

export default rootReducer;
