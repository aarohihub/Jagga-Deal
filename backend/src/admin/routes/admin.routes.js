const routes = require("express").Router();
const {
  createListing,
  showSingleListing,
  showAdminListing,
  deleteAdminListing,
  updateAdminListing,
  getAdminListing,
  adminAprove,
  adminCancel,
  adminVerify,
  CountListing,
  getAllAdminListings,
} = require("../controller/admin.controller");

routes.post("/create", createListing);
routes.get("/show/:id", showSingleListing);
routes.get("/showAdminListing/:id", showAdminListing);
routes.delete("/delete/:id", deleteAdminListing);
routes.put("/update/:id", updateAdminListing);
routes.get("/getAdminListing/:id", getAdminListing);
routes.get("/approve-user/Property", adminAprove);
routes.put("/verify/:id", adminVerify);
routes.put("/cancel/:id", adminCancel);
routes.get("/CountListing", CountListing);
routes.get("/getAllAdminListings", getAllAdminListings);

module.exports = routes;
