const router = require('express').Router()


const ChatRoom = require("../controllers/ChatRoom.js")

router.get("/", ChatRoom.getAllChatrooms)
router.post("/", ChatRoom.createChatroom)

module.exports = router;