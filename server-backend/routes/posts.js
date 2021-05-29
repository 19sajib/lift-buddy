const express = require('express')

const { getPostsBySearch, getPost, getPosts, createPost, updatePost, deletePost, likePost, reportPost, meAsGuest } = require('../controllers/posts.js')

const auth = ('../middleware/auth.js')

const router = express.Router()

router.get('/', getPosts)
router.post('/search', getPostsBySearch)
router.post('/single-post', getPost)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.post('/reportPost/', reportPost)
router.patch('/:postId/likePost/:userId', likePost)

router.post('/meAsGuest', meAsGuest)

module.exports = router;