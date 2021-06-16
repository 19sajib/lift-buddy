import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, REPORT, 
    START_LOADING, END_LOADING, R_LOADING, RE_LOADING } from '../constants/actionTypes'
// eslint-disable-next-line
export default ( state = { isLoading: true, rLoading: false, posts: [] }, action) => {
    switch(action.type) {
        case START_LOADING:
         return { ...state, isLoading: true };
        case END_LOADING:
         return { ...state, isLoading: false };
        case R_LOADING:
            return { ...state, rLoading: true };
        case RE_LOADING:
            return { ...state, rLoading: false };
        case DELETE:
            return {...state, posts: state.posts.filter((post) => post._id !== action.payload)}
        case UPDATE:
        case LIKE:
            return {...state, posts: state.posts.map((post) => post._id === action.payload._id ? action.payload : post )};
        case REPORT:
            //console.log(action.payload);
            return state;    
        case FETCH_ALL:
                return {
                  ...state,
                  posts: action.payload.data,
                  currentPage: action.payload.currentPage,
                  numberOfPages: action.payload.numberOfPages,
                };
        case FETCH_BY_SEARCH:    
            //console.log(action.payload);
            return { ...state, posts: action.payload.data };
        case CREATE:
            return {...state, posts: [...state.posts, action.payload.data]};
            default:
            return state;
    }
}