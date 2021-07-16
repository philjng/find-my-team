import {applyMiddleware, createStore} from "redux";
import { rootReducer } from "./reducers/reducer";
import { composeWithDevTools } from "redux-devtools-extension"
import thunk from "redux-thunk";

const middleware = [thunk]

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(...middleware)));

export default store