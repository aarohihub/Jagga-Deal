import React, { useEffect, useState } from "react";
import AuctionItem from "./AuctionItem";

export default function AuctionCard() {
  const [auctionListing, setAuctionListing] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let data = await fetch("http://localhost:8080/api/v1/showAuction");
      data = await data.json();
      setAuctionListing(data);
    } catch (error) {
      console.log("Something went wrong", error);
    }
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full p-3 shadow-lg overflow-y-auto h-full">
        <h2 className="text-3xl font-serif text-center text-secondary mb-6">
          Auction Listings
        </h2>

        {auctionListing.length === 0 ? (
          // Display animated message when no auction listings are present
          <div className="flex justify-center items-center w-full h-64 animate-pulse">
            <span className="text-xl text-gray-600">
              No auction listings available...
            </span>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {auctionListing
              .slice(0, showMore ? auctionListing.length : 6)
              .map((listing) => (
                <AuctionItem listing={listing} key={listing._id} />
              ))}
          </div>
        )}

        {!showMore && auctionListing.length > 6 && (
          <button
            className="text-sm text-green-700 hover:underline mt-4 p-2"
            onClick={handleShowMore}
          >
            Show more
          </button>
        )}
      </div>
    </div>
  );
}
