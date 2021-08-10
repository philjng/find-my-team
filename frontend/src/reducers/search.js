const initialState = {
  searchKey: "",
  users: [],
  groups: [],
  events: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SEARCH": {
      return {
        ...state,
        searchKey: action.payload
      }
    }
    case "SEARCH_USERS": {
      return { ...state, users: action.payload };
    }
    case "SEARCH_GROUPS": {
      return { ...state, groups: action.payload };
    }
    case "SEARCH_EVENTS": {
      return { ...state, events: action.payload };
    }
    default:
      return state;
  }
};

export default searchReducer;
