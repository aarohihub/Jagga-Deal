import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MdLocationOn, MdBathtub } from "react-icons/md";
import { FaBed, FaParking } from "react-icons/fa";

export default function AuctionItem({ listing }) {
  const [remainingTime, setRemainingTime] = useState(null);

  useEffect(() => {
    if (listing) {
      const endTime = new Date(listing.endTime);
      calculateRemainingTime(endTime);

      const intervalId = setInterval(() => {
        calculateRemainingTime(endTime);
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [listing]);

  const calculateRemainingTime = (endTime) => {
    const now = new Date();
    const difference = endTime - now;
    if (difference > 0) {
      const hours = Math.floor(
        (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      setRemainingTime({ hours, minutes, seconds });
    } else {
      setRemainingTime(null);
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  return (
    <div className=" flex shadow-md hover:shadow-lg transition-shadow rounded-lg w-full sm:w-[330px] overflow-hidden font-serif">
      <Link
        to={`auctionSingleListing/${listing._id}`}
        className="flex flex-col w-full"
      >
        <div className="relative h-[300px] sm:h-[220px] w-full overflow-hidden">
          <img
            className="h-full w-full object-cover hover:scale-105 transition-all duration-300"
            src={
              listing.imageUrl[0] ||
              "https://assets-global.website-files.com/620ec747459e13c7cf12a39e/625b10a58137b364b18df2ea_iStock-94179607.jpg"
            }
            alt="Listing"
          />
        </div>
        <div className="p-3 flex flex-col gap-2 w-full flex-1 overflow-y-auto text-secondary">
          <p className="truncate text-lg  ">{listing.title}</p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-secondary" />
            <p className="text-sm text-secondary truncate w-full">
              {listing.address}
            </p>
          </div>

          <p className="text-sm  line-clamp-2">{listing.description}</p>
          <p className=" mt-2  flex gap-14">Rs {listing.MinimumPrice}</p>

          <div className=" flex gap-2">
            <div className=" text-xs flex gap-1">
              <FaBed className="text-lg flex " />
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bedroom`}
            </div>

            <div className=" text-xs flex gap-1">
              <MdBathtub className="text-sm " />
              {listing.bathrooms > 1
                ? `${listing.bathrooms} baths`
                : `${listing.bathrooms} bathroom`}
            </div>
            <div className=" text-xs flex gap-1">
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
            </div>
          </div>

          {remainingTime && (
            <div className="  text-sm">
              <p>
                Time Remaining:{" "}
                {`${formatTime(remainingTime.hours)}:${formatTime(
                  remainingTime.minutes
                )}:${formatTime(remainingTime.seconds)}`}{" "}
                <br />
                End Date: {new Date(listing.endTime).toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
