import { combineReducers } from "redux";
import places from "./placeReducer";

const rootReducer = combineReducers({ places });

export default rootReducer;
