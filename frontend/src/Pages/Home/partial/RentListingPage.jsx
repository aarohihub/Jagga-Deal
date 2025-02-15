import React, { useState, useEffect } from "react";
import { axiosInstance } from "../../../libs/axios";
import ListingItem from "../../../Components/card";
import { Link } from "react-router-dom";

function RentListingPage() {
  const [rentListing, setRentListing] = useState([]);
  const [adminRentListing, setAdminrentListing] = useState([]);

  useEffect(() => {
    fetchRentData();
  }, []);

  const fetchRentData = async () => {
    try {
      let res = await axiosInstance.get("/searchListing/?type=rent&limit=3");
      setRentListing(res.data.userListing);
      setAdminrentListing(res.data.adminListing);
    } catch (error) {
      console.log("internal error: " + error);
    }
  };

  return (
    <div>
      {(rentListing?.length > 0 || adminRentListing?.length > 0) && (
        <div>
          <div className="my-3">
            <h2 className="text-2xl font-serif text-[#8F2B51] ">
              Recent Places for Rent
            </h2>
            <Link
              className="text-sm text-[#8F2B51] font-serif hover-underline-animation"
              to={"/search?offer=true"}
            >
              Show more Places for Rent
            </Link>
          </div>

          <div className="flex flex-wrap gap-4">
            {rentListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}

            {adminRentListing?.map((listing) => (
              <ListingItem listing={listing} key={listing._id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default RentListingPage;
