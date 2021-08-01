const initialState = {
  severity: "",
  message: ""
}

export const snackbar = (state = initialState, action) => {
  switch(action.type) {
    case "SHOW_SNACKBAR": {
      return {
        ...state,
        ...action.payload
      }
    }
    case "CLEAR_SNACKBAR": {
      return {
        ...state,
        ...initialState
      }
    }
    default: {
      return { ...state }
    }
  }
}