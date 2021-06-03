const mongoose = require("mongoose")

const reportProfileSchema = new mongoose.Schema({
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: "UserId is required!",
        ref: "User",
      },
    reportedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: "UserId is required!",
        ref: "User",
      },
    reportedText: {
        type : String
    },
    reportedAt: {
        type: Date,
        default: new Date()
    },
    isSolved: {
        type: Boolean,
        default: false,
      },
    reponseType: {
      type: String
    },
    reponseText: {
        type: String
    },
    reponsedAt: {
        type: Date,
        default: new Date()
      }  
})

const ReportProfile = mongoose.model('ReportProfile', reportProfileSchema)

module.exports = ReportProfile;    