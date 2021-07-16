const initialState = {
  user_id: 0,
  name: "user_0",
  userEvents: [],
  userGroups: {
    owned: [],
    joined: [],
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user_id: action.payload.user_id,
        name: "user_0",
      };
    case "LOGOUT":
      return {
        ...state,
        user_id: null,
        name: null
      };
    case "SIGNUP":
      return {
        ...state,
      };
    case "ADD_GROUP": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          joined: [...state.userGroups.joined, action.payload],
        },
      };
    }
    case "REMOVE_GROUP": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          joined: state.userGroups.joined.filter(
            (group) => group.groupId !== action.payload.groupId
          ),
        },
      };
    }
    default:
      return state;
  }
};
export default userReducer;