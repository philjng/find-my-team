import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import events from "./events"

const allReducers = combineReducers({
  user: userReducer,
  events: events
});
export default allReducers;
