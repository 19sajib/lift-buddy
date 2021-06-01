const mongoose = require("mongoose")

const feedbackSchema = new mongoose.Schema({
     mail: { 
         type: String,  
        },
     type: {
         type: String,
     },   
     message: { type: String },
     isSolved: {
        type: Boolean,
        default: false,
      },
     reportedAt: {
        type: Date,
        default: new Date()
     },
     solvedAt: {
      type: Date,
      default: new Date()
   },

})

const Feedback = mongoose.model('Feedback', feedbackSchema)

module.exports = Feedback;