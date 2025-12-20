import React from "react";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import {
  FaBook, FaPlusCircle, FaUsers, FaMoneyBillWave, FaCog,
  FaChalkboardTeacher, FaClipboardList, FaChartLine, FaHome
} from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import useAuth from "../hooks/useAuth";

const DashboardLayout = () => {
  const { user } = useAuth() ?? {};
  const role = user?.role || "Student";
  const location = useLocation();

  const linkStyle = ({ isActive }) =>
    isActive
      ? "flex items-center gap-3 bg-indigo-600 text-white px-4 py-3 rounded-xl font-semibold shadow-md transition-all duration-300"
      : "flex items-center gap-3 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 px-4 py-3 rounded-xl transition-all duration-300";

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* --- Sidebar --- */}
      <aside className="w-64 md:w-72 bg-white border-r border-slate-200 flex flex-col justify-between fixed top-0 left-0 h-screen shadow-sm z-20  ">
        {/* Logo */}
        <div className="p-8 ">
          <h2 className="text-2xl font-black text-indigo-600 flex items-center gap-2 rounded-2xl shadow-2xl shadow-primary/30  active:scale-95 transition-all gap-2 px-10 group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden border-none">
            <MdDashboard className="text-3xl" />
            <span className="tracking-tight">eTuitionBd</span>
          </h2>
          <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400 mt-1 pl-1">
            Dashboard Panel
          </p>
        </div>

        {/* Nav Links */}
        <nav className="flex-grow px-4 flex flex-col gap-2 overflow-y-auto pb-6 custom-scrollbar ">
          {role === "Student" && (
            <>
              <NavLink to="/dashboard/student/my-tuitions" className={linkStyle}><FaBook size={18} /> My Tuitions</NavLink>
              <NavLink to="/dashboard/student/post-tuition" className={linkStyle}><FaPlusCircle size={18} /> Post Tuition</NavLink>
              <NavLink to="/dashboard/student/applied-tutors" className={linkStyle}><FaUsers size={18} /> Applied Tutors</NavLink>
              <NavLink to="/dashboard/student/payments" className={linkStyle}><FaMoneyBillWave size={18} /> Payments</NavLink>
            </>
          )}

          {role === "Tutor" && (
            <>
              <NavLink to="/dashboard/tutor/my-applications" className={linkStyle}><FaClipboardList size={18} /> My Applications</NavLink>
              <NavLink to="/dashboard/tutor/ongoing-tuitions" className={linkStyle}><FaChalkboardTeacher size={18} /> Ongoing Tuitions</NavLink>
              <NavLink to="/dashboard/tutor/revenue" className={linkStyle}><FaMoneyBillWave size={18} /> Revenue</NavLink>
            </>
          )}

          {role === "Admin" && (
            <>
              <NavLink to="/dashboard/admin/users" className={linkStyle}><FaUsers size={18} /> User Management</NavLink>
              <NavLink to="/dashboard/admin/tuitions" className={linkStyle}><FaBook size={18} /> Tuition Management</NavLink>
              <NavLink to="/dashboard/admin/reports" className={linkStyle}><FaChartLine size={18} /> Reports & Analytics</NavLink>
            </>
          )}

          <div className="my-4 border-t border-slate-100"></div>
          <NavLink to="/dashboard/student/profile" className={linkStyle}><FaCog size={18} /> Profile Settings</NavLink>
          <NavLink to="/" className={linkStyle}><FaHome size={18} /> Back to Home</NavLink>
        </nav>

        {/* User Info */}
        <div className="p-4 m-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold border border-indigo-200">
            {user?.displayName?.charAt(0) || "U"}
          </div>
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-700 truncate">{user?.displayName || "User"}</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase">{role}</p>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 ml-64 md:ml-72 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="text-xl font-bold text-slate-800 capitalize mt-1">
            {location.pathname.split("/").pop().replace("-", " ")}
          </h1>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-slate-500 uppercase leading-none mb-1">Current Role</p>
              <p className="text-sm font-black text-indigo-600">{role}</p>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-8 flex-grow overflow-y-auto">
          <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-200 min-h-full">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
