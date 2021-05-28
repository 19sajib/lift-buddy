import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, REPORT, ERROR, SUCCESS, WARN, INFO } from '../constants/actionTypes'
import * as api from '../api';


// Action Creation here

export const postReport = ({ReportData, history}) => async (dispatch) => {
    try {
        const { data } = await api.reportPost(ReportData)
        
        dispatch({ type: REPORT, payload: data })
        dispatch({ type: INFO, data })
        history.push('/')

    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}


export const getPosts= () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts();

        dispatch({ type: FETCH_ALL, payload: data})

    } catch (error) {
        console.log(error);
    }
}

export const createPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.createPost(post)
        
        dispatch({ type: CREATE, payload: data})
        dispatch({ type: SUCCESS, data})
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        
        dispatch({ type: UPDATE, payload: data})
        dispatch({ type: SUCCESS, data})
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const deletePost = (id) => async (dispatch) => {
    try {
         await api.deletePost(id)
        
        dispatch({ type: DELETE, payload: id})
        dispatch({ type: WARN})
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const likePost = ({postId, userId}) => async (dispatch) => {
    try {
        const { data } = await api.likePost({postId, userId})
        console.log(data.message);
        dispatch({ type: LIKE, payload: data})
        dispatch({ type: SUCCESS, payload: data})
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}