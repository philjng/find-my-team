const mockState = {
  isAuth: true,
  user_id: 1
}

const userReducer = (state = mockState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuth: true,
        user_id: action.payload.user_id,
      };
    case "LOGOUT":
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
