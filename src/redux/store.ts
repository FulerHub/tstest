import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import annReducer from "./reducers/annReducer";

const rootReducer = combineReducers({
    annReducer: annReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


