const Message = require("../models/Message");

exports.getAllMessages = async (req, res) => {
  const { chatroom } = req.params;
  const messages = await Message.find({ chatroom });
  res.json(messages);
};