const mongoose = require("mongoose");
const MessageSchema = new mongoose.Schema(
  {
    chatId: {
      type: String,
    },
    senderId: {
      type: String,
    },
    receiverId: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", MessageSchema);
