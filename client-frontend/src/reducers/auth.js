import { AUTH, FORGET_PASSWORD, GOOGLE_LOGIN, FACEBOOK_LOGIN, 
         LOGIN, LOGOUT, RESET_PASSWORD, GET_PROFILE, UPDATE_PROFILE, VERIFY_PROFILE } from '../constants/actionTypes'
import { setAuthentication } from '../auth/auth'

const authReducer = (state = { authData : null}, action) => {
      switch (action.type) {
          case AUTH:
               return {...state, authData: action?.data };
          case LOGIN:
          case GOOGLE_LOGIN:
          case FACEBOOK_LOGIN:
              setAuthentication( action?.data.token, action?.data.result)
              //localStorage.setItem('profile', JSON.stringify({...action?.data}))
              return { ...state, authData: action?.data };
          case LOGOUT:
             // localStorage.clear()
              return { ...state, authData: null };
          case FORGET_PASSWORD:
          case RESET_PASSWORD:
              return { ...state, authData: action?.data };
          case GET_PROFILE: 
          case UPDATE_PROFILE:
              setAuthentication( action?.data.token ,action?.data.result )
              return { ...state, authData: action?.data }
          case VERIFY_PROFILE:
              return state;    
          default:
              return state;
      }
}

export default authReducer