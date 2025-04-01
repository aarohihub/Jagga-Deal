const mongoose = require("mongoose");

const auctionSchemaCreate = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },

    imageUrl: {
      type: Array,
      required: true,
    },

    userRef: {
      type: String,
      required: true,
    },
    MinimumPrice: {
      type: Number,
      required: true,
    },
    // time: {
    //   type: Date,
    //   required: true,
    //   min: 1,
    // },
    startTime: {
      type: Date,
      default: Date.now,
    },
    endTime: {
      type: Date,
      required: true,
    },

    isVerified: {
      type: Boolean,
      default: false,
    },
    emailSent: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const AuctionSchema = mongoose.model("AuctionListing", auctionSchemaCreate);

module.exports = AuctionSchema;
