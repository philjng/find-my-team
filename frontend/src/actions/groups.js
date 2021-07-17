import axios from "axios"

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
    } catch (e) {
        dispatch( {
            type: "ERROR_GROUPS",
            payload: console.log(e)
        })
    }
}

export const addMember = (data) => async dispatch => {
    try {
        axios.put(
          `http://localhost:3001/groups/${data._id}`,
          data,
          {headers}
        )
          .then((res) => {
              dispatch( {
                  type: "ADD_MEMBER",
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