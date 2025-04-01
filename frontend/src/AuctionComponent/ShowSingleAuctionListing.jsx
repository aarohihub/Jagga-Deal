import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import toast from "react-hot-toast";
import SwiperCore from "swiper";
import "swiper/css/bundle";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ShowSingleAuctionListing() {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [remainingTime, setRemainingTime] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [winner, SetWinner] = useState();
  const [bidAmount, setBidAmount] = useState("");
  const navigate = useNavigate();
  const [auctionId, setAuctionId] = useState("");
  const [highestBid, SetHighestBid] = useState("");
  const [auctionError, setAuctionError] = useState(false);
  const [winnerDetermined, setWinnerDetermined] = useState(false);
  SwiperCore.use([Navigation]);
  const userDetails = currentUser._id;
  const [userParticipate, setUserParticipate] = useState([]);

  useEffect(() => {
    showData();
  }, [params.id]);
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

  const showData = async () => {
    try {
      setLoading(true);
      let result = await fetch(
        `http://localhost:8080/api/v1/showSingleAuction/${params.id}`
      );

      if (!result) {
        setError(true);
        setLoading(false);
        return;
      }
      result = await result.json();

      setListing(result.result);
      setAuctionId(result.result._id);
      setError(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

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
    } else if (!winnerDetermined) {
      AuctionWinner();
      setRemainingTime(null);
    }
  };

  const AuctionWinner = async () => {
    try {
      let result = await fetch(
        `http://localhost:8080/api/v1/getwinner/${params.id}`
      );
      if (!result) {
        console.log("result is not found");
      }
      result = await result.json();
      SetWinner(result.userDetails);
      SetHighestBid(result.bidAmount);
      setWinnerDetermined(true);
    } catch (error) {
      console.log("internal error", error);
    }
  };

  const formatTime = (time) => {
    return time < 10 ? `0${time}` : time;
  };

  const ParticipateInAuction = async () => {
    try {
      setAuctionError(false);
      let result = await fetch(
        `http://localhost:8080/api/v1/participate/${params.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userDetails, auctionId, bidAmount }),
        }
      );
      result = await result.json();
      if (result.auctionId) {
        toast.success("You have successfully participated in the auction");
        showLatestBidder();
      } else {
        toast.error(result.error);
        setAuctionError(result.error);
      }
      setBidAmount("");
    } catch (error) {
      console.log("Internal error", error);
      setAuctionError("An internal error occurred. Please try again later.");
    }
  };

  useEffect(() => {
    showLatestBidder();
  }, []);

  const showLatestBidder = async () => {
    try {
      let result = await fetch(
        `http://localhost:8080/api/v1/getallUserParticipate/${params.id}`
      );
      if (!result.ok) {
        console.log("result is empty");
        return;
      }
      result = await result.json();
      setUserParticipate(result);
      if (result) {
        showLatestBidder();
      }
    } catch (error) {
      console.log("sth went wrong", error);
    }
  };

  return (
    <main className=" text-secondary  ">
      {loading && <p className="text-center my-9 text-3xl ">Loading...</p>}
      {error && (
        <p className="text-center my-9 text-3xl">Some thing went wrong</p>
      )}

      {listing && userParticipate && (
        <div>
          <Swiper navigation>
            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px] "
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className="fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer">
            <FaShare
              className=""
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md  p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <p className="text-2xl font-semibold  gap-4 ">
              {listing.title} - Rs {listing.MinimumPrice}
            </p>
            <p className="flex items-center mt-6 gap-2   text-sm">
              <FaMapMarkerAlt className="" />
              {listing.address}
            </p>

            <div className="flex gap-4"></div>
            <p className="">
              <span className="">Description - </span>
              {listing.description}
            </p>
            <ul className="  text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths`
                  : `${listing.bathrooms} bath`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaParking className="text-lg" />
                {listing.parking ? "Parking spot" : "No Parking"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                {listing.furnished ? "Furnished" : "Unfurnished"}
              </li>
            </ul>

            {remainingTime && (
              <div className=" font-semibold text-sm">
                <p>
                  Time Remaining:{" "}
                  {`${formatTime(remainingTime.hours)}:${formatTime(
                    remainingTime.minutes
                  )}:${formatTime(remainingTime.seconds)}`}
                  &nbsp;|&nbsp; End Date:{" "}
                  {new Date(listing.endTime).toLocaleString()}
                </p>
              </div>
            )}

            {currentUser &&
              listing.userRef !== currentUser._id &&
              remainingTime !== null && (
                <input
                  type="number"
                  className=" mt-2 appearance-none block  bg-white  border border-gray-300 rounded-md py-2 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="title"
                  placeholder="Enter Bid Amount ..."
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  required
                />
              )}
            {currentUser && listing.userRef !== currentUser._id && winner && (
              <>
                <div className="flex justify-between">
                  <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h5 class="mb-2 text-2xl  font-medium font-poppins tracking-tight">
                      Winner: {winner.fullName}
                    </h5>

                    <p class="mb-3 font-poppins  ">Amount Bid: {highestBid}</p>
                  </div>
                </div>
              </>
            )}

            <div className="  ">
              <div className="-0 max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="mb-2 text-2xl font-medium font-poppins tracking-tight">
                  Latest Bidder
                </h5>
                <p className="mb-3 font-poppins text-gray-700 dark:text-gray-600">
                  Amount Bid: {userParticipate.bidAmount}
                </p>
              </div>
            </div>

            {currentUser &&
              listing.userRef !== currentUser._id &&
              remainingTime !== null && (
                <>
                  <button
                    onClick={ParticipateInAuction}
                    className="text-white bg-slate-600 rounded-lg uppercase hover:opacity-80 p-3 text-center"
                  >
                    Join Auction
                  </button>

                  {auctionError && (
                    <p className="text-sm mt-1 text-red-700 text-center">
                      {auctionError}
                    </p>
                  )}
                </>
              )}
          </div>
        </div>
      )}
    </main>
  );
}
