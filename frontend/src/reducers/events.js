import { combineReducers } from "redux";

const _ = require("lodash");

const eventsReducer = (events = [], action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return events;
    case "GET_EVENTS":
      return action.payload;
    default:
      return events;
  }
};

const eventReducer = (event = {}, action) => {
  switch (action.type) {
    case "PARTICIPANT_JOIN":
      return event;
    case "GET_EVENT":
      return action.payload;
    case "ADD_COMMENT":
      return event;
    default:
      return event;
  }
};

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
});
