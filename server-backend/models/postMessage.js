const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    name: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    destination: String,
    source: String,
    guest: Number,
    guests: {
        type: [String],
        default: []
    },
    isGoing: {
        type: [String],
        default: []
    },
    likes: {
        type: [String],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    leavingTime: {
        type: Date,
        default: new Date()
    },
    hideAfter:{ type: Date },
    directions: { type: String }
})

const PostMessage = mongoose.model('PostMessage', postSchema)

module.exports = PostMessage;