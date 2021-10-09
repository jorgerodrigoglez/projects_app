// redux
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
// npm install --save redux-thunk
// redux-thunk : hace que las acciones que ejecutemos sean asincronos por medio de un middleware que actua entre las acciones y los reducers cuando se ejecutan los dispatchers
import thunk from 'redux-thunk';
// reducer
import { authReducer } from "../reducers/authReducer";
import { messagesReducer } from "../reducers/messagesReducer";

// para hacer peticiones sincronas es necesario este middleware
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

// reducers de store
const reducers = combineReducers({
  auth: authReducer,
  messages: messagesReducer
});

// exportacion del store
// habilita consola de redux a navegador - se recomienda utilizar chrome
// https://github.com/zalmoxisus/redux-devtools-extension#usage
export const store = createStore(
  reducers,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  // middleware
  composeEnhancers(applyMiddleware(thunk))
);
