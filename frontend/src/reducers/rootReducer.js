import { combineReducers } from "redux";
import user from "./user"
import events from "./events"
import {groupsReducer} from "./groups";

const rootReducer = combineReducers({
  user,
  events: events,
  groups: groupsReducer
});

export default rootReducer;
