const Listing = require("../model/adminListingSchema");
const approve = require("../../model/userListingSchema");
const createListing = async (req, res) => {
  try {
    const listing = new Listing(req.body);
    let result = await listing.save();
    if (result) {
      return res.status(200).json({ result: result });
    } else {
      return res.status(404).json({ message: "result could not be created" });
    }
  } catch (error) {
    console.log("Internal error: " + error);
    res.status(500).json({ error: "Internal server  error" });
  }
};

const showSingleListing = async (req, res) => {
  try {
    let data = await Listing.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }

    return res
      .status(200)
      .json({ message: "Show listing data sucessfully", data });
  } catch (error) {
    return res
      .status(405)
      .json({ message: "some thing went wrong with the server", error });
  }
};

const showAdminListing = async (req, res) => {
  if (req.params.id) {
    try {
      const listings = await Listing.find({ userRef: req.params.id });

      return res.status(200).json(listings);
    } catch (error) {
      res.status(404).json({ message: "something went wrong" });
    }
  } else {
    res.status(404).json({ message: "User not found" });
  }
};

const deleteAdminListing = async (req, res) => {
  try {
    const data = await Listing.deleteOne({ _id: req.params.id });
    if (!data) {
      return res.status(400).json({ message: "data is not found" });
    }
    return res
      .status(200)
      .json({ message: "data is successfully deleted" + data });
  } catch (error) {
    return res.status(402).json({ message: "Error deleting", error });
  }
};

const updateAdminListing = async (req, res) => {
  try {
    const check = await Listing.findOne({ _id: req.params.id });
    if (!check) {
      return res.status(402).json({ message: "user not found" });
    }
    const api = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(api);
  } catch (error) {
    return res.status(405).json({ message: "sth wrong", error });
  }
};

const getAdminListing = async (req, res) => {
  try {
    let data = await Listing.findOne({ _id: req.params.id });

    if (!data) {
      return res.status(400).json({ message: "data not found" });
    }

    return res
      .status(200)
      .json({ message: "Show listing data sucessfully", data });
  } catch (error) {
    return res
      .status(405)
      .json({ message: "some thing went wrong with the server", error });
  }
};

const adminAprove = async (req, res) => {
  try {
    const listings = await approve.find({ isVerified: false });

    if (listings) {
      if (listings.length > 0) {
        return res.status(200).json({ message: "Success", listings });
      } else {
        return res
          .status(202)
          .json({ message: "No unverified listings found" });
      }
    } else {
      res.status(404).json({ message: "no data found" });
    }
  } catch (error) {
    console.error("Error while fetching unverified listings:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const adminVerify = async (req, res) => {
  try {
    const itemId = req.params.id;
    const itemToVerify = await approve.findByIdAndUpdate(
      itemId,
      { isVerified: true, isCanceled: false },

      { new: true }
    );

    if (!itemToVerify) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json(itemToVerify);
  } catch (error) {
    console.error("Error while verifying item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const adminCancel = async (req, res) => {
  try {
    const cancelRequest = await approve.findByIdAndUpdate(
      req.params.id,

      { ...req.body, isCanceled: true },
      { new: true }
    );

    if (!cancelRequest) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(cancelRequest);
  } catch (error) {
    console.error("Error while verifying item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const CountListing = async (req, res) => {
  try {
    const data = await Listing.find({ isVerified: true });
    const admindata = await approve.find();
    // if (!data ) {
    //   res.status(404).json({ message: "Couldn't find data" });
    // }
    res.status(200).json({ data, admindata });
  } catch (error) {
    res.status(500).json({ message: "sth went wrong" });
  }
};

const getAllAdminListings = async (req, res) => {
  try {
    const listings = await approve.find({ _id: req.params.id });
    if (listings.length > 0) {
      return res.status(200).json({ message: "Success", listings });
    } else {
      return res.status(202).json({ message: "No verified listings found" });
    }
  } catch (error) {
    console.error("Error while fetching all admin listings:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createListing,
  showSingleListing,
  showAdminListing,
  deleteAdminListing,
  updateAdminListing,
  getAdminListing,
  adminAprove,
  adminVerify,
  adminCancel,
  CountListing,
  getAllAdminListings,
};
