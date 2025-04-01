const asyncHandler = require("../../utils/asyncHandler");
const Listing = require("../../model/userListingSchema");
const adminListing = require("../../admin/model/adminListingSchema");
const ErrorHandler = require("../../utils/ErrorHandler");
// ? create user property listing

exports.createListing = asyncHandler(async (req, res, next) => {
  const { isVerified, ...rest } = req.body;
  const result = new Listing({
    ...rest,
    isVerified: isVerified || false,
  });

  await result.save();
  res.status(201).json(result);
});

// ?update user property listing

exports.updateListing = asyncHandler(async (req, res, next) => {
  const check = await Listing.findOne({ _id: req.params.id });
  if (!check) {
    return next(new ErrorHandler(401, "user not found"));
  }
  const api = await Listing.findByIdAndUpdate(
    req.params.id,
    { ...req.body, isVerified: false },
    {
      new: true,
    }
  );

  return res.status(200).json(api);
});

// ? delete user property listing

exports.deleteListing = asyncHandler(async (req, res, next) => {
  const data = await Listing.deleteOne({ _id: req.params.id });
  if (!data) {
    return next(new ErrorHandler(401, "data not found by id"));
  }
  res.status(200).json({ message: "data is successfully deleted" });
});

// ? get all user property listing data
// todo: only for user
exports.getUserListing = asyncHandler(async (req, res, next) => {
  if (!req.params.id) {
    return next(new ErrorHandler(401, "user id is required"));
  }
  const result = await Listing.find({ _id: req.params.id });
  if (!result) {
    return next(new ErrorHandler(401, "data not found by id"));
  }
  res.status(200).json(result);
});

// ? get single property of user listings
exports.getAllListing = asyncHandler(async (req, res, next) => {
  const result = await Listing.find({ userRef: req.params.id });
  if (!result) {
    return next(new ErrorHandler(401, "data not found by id"));
  }
  res.status(200).json(result);
});

// ? get single property of listings
// todo: using property id
exports.getOneListing = asyncHandler(async (req, res, next) => {
  const result = await Listing.findOne({ _id: req.params.id });
  if (!result) {
    return next(new ErrorHandler(401, "data not found by id"));
  }
  res.status(200).json(result);
});

exports.getListing = async (req, res) => {
  try {
    let data = await Listing.findOne({ _id: req.params.id });
    let data1 = await adminListing.findOne({ _id: req.params.id });

    // if (!data && !data1) {
    //   return res.status(400).json({ message: "data not found" });
    // }

    return res.status(200).json({ data, data1 });
  } catch (error) {
    return res
      .status(405)
      .json({ message: "some thing went wrong with the server", error });
  }
};
