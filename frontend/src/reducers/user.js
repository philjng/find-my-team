const initialState = {
  user_id: 0,
  name: "user_0",
  userEvents: {
    created: [],
    joined: []
  },
  userGroups: {
    created: [],
    joined: [],
  },
  tags: [],
  emailAddress: null,
  profile: {}
};

// TODO: set user state once when app loads to match useAuth data
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
        ...initialState
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
          created: action.payload
        }
      }
    }
    case "GET_JOINED_GROUPS": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          joined: action.payload
        }
      }
    }
    case "GET_USER": {
      return {
        ...state,
        profile: {
          ...action.payload
        }
      };
    }
    default:
      return state;
  }
};
export default userReducer;
