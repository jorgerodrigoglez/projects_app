// redux
import { createStore, combineReducers } from "redux";
// reducer
import { authReducer } from "../reducers/authReducer";

// reducers de store
const reducers = combineReducers({
    auth: authReducer,
});

// exportacion del store
export const store = createStore(
    reducers,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);