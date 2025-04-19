const express = require("express");
const MessageRouter = express.Router();
const {
  CreateChat,
  FindChat,
  UserChats,
} = require("../controller/ChatController");

MessageRouter.post("/api/chat", CreateChat);
MessageRouter.get("/api/getChat/:userId", UserChats);
MessageRouter.get("/api/find/:firstId/:secondId", FindChat);

module.exports = MessageRouter;
