import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../libs/axios";
import ListingItem from "../../../Components/card";
import { Link } from "react-router-dom";
function OfferListingPage() {
  const [offerListing, setOfferListing] = useState([]);
  const [adminOfferListing, setAdminOfferListing] = useState([]);

  useEffect(() => {
    fetchOfferListing();
  }, []);

  const fetchOfferListing = async () => {
    try {
      const res = await axiosInstance.get("/searchListing?offer=true");
      setOfferListing(res.data.userListing);
      setAdminOfferListing(res.data.adminListing);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {(offerListing?.length > 0 || adminOfferListing?.length > 0) && (
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-serif text-[#8F2B51] ">
              Recent Offer
            </h2>
            <Link
              className="text-sm text-[#8F2B51] font-serif hover-underline-animation"
              to={"/search?offer=true"}
            >
              Show more Offers
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {offerListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}

            {adminOfferListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default OfferListingPage;
