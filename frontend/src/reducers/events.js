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

export default events;
