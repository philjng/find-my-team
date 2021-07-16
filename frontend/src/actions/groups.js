import axios from "axios"

const headers = {
    "Content-Type": "application/json"
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

export const viewGroup = (data) => {
    return {
        type: "VIEW_GROUP",
        payload: data
    }
}