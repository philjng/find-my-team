export const createGroup = (data) => {
    return {
        type: "CREATE_GROUP",
        payload: data
    }
}

export const viewGroup = (data) => {
    return {
        type: "VIEW_GROUP",
        payload: data
    }
}