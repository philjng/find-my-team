import {combineReducers} from 'redux';

const _ = require('lodash');

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
    event.comments = event.comments.concat({user: user, text: text});
    if (eventIndex !== -1) {
        events[eventIndex] = event;
    } else {
        console.log("error");
    }
}

const eventsReducer = (events = [], action) => {
    let retEvents;
    switch (action.type) {
        case 'PARTICIPANT_JOIN':
            retEvents = [...action.events];
            let retEvent = {...action.event};
            let user = action.user;
            addParticipant(user, retEvent, retEvents);
            return retEvents;
        case  'ADD_COMMENT':
            retEvents = [...action.events];
            let event = {...action.event};
            let comment_user = action.user;
            let text = action.text;
            addComment(comment_user, text, event, events);
            return retEvents;
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
            let commEvent = {...action.event};
            let comment_user = action.user;
            let text = action.text;
            commEvent.comments = commEvent.comments.concat({user: comment_user, text: text});
            return commEvent;
        default:
            return viewableEvent;
    }
}

const toggleViewableEventsReducer = (viewableEvents = [], action) => {
    switch (action.type) {
        case 'VIEW_UPCOMING_ONLY':
            console.log(action.events[0].startTime);
            console.log(new Date().toISOString());
            let retval = action.events.filter(viewableEvent => new Date(viewableEvent.startTime) > new Date());
            return retval;
        case 'VIEW_ALL_EVENTS':
            return action.events;
        default:
            return viewableEvents;
    }
}

export default combineReducers({
    events: eventsReducer,
    viewableEvent: viewEventDetailReducer,
    viewableEvents: toggleViewableEventsReducer,
    commentText: commentTextReducer
});