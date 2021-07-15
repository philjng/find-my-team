export const viewEventDetails = (event) =>{
    return {
        type: 'VIEW_EVENT_DETAILS',
        value: event
    }
}

export const viewUpcomingEventsOnly = () =>{
    return {
        type: 'VIEW_UPCOMING_ONLY'
    }
}

export const viewAllEvents = () =>{
    return {
        type: 'VIEW_ALL_EVENTS'
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
    console.log("Comment action called");
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
