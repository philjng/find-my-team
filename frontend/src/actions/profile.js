import { genericApi } from "../api/genericApi";
import {
  SUCCESS,
  WARNING,
} from "../components/Snackbar/SnackbarSeverityConstants";
import { showSnackbar } from "./snackbar";
import { getUser } from "./user"

export const getUserProfileGroups = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}/groups`);
    dispatch({
      type: "GET_USER_PROFILE_GROUPS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER_PROFILE_GROUPS",
      payload: e,
    });
  }
};

export const getUserProfileEvents = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}/events`);
    dispatch({
      type: "GET_USER_PROFILE_EVENTS",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER_PROFILE_EVENTS",
      payload: e,
    });
  }
};

export const getUserProfile = (id) => async (dispatch) => {
  try {
    const res = await genericApi.get(`/api/users/${id}`);
    dispatch({
      type: "GET_USER_PROFILE",
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: "ERROR_USER_PROFILE",
      payload: e,
    });
  }
};

export const editUserProfile = (id, data, base64Image) => async (dispatch) => {
  try {
    let imageUploadRes;
    if (base64Image) {
      imageUploadRes = await genericApi.post(`/api/images`, {
        data: base64Image,
      });
      console.log(imageUploadRes.data);
      data.image = imageUploadRes.data.public_id;
    }

    const updateRes = await genericApi.put(`/api/users/${id}`, data);
    dispatch({
      type: "GET_USER_PROFILE",
      payload: updateRes.data,
    });
    dispatch(getUser(id))
    dispatch(showSnackbar(SUCCESS, "Your changes have been saved."));
  } catch (e) {
    dispatch({
      type: "ERROR_EDIT_USER_PROFILE",
      payload: e,
    });
    dispatch(getUserProfile(id));
    dispatch(getUser(id))
    dispatch(
      showSnackbar(
        WARNING,
        "There was an error with saving your changes. Please try again"
      )
    );
  }
};
