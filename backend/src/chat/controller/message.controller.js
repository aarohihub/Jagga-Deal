const Message = require("../model/message.model");
const asyncHandler = require("../utils/asyncHandler");
const ErrorHandler = require("../utils/errorHandler");
const User = require("../model/user.model");
const cloudnary = require("cloudinary");
const { getReceiverSocketId, io } = require("../utils/socket");
exports.getUserforSideBar = asyncHandler(async (req, res, next) => {
  const loginUser = req.user.id;
  const filterUser = await User.find({ _id: { $ne: loginUser } }).select(
    "-password"
  );
  res.status(201).json({ success: true, filterUser });
});

exports.getMessages = asyncHandler(async (req, res, next) => {
  const { id: userToChartId } = req.params;
  const myId = req.user.id;

  const messages = await Message.find({
    $or: [
      { senderId: myId, receiverId: userToChartId },
      { senderId: userToChartId, receiverId: myId },
    ],
  });

  res.status(200).json({ success: true, messages });
});

exports.sendMessages = asyncHandler(async (req, res, next) => {
  const { text, image } = req.body;
  const { id: receiverId } = req.params;
  const senderId = req.user.id;
  let imageUrl;
  if (image) {
    const uploadResponse = await cloudnary.uploader.upload(image);
    imageUrl = uploadResponse.secure_url;
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    text,
    image: imageUrl,
  });

  await newMessage.save();

  const receiverSocketId = getReceiverSocketId(receiverId);
  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }
  res.status(201).json(newMessage);
});
