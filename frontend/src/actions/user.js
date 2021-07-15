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
