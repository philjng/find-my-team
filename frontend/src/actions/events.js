import axios from "axios";

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

export const participantJoin = async (dispatch, eventId, userId, userEmail) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/events/${eventId}/participants`,
      {
        participant: {
          uid: userId,
          email: userEmail,
        },
      }
    );
    dispatch({
      type: "PARTICIPANT_JOIN",
      payload: res.data,
    });
    getEvent(dispatch, eventId);
  } catch (e) {
    dispatch({
      type: "ERROR_PARTICIPANT_JOIN",
      payload: e,
    });
  }
};

export const participantLeave = async (dispatch, eventId, userId, userEmail) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/events/${eventId}/removeParticipant`,
      {
        participant: {
          uid: userId,
          email: userEmail,
        },
      }
    );
    dispatch({
      type: "PARTICIPANT_LEAVE",
      payload: res.data,
    });
    getEvent(dispatch, eventId);
  } catch (e) {
    dispatch({
      type: "ERROR_PARTICIPANT_LEAVE",
      payload: e,
    });
  }
};

export const deleteEvent = async (dispatch, eventId) => {
  try {
    const res = await axios.delete(`http://localhost:3001/events/${eventId}`);
    dispatch({
      type: "DELETE_EVENT",
      payload: res.data,
    });
    getEvents(dispatch);
  } catch(e) {
    dispatch({
      type: "ERROR_DELETE_EVENT",
      payload: e
    })
  }
};

export const addComment = async (dispatch, eventId, user, text) => {
  try {
    const res = await axios.patch(
      `http://localhost:3001/events/${eventId}/comments`,
      {
        comment: { user, text },
      }
    );
    dispatch({
      type: "ADD_COMMENT",
      payload: res.data,
    });
    getEvent(dispatch, eventId);
  } catch (e) {
    dispatch({
      type: "ERROR_ADD_COMMENT",
      payload: e,
    });
  }
};

export const getEvents = async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:3001/events`);
    dispatch({
      type: "GET_EVENTS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_EVENTS",
      payload: e,
    });
  }
};

export const getEvent = async (dispatch, id) => {
  try {
    const res = await axios.get(`http://localhost:3001/events/${id}`);
    dispatch({
      type: "GET_EVENT",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_EVENT",
      payload: e,
    });
  }
};
