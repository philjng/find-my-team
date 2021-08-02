export const clearSnackbar = () => async dispatch => {
  dispatch({
    type: "CLEAR_SNACKBAR"
  })
}