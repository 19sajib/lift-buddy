const express = require('express')

const auth = require('../middleware/auth.js')

const { createProPost, readProPost, deleteProPost } = require('../controllers/proPosts.js')

const router = express.Router()

router.post('/create-post', createProPost)
router.post('/read-post', readProPost)
router.post('/delete-post', deleteProPost)

module.exports = router;