import { getCreatedGroups } from "./user";
import { genericApi } from "../api/genericApi";
import {
  SUCCESS,
  WARNING,
} from "../components/Snackbar/SnackbarSeverityConstants";
import { showSnackbar } from "./snackbar";

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
      .post(`/api/groups`, data, { headers })
      .then((res) => {
        dispatch({
          type: "CREATE_GROUP",
          payload: res.data,
        });
      })
      .then(() => {
        dispatch(getCreatedGroups(data.creatorId));
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "Group created."));
      });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: console.log(e),
    });
  }
};

export const getGroupPageData = (groupId) => async (dispatch) => {
  dispatch(getGroup(groupId));
  dispatch(getGroupMembers(groupId));
  dispatch(getGroupEvents(groupId));
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
    genericApi
      .delete(`/api/groups/${groupId}`)
      .then((res) => {
        dispatch({
          type: "DELETE_GROUP",
          payload: res.data,
        });
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "Group deleted."));
      });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUPS",
      payload: console.log(e),
    });
  }
};

export const getGroupMembers = (groupId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/${groupId}/members`);
    dispatch({
      type: "GET_GROUP_MEMBERS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUP_MEMBERS",
      payload: e.message,
    });
  }
};

export const getGroupEvents = (groupId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/${groupId}/events`);
    dispatch({
      type: "GET_GROUP_EVENTS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_GROUP_EVENTS",
      payload: e.message
    })
  }
};

export const updateGroup = (groupId, updatedData) => async (dispatch) => {
  try {
    genericApi.put(`/api/groups/${groupId}`, updatedData)
      .then((res) => {
        dispatch({
          type: "UPDATE_GROUP",
          payload: res.data
        })
        dispatch(getGroupPageData(groupId));
        dispatch(showSnackbar(SUCCESS, "Group has been updated."));
      })
  } catch (e) {
    dispatch({
      type: "UPDATE_GROUP_ERROR",
      payload: e.message,
    });
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with updating the group. Please try again."
      )
    );
  }
}

export const addMember = (groupId, userId) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/groups/${groupId}`);
    if (res.data.memberIds.includes(userId)) {
      dispatch({
        type: "ADD_MEMBER_DUPLICATE_ERROR",
        payload: res.data,
      });
      dispatch(
        showSnackbar(
          WARNING,
          "Tried to join group while already being a member."
        )
      );
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
        dispatch(getGroupPageData(groupId));
      })
      .then(() => {
        dispatch(showSnackbar(SUCCESS, "You have joined the group."));
      });
  } catch (e) {
    dispatch({
      type: "ADD_GROUP_MEMBER_ERROR",
      payload: e.message,
    });
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with joining the group. Please try again."
      )
    );
    dispatch(getGroupPageData(groupId));
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
      dispatch(showSnackbar(WARNING, "Tried to leave without being a member."));
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
        dispatch(getGroupPageData(groupId));
      })
      .then(() => {
        dispatch(
          showSnackbar(SUCCESS, "You have been removed from the group.")
        );
      });
  } catch (e) {
    dispatch({
      type: "REMOVE_GROUP_MEMBER_ERROR",
      payload: e.message,
    });
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with leaving the group. Please try again."
      )
    );
    dispatch(getGroupPageData(groupId));
  }
};
