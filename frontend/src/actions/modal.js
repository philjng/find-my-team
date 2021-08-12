export const setModalOpen = (isOpen) => async (dispatch) => {
  dispatch({
    type: "SET_MODAL_OPEN",
    payload: isOpen
  })
}