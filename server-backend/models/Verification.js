const mongoose = require("mongoose")

const verificationSchema = new mongoose.Schema({
     userId: { 
         type: String, 
         ref: 'User' 
        },
     file1: { type: String },
     file2: { type: String },
     file3: { type: String },
     isSolved: {
        type: Boolean,
        default: false,
      },
     attempt: { Number },
     createdAt: {
        type: Date,
        default: new Date()
     },
     updatedAt: {
      type: Date,
      default: new Date()
   },
   idType: { type: String},
   idValue: { type: String},

})

const Verification = mongoose.model('Verification', verificationSchema)

module.exports = Verification;