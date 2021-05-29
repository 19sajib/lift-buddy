const Chatroom = require("../models/Chatroom")

exports.createChatroom = async (req, res) => {
  const { name, user } = req.body;
  console.log(req.body);

  const nameRegex = /^[A-Za-z\s]+$/;

  if (!nameRegex.test(name)) throw "Chatroom name can contain only alphabets.";

  const chatroomExists = await Chatroom.findOne({ name });

  if (chatroomExists) throw "Chatroom with that name already exists!";

  const chatroom = new Chatroom({
    name,user: user._id, userName: user.name, userAvatar: user.avatar, createdAt: new Date()
  });

  await chatroom.save();

  res.json({
    message: "Chatroom created!",
  });
};

exports.getAllChatrooms = async (req, res) => {
  const {userId} = req.body;
  console.log(userId);
  const chatrooms = await Chatroom.find({showOrNot: true, user: userId}).sort({createdAt: -1});

  res.json(chatrooms);
};
exports.getSingleChatrooms = async (req, res) => {
  const {id} = req.params
  console.log(req.params);
  console.log('here');
  const chatroom = await Chatroom.find({_id: id});

  res.json(chatroom);
};