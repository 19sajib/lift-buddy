import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE, REPORT } from '../constants/actionTypes'
// eslint-disable-next-line
export default ( posts = [], action) => {
    switch(action.type) {
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post );
        case REPORT:
            //console.log(action.payload);
            return posts;    
        case FETCH_ALL:
            console.log(action.payload);
            return action.payload;
        case CREATE:
            return [...posts, action.payload];
            default:
            return posts;
    }
}