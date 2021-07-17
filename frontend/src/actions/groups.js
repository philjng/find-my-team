import axios from "axios"
import {getCreatedGroups} from "./user";

const headers = {
    "Content-Type": "application/json"
}

export const getGroups = () => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:3001/groups`)
        dispatch( {
            type: "GET_GROUPS",
            payload: res.data
        })
    } catch (e) {
        dispatch( {
            type: "ERROR_GROUPS",
            payload: console.log(e)
        })
    }
}

export const createGroup = (data) => async dispatch => {
    try {
        axios.post(
          `http://localhost:3001/groups`,
          data,
          {headers}
        )
          .then((res) => {
              dispatch( {
                  type: "CREATE_GROUP",
                  payload: res.data
              })
          })
          .then(() => {
              dispatch(getCreatedGroups(data.creatorId))
          })
    } catch (e) {
        dispatch( {
            type: "ERROR_GROUPS",
            payload: console.log(e)
        })
    }
}

export const updateMemberList = (data) => async dispatch => {
    try {
        axios.put(
          `http://localhost:3001/groups/${data._id}`,
          data,
          {headers}
        )
          .then((res) => {
              dispatch( {
                  type: "UPDATE_MEMBER_LIST",
                  payload: res.data
              })
          })
    } catch (e) {
        dispatch( {
            type: "ERROR_GROUPS",
            payload: console.log(e)
        })
    }
}

export const viewGroup = (data) => {
    return {
        type: "VIEW_GROUP",
        payload: data
    }
}