import axios from "axios"

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

export const getUser = async (dispatch, id) => {
  try {
    const res = await axios.get(`http://localhost:3001/users/${id}`);
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
    const res = await axios.put(`http://localhost:3001/users/${id}`, data);
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
