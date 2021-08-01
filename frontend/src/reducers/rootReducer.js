import { combineReducers } from "redux";
import user from "./user"
import events from "./events"
import {groups} from "./groups";
import {snackbar} from "./snackbar";

const rootReducer = combineReducers({
  user,
  events: events,
  groups: groups,
  snackbar: snackbar
});

export default rootReducer;
