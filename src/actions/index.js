export const setVal = (val) =>{
    return {
        type: 'SET_VALUE',
        value: val
    };
};

export const viewEventDetails = (event) =>{
    return {
        type: 'VIEW_EVENT_DETAILS',
        value: event
    }
}