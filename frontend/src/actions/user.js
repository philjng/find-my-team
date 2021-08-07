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

export const signUpAction = (id, data) => async (dispatch) => {
  const res = await genericApi.post(`/api/users`, {
    ...data,
    eventsJoined: [],
    eventsCreated: [],
    groups: [],
    _id: id,
    lastModified: new Date(),
    image: "",
  });
  return {
    type: "SIGNUP",
    payload: res.data,
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
