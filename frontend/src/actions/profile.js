import { genericApi } from "../api/genericApi";
import {
  SUCCESS,
  WARNING,
} from "../components/Snackbar/SnackbarSeverityConstants";
import { showSnackbar } from "./snackbar";

export const getUserProfileGroups = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}/groups`);
    dispatch({
      type: "GET_USER_PROFILE_GROUPS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER_PROFILE_GROUPS",
      payload: e,
    });
  }
};

export const getUserProfileEvents = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}/events`);
    dispatch({
      type: "GET_USER_PROFILE_EVENTS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER_PROFILE_EVENTS",
      payload: e,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}`);
    dispatch({
      type: "GET_USER_PROFILE",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER_PROFILE",
      payload: e,
    });
  }
};

export const editUserProfile = (id, data) => async (dispatch) => {
  // optimistically go through with the changes, otherwise it takes up to 3 seconds
  dispatch({
    type: "GET_USER_PROFILE",
    payload: data,
  });
  dispatch({
    type: "GET_USER",
    payload: data,
  });
  try {
    const res = await genericApi.put(`/api/users/${id}`, data);
    dispatch({
      type: "GET_USER_PROFILE",
      payload: res.data,
    });
    dispatch({
      type: "GET_USER",
      payload: data,
    });
    dispatch(showSnackbar(SUCCESS, "Your changes have been saved."));
  } catch (e) {
    dispatch({
      type: "ERROR_EDIT_USER_PROFILE",
      payload: e,
    });
    dispatch(getUserProfile(id));
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with saving your changes. Please try again"
      )
    );
    dispatch({
      type: "GET_USER",
      payload: data,
    });
  }
};
