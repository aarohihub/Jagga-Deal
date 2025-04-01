const mongoose = require("mongoose");

const AuuctionParticipateSchema = new mongoose.Schema(
  {
    userDetails: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    auctionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auctionlisting",
      required: true,
    },
    bidAmount: {
      type: Number,
      required: true,
    },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const participateSchema = mongoose.model(
  "AuctionParticipate",
  AuuctionParticipateSchema
);

module.exports = participateSchema;
