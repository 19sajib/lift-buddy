const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const moment = require('moment')


const PostMessage = require('../models/postMessage.js')
const User = require('../models/user.js')
const Admin = require('../models/Admin.js')
const ChatRoom = require('../models/Chatroom')
const Report = require('../models/Report')

const { MJ_APIKEY_PRIVATE, MJ_APIKEY_PUBLIC } = require('../config/keys.js')

const mailjet = require ('node-mailjet')
.connect(MJ_APIKEY_PUBLIC, MJ_APIKEY_PRIVATE)

const getPosts = async (req, res) => {
    const { page } = req.query;
    
    try {
        const LIMIT = 6;
        const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
    
        const total = await PostMessage.countDocuments({hideAfter: { $gt:Date.now()}});
        const posts =await PostMessage.find({hideAfter: { $gt:Date.now()}}).sort({hideAfter: 1}).limit(LIMIT).skip(startIndex);

        res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});
    } catch (error) {
       res.status(400).json({ message: error.message}) 
    } 
};

const getPost = async (req, res) => {
    const { postId2 } = req.body;
    try {
        const post = await PostMessage.findOne({_id: postId2})
        //console.log(postMessage);
        res.status(200).json(post)
    } catch (error) {
       res.status(400).json({ message: error.message}) 
    } 
};

const createPost = async (req, res) => {
    const post = req.body;

    // Hiding Post Part
    const leavingTimeMilliseconds  = new Date(post.leavingTime) 
    var hideTimeMilliseconds = Math.abs(new Date() - leavingTimeMilliseconds);
    const hideTime = Math.floor(hideTimeMilliseconds / (1000 * 60 * 60)).toFixed(1);
    console.log(hideTime);
    const hideAfter = Date.now() + (hideTime * 1000 * 60 * 60);
    console.log(hideAfter);
    
    // Creating chatroom
    const user = await User.findById(post.creator);
    console.log(user);
    const name = `${post.source} to ${post.destination} with ${post.name} at ${moment(post.leavingTime).format('YYYY-MM-DD hh:mm A')}`;
    if (user) {
        const chatroom = new ChatRoom({
            name,user: user._id, userName: user.name, userAvatar: user.avatar, leavingAt: post.leavingTime, createdAt: new Date()
          });
        
          await chatroom.save();
          //console.log(chatroom);
          const newPost = new PostMessage({...post,chatroomId: chatroom._id, hideAfter, createdAt: new Date().toISOString() })
          try {
              await newPost.save();
              const admin = await Admin.findOneAndUpdate({ _id: process.env.Admin_Id }, { $inc: { totalPost: 1 }}, { new: true })
              //console.log(newPost);
              res.status(201).json({data: newPost, message: "Your post created successfully"})
            } catch (error) {
                console.log(error);
                res.status(409).json({ message: error}) 
            }
        }
};

const updatePost = async (req, res) => {
    const {id: _id} = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).json({message: "No post with that id, Maybe internal server error."});

    const updatedPost = await PostMessage.findByIdAndUpdate(_id, { ...post, _id }, { new: true });

    res.json({data: updatedPost, message: "Your post updated successfully"})
}

const deletePost = async (req, res) => {
    const { id } = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with that id, Maybe internal server error."});

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully" })
}

const likePost = async (req, res) =>{
    const { postId, userId } = req.params;
    //console.log(req.params);
    const id = postId
    if(!userId) return res.json({ message: "Unauthenticated"})
    
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message: "No post with that id, Maybe internal server error."});

    const post = await PostMessage.findById(id);
    const chat = await ChatRoom.findById(post.chatroomId)
    const user = await User.findById(userId);

    const index = post.likes.findIndex((id) => id === String(userId));

    try {
        if (index === -1) {
            if(post.likes.length === post.guest) {
                res.status(201).json({message: "Unfortunately, you are a couple of seconds late. Space has been booked by someone else. Please, find another host."})
            } else { 
            // like the post
            post.likes.push(userId)
            user.meAsGuest.push(postId)
            chat.user.push(user._id)
            chat.userName.push(user.name)
            chat.userAvatar.push(user.avatar)
            chat.showOrNot = true

            const updatedPost = await PostMessage.findByIdAndUpdate({_id : id}, post, { new: true})
            const updateUser = await User.findOneAndUpdate({ _id: userId }, user, { new: true })
            const updateChat = await ChatRoom.findOneAndUpdate({ _id: post.chatroomId}, chat, { new: true })
            //console.log(user);

            const request = mailjet.post("send").request({
                "Messages":[
                  {
                    "From": {
                      "Email": "contact2sajib@gmail.com",
                      "Name": "Abu"
                    },
                    "To": [
                      {
                        "Email": user.email,
                        "Name": user.name
                      }
                    ],
                    "Subject": "Lift-Buddy - Your ride has been confirmed.",
                    "TextPart": "Your ride has been confirmed.",
                    "HTMLPart": `<h3 align="center" style="color:green;" >You have confirmed a ride with ${post.name}. Your can go ${post.source} to ${post.destination} with ${post.name}.</h3>
                                 <br /> <h3 align="center" >Remindar: ${post.name} leaving at: ${moment(post.leavingAt).format('YYYY-MM-DD hh:mm A')}. Make sure you don't miss the ride. 
                                 And you are now in a chat group with ${post.name}. You can discuss picking points and so more.</h3>
                                 <br />Have a nice journey.
                                 <br />Have a nice day!`,
                    "CustomID": "AppGettingStartedTest"
                  }
                ]
              })
              request.then((result) => { console.log(result.body)})
                .catch((err) => {
                  console.log(err.statusCode)
                  console.log(err)
                })


            res.status(201).json({ updatedPost ,message: "Your ride has been confirmed. For sure please check your email."})
        } 
       } else {
            // dislike post
            post.likes = post.likes.filter((id) => id !== String(userId));
            user.meAsGuest = user.meAsGuest.filter((id) => id !== String(postId));
            chat.user = chat.user.filter((id)=> id !== String(user._id));
            chat.userName = chat.userName.filter((name)=> name !== String(user.name));
            chat.userAvatar = chat.userAvatar.filter((avatar)=> avatar !== String(user.avatar));
            //console.log(user.meAsGuest);
            const updatedPost = await PostMessage.findByIdAndUpdate({_id : id}, post, { new: true})
            const updateUser = await User.findOneAndUpdate({ _id: userId }, user, { new: true })
            const updateChat = await ChatRoom.findOneAndUpdate({ _id: post.chatroomId}, chat, { new: true })
            //console.log(user);
            const request = mailjet.post("send").request({
                "Messages":[
                  {
                    "From": {
                      "Email": "contact2sajib@gmail.com",
                      "Name": "Abu"
                    },
                    "To": [
                      {
                        "Email": user.email,
                        "Name": user.name
                      }
                    ],
                    "Subject": "Lift-Buddy - Your ride has been canceled.",
                    "TextPart": "Your ride has been canceled.",
                    "HTMLPart": `<h3 align="center" style="color:red;" >You have canceled a ride with ${post.name}. </h3>
                                 <br /> <h3 align="center" >Hope we will see you soon on another ride.</h3>
                                 <br />Have a nice day!`,
                    "CustomID": "AppGettingStartedTest"
                  }
                ]
              })
              request.then((result) => { console.log(result.body)})
                .catch((err) => {
                  console.log(err.statusCode)
                  console.log(err)
                })


            res.status(201).json({ updatedPost ,message: "Your ride has been canceled. For sure please check your email."})
        }
    } catch (error) {
        console.log(error);
    }
}

const meAsGuest = async(req, res) => {
    const {id} = req.body;

    try {
        const postMessage = await PostMessage.find({"creator": id})

        res.status(200).json(postMessage)
    } catch (error) {
       res.status(400).json({ message: error.message}) 
    } 

}

const reportPost = async(req, res) => {
    const { reportedBy, reportedPost, reportedText, postOwner } = req.body;
    //console.log(req.body);

    try {

        const report = await Report.create({ reportedBy, reportedPost, reportedText, postOwner, createdAt: new Date() })
        const admin = await Admin.findOneAndUpdate({ _id: process.env.Admin_Id }, { $inc: { totalReport: 1 }}, { new: true })
        res.status(200).json({report, message: "We have captured your report, We will let you know further update via email. Thank You for your report."})
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: error.message}) 
    }
}

 const getPostsBySearch = async (req, res) => {
  const { searchQuery } = req.query;
//console.log(serchQuery);
  try {
      const destination = new RegExp(searchQuery, "i");

      const posts = await PostMessage.find({ destination });

      res.json({ data: posts });
  } catch (error) {    
    console.log(error);
      res.status(404).json({ message: error.message });
  }
}

module.exports = { getPost, getPosts, getPostsBySearch, createPost, updatePost, deletePost, likePost, reportPost, meAsGuest }