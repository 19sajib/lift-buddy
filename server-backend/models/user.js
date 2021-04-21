const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
     name: { type: String, required: true },
     email: { type: String, required: true },
     password: { type: String, required: true },
     id: { type: String },
     avatar: { type: String },
     country: { type: String },
     state: { type: String },
     phoneNumber: { type: String },
     resetToken:{ type: String },
     expireToken:{ type: Date },
     meAsGuest: {
          type: [String],
          default: []
      },
     meAsHost: {
          type: [String],
          default: []
      },
})

const User = mongoose.model('User', userSchema)

module.exports = User;