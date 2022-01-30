import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import annReducer from "./reducers/annReducer";

const rootReducer = combineReducers({
    annReducer: annReducer,
})
type RootReducerType = typeof rootReducer; // (globalstate: AppStateType) => AppStateType
export type AppStateType = ReturnType<RootReducerType>


export const store = createStore(rootReducer, applyMiddleware(thunk))


