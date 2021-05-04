import { combineReducers } from 'redux'

import proPost from './proPost'
import auth from './auth'
import posts from './posts'
import alret from './alret'
export default combineReducers({
    proPost, auth, posts, alret,
})