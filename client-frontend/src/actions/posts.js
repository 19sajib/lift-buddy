import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, REPORT, ERROR, SUCCESS, WARN, INFO,
         FETCH_BY_SEARCH, CREATPOST, START_LOADING, END_LOADING, R_LOADING, RE_LOADING } from '../assets/constants/actionTypes'
import * as api from '../api';


// Action Creation here

export const postReport = ({ReportData, history}) => async (dispatch) => {
    try {
        const { data } = await api.reportPost(ReportData)
        
        dispatch({ type: REPORT, payload: data })
        dispatch({ type: INFO, data })
        history.push('/posts')

    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}


export const getPosts= (page) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING });
        const {data: { data, currentPage, numberOfPages } } = await api.fetchPosts(page);

        dispatch({ type: FETCH_ALL, payload: { data, currentPage, numberOfPages }})
        dispatch({ type: END_LOADING });
    } catch (error) {
        console.log(error);
    }
}

export const getPostsBySearch = (searchQuery) => async (dispatch) => {
    try {
         // console.log(searchQuery);
      dispatch({ type: START_LOADING });
    const { data: { data } } = await api.fetchPostsBySearch(searchQuery);
        //console.log(data);
     dispatch({ type: FETCH_BY_SEARCH, payload: { data }  });
     dispatch({ type: END_LOADING });
    } catch (error) {
      console.log(error);
    }
  };

export const createPost = (post, history) => async (dispatch) => {
    try {
        const { data: { data } } = await api.createPost(post)
       // console.log(data);
        dispatch({ type: CREATE, payload: {data}})
        history.push('/posts')
        dispatch({ type: CREATPOST})
    } catch (error) {
       // console.log(error);
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
       // console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const likePost = ({postId, userId}) => async (dispatch) => {
    try {
        dispatch({ type: R_LOADING });
        const { data } = await api.likePost({postId, userId})
       // console.log(data);
        dispatch({ type: LIKE, payload: data})
        dispatch({ type: RE_LOADING });
        dispatch({ type: SUCCESS, data})
    } catch (error) {
       // console.log(error);
        dispatch({ type: ERROR, error})
    }
}


  