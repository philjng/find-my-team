import {combineReducers} from 'redux';

const _ = require('lodash');
const events_test_data = [{
    name: "Soccer game",
    location: "Empire Field, Vancouver",
    date: new Date("2021-07-02"),
    genre: ['sports', 'outdoor', 'soccer'],
    creator: {name: "John Doe"},
    participants: [{name: "John Doe"}, {name: "Susan Thompson"}, {name: "Pablo Johnson"}, {name: "Alex Tim"}],
    description: "A soccer game for anyone to join",
    comments: [{user: {name: "Alex Tim"}, text: "Sounds like fun. I'll be there"}, {
        user: {name: "Harriet Norman"},
        text: "Can't make it this time, I'll be there for the next one"
    }]
},
    {
        name: "Basketball game",
        location: "Kits Beach, Vancouver",
        date: new Date("2021-07-05"),
        genre: ['sports', 'indoor', 'basketball'],
        creator: {name: "Jane Doo"},
        participants: [{name: "Susan Thompson"}, {name: "Gordon Lighthouse"}, {name: "Heather Baller"}],
        description: "1 v 1 pickup basketball at the Kits beach courts. Playing king's court and aimed at intermediate level players. $5 to enter and winning team keeps the money",
        comments: [{user: {name: "Heather Baller"}, text: "I'm init to winit"}]
    },
    {
        name: "MTG Tournament",
        location: "Vancouver Convention Centre",
        date: new Date("2020-01-04"),
        genre: ['games', 'card games', 'tournaments', 'magic'],
        creator: {name: "Joan Smith"},
        participants: [{name: "Daniel Boyce"}, {name: "Carol Wisnewski"}, {name: "Samuel Zubrus"}, {name: "Gary Lee"}, {name: "Andrew Gergich"}, {name: "Jennifer Quincey"}, {name: "Joel Quincey"}, {name: "Joel Harland"}, {name: "Carla Gregg"}],
        description: "Magic The Gathering tournament. Winner takes home $25,000 grand prize",
        comments: []
    }];


const addParticipant = (user, event, events) => {
    let eventIndex = events.findIndex((element) => {
        return _.isEqual(element, event)
    });
    if (!JSON.stringify(event.participants).includes(JSON.stringify(user))) {
        event.participants = event.participants.concat(user);
    }
    if (eventIndex !== -1) {
        events[eventIndex] = event;
    } else {
        console.log("ERROR");
    }
}

const addComment = (user, text, event, events) => {
    let eventIndex = events.findIndex((element) => {
        return _.isEqual(element, event)
    });
    event.comments = event.comments.concat({user: {name: user}, text: text});
    if (eventIndex !== -1) {
        events[eventIndex] = event;
    } else {
        console.log("error");
    }
}

const eventsReducer = (events = events_test_data, action) => {
    switch (action.type) {
        case 'PARTICIPANT_JOIN':
            let retEvent = {...action.event};
            let user = action.user;
            addParticipant(user, retEvent, events_test_data);
            return events_test_data;
        case  'ADD_COMMENT':
            console.log("events reducer called");
            let event = {...action.event};
            let comment_user = action.user;
            let text = action.text;
            addComment(comment_user, text, event, events);
            return events_test_data;
        default:
            return events;
    }
}

const commentTextReducer = (text = "", action) => {
    if (action.type === 'EDIT_TEXT') {
        return action.text;
    } else {
        return text;
    }

}

const viewEventDetailReducer = (viewableEvent = null, action) => {
    switch (action.type) {
        case 'VIEW_EVENT_DETAILS':
            return action.value;
        case 'PARTICIPANT_JOIN':
            let event = {...action.event};
            if (!JSON.stringify(event.participants).includes(JSON.stringify(action.user))) {
                event.participants = event.participants.concat(action.user);
            }
            return event;
        case 'ADD_COMMENT':
            console.log("eventDetail reducer called");
            let commEvent = {...action.event};
            let comment_user = action.user;
            let text = action.text;
            commEvent.comments = commEvent.comments.concat({user: {name: comment_user}, text: text});
            return commEvent;
        default:
            return viewableEvent;
    }
}

const toggleViewableEventsReducer = (viewableEvents = events_test_data, action) => {
    let retval = viewableEvents;
    switch (action.type) {
        case 'VIEW_UPCOMING_ONLY':
            retval = viewableEvents.filter(viewableEvent => viewableEvent.date > new Date());
            return retval;
        case 'VIEW_ALL_EVENTS':
            retval = events_test_data;
            return retval;
        default:
            return retval;
    }
}

export default combineReducers({
    events: eventsReducer,
    viewableEvent: viewEventDetailReducer,
    viewableEvents: toggleViewableEventsReducer,
    commentText: commentTextReducer
});