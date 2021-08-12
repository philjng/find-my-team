const initialState = {
  _id: null,
  firstName: "",
  lastName: "",
  displayName: "",
  userEvents: {
    created: [],
    joined: [],
  },
  userGroups: {
    created: [],
    joined: [],
  },
  tags: [],
  emailAddress: "",
  lastModified: "",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PROFILE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "GET_USER_PROFILE_JOINED_GROUPS": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          joined: action.payload,
        },
      };
    }
    case "GET_USER_PROFILE_CREATED_GROUPS": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          created: action.payload,
        },
      };
    }
    case "GET_USER_PROFILE_EVENTS": {
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

export default profileReducer;
