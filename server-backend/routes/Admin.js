const router = require('express').Router()

const { adminDashboard, adminDashboardPost, adminDashboardUser,
        adminDashboardVerification, adminDashboardReport, adminDashboardVerificationResponse, } = require('../controllers/Admin.js')


router.post('/dashboard', adminDashboard)
router.post('/dashboard/post', adminDashboardPost)
router.post('/dashboard/user', adminDashboardUser)
router.post('/dashboard/report', adminDashboardReport)
router.post('/dashboard/verify', adminDashboardVerification)
router.post('/dashboard/verify-response', adminDashboardVerificationResponse)

module.exports = router;