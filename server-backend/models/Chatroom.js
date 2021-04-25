const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: "Name is required!",
  },
  showOrNot: {
    type: Boolean,
    default: false,
  },
  user: {
        type: [String],
        default: [],
        required: true,
        ref: 'User',
    },
  userName: {
    type: [String],
    default: [],
     required: true
  },
  userAvatar: { 
    type: [String],
    default: []
   },
  postId: { type: mongoose.Schema.Types.ObjectId},
  leavingAt: { type: Date },
  lastMessageAt: { type: Date },
  createdAt: { 
    type: Date,
    default: new Date()
   },
});

const Chatroom = mongoose.model("Chatroom", chatroomSchema)

module.exports = Chatroom;