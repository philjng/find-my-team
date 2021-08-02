import { genericApi } from "../api/genericApi";
import {
  SUCCESS,
  WARNING,
} from "../components/Snackbar/SnackbarSeverityConstants";
import { showSnackbar } from "./snackbar";

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

export const signUpAction = () => {
  return {
    type: "SIGNUP",
  };
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
      payload: console.log(e),
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
      payload: console.log(e),
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
      payload: console.log(e),
    });
  }
};

export const editUserProfile = (id, data) => async (dispatch) => {
  try {
    const res = await genericApi.put(`/api/users/${id}`, data);
    dispatch({
      type: "GET_USER",
      payload: res.data,
    });
    dispatch(showSnackbar(SUCCESS, "Your changes have been saved."));
  } catch (e) {
    dispatch({
      type: "ERROR_EDIT_USER_PROFILE",
      payload: console.log(e),
    });
    dispatch(getUser(id));
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with saving your changes. Please try again"
      )
    );
  }
};

export const searchUsers = async (dispatch, searchText) => {
  try {
    genericApi.get(`api/users/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_USERS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USERS",
      payload: console.log(e),
    });
  }
};
