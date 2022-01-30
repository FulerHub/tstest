import {AppStateType} from "./store";


export const getSearchPosts = (state: AppStateType) => {
    return state.annReducer.searchPosts;
}

export const getPosts = (state:AppStateType) => {
    return state.annReducer.posts
}
