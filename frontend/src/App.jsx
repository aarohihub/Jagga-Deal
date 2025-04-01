import { Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Signup from "./Pages/users/Signup";
import Navbar from "./Components/Navbar";
import Login from "./Pages/users/Login";
import { Toaster } from "react-hot-toast";
import VerifyOTP from "./Pages/users/VerifyOTP";
import UserProfile from "./Pages/users/UserProfile";
import { Loader } from "lucide-react";
import BaseImage from "../public/images/404.png";
import CreateListiing from "./Pages/users/CreateListing";
import ShowCreatedListing from "./Pages/users/ShowCreatedListing";
import ShowListingTable from "./Pages/users/ShowListingTable";
import UpdateListiing from "./Pages/users/UpdateListing";
import HomePage from "./Pages/Home/HomePage";
import OfferListingPage from "./Pages/Home/partial/OfferListingPage";

// importing admin listing pages
import AdminPage from "./Pages/admin/AdminPage";
import UpdateAdminListiing from "./Pages/admin/pages/UpdateAdminListing";
import AdminListing from "../src/Pages/admin/pages/AdminListing";
import AdminSingleListing from "../src/Pages/admin/pages/AdminSingleListing";
import Approve from "../src/Pages/admin/pages/Approve";
import EmiCalculator from "../src/Pages/admin/pages/EmiCal";
import ShowAdminListing from "../src/Pages/admin/pages/ShowAdminListing";
import ShowCurrentUser from "../src/Pages/admin/pages/ShowCurrentUser";

// import auction listing pages
import AuctionCard from "./AuctionComponent/AuctionCard";
import AuctionListing from "./AuctionComponent/AuctionListing";
import UpdateAuction from "./AuctionComponent/UpdateAuction";
import ShowSingleAuctionListing from "./AuctionComponent/ShowSingleAuctionListing";
import ShowAuctionTable from "./AuctionComponent/ShowAuctionTable";

// Outlet for user
import EmiUserCal from "./Pages/users/Emi_cal";
import UserOutLet from "./outLet/userOutLet";
import AdminOutLet from "./outLet/adminOutLet";
import Search from "./Components/Search";
function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <img
        style={{ height: "50vh", width: "50vh" }}
        src={BaseImage}
        alt="404 Not Found"
        className="bg-transparent"
      />
      <h1 className="text-5xl sm:text-6xl  mt-2 font-semibold">
        Page Not Found
      </h1>
      <Link className="btn glass mt-4" to="/">
        Go to Home Page
      </Link>
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    // cupcake
    <div data-theme="winter">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader className="animate-spin w-16 h-16 text-primary" />
        </div>
      ) : (
        <Routes>
          {/* Public routes */}
          <Route path="/emiCal" element={<EmiUserCal />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verifyOtp" element={<VerifyOTP />} />
          <Route path="/listing/:id" element={<ShowCreatedListing />} />
          <Route element={<UserOutLet />}>
            <Route path="/user/profile" element={<UserProfile />} />
            <Route path="/offerlisting" element={<OfferListingPage />} />
            <Route
              path="/showUserListingTable"
              element={<ShowListingTable />}
            />
            <Route path="/updateListing/:id" element={<UpdateListiing />} />
            <Route path="/createListing" element={<CreateListiing />} />
          </Route>

          <Route path="*" element={<NotFound />} />
          {/* admin lising is here */}

          <Route element={<AdminOutLet />}>
            <Route
              path="/updateAdminListing/:id"
              element={<UpdateAdminListiing />}
            />
            <Route path="/admin-dash" element={<AdminPage />} />
            <Route path="/approve-user/Property" element={<Approve />} />

            <Route path="/add-adminProperty" element={<AdminListing />} />
            <Route
              path="/admin-showSingleListing/:id"
              element={<AdminSingleListing />}
            />
            <Route path="/showAdminProperty" element={<ShowAdminListing />} />
            <Route
              path="/showAllCurrent-User/details"
              element={<ShowCurrentUser />}
            />
            <Route path="/auction" element={<AuctionListing />} />
            <Route
              path="/updateAuctionListing/:id"
              element={<UpdateAuction />}
            />
            <Route path="/show/auction" element={<ShowAuctionTable />} />
          </Route>

          <Route path="/emiCalculator" element={<EmiCalculator />} />

          {/* Auction Listings */}
          <Route
            path="/auctionDetails/auctionSingleListing/:id"
            element={<ShowSingleAuctionListing />}
          />
          <Route path="/auctionDetails" element={<AuctionCard />} />
        </Routes>
      )}
      <Toaster />
    </div>
  );
}

export default App;
