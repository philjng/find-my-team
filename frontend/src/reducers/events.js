import { combineReducers } from "redux";

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

const searchResultsReducer = (searchResults = [], action) => {
  if (action.type === "SEARCH EVENTS") {
    return action.result;
  } else {
    return searchResults;
  }
}

export default combineReducers({
  events: eventsReducer,
  event: eventReducer,
  searchResults: searchResultsReducer
});
