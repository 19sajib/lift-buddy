const router = require('express').Router()

const { adminDashboard, adminDashboardPost, adminDashboardUser,
        adminDashboardVerification, adminDashboardReport, adminDashboardVerificationResponse,
        adminDashboardHelp, adminDashboardHelpView, adminDashboardHelpReply,
        adminDashboardReportResponse, adminDashboardTrafic, adminDashboardFeedback,
        adminDashboardFeedbackView, adminDashboardFeedbackReply, adminDashboardReportedProfileView,
        adminDashboardReportProfileAction, banUser  } = require('../controllers/Admin.js')


router.post('/dashboard', adminDashboard)
router.post('/dashboard/feedback', adminDashboardFeedback)
router.post('/dashboard/feedback-view', adminDashboardFeedbackView)
router.post('/dashboard/feedback-reply', adminDashboardFeedbackReply)
router.post('/dashboard/trafic', adminDashboardTrafic)
router.post('/dashboard/post', adminDashboardPost)
router.post('/dashboard/user', adminDashboardUser)
router.post('/dashboard/report', adminDashboardReport)
router.post('/dashboard/report-response', adminDashboardReportResponse)
router.post('/dashboard/verify', adminDashboardVerification)
router.post('/dashboard/verify-response', adminDashboardVerificationResponse)
router.post('/dashboard/contact-us', adminDashboardHelp)
router.post('/dashboard/contact-us/view', adminDashboardHelpView)
router.post('/dashboard/contact-us/reply', adminDashboardHelpReply)
router.post('/dashboard/reported-profile-view', adminDashboardReportedProfileView)
router.post('/dashboard/reported-profile-view', adminDashboardReportedProfileView)
router.post('/dashboard/reported-profile-action', adminDashboardReportProfileAction)
router.post('/dashboard/ban-user', banUser)

module.exports = router;