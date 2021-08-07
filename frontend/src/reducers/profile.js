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
  image: "",
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_USER_PROFILE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "GET_USER_PROFILE_GROUPS": {
      return {
        ...state,
        userGroups: {
          ...state.userGroups,
          ...action.payload,
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
