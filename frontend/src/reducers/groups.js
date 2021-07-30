const initialState = {
    groups: [],
    searchResults: [],
    group: {}
}

export const groups = (state = initialState, action) => {
    switch (action.type) {
        case "GET_GROUPS": {
            return {
                ...state,
                groups: action.payload
            }
        }
        case "CREATE_GROUP": {
            return {
                ...state,
                groups: [
                    {
                        _id: action.payload._id,
                        creatorId: action.payload.creatorId,
                        creator: action.payload.creator,
                        name: action.payload.name,
                        description: action.payload.description,
                        tags: action.payload.tags,
                        createdAt: action.payload.createdAt,
                        memberIds: action.payload.memberIds,
                        groupSize: action.payload.groupSize
                    },
                    ...state.groups,

                ]
            }
        }
        case "DELETE_GROUP": {
            return {
                ...state,
                groups: state.groups.filter(group => group._id !== action.payload)
            }
        }
        case "UPDATE_MEMBER_LIST": {
            let updatedGroups = state.groups;
            const index = updatedGroups.findIndex((group) => group._id === action.payload._id);
            updatedGroups[index] = action.payload;
            return {
                ...state,
                groups: [...updatedGroups]
            }
        }
        case "VIEW_GROUP": {
            return {
                ...state,
                group: action.payload
            }
        }
        // case "SEARCH_GROUPS": {
        //     return {
        //         ...state,
        //         searchResults: action.payload
        //     }
        // }
        default: {
            return {...state}
        }
    }
}