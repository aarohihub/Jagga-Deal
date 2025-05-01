import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkedAlt,
  FaMapMarkerAlt,
  FaParking,
  FaRoad,
  FaShare,
} from "react-icons/fa";
import { useSelector } from "react-redux";
import { axiosInstance } from "../../../libs/axios";
import { MdOutlineCropLandscape } from "react-icons/md";

export default function AdminsingleListing() {
  const params = useParams();
  const [loading, setLoding] = useState(false);
  const [listing, setListing] = useState(null);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  SwiperCore.use([Navigation]);
  useEffect(() => {
    showData();
  }, [params.id]);

  const showData = async () => {
    try {
      setLoding(true);
      let result = await axiosInstance.get(`/admin/show/${params.id}`);
      if (!result) {
        setError(true);
        setLoding(false);
        return;
      }

      setListing(result?.data?.data);
      setError(false);
      setLoding(false);
    } catch (error) {
      setLoding(false);
      setError(true);
    }
  };

  return (
    <main className="min-h-screen z-10">
      {loading && <p className="text-center my-9 text-3xl ">Loading...</p>}
      {error && (
        <p className="text-center my-9 text-3xl">some thing went wrong</p>
      )}

      {listing && (
        <div>
          <Swiper navigation className="z-10">
            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[400px] "
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
              className="text-secondary"
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
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-secondary p-2">
              Link copied!
            </p>
          )}

          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4 text-secondary font-serif">
            <p className="text-2xl flex  gap-4 w-full ">
              {listing.title} - Rs{" "}
              {listing.offer
                ? (
                    +listing.regularPrice -
                    +listing.regularPrice * (listing.discountPrice / 100)
                  ).toLocaleString("en-RS")
                : listing.regularPrice.toLocaleString("en-RS")}
              {listing.type === "rent" && " / month"}
              {listing.offer && (
                <p className="flex gap-1 font-sans">
                  <span className="text-sm">Regular Price</span>
                  <span className="line-through text-sm">
                    Rs {listing.regularPrice}
                  </span>
                </p>
              )}
              <p className="font-sans">
                {listing.type === "land" && " / Aana"}
              </p>
            </p>
            <p className="flex items-center mt-6 gap-2 text-secondary font-sans  text-sm">
              <FaMapMarkerAlt className="" />
              {listing.address}
            </p>

            <div className="flex gap-4">
              <p className="bg-primary  w-full max-w-[200px] text-white text-center p-1 rounded-md">
                {listing.type === "rent" ? "For Rent" : "For Sale"}
              </p>

              {listing.offer && (
                <p className="bg-secondary  w-full max-w-[200px] text-white text-center p-1 rounded-md">
                  Rs. {+listing.regularPrice * (listing.discountPrice / 100)}
                  <span> OFF</span>
                </p>
              )}
            </div>
            <p className="text-secondary">
              <span className="font-sans text-secondary">Description - </span>
              {listing.description}
            </p>
            {listing.type === "rent" || listing.type === "sale" ? (
              <ul className="text-secondary font-sans text-sm flex flex-wrap items-center gap-4 sm:gap-6">
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBed className="text-lg" />
                  {listing.bedrooms > 1
                    ? `${listing.bedrooms}beds`
                    : `${listing.bedrooms}bed`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaBath className="text-lg" />
                  {listing.bathrooms > 1
                    ? `${listing.bathrooms}baths`
                    : `${listing.bathrooms}bath`}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaParking className="text-lg" />
                  {listing.parking ? "Parking spot" : "No Parking"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaChair className="text-lg" />
                  {listing.furnished ? "Furnished" : "Unfurnished"}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <MdOutlineCropLandscape className="text-lg" />
                  {listing?.landArea ? `${listing.landArea} Aana` : ""}
                </li>
                <li className="flex items-center gap-1 whitespace-nowrap ">
                  <FaRoad className="text-lg" />
                  {listing?.distanceFromMainRoad
                    ? `${listing.distanceFromMainRoad} Meter`
                    : ""}
                </li>
              </ul>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
