export const clearSnackbar = () => async dispatch => {
  dispatch({
    type: "CLEAR_SNACKBAR"
  })
}

export const showSnackbar = (severity, message) => async dispatch => {
  dispatch({
    type: "SHOW_SNACKBAR",
    payload: {
      severity,
      message,
    }
  })
}