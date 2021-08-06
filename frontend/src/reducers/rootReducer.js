import { combineReducers } from "redux";
import user from "./user";
import events from "./events";
import groups from "./groups";
import snackbar from "./snackbar";
import profile from "./profile";
import search from "./search";

const rootReducer = combineReducers({
  user,
  events,
  groups,
  snackbar,
  profile,
  search,
});

export default rootReducer;
