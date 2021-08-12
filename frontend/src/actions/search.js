import { genericApi } from "../api/genericApi";

export const setSearch = (searchText) => async (dispatch) => {
  dispatch({
    type: "SET_SEARCH",
    payload: searchText,
  });
  dispatch(searchUsers(searchText));
  dispatch(searchGroups(searchText));
  dispatch(searchEvents(searchText));
};

export const searchUsers = (searchText) => async (dispatch) => {
  try {
    if (
      ['', '.'].includes(searchText.trim()) ||
      ['#', '\\', '?'].includes(searchText.charAt(0)) ||
      searchText.includes("/") ||
      searchText.includes("%")
    ) {
      dispatch({
        type: "SEARCH_USERS",
        payload: [],
      });
      return;
    }
    genericApi.get(`api/users/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_USERS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR",
      payload: console.log(e),
    });
  }
};

export const searchGroups = (searchText) => async (dispatch) => {
  try {
    if (
      ['', '.'].includes(searchText.trim()) ||
      ['#', '\\', '?'].includes(searchText.charAt(0)) ||
      searchText.includes("/") ||
      searchText.includes("%")
    ) {
      dispatch({
        type: "SEARCH_GROUPS",
        payload: [],
      });
      return;
    }
    genericApi.get(`api/groups/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_GROUPS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR",
      payload: console.log(e),
    });
  }
};

export const searchEvents = (searchText) => async (dispatch) => {
  try {
    if (
      ['', '.'].includes(searchText.trim()) ||
      ['#', '\\', '?'].includes(searchText.charAt(0)) ||
      searchText.includes("/") ||
      searchText.includes("%")
    ) {
      dispatch({
        type: "SEARCH_EVENTS",
        payload: [],
      });
      return;
    }
    genericApi.get(`api/events/search/${searchText}`).then((res) => {
      dispatch({
        type: "SEARCH_EVENTS",
        payload: res.data,
      });
    });
  } catch (e) {
    dispatch({
      type: "ERROR",
      payload: console.log(e),
    });
  }
};
