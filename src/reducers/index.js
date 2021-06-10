import {combineReducers} from 'redux';

const setValReducer = (orig_val = 100, action) => {
    if (action.type === 'SET_VALUE') {
        return action.value;
    }
    return orig_val;
}

const events_test_data = [{name: "Soccer game", location: "Empire Field, Vancouver", date: new Date("2021-07-02")}, 
                          {name: "Basketball game", location: "Kits Beach, Vancouver", date: new Date("2021-07-05")}, 
                          {name: "MTG Tournament", location: "Vancouver Convention Centre", date: new Date("2020-01-04")}];
const eventsReducer = (events = events_test_data, action) => {
    return events;
}

const viewEventDetailReducer = (viewableEvent = null, action) => {
    if (action.type === 'VIEW_EVENT_DETAILS') {
        return action.value;
    }
    return viewableEvent;
}

const toggleViewableEventsReducer = (viewableEvents = events_test_data, action) => {
    let retval = viewableEvents;
    switch(action.type) {
        case 'VIEW_UPCOMING_ONLY':
            retval = viewableEvents.filter(viewableEvent => viewableEvent.date > new Date());
            break;
        case 'VIEW_ALL_EVENTS':
            retval = events_test_data;
            break;
    }
    return retval;
}

export default combineReducers({
    orig_val: setValReducer,
    events: eventsReducer,
    viewableEvent: viewEventDetailReducer,
    viewableEvents: toggleViewableEventsReducer
});