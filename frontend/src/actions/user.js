import { genericApi } from "../api/genericApi";
import { showSnackbar } from "./snackbar";
import {
  SUCCESS,
  ERROR,
} from "./../components/Snackbar/SnackbarSeverityConstants";

export const loginAction = (user_id) => {
  return {
    type: "LOGIN",
    payload: {
      user_id,
    },
  };
};

export const logoutAction = () => {
  return {
    type: "LOGOUT",
  };
};

export const signUpAction = (id, data) => async (dispatch) => {
  try {
    await genericApi.post(`/api/users`, {
      ...data,
      _id: id,
      lastModified: new Date(),
      image: null,
    });

    showSnackbar(SUCCESS, "Account successfully created.");
    return {
      type: "SIGNUP",
    };
  } catch (error) {
    showSnackbar(ERROR, error.message);
    return {
      type: "ERROR_SIGN_UP",
      payload: error,
    };
  }
};

export const joinGroup = (data) => {
  return {
    type: "JOIN_GROUP",
    payload: data,
  };
};

export const leaveGroup = (data) => {
  return {
    type: "LEAVE_GROUP",
    payload: data,
  };
};

export const getCreatedGroups = (data) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/created`, {
      params: { userId: data },
    });
    dispatch({
      type: "GET_CREATED_GROUPS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: e.message,
    });
  }
};

export const getJoinedGroups = (data) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/joined`, {
      params: { userId: data },
    });
    dispatch({
      type: "GET_JOINED_GROUPS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: e.message,
    });
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}`);
    dispatch({
      type: "GET_USER",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER",
      payload: e.message,
    });
  }
};

export const getUserEvents = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}/events`);
    dispatch({
      type: "GET_USER_EVENTS",
      payload: res.data,
    });
  } catch (e) {
    showSnackbar(ERROR, "There was an error with getting user events");
    dispatch({
      type: "ERROR_GET_USER_EVENTS",
      payload: e.message,
    });
  }
};

export const getHomePageData = (id) => async (dispatch) => {
  dispatch(getUser(id));
  dispatch(getCreatedGroups(id));
  dispatch(getJoinedGroups(id));
  dispatch(getUserEvents(id));
};
