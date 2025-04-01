const express = require("express");

const auctionRoutes = express.Router();
const {
  createAuction,
  displayAuctionList,
  displaySingleAuctionList,
  displayUniqueSingleList,
  deleteAuctionListing,
  updateAuctionListing,
} = require("../AuctionController/Auction");

const {
  participate,
  getHighestBidder,
  bidderUsers,
} = require("../AuctionController/ParticipateInAuction");

auctionRoutes.post("/createAuction", createAuction);
auctionRoutes.get("/showAuction", displayAuctionList);
auctionRoutes.get("/showSingleAuction/:id", displaySingleAuctionList);
auctionRoutes.get("/showuniqueAuction/:id", displayUniqueSingleList);
auctionRoutes.delete("/deleteAuctionListing/:id", deleteAuctionListing);
auctionRoutes.put("/updateAuctionListing/:id", updateAuctionListing);
auctionRoutes.post("/participate/:id", participate);
auctionRoutes.get("/getwinner/:auctionId", getHighestBidder);
auctionRoutes.get("/getallUserParticipate/:auctionId", bidderUsers);

//ahow user routes

module.exports = auctionRoutes;
