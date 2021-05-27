const mongoose = require("mongoose")

const helpSchema = new mongoose.Schema({
     mail: { 
         type: String,  
        },
     message: { type: String },
     replyMessage: { type: String },
     isSolved: {
        type: Boolean,
        default: false,
      },
     createdAt: {
        type: Date,
        default: new Date()
     },
     replayedAt: {
      type: Date,
      default: new Date()
   },

})

const Help = mongoose.model('Help', helpSchema)

module.exports = Help;