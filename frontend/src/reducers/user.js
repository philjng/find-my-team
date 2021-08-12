const initialState = {
  user_id: null,
  firstName: "",
  lastName: "",
  displayName: "",
  emailAddress: null,
  userEvents: {
    created: [],
    joined: [],
  },
  userGroups: {
    created: [],
    joined: [],
  },
  tags: [],
  image: null,
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
        ...initialState,
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
    case "GET_CREATED_GROUPS": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          created: action.payload,
        },
      };
    }
    case "GET_JOINED_GROUPS": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          joined: action.payload,
        },
      };
    }
    case "GET_USER": {
      return {
        ...state,
        ...action.payload,
        user_id: action.payload._id,
      };
    }
    case "GET_USER_EVENTS": {
      return {
        ...state,
        userEvents: {
          ...state.userEvents,
          ...action.payload,
        },
      };
    }
    default:
      return state;
  }
};
export default userReducer;
