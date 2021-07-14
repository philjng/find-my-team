const initialState = {
  user_id: 0,
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
      };
    case "LOGOUT":
      return {
        ...state,
        user_id: null,
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
