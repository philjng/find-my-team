import { genericApi } from "../api/genericApi";

export const setSearch = (searchText) => async (dispatch) => {
  dispatch({
    type: "SET_SEARCH",
    payload: searchText
  })
  dispatch(searchUsers(searchText));
  dispatch(searchGroups(searchText));
  dispatch(searchEvents(searchText));
};

export const searchUsers = (searchText) => async (dispatch) => {
  try {
    genericApi.get(`api/users/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_USERS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USERS",
      payload: e.message,
    });
  }
};

export const searchGroups = (searchText) => async (dispatch) => {
  try {
    genericApi.get(`api/groups/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_GROUPS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: e.message,
    });
  }
};

export const searchEvents = (searchText) => async (dispatch) => {
  try {
    genericApi.get(`api/events/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_EVENTS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR_EVENTS",
      payload: e.message,
    });
  }
};
