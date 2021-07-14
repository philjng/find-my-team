const initialState = {
    isAuth: false,
    user_id: 0,
    name: "user0",
    userEvents: [],
    userGroups: {
        owned: [],
        joined: []
    }
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("user", {
                isAuth: true,
                user_id: action.payload.user_id,
                name: "user0"
            });
            return {
                ...state,
                isAuth: true,
                user_id: action.payload.user_id,
                name: "user0"
            };
        case "LOGOUT":
            localStorage.removeItem("user")
            return {
                ...state,
                isAuth: false,
                user_id: null,
                name: null,
            };
        case "ADD_GROUP": {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    joined: [
                        ...state.userGroups.joined,
                        action.payload
                    ]
                }
            }
        }
        case "REMOVE_GROUP": {
            return {
                ...state,
                userGroups: {
                    ...state.userGroups,
                    joined: state.userGroups.joined.filter(group => group.groupId !== action.payload.groupId)
                }
            }
        }
        default:
            return state;
    }
};
export default userReducer;
