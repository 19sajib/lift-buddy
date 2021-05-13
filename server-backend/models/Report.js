const mongoose = require("mongoose")

const reportSchema = new mongoose.Schema({
    reportedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: "UserId is required!",
        ref: "User",
      },
    reportedPost: {
        type: mongoose.Schema.Types.ObjectId,
        required: "PostId is required!",
        ref: "PostMessage",
    },
    reportedText: {
        type : String
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    isSolved: {
        type: Boolean,
        default: false,
      },
})

const Report = mongoose.model('Report', reportSchema)

module.exports = Report;    