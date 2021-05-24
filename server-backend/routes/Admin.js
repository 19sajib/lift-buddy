const router = require('express').Router()

const { adminDashboard, adminDashboardPost, adminDashboardUser,
        adminDashboardVerification, adminDashboardReport } = require('../controllers/Admin.js')


router.post('/dashboard', adminDashboard)
router.post('/dashboard/post', adminDashboardPost)
router.post('/dashboard/user', adminDashboardUser)
router.post('/dashboard/report', adminDashboardReport)
router.post('/dashboard/verify', adminDashboardVerification)

module.exports = router;