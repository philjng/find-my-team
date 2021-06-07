import {combineReducers} from 'redux';

const setValReducer = (orig_val = 100, action) => {
    if (action.type === 'SET_VALUE') {
        return action.value;
    }
    return orig_val;
}

export default combineReducers({
    orig_val: setValReducer
});