const express = require('express')

const  { signin, signup, signout, profile, saveuser, googleSignIn, facebookSignIn } = require('../controllers/user.js')
const { forgetpassword, resetpassword } = require('../controllers/password.js')
const { getProfile, updateProfile } = require('../controllers/profile.js')

const router = express.Router()

router.post('/signup', signup)
router.post('/saveuser', saveuser)
router.post('/signin', signin)
router.get('/signout', signout)
router.get('/profile', profile)

router.post('/forget-password', forgetpassword)
router.post('/reset-password', resetpassword)

router.post('/google-signin', googleSignIn)
router.post('/facebook-signin', facebookSignIn)

router.get('/get-profile', getProfile)
router.patch('/update-profile', updateProfile)

module.exports = router;