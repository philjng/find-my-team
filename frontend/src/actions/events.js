
export const viewEventDetails = (event) =>{
    return {
        type: 'VIEW_EVENT_DETAILS',
        value: event
    }
}

export const viewUpcomingEventsOnly = (events) => {
        return {
            type: 'VIEW_UPCOMING_ONLY',
            events: events
        }
}

export const viewAllEvents = (events) =>{
        return {
            type: 'VIEW_ALL_EVENTS',
            events: events
        }
}

export const participantJoin = (user, event) => {
    return {
        type: 'PARTICIPANT_JOIN',
        user: user, 
        event: event
    }
  }

export const addComment = (user, event, text) => {
    return {
        type: 'ADD_COMMENT',
        user: user,
        event: event,
        text: text
    }
}

export const editText = (text) => {
    return {
        type: 'EDIT_TEXT',
        text: text
    }
}
