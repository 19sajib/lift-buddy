const router = require("express").Router();

const Message = require("../controllers/Message");


router.get("/:chatroom", Message.getAllMessages)


module.exports = router;