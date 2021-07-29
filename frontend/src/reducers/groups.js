// import {BASKETBALL, BIKING, FRISBEE, RUNNING, SOCCER, TENNIS} from "../tags";

const initialState = {
    groups: [],
    group: {}
}

// const groups_mock_data = {
//     groups: [
//         {
//             _id: 1,
//             creatorId: 2,
//             creator: "kuroko",
//             name: "Generation of miracles",
//             description: "We are the best basketball players",
//             tags: [BASKETBALL],
//             createdAt: new Date("2021-07-02"),
//             memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
//             groupSize: 10,
//         },
//         {
//             _id: 2,
//             creatorId: 3,
//             creator: "bance",
//             name: "dumbos",
//             description: "We are the best",
//             tags: [BASKETBALL, TENNIS],
//             createdAt: new Date("2021-07-02"),
//             memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
//             groupSize: 13
//         },
//         {
//             _id: 3,
//             creatorId: 4,
//             creator: "usain bolt",
//             name: "Track stars",
//             description: "We are the fastest runners",
//             tags: [RUNNING],
//             createdAt: new Date("2021-07-02"),
//             memberIds: [4],
//             groupSize: 1
//         },
//         {
//             _id: 4,
//             creatorId: 5,
//             creator: "jay",
//             name: "Are you aero?",
//             description: "real cyclists only",
//             tags: [BIKING],
//             createdAt: new Date("2021-07-02"),
//             memberIds: [1, 2, 3],
//             groupSize: 3
//         },
//         {
//             _id: 5,
//             creatorId: 6,
//             creator: "dude perfect",
//             name: "Ultimate frisbee club",
//             description: "It's a sport!",
//             tags: [FRISBEE],
//             createdAt: new Date("2021-07-02"),
//             memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
//             groupSize: 12
//         },
//         {
//             _id: 6,
//             creatorId: 7,
//             creator: "justin phan",
//             name: "Ronaldo fan club",
//             description: "ronaldo #1",
//             tags: [SOCCER],
//             createdAt: new Date("2021-07-02"),
//             memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
//             groupSize: 11
//         }
//     ],
//     group: {}
// }

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
        default: {
            return {...state}
        }
    }
}