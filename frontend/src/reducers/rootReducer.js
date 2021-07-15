import { combineReducers } from "redux";
import user from "./user"
import events from "./events"
import {groups} from "./groups";

const rootReducer = combineReducers({
  user,
  events: events,
  groups: groups
});

export default rootReducer;
