const express = require("express");
const MsgRoutes = express.Router();

const { addMsg, getMsg } = require("../controller/MessageController");

MsgRoutes.post("/addMsg", addMsg);
MsgRoutes.get("/getMsg/:chatId", getMsg);

module.exports = MsgRoutes;
