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