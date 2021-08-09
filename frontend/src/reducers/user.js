const initialState = {
  searchResults: [],
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

// TODO: set user state once when app loads to match useAuth data
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
      /* TODO: not decided on yet, but currently user collection does not store userGroups nor events,
          that is managed by groups api call */
      return {
        ...state,
        ...action.payload,
        user_id: action.payload._id,
      };
    }
    default:
      return state;
  }
};
export default userReducer;
