import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MdSpaceDashboard, MdMenu, MdClose } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { IoIosLogOut } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { BsFillHouseAddFill } from "react-icons/bs";
import { FaCalculator } from "react-icons/fa6";
import { RiAuctionFill, RiAuctionLine } from "react-icons/ri";
import { SignOutUserSucess } from "../../../redux/user/userSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const logout = () => {
    sessionStorage.clear();
    localStorage.clear();
    toast.success(<div>Logout Successfully!!</div>, {
      theme: "colored",
      autoClose: 1000,
    });
    dispatch(SignOutUserSucess());
    navigate("/");
  };

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleMobileMenu}
          className="text-white p-2 rounded-md bg-secondary focus:outline-none"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed md:relative z-40 h-screen bg-primary transition-all duration-300 ease-in-out ${
          isOpen ? "w-64" : "w-20"
        } ${
          mobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Desktop toggle button */}
          <div className="hidden md:flex justify-end p-2">
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-white p-1 rounded-full hover:bg-gray-600"
              aria-label={isOpen ? "Collapse sidebar" : "Expand sidebar"}
            >
              {isOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
            </button>
          </div>

          <div className="p-4 overflow-y-auto flex-1">
            <ul className="space-y-2">
              <NavItem
                to="/admin-dash"
                icon={<MdSpaceDashboard size={20} />}
                text="Dashboard"
                isOpen={isOpen}
              />
              <NavItem
                to="/auction"
                icon={<RiAuctionFill size={20} />}
                text="Auction"
                isOpen={isOpen}
              />
              <NavItem
                to="/show/auction"
                icon={<RiAuctionLine size={20} />}
                text="Show Auction"
                isOpen={isOpen}
              />
              {/* <NavItem
                to="/emiCalculator"
                icon={<FaCalculator size={20} />}
                text="EMI Calculator"
                isOpen={isOpen}
              /> */}
              
              <NavItem
                to="/showAllCurrent-User/details"
                icon={<FaUsers size={20} />}
                text="Customers"
                isOpen={isOpen}
              />
              <NavItem
                to="/add-adminProperty"
                icon={<BsFillHouseAddFill size={20} />}
                text="Add Property"
                isOpen={isOpen}
              />
              <NavItem
                to="/showAdminProperty"
                icon={<FaBuildingUser size={20} />}
                text="Show Property"
                isOpen={isOpen}
              />
              <NavItem
                to="/approve-user/Property"
                icon={<FaBuildingUser size={20} />}
                text="Approve Properties"
                isOpen={isOpen}
              />
              <li>
                <button
                  onClick={logout}
                  className="flex items-center w-full text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
                >
                  <IoIosLogOut size={20} />
                  <span className={`ml-3 ${!isOpen && "hidden"}`}>Log out</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={toggleMobileMenu}
        ></div>
      )}
    </>
  );
}

function NavItem({ to, icon, text, isOpen }) {
  return (
    <li>
      <Link
        to={to}
        className="flex items-center text-gray-300 hover:bg-gray-700 px-4 py-2 rounded"
      >
        <span className="flex-shrink-0">{icon}</span>
        <span className={`ml-3 ${!isOpen && "hidden"}`}>{text}</span>
      </Link>
    </li>
  );
}
