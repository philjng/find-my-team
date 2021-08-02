import {getCreatedGroups} from "./user";
import {genericApi} from "../api/genericApi";
import {SUCCESS} from "../components/Snackbar/SnackbarSeverityConstants";

const headers = {
  "Content-Type": "application/json",
};

export const getGroups = () => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups`);
    dispatch({
      type: "GET_GROUPS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: console.log(e),
    });
  }
};

export const createGroup = (data) => async (dispatch) => {
  try {
    genericApi
      .post(`/api/groups`, data, {headers})
      .then((res) => {
        dispatch({
          type: "CREATE_GROUP",
          payload: res.data,
        })
      })
      .then(() => {
        dispatch(getCreatedGroups(data.creatorId))
      })
      .then(() => {
        dispatch({
          type: "SHOW_SNACKBAR",
          payload: {
            severity: SUCCESS,
            message: "Group created"
          }
        })
      })
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: console.log(e),
    });
  }
};

export const getGroup = (groupId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/${groupId}`);
    dispatch({
      type: "GET_GROUP",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUP",
      payload: console.log(e),
    });
  }
};

export const deleteGroup = (groupId) => async (dispatch) => {
  try {
    genericApi.delete(`/api/groups/${groupId}`).then((res) => {
      dispatch({
        type: "DELETE_GROUP",
        payload: res.data,
      })
    })
      .then(() => {
        dispatch({
          type: "SHOW_SNACKBAR",
          payload: {
            severity: SUCCESS,
            message: "Group deleted"
          }
        })
      })
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: console.log(e),
    });
  }
};

export const addMember = (groupId, userId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/${groupId}`);
    if (res.data.memberIds.includes(userId)) {
      dispatch({
        type: "ADD_MEMBER_DUPLICATE_ERROR",
        payload: res.data,
      });
      return;
    } else {
      res.data.memberIds.push(userId);
      res.data.groupSize += 1;
    }
    genericApi
      .put(`/api/groups/${groupId}`, res.data)
      .then((res) => {
        dispatch({
          type: "ADD_GROUP_MEMBER",
          payload: res.data,
        });
      })
      .then(() => {
        dispatch(getGroup(groupId));
      });
  } catch (e) {
    dispatch({
      type: "ADD_GROUP_MEMBER_ERROR",
      payload: e.message,
    });
    dispatch(getGroup(groupId));
  }
};

export const removeMember = (groupId, userId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/${groupId}`);
    if (res.data.memberIds.includes(userId)) {
      res.data.memberIds.splice(res.data.memberIds.indexOf(userId), 1);
      res.data.groupSize -= 1;
    } else {
      dispatch({
        type: "REMOVE_GROUP_MEMBER_NOT_FOUND_ERROR",
        payload: res.data,
      });
      return;
    }
    genericApi
      .put(`/api/groups/${groupId}`, res.data)
      .then((res) => {
        dispatch({
          type: "REMOVE_GROUP_MEMBER",
          payload: res.data,
        });
      })
      .then(() => {
        dispatch(getGroup(groupId));
      });
  } catch (e) {
    dispatch({
      type: "REMOVE_GROUP_MEMBER_ERROR",
      payload: e.message,
    });
    dispatch(getGroup(groupId));
  }
};

export const searchGroups = async (dispatch, searchText) => {
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
      payload: console.log(e),
    });
  }
};
