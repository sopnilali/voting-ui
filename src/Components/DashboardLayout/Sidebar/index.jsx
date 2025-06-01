import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LogOutIcon, X } from "lucide-react"; // Optional: use any icon library you prefer
import {  MdCategory, MdRateReview, MdReviews, MdSpaceDashboard } from "react-icons/md";
import { FaProductHunt, FaShoePrints, FaTag, FaUser, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { RiCoupon2Fill, RiOrderPlayFill } from "react-icons/ri";
import { FaBlog, FaShop } from "react-icons/fa6";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { logout } from "../../../Redux/features/auth/authslice";


const Sidebar = ({ isOpen, toggleSidebar }) => {
  const user = useSelector((state) => state.auth.user)
  const location = useLocation();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully");
    Cookies.remove("refreshToken");
    Cookies.remove("accessToken");
    navigate("/login");
  }


  const adminMenuItems = [
    { name: "Overview", icon: <MdSpaceDashboard />, link: "/dashboard" },
    { name: "Users", icon: <FaUsers />, link: "/dashboard/admin/users" },
    { name: "Voters", icon: <FaUsers />, link: "/dashboard/admin/voters" },
    { name: "Candidates", icon: <MdCategory />, link: "/dashboard/admin/candidates" },
    { name: "Election", icon: <MdRateReview />, link: "/dashboard/admin/elections" },
    { name: "Voting Count", icon: <MdRateReview />, link: "/dashboard/admin/voting-count" },
  ]

  const userMenuItems = [
    { name: "Overview", icon: <MdSpaceDashboard />, link: "/dashboard/overview" },
    { name: "Voter Registration", icon: <FaProductHunt />, link: "/dashboard/voter-registration" },
    { name: "Election List", icon: <FaProductHunt />, link: "/dashboard/election-list" },
    { name: "Voting History", icon: <FaProductHunt />, link: "/dashboard/voting-history" },
  ]

  const menuItems = user?.role === "ADMIN" ? adminMenuItems : userMenuItems;

  return (
    <aside
      className={`fixed z-40 top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-700 transform transition-transform duration-300 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 lg:static lg:block`}
    >
      <div className="relative p-6 h-full flex flex-col">
        {/* Close Button (visible only on mobile) */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-white lg:hidden"
          onClick={toggleSidebar}
          aria-label="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Logo Section */}
        <div className="mb-8 ">
          <h1 className="text-2xl font-bold text-white">
            {user?.role === "ADMIN" ? "Admin Dashboard" : user?.role === "USER" ? "Voter Dashboard" : "Dashboard"}
          </h1>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-2 border-t pt-2 border-gray-700 ">
          {menuItems?.map((item) => (
            <Link
              key={item?.name}
              to={item.link}
              className={`flex items-center gap-3 p-3 rounded-lg ${location.pathname === item.link ? "bg-gray-700" : ""} hover:bg-gray-700 transition-colors text-gray-300 hover:text-white`}
            >
              <span className="text-base">
              {item?.icon}
              </span>
              {item?.name}
            </Link>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="pt-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                <LogOutIcon size={16} />
            </div>
            <button onClick={handleLogout} className="text-sm text-gray-300 hover:text-white cursor-pointer">Logout</button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;


