const listingData = require("../../model/userListingSchema");
const listingData1 = require("../../admin/model/adminListingSchema");

const searchListing = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 9;
    const startIndex = parseInt(req.query.startIndex) || 0;
    let offer = req.query.offer;

    if (offer === undefined || offer === "false") {
      offer = { $in: [false, true] };
    }
    let furnished = req.query.furnished;

    if (furnished === undefined || furnished === "false") {
      furnished = { $in: [false, true] };
    }

    let parking = req.query.parking;
    if (parking === undefined || parking === "false") {
      parking = { $in: [false, true] };
    }
    let type = req.query.type;
    if (type === undefined || type == "all") {
      type = { $in: ["sale", "rent"] };
    }

    const searchTerm = req.query.searchTerm || "";

    const sort = req.query.sort || "createdAt";

    const order = req.query.order || "desc";
    const userListing = await listingData
      .find({
        title: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
        isVerified: true,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    const adminListing = await listingData1
      .find({
        title: { $regex: searchTerm, $options: "i" },
        offer,
        furnished,
        parking,
        type,
      })
      .sort({ [sort]: order })
      .limit(limit)
      .skip(startIndex);

    return res.status(200).json({ userListing, adminListing });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

module.exports = { searchListing };
