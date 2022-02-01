import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from "redux-thunk";
import rootReducer from "./reducers";

const initialState = {};

const middlewre = [thunk];

const store = creatStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewre))
);

export default store;