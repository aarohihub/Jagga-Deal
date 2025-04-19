const express = require("express");
const { isAuthenticateUser } = require("../middleware/auth");

const messageRoute = express.Router();

const {
  getUserforSideBar,
  getMessages,
  sendMessages,
} = require("../controller/message.controller");

messageRoute.route("/users").get(isAuthenticateUser, getUserforSideBar);
messageRoute.route("/:id").get(isAuthenticateUser, getMessages);
messageRoute.route("/send/:id").post(isAuthenticateUser, sendMessages);

module.exports = messageRoute;
