import { Settings, MessageSquare, Building, User, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { RiAuctionFill } from "react-icons/ri";
import { TiCalculator } from "react-icons/ti";
import log1 from "/images/nav.png";
import { useSelector } from "react-redux";
import { axiosInstance } from "../libs/axios";
import toast from "react-hot-toast";
import { SignOutUserSucess } from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaRegBuilding } from "react-icons/fa";
export default function Navbar() {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  let role = currentUser?.role;
  const [searchTerm, setSearchTerm] = useState("");
  const handelSubmit = async (e) => {
    e.preventDefault();
    const urlPrams = new URLSearchParams(window.location.search);
    urlPrams.set("searchTerm", searchTerm);
    const searchQuery = urlPrams.toString();
    navigate(`/search?${searchQuery}`);
  };
  useEffect(() => {
    const urlPrams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlPrams.get("searchTerm");
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  const logoutUser = async () => {
    try {
      const res = await axiosInstance("/logout");
      if (res.data) {
        localStorage.clear();
        dispatch(SignOutUserSucess());

        toast.success("Logout successful");
        navigate("/");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed");
    }
  };
  return (
    <>
      <div className="navbar md:px-40 sm:px-20 px-8 z-50">
        <div className="flex-1  ">
          <p className="btn btn-ghost text-4xl scale-110">
            <Link to="/">
              <img
                className="h-12 w-12 rounded-full  scale-150"
                src={log1}
                alt=""
              />
            </Link>
          </p>
        </div>
        <div className="flex-none gap-10 ">
          <form onSubmit={handelSubmit} className="md:flex">
            <div className="form-control hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="input input-bordered md:w-auto pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
                <FaSearch className="text-secondary" />
              </button>
            </div>
          </form>
          <Link onClick={handelSubmit}>
            <li className="hiddem sm:inline text-slate-600 hover-underline-animation">
              <p className="flex items-center">
                <FaRegBuilding />
                <p> Property</p>
              </p>
            </li>
          </Link>
          <Link to="/auctionDetails">
            <li className="hiddem sm:inline text-slate-600 hover-underline-animation">
              <p className="flex items-center">
                <RiAuctionFill />
                <p> Auction</p>
              </p>
            </li>
          </Link>
          <Link to="/emiCal">
            <li className="hiddem sm:inline text-slate-600 hover-underline-animation">
              <p className="flex items-center">
                <TiCalculator />
                <p> Emi calculator</p>
              </p>
            </li>
          </Link>
          <div className="  hidden sm:block ">
            <div className="flex gap-6">
              {/* <Link
                to={"/settings"}
                className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
              >
                <Settings className="w-4 h-4 animate-spin" />
                <span className="hidden sm:inline "></span>
              </Link> */}
              {role === "user" || role === "admin" ? (
                <></>
              ) : (
                <>
                  {" "}
                  <Link
                    to={"/signup"}
                    className={`
            btn btn-sm gap-2 transition-colors 
            `}
                  >
                    <User className="w-4 h-4 " size={20} strokeWidth={1.75} />

                    <span className="hidden sm:inline "></span>
                  </Link>
                </>
              )}
              {role === "user" && (
                <>
                  {" "}
                  <Link
                    to={"/message"}
                    className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
                  >
                    <MessageSquare className="w-4 h-4 " />
                    <span className="hidden sm:inline "></span>
                  </Link>
                </>
              )}
            </div>
          </div>

          {role === "admin" && (
            <Link
              to={"/admin-dash"}
              className={`
            btn btn-sm gap-2 transition-colors 
            
            `}
            >
              <Building className="w-4 h-4 " />
              <span className="hidden sm:inline ">Admin</span>
            </Link>
          )}

          {role == "user" && (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src={currentUser?.avatar}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link className="justify-between" to="/user/profile">
                    Profile
                    <span className="badge">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/createListing">Add Property</Link>
                </li>
                <li>
                  <Link to="/showUserListingTable">Show Property</Link>
                </li>
                <li>
                  <Link to="/" onClick={logoutUser}>
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
