const ChatModel = require("../model/ChatSchema");
const User = require("../../model/UserSchema");
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
const getUser = async (req, res) => {
  try {
    const result = await User.findById(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "User successfully found", result });
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { CreateChat, FindChat, UserChats, getUser };
