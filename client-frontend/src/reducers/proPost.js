import { CREATE_PRO_POST, DELETE_PRO_POST, READ_PRO_POST  } from '../constants/actionTypes'
// eslint-disable-next-line
export default ( posts = [], action) => {
    switch(action.type) {
        case CREATE_PRO_POST:
            return [...posts, action.payload];
        case READ_PRO_POST:
            console.log(action.payload);
            return action.payload; 
        case DELETE_PRO_POST:
            return posts.filter((post) => post._id !== action.payload);   
        default:
            return posts;    
    }
}