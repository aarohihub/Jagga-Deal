const express = require("express");
const MessageRouter = express.Router();
const {
  CreateChat,
  FindChat,
  UserChats,
  getUser,
} = require("../Controller/ChatController");

MessageRouter.post("/chat", CreateChat);
MessageRouter.get("/getChat/:userId", UserChats);
MessageRouter.get("/find/:firstId/:secondId", FindChat);
MessageRouter.get("/getUser/:id", getUser);

module.exports = MessageRouter;
