const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
     id: { type: String },
     avatar: { type: String },
     job: { type: String },
     aboutMe: { type: String },
     country: { type: String },
     state: { type: String },
     phoneNumber: { type: String },
     resetToken:{ type: String },
     expireToken:{ type: Date },
     isVerified: {
          type: Boolean,
          default: false,
        },
     isAdmin: {
          type: Boolean,
          default: false,
        },
     meAsGuest: {
          type: [String],
          default: []
      },
     meAsHost: {
          type: [String],
          default: []
      },
     isBanned: {
          type: Boolean,
          default: false,
        },
})

const User = mongoose.model('User', userSchema)

module.exports = User;