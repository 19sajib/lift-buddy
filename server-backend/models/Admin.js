const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema ({
    user: { Number },
    verifiedUser: { Number },
    pendingVerifiedUser: { Number },
    totalReport: { Number },
    activeReport: { Number },
    totalHelp: { Number },
    activeHelp: { Number },
    totalPost: { Number },
    trafic: { Number },
    desktopTrafic: { Number },
    tabletTrafic: { Number },
    mobileTrafic: { Number },

})

const Admin = mongoose.model('Admin', adminSchema)

module.exports = Admin;