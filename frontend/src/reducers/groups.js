import {BASKETBALL, BIKING, FRISBEE, RUNNING, SOCCER, TENNIS} from "../tags";

const initialState = {
    groups: []
}

const groups_mock_data = {
    groups: [
        {
            groupId: 1,
            authorId: 2,
            author: "kuroko",
            name: "Generation of miracles",
            description: "We are the best basketball players",
            tags: [BASKETBALL],
            createdAt: new Date("2021-07-02"),
            memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            groupSize: 10,
        },
        {
            groupId: 2,
            authorId: 3,
            author: "bance",
            name: "dumbos",
            description: "We are the best",
            tags: [BASKETBALL, TENNIS],
            createdAt: new Date("2021-07-02"),
            memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
            groupSize: 13
        },
        {
            groupId: 3,
            authorId: 4,
            author: "usain bolt",
            name: "Track stars",
            description: "We are the fastest runners",
            tags: [RUNNING],
            createdAt: new Date("2021-07-02"),
            memberIds: [4],
            groupSize: 1
        },
        {
            groupId: 4,
            authorId: 5,
            author: "jay",
            name: "Are you aero?",
            description: "real cyclists only",
            tags: [BIKING],
            createdAt: new Date("2021-07-02"),
            memberIds: [1, 2, 3],
            groupSize: 3
        },
        {
            groupId: 5,
            authorId: 6,
            author: "dude perfect",
            name: "Ultimate frisbee club",
            description: "It's a sport!",
            tags: [FRISBEE],
            createdAt: new Date("2021-07-02"),
            memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            groupSize: 12
        },
        {
            groupId: 6,
            authorId: 7,
            author: "justin phan",
            name: "Ronaldo fan club",
            description: "ronaldo #1",
            tags: [SOCCER],
            createdAt: new Date("2021-07-02"),
            memberIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            groupSize: 11
        }
    ],
    group: {}
}

export const groups = (state = groups_mock_data, action) => {
    switch (action.type) {
        case "GET_GROUPS": {
            return {
                ...state,
                groups: groups_mock_data
            }
        }
        case "CREATE_GROUP": {
            return {
                ...state,
                groups: [
                    {
                        groupId: state.groups[state.groups.length],
                        authorId: action.payload.authorId,
                        name: action.payload.name,
                        description: action.payload.description,
                        tags: action.payload.tags,
                        createdAt: new Date(),
                        groupSize: 1
                    },
                    ...state.groups,

                ]
            }
        }
        case "VIEW_GROUP": {
            console.log("viewing group: ", action.payload)
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