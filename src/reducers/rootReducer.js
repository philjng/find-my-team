import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import events from "./events"

const rootReducer = combineReducers({
  user: userReducer,
  events: events
});
export default rootReducer;
