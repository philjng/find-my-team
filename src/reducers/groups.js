import {BASKETBALL, BIKING, FRISBEE, RUNNING, SOCCER, TENNIS} from "../genres";

const initialState = {
    groups: []
}

const groups_mock_data = {
    groups: [
        {
            groupId: 1,
            author: 2,
            name: "Generation of miracles",
            interests: [BASKETBALL],
            createdAt: new Date("2021-07-02"),
            groupSize: 10
        },
        {
            groupId: 2,
            author: 3,
            name: "dumbos",
            interests: [BASKETBALL, TENNIS],
            createdAt: new Date("2021-07-02"),
            groupSize: 13
        },
        {
            groupId: 3,
            author: 4,
            name: "Track stars",
            interests: [RUNNING],
            createdAt: new Date("2021-07-02"),
            groupSize: 1
        },
        {
            groupId: 4,
            author: 5,
            name: "Are you aero?",
            interests: [BIKING],
            createdAt: new Date("2021-07-02"),
            groupSize: 3
        },
        {
            groupId: 5,
            author: 6,
            name: "Ultimate frisbee club",
            interests: [FRISBEE],
            createdAt: new Date("2021-07-02"),
            groupSize: 12
        },
        {
            groupId: 6,
            author: 7,
            name: "Ronaldo fan club",
            interests: [SOCCER],
            createdAt: new Date("2021-07-02"),
            groupSize: 11
        }
    ]
}

export const groupsReducer = (state = groups_mock_data, action) => {
    switch (action.type) {
        case "GET_GROUPS": {
            return {
                ...state,
                groups: groups_mock_data
            }
        }
        default: {
            return groups_mock_data
        }
    }
}