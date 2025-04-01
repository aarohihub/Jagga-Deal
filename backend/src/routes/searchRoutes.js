const express = require("express");
const serchRouter = express.Router();

const {
  searchListing,
} = require("../controller/search/SearchListingController");

serchRouter.route("/searchListing").get(searchListing);

module.exports = serchRouter;
