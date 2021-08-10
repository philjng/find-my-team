const initialState = {
  groups: [],
  group: {},
  groupMembers: [],
  groupEvents: []
};

const groups = (state = initialState, action) => {
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
    case "GET_GROUP_EVENTS": {
      return {
        ...state,
        groupEvents: action.payload
      }
    }
    default:
      return state;
  }
};

export default groups;
