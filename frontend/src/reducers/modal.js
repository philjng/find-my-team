const initialState = {
  isOpen: false
};

const modal = (state = initialState, action) => {
  switch(action.type) {
    case "SET_MODAL_OPEN": {
      return {
        ...state,
        isOpen: action.payload
      };
    }
    default:
      return state;
  }
};

export default modal