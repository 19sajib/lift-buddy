import {  AUTH, FORGET_PASSWORD, RESET_PASSWORD, VERIFY_PROFILE,
          LOGIN, GOOGLE_LOGIN, FACEBOOK_LOGIN, GET_PROFILE, UPDATE_PROFILE, SUCCESS, ERROR } from '../assets/constants/actionTypes'
import * as api from '../api';

export const signin = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signIn(formData)

        dispatch({ type: LOGIN, data})
        dispatch({ type: SUCCESS, data})
        history.push('/posts')
        //toast.success("Loged In Succesfully!");
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const googleSignIn = ({result, token, history}) => async (dispatch) => {
    try {
        const { data } = await api.GoogleSignIn({result, token})

        dispatch({ type: GOOGLE_LOGIN, data })
        dispatch({ type: SUCCESS, data})
        history.push('/posts')

    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const facebookSignIn = ({accessToken, userID, history}) => async (dispatch) => {
    try {
        const { data } = await api.FacebookSignIn({accessToken, userID})

        dispatch({ type: FACEBOOK_LOGIN, data })
        dispatch({ type: SUCCESS, data})
        history.push('/posts')
        
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const activeAccount = (token, history) => async (dispatch) => {
    try {
        const { data } = await api.saveUser(token)

        dispatch({ type: AUTH, data})
        dispatch({ type: SUCCESS, data})
        history.push('/auth')
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const signup = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.signUp(formData)

        dispatch({ type: AUTH, data})
        dispatch({ type: SUCCESS, data})
        history.push('/')
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const forgetpass = (formData, history) => async (dispatch) => {
    try {
        const { data } = await api.forgetpassword(formData)

        dispatch({ type: FORGET_PASSWORD, data})
        dispatch({ type: SUCCESS, data})
        history.push('/')
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const resetpass = ({password, token, history}) => async (dispatch) => {
    try {
        const { data } = await api.resetpassword({password, token})

        dispatch({ type: RESET_PASSWORD, data})
        dispatch({ type: SUCCESS, data})
        history.push('/auth')
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const getProfile = ( formData ) => async (dispatch) => {
        try {
            const { data } = await api.getprofile(formData)

            dispatch({ type: GET_PROFILE, data })
        } catch (error) {
            console.log(error);
            dispatch({ type: ERROR, error})
        }
}

export const updateProfile = ( formData, history ) => async (dispatch) => {
    try {
        const { data } = await api.updateprofile(formData)

        dispatch({ type: UPDATE_PROFILE, data })
        dispatch({ type: SUCCESS, data})
        history.push('/profile')
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}

export const verifyProfile = ( {formData, history} ) => async (dispatch) => {
    try {
        const { data } = await api.verifyprofile(formData)
        console.log(data);
        dispatch({ type: VERIFY_PROFILE, payload: data })
        dispatch({ type: SUCCESS, data})
        history.push('/')
    } catch (error) {
        console.log(error);
        dispatch({ type: ERROR, error})
    }
}