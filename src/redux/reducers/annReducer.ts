import {message} from "antd";
import {ThunkAction} from "redux-thunk/es/types";

const defaultState = {
    posts:[
        {
            id: 1,
            title: 'Title 1',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            date: 1642003760000
        },
        {
            id: 2,
            title: 'Title 2',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            date: 1642004760000
        },
        {
            id: 3,
            title: 'Title 3',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            date: 1642005760000
        },
        {
            id: 4,
            title: 'Title 4',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum',
            date: 1642006760000
        },
    ] as Array<defaultStatePostsType>,
    searchPosts:[] as Array<defaultStatePostsType>,
}
type defaultStatePostsType ={
    id: number
    title: string
    description: string
    date: number
}
type defaultStateType = typeof defaultState

export const ADD_POST = "SET_POST";
export const UPDATE_POST = "UPDATE_POST";
export const DELETE_POST = "DELETE_POST";
export const SEARCH_POSTS = "SEARCH_POSTS";

export default function annReducer(state = defaultState, action:ActionsTypes) :defaultStateType {
    switch (action.type) {
        case ADD_POST:
            return {
                ...state,
                posts: [action.payload,...state.posts]
            }
        case UPDATE_POST:
            return {
                ...state,
                posts:state.posts.map(item => item.id === action.payload.id ?  {...item, title: action.payload.title,description: action.payload.description } : item) //
            }

        case DELETE_POST:
            return {...state, posts: state.posts.filter(item => item.id !== action.payload.id)}
        case SEARCH_POSTS:
            return {
                ...state,
                searchPosts:state.posts.filter(item => item.title.toLowerCase().includes(action.payload.title.toLowerCase()) ) //
            }
        default:
            return state;
    }
    return state;
}
type ActionsTypes = addPostsActionType | deletePostActionType | updatePostActionType | searchPostActionType;
type addPostsActionPayloadType = {
    id:number
    title:string
    description: string
    date: number
}
type deletePostActionPayloadType = {
    id:number
}
type updatePostActionPayloadType = {
    id:number,
    title:string,
    description:string
}
type searchPostActionPayloadType = {
    title:string
}



type addPostsActionType = {
    type: typeof ADD_POST,
    payload: addPostsActionPayloadType
}
type deletePostActionType = {
    type: typeof DELETE_POST,
    payload: deletePostActionPayloadType
}
type updatePostActionType = {
    type: typeof UPDATE_POST,
    payload: updatePostActionPayloadType
}
type searchPostActionType = {
    type: typeof SEARCH_POSTS,
    payload: searchPostActionPayloadType
}

type ThunkType = ThunkAction<Promise<void>, defaultStateType, unknown, ActionsTypes>

const actions = {
    addPosts: (payload:addPostsActionPayloadType):addPostsActionType => ({type: ADD_POST, payload}),
    deletePost: (payload:deletePostActionPayloadType):deletePostActionType => ({type: DELETE_POST, payload}),
    updatePost:(payload:updatePostActionPayloadType):updatePostActionType => ({type: UPDATE_POST, payload}),
    searchPost:(payload:searchPostActionPayloadType):searchPostActionType => ({type: SEARCH_POSTS, payload}),
}

export const actionAddPost = (title:string, description:string): ThunkType => async dispatch =>{
    try{
        const date = Date.parse(new Date().toDateString());
        dispatch(actions.addPosts({id:date, title,description,date}))
        dispatch(actionSearchPosts(''))
        message.success("Post add")
    }
    catch (e) {

    }
}

export const actionUpdatePost = (id:number,title:string,description:string): ThunkType=> async dispatch =>{
    try{
        console.log({id,title,description})
        dispatch(actions.updatePost({id,title,description}))
        message.success("Post update")
    }
    catch (e) {

    }
}

export const actionDeletePost = (id:number):ThunkType => async dispatch =>{
    try{
        dispatch(actions.deletePost({id}))
        message.success("Post delete")
    }
    catch (e) {

    }
}

export const actionSearchPosts = (title:string):ThunkType => async dispatch =>{
    try{
        dispatch(actions.searchPost({title}))
        message.success("Result found")
    }
    catch (e) {

    }
}