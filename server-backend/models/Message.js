const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  chatroom: {
    type: mongoose.Schema.Types.ObjectId,
    required: "Chatroom is required!",
    ref: "Chatroom",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: "UserId is required!",
    ref: "User",
  },
  name: {
    type: String,
  },
  message: {
    type: String,
    required: "Message is required!",
  },
  createdAt: { type: Date }
});

const Message = mongoose.model('Message', messageSchema)

module.exports = Message;