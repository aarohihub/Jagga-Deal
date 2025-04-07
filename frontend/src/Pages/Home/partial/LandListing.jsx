import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../libs/axios";
import ListingItem from "../../../Components/card";
import { Link } from "react-router-dom";

function LandListingPage() {
  const [landListing, setLandListing] = useState([]);
  const [adminLandListing, setAdminLandListing] = useState([]);

  useEffect(() => {
    fetchLandData();
  }, []);

  const fetchLandData = async () => {
    try {
      let res = await axiosInstance("/searchListing/?type=land&limit=3");
      setLandListing(res.data.userListing);
      setAdminLandListing(res.data.adminListing);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };
  return (
    <div>
      {(landListing?.length > 0 || adminLandListing?.length > 0) && (
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-serif text-[#8F2B51] ">
              Recent Places for Land Sale
            </h2>
            <Link
              className="text-sm text-[#8F2B51] font-serif hover-underline-animation"
              to={"/search?offer=true"}
            >
              Show more Places for Land Sale
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {landListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}

            {adminLandListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandListingPage;
