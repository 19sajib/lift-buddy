const router = require('express').Router()

const { adminDashboard, adminDashboardPost, adminDashboardUser,
        adminDashboardVerification, adminDashboardReport, adminDashboardVerificationResponse,
        adminDashboardHelp, adminDashboardHelpView, adminDashboardHelpReply  } = require('../controllers/Admin.js')


router.post('/dashboard', adminDashboard)
router.post('/dashboard/post', adminDashboardPost)
router.post('/dashboard/user', adminDashboardUser)
router.post('/dashboard/report', adminDashboardReport)
router.post('/dashboard/verify', adminDashboardVerification)
router.post('/dashboard/verify-response', adminDashboardVerificationResponse)
router.post('/dashboard/contact-us', adminDashboardHelp)
router.post('/dashboard/contact-us/view', adminDashboardHelpView)
router.post('/dashboard/contact-us/reply', adminDashboardHelpReply)

module.exports = router;