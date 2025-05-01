const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Chat", messageSchema);
