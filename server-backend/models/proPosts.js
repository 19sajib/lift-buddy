const mongoose = require('mongoose')

const proPostsSchema = new mongoose.Schema({
    vehicle: String,
    message: String, 
    source: String,
    destination: String,
    leftTime: Date,
    creator: { type: String },
    expireAt: {
        type: Date
    },
    createAt: {
        type: Date,
        default: new Date()
    },
    isGoing: {
        type: [String],
        default: []
    }
})


const proPosts = mongoose.model('proPosts', proPostsSchema)

module.exports = proPosts;