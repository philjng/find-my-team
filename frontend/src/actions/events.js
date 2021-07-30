import axios from "axios"

export const viewEventDetails = (event) => {
  return {
    type: "VIEW_EVENT_DETAILS",
    value: event,
  };
};

export const viewUpcomingEventsOnly = (events) => {
  return {
    type: "VIEW_UPCOMING_ONLY",
    events: events,
  };
};

export const viewAllEvents = (events) => {
  return {
    type: "VIEW_ALL_EVENTS",
    events: events,
  };
};

export const participantJoin = (user, event, events) => {
  return {
    type: "PARTICIPANT_JOIN",
    user: user,
    event: event,
    events: events,
  };
};

export const addComment = (user, event, text, events) => {
  return {
    type: "ADD_COMMENT",
    user: user,
    event: event,
    text: text,
    events: events,
  };
};

export const editText = (text) => {
  return {
    type: "EDIT_TEXT",
    text: text,
  };
};

export const searchEvents = (text) => async dispatch => {
  try {
    axios.get(`http://localhost:3001/events/search${text}`)
    .then((res) => {
      dispatch({
        type: "SEARCH_EVENTS",
        payload: res.data
      })
    })
  } catch (e) {
    dispatch({
      type: "ERROR_EVENTS",
      payload: console.log(e)
    })

  }
};
