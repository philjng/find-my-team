import {genericApi} from "../api/genericApi";
import {showSnackbar} from "./snackbar";
import {SUCCESS, WARNING} from "../components/Snackbar/SnackbarSeverityConstants";

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

export const updateEvent = (eventId, updatedData) => async (dispatch) => {
  try {
    genericApi.put(`/api/events/${eventId}`, updatedData)
      .then((res) => {
        dispatch({
          type: "UPDATE_EVENT",
          payload: res.data
        })
        dispatch(getEventPageData(eventId));
        dispatch(showSnackbar(SUCCESS, "Event has been updated."));
      })
  } catch (e) {
    dispatch({
      type: "UPDATE_EVENT_ERROR",
      payload: e.message,
    });
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with updating the event. Please try again."
      )
    );
  }}

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

export const createEvent = (data) => async (dispatch) => {
  try {
    genericApi.post("/api/events", data)
      .then((res) => {
        dispatch({
          type: "CREATE_EVENT",
          payload: res.data,
        });
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "Event created."));
      })
  } catch (e) {
    dispatch({
      type: "ERROR_CREATE_EVENT",
      payload: e.message
    })
  }
}

export const deleteEvent = async (dispatch, eventId) => {
  try {
    const res = genericApi.delete(`/api/events/${eventId}`)
      .then(() => {
        dispatch({
          type: "DELETE_EVENT",
          payload: res.data,
        })
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "Event deleted."));
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
    const res = genericApi.patch(`/api/events/${eventId}/comments`, {
      comment: {user, text},
    })
      .then(() => {
        dispatch({
          type: "ADD_COMMENT",
          payload: res.data,
        })
      })
      .then(() => {
        dispatch(getEvent(eventId));
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

export const addMapMarker = (dispatch, marker) => {
  dispatch({
    type: "ADD_MAP_MARKER",
    payload: marker,
  });
};
