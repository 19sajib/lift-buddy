import { FETCH_ALL, FETCH_BY_SEARCH, CREATE, UPDATE, DELETE, LIKE, REPORT } from '../constants/actionTypes'
// eslint-disable-next-line
export default ( state = [], action) => {
    switch(action.type) {
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