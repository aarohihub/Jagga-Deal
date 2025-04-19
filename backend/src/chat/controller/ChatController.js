const ChatModel = require("../Models/ChatSchema");

const CreateChat = async (req, res) => {
  try {
    const checkChat = await ChatModel.findOne({
      members: [req.body.senderId, req.body.receiverId],
    });
    if (checkChat) {
      return res.status(200).json({ message: "chat already exists" });
    }
    const newChat = new ChatModel({
      members: [req.body.senderId, req.body.receiverId],
    });

    const result = await newChat.save();
    return res.status(200).json(result);
  } catch (error) {
    res.status(404).json({ message: "Error creating chat", error });
  }
};

const UserChats = async (req, res) => {
  try {
    const chat = await ChatModel.find({
      members: { $in: [req.params.userId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: "Error creating chat", error });
  }
};

const FindChat = async (req, res) => {
  try {
    const chat = await ChatModel.findOne({
      members: { $all: [req.params.firstId, req.params.secondId] },
    });

    res.status(200).json(chat);
  } catch (error) {
    res.status(404).json({ message: "Error creating chat", error });
  }
};

module.exports = { CreateChat, FindChat, UserChats };
