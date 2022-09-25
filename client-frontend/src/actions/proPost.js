import { CREATE_PRO_POST, DELETE_PRO_POST, READ_PRO_POST  } from '../assets/constants/actionTypes'

import * as api from '../api';

export const createProPost = (postData) => async (dispatch) => {
    try {
        const { data } = await api.createpropost(postData)

        dispatch({ type: CREATE_PRO_POST, payload:data})
    } catch (error) {
        console.log(error);
    }

}

export const deleteProPost = (id) => async (dispatch) => {
    try {
        const { data } = await api.deletepropost(id)

        dispatch({ type: DELETE_PRO_POST, payload:data})
    } catch (error) {
        console.log(error);
    }

}

export const readProPost = () => async (dispatch) => {
    try {
        const { data } = await api.readpropost()

        dispatch({ type: READ_PRO_POST, payload: data})
    } catch (error) {
        console.log(error);
    }

}