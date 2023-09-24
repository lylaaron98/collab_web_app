const express = require("express");
const chatController = require("../controllers/chatController.js");

const router = express.Router();

router.post("/updateChat", chatController.updateChat);
router.post("/addUser", chatController.addUser);
router.post("/removeUser", chatController.removeUser);
router.post("/getChat", chatController.getChat);
router.post("/getChatRooms", chatController.getChatRooms);

module.exports = router;
