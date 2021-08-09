import {combineReducers} from "redux";

const initialState = {
  events: [],
  searchResults: [],
  event: {},
  eventParticipants: []
}

const events = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_COMMENT":
      return state;
    case "GET_EVENTS":
      return {
        ...state,
        events: action.payload
      };
    case "GET_EVENT":
      return {
        ...state,
        event: action.payload
      };
    case "GET_EVENT_PARTICIPANTS":
      return {
        ...state,
        eventParticipants: action.payload
      }
    default:
      return state;
  }
};

const mapReducer = (marker = "", action) => {
  if (action.type === "ADD_MAP_MARKER") {
    return action.payload;
  }
  return marker;
};

export default combineReducers({
  events,
  marker: mapReducer
});

