import image from "../../assets/images/logo2.png";
import BluredImg from "../../assets/images/Blurred BG.png";
import Brand from "./partial/Brand";
import Button from "./partial/component/Button";
import Achievement from "./partial/Achievement";
import Carousel from "./partial/Carousel";
import OfferListingPage from "./partial/OfferListingPage";
import SaleListingPage from "./partial/SaleListingPage";
import RentListingPage from "./partial/RentListingPage";
import LandListingPage from "./partial/LandListing";
import { useEffect } from "react";

function HomePage() {
  return (
    <div>
      <div className="flex flex-col md:flex-row items-center justify-between  md:px-40 sm:px-20 px-8 z-0">
        <div className="flex flex-col md:w-1/2 space-y-4 ">
          <div className="flex flex-col space-y-4 w-full">
            <h1 className="text-4xl font-inter font-serif text-justify select-none cursor-default outline-none text-[#B8615F]">
              Turning Your Dream Home into Reality
            </h1>
            <p className=" text-base text-justify  md:text-lg select-none cursor-default outline-none font-inter font-light text-[#8F2A51]">
              Discover your dream home with us! Whether you're buying, selling,
              or investing, we offer the best properties to fit your needs. From
              cozy apartments to luxury villas, our expert team is here to guide
              you every step of the way.Real estate investments can provide
              financial growth through property appreciation, rental income, and
              real estate development projects.
            </p>
          </div>

          <div className="flex justify-center md:justify-start">
            <Button />
          </div>
        </div>

        <div className="mt-8 md:mt-0 md:w-1/2 flex justify-center select-none">
          <div className="relative w-full">
            <div
              className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-sm z-0"
              style={{ backgroundImage: `url(${BluredImg})` }}
            />

            <img
              src={image}
              alt="Logo"
              className="max-w-full h-auto object-contain relative "
            />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-40 overflow-x-auto">
        <Brand />
      </div>

      <div className="flex flex-col ">
        <h1 className="text-6xl text-center font-serif  mt-10  from-accent-content text-[#B8615F]">
          Explore Our Project
        </h1>
        <Carousel />
      </div>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10 z-50">
        <h1 className="  text-6xl  font-serif  mt-3  ">
          <span className="text-red-800 opacity-70  ">
            Our choice of <br />
          </span>
          <span className="text-[#8F2B51]">popular real estate</span> <br />
        </h1>
        <OfferListingPage />
        <SaleListingPage />
        <RentListingPage />
        <LandListingPage />
      </div>
      <div className="w-full px-4 sm:px-10 md:px-20 lg:px-40 bg-[#F8E4EE] md:bg-[#F8E4EE]">
        <Achievement />
      </div>
    </div>
  );
}

export default HomePage;
