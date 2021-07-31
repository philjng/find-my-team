import { genericApi } from "../api/genericApi";

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

export const signUpAction = (data) => {
  return {
    type: "SIGNUP",
    payload: {
      ...data,
    },
  };
};

export const addGroup = (data) => {
  return {
    type: "ADD_GROUP",
    payload: data,
  };
};

export const removeGroup = (data) => {
  return {
    type: "REMOVE_GROUP",
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

export const getUser = async (dispatch, id) => {
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

export const editUserProfile = async (dispatch, id, data) => {
  try {
    const res = await genericApi.put(`/api/users/${id}`, data);
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
