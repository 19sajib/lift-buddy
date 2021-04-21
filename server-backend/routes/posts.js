const express = require('express')

const { getPosts, createPost, updatePost, deletePost, likePost, meAsGuest } = require('../controllers/posts.js')

const auth = ('../middleware/auth.js')

const router = express.Router()

router.get('/', getPosts)
router.post('/', createPost)
router.patch('/:id', updatePost)
router.delete('/:id', deletePost)
router.patch('/:postId/likePost/:userId', likePost)

router.post('/meAsGuest', meAsGuest)

module.exports = router;