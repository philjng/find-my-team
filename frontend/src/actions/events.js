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

export const participantLeave = (user, event, events) => {
  return {
    type: "PARTICIPANT_LEAVE",
    user: user, 
    event: event,
    events: events
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
