import React from "react";
import { Link, NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import Logo from '../../../components/Logo/Logo';

const NavBar = () => {
  const { user, logOut } = useAuth() ?? {};

  const handleLogOut = async () => {
    try {
      await logOut();
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "text-indigo-600 font-semibold border-b-2 border-indigo-600 px-3 py-2"
      : "text-gray-700 hover:text-indigo-500 px-3 py-2";

  const links = (
    <>
      <li><NavLink className={activeClass} to="/">Home</NavLink></li>
      <li><NavLink className={activeClass} to="/all-tuitions">Tuitions</NavLink></li>
      <li><NavLink className={activeClass} to="/all-tutors">Tutors</NavLink></li>
      <li><NavLink className={activeClass} to="/about">About</NavLink></li>
      <li><NavLink className={activeClass} to="/contact">Contact</NavLink></li>
      {user && <li><NavLink className={activeClass} to="/dashboard">Dashboard</NavLink></li>}
    </>
  );

  return (
    <div className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
{/* Logo */}
        <span className="text-xl">
                    <Logo></Logo>
                </span>
        
        
      
        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-6 font-medium">
          <ul className="flex gap-6">{links}</ul>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-indigo-300">
                  <img
                    src={
                      user?.photoURL ||
                      user?.providerData?.[0]?.photoURL ||
                      "https://i.ibb.co.com/RTyj1cSs/1559144-200.png"
                    }
                    alt="User Avatar"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md mt-3 w-52 p-2"
              >
                <li className="font-semibold text-indigo-600">
                  {user?.displayName || user?.providerData?.[0]?.displayName || "User"}
                </li>
                <li className="text-gray-600">{user?.email || user?.providerData?.[0]?.email}</li>
                <li>
                  <Link
                    onClick={handleLogOut}
                    className="text-red-600 hover:bg-red-50 rounded-md px-2 py-1"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          ) : (
            <div className="hidden md:flex gap-3">
              <Link
                to="/login"
                className="btn btn-outline btn-sm text-indigo-600 border-indigo-600 hover:bg-indigo-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-sm bg-indigo-600 hover:bg-indigo-700 text-white"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-white rounded-lg shadow-md mt-3 w-52 p-2"
              >
                {links}
                {!user && (
                  <>
                    <li><Link to="/login" className="text-indigo-600">Login</Link></li>
                    <li><Link to="/register" className="text-indigo-600">Register</Link></li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
