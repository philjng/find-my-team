import {genericApi} from "../api/genericApi";
import {showSnackbar} from "./snackbar";
import {SUCCESS} from "../components/Snackbar/SnackbarSeverityConstants";

export const getEventPageData = (eventId) => async (dispatch) => {
  dispatch(getEvent(eventId));
  dispatch(getEventParticipants(eventId));
}

export const getEventParticipants = (eventId) => async dispatch => {
  try {
    const res = await genericApi.get(`/api/events/${eventId}/participants`);
    dispatch({
      type: "GET_EVENT_PARTICIPANTS",
      payload: res.data
    });
  } catch (e) {
    dispatch({
      type: "ERROR_EVENT_PARTICIPANTS",
      payload: e.message
    })
  }
}

export const participantJoin = async (dispatch, eventId, userId) => {
  try {
    const res = genericApi.patch(`/api/events/${eventId}/participants`, {
      userId: userId,
    })
      .then(() => {
        dispatch({
          type: "PARTICIPANT_JOIN",
          payload: res.data,
        })
      })
      .then(() => {
        dispatch(getEventPageData(eventId))
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "You have joined the event."));
      });
  } catch (e) {
    dispatch({
      type: "ERROR_PARTICIPANT_JOIN",
      payload: e,
    });
  }
};

export const participantLeave = async (
  dispatch,
  eventId,
  userId,
) => {
  try {
    const res = genericApi.patch(
      `/api/events/${eventId}/removeParticipant`,
      {userId: userId}
    )
      .then(() => {
        dispatch({
          type: "PARTICIPANT_LEAVE",
          payload: res.data,
        })
      })
      .then(() => {
        dispatch(getEventPageData(eventId))
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "You have left the event."));
      });
  } catch (e) {
    dispatch({
      type: "ERROR_PARTICIPANT_LEAVE",
      payload: e,
    });
  }
};

export const deleteEvent = async (dispatch, eventId) => {
  try {
    const res = await genericApi.delete(`/api/events/${eventId}`);
    dispatch({
      type: "DELETE_EVENT",
      payload: res.data,
    })
      .then(() => {
        getEvents(dispatch);
      })
  } catch (e) {
    dispatch({
      type: "ERROR_DELETE_EVENT",
      payload: e,
    });
  }
};

export const addComment = async (dispatch, eventId, user, text) => {
  try {
    const res = await genericApi.patch(`/api/events/${eventId}/comments`, {
      comment: {user, text},
    });
    dispatch({
      type: "ADD_COMMENT",
      payload: res.data,
    })
      .then(() => {
        getEvents(dispatch);
      })
  } catch (e) {
    dispatch({
      type: "ERROR_ADD_COMMENT",
      payload: e,
    });
  }
};

export const getEvents = async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/events`);
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

export const getEvent = (eventId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/events/${eventId}`);
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
