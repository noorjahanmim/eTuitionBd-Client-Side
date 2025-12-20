import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Phone, Camera, Save, ShieldCheck, 
  Lock, Bell, Trash2, CheckCircle2, CloudUpload 
} from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const ProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("general");
  const [loading, setLoading] = useState(false);

  // Animation variants
  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.2 } }
  };

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 min-h-screen">
      {/* Header with Glass Effect */}
      <div className="mb-12">
        <h1 className="text-4xl font-black text-slate-900 tracking-tight">Account <span className="text-indigo-600">Settings</span></h1>
        <p className="text-slate-500 font-medium mt-2">Manage your profile, security, and notification preferences.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Sidebar Navigation */}
        <div className="lg:w-1/4 space-y-2">
          {[
            { id: "general", label: "General Info", icon: <User size={18} /> },
            { id: "security", label: "Security", icon: <Lock size={18} /> },
            { id: "notifications", label: "Notifications", icon: <Bell size={18} /> },
            { id: "danger", label: "Danger Zone", icon: <Trash2 size={18} /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all ${
                activeTab === tab.id 
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-100" 
                : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="lg:w-3/4">
          <AnimatePresence mode="wait">
            
            {/* General Settings Tab */}
            {activeTab === "general" && (
              <motion.div 
                key="general" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden"
              >
                <div className="p-8 md:p-12">
                  <div className="flex flex-col md:flex-row gap-10 items-start mb-10">
                    {/* Profile Picture Upload Section */}
                    <div className="relative group">
                      <div className="w-32 h-32 rounded-[2.5rem] overflow-hidden border-4 border-indigo-50 shadow-inner bg-slate-100">
                        <img 
                          src={user?.photoURL || "https://i.ibb.co.com/mR70vBR/user.png"} 
                          alt="avatar" 
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <button className="absolute -bottom-2 -right-2 bg-white p-3 rounded-2xl shadow-xl text-indigo-600 border border-slate-100 hover:scale-110 transition-transform">
                        <Camera size={20} />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black text-slate-800">Public Profile</h3>
                      <p className="text-slate-400 font-medium">This information will be displayed to tutors.</p>
                      <div className="flex gap-2 mt-4">
                        <span className="bg-emerald-50 text-emerald-600 text-[10px] font-black px-3 py-1 rounded-full border border-emerald-100 uppercase">Verified Student</span>
                      </div>
                    </div>
                  </div>

                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
                        <input defaultValue={user?.displayName} className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-semibold text-slate-700" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-600 ml-1">Email (Read Only)</label>
                        <div className="relative">
                          <input disabled defaultValue={user?.email} className="w-full bg-slate-100 border border-slate-200 rounded-2xl px-6 py-4 text-slate-400 font-medium cursor-not-allowed" />
                          <CheckCircle2 size={18} className="absolute right-4 top-4 text-emerald-500" />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600 ml-1">Bio / Headline</label>
                      <textarea rows="3" className="w-full bg-slate-50 border border-slate-200 rounded-3xl px-6 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 transition-all outline-none font-medium text-slate-700" placeholder="e.g. Seeking a Physics tutor for HSC exam prep." />
                    </div>
                    <button className="btn btn-primary btn-lg rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2 px-10 group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden border-none">
                      <Save size={20} /> Update Profile
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <motion.div 
                key="security" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/40 p-12"
              >
                <div className="max-w-md">
                  <h3 className="text-2xl font-black text-slate-800 mb-2">Change Password</h3>
                  <p className="text-slate-500 mb-8 font-medium">Protect your account with a strong password.</p>
                  
                  <form className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600">Current Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-slate-600">New Password</label>
                      <input type="password" placeholder="••••••••" className="w-full bg-slate-50 border border-slate-200 rounded-2xl px-6 py-4 focus:border-indigo-500 outline-none transition-all" />
                    </div>
                    <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200">
                      Update Password
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Danger Zone */}
            {activeTab === "danger" && (
              <motion.div 
                key="danger" variants={tabVariants} initial="hidden" animate="visible" exit="exit"
                className="bg-white rounded-[2.5rem] border border-rose-100 shadow-2xl shadow-rose-100/50 p-12"
              >
                <h3 className="text-2xl font-black text-rose-600 mb-2">Delete Account</h3>
                <p className="text-slate-500 mb-8 font-medium">Once you delete your account, there is no going back. Please be certain.</p>
                <button className="flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 px-8 py-4 rounded-2xl font-black hover:bg-rose-600 hover:text-white transition-all">
                  <Trash2 size={20} /> Terminate My Account
                </button>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;