const mockState = {
  isAuth: true,
  user_id: 1,
};

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("user", {
        isAuth: true,
        user_id: action.payload.user_id,
      });
      return {
        ...state,
        isAuth: true,
        user_id: action.payload.user_id,
      };
    case "LOGOUT":
      localStorage.removeItem("user")
      return {
        ...state,
        isAuth: false,
        user_id: null,
      };
    default:
      return state;
  }
};
export default userReducer;
