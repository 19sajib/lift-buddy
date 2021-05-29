import axios from 'axios'


export const signUp = (formData) => axios.post("http://localhost:8080/users/signup/", formData)
export const saveUser = (token) => axios.post("http://localhost:8080/users/saveuser/", token)
export const signIn = (formData) => axios.post("http://localhost:8080/users/signin/", formData)

export const GoogleSignIn = (formData) => axios.post("http://localhost:8080/users/google-signin/", formData)
export const FacebookSignIn = (formData) => axios.post("http://localhost:8080/users/facebook-signin/", formData)

export const forgetpassword = (formData) => axios.post("http://localhost:8080/users/forget-password/", formData)
export const resetpassword = (formData) => axios.post("http://localhost:8080/users/reset-password/", formData)

export const getprofile = (formData) => axios.get("http://localhost:8080/users/get-profile/", formData)
export const updateprofile = (formData) => axios.patch("http://localhost:8080/users/update-profile/", formData)
export const verifyprofile = (formData) => axios.post("http://localhost:8080/users/verify-profile/", formData)

const PRO_API = 'http://localhost:8080/pro-post';
// Project Post api 

export const createpropost = (postData) => axios.post(`${PRO_API}/create-post`,postData)
export const readpropost = () => axios.post(`${PRO_API}/read-post`)
export const deletepropost = (id) => axios.post(`${PRO_API}/create-post`,id)

// post
const POST_API = 'http://localhost:8080';

export const fetchPosts= (page) => axios.get(`${POST_API}/posts?page=${page}`)
export const fetchPostsBySearch = (searchQuery) => axios.post(`${POST_API}/posts/search?searchQuery=${searchQuery.search || 'none'}`);
export const createPost = (newPost) => axios.post(`${POST_API}/posts`, newPost)
export const updatePost = (id, updatedPost) => axios.patch(`${POST_API}/posts/${id}`, updatedPost)
export const deletePost = (id) => axios.delete(`${POST_API}/posts/${id}`)
export const likePost = ({postId, userId}) => axios.patch(`${POST_API}/posts/${postId}/likePost/${userId}`, likePost)
export const reportPost = (ReportData) => axios.post(`${POST_API}/posts/reportPost/`, ReportData)