const initialState = {
  groups: [],
  searchResults: [],
  group: {},
  groupMembers: [],
};

export const groups = (state = initialState, action) => {
  switch (action.type) {
    case "GET_GROUPS": {
      return {
        ...state,
        groups: action.payload,
      };
    }
    case "GET_GROUP": {
      return {
        ...state,
        group: action.payload,
      };
    }
    case "GET_GROUP_MEMBERS": {
      return {
        ...state,
        groupMembers: action.payload,
      };
    }
    default:
      return state;
  }
};

export default groups;
