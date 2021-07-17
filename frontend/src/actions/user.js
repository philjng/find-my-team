import axios from "axios";

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

export const getCreatedGroups = (data) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3001/groups/created`, { params: { userId: data } })
    dispatch( {
      type: "GET_CREATED_GROUPS",
      payload: res.data
    })
  } catch (e) {
    dispatch( {
      type: "ERROR_GROUPS",
      payload: console.log(e)
    })
  }
}

export const getJoinedGroups = (data) => async dispatch => {
  try {
    const res = await axios.get(`http://localhost:3001/groups/joined`, { params: { userId: data } })
    dispatch( {
      type: "GET_JOINED_GROUPS",
      payload: res.data
    })
  } catch (e) {
    dispatch( {
      type: "ERROR_GROUPS",
      payload: console.log(e)
    })
  }
}