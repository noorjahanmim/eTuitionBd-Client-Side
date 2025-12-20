import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Camera, Save, Image as ImageIcon } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const ProfileSettings = () => {
  const { user, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (user) {
      setName(user?.displayName || "");
      setPhotoURL(user?.photoURL || "");
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Step 1: Firebase Profile Update (Local state update)
      await updateUserProfile(name, photoURL);

      
      const updatedInfo = {
        name: name,
        image: photoURL
      };
      
      const res = await axiosSecure.patch(`/users/${user?.email}`, updatedInfo);

      if (res.data.modifiedCount > 0 || res.data.success) {
        toast.success("Profile fully updated in Firebase & Database!");
      } else {
        toast.success("Profile Updated!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-16 px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl border border-slate-50"
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-black text-slate-800">Edit Profile</h2>
          <p className="text-slate-500 font-medium">Update your name and profile picture</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {/* Avatar Preview */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <img 
                src={photoURL || "https://i.ibb.co.com/mR70vBR/user.png"} 
                className="w-36 h-36 rounded-[2.5rem] object-cover border-4 border-indigo-50 shadow-2xl transition-all duration-500"
                alt="Profile Preview"
                onError={(e) => { e.target.src = "https://i.ibb.co.com/mR70vBR/user.png"; }}
              />
              <div className="absolute -bottom-2 -right-2 bg-indigo-600 p-3 rounded-2xl text-white shadow-lg border-4 border-white">
                <Camera size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-600 ml-1">Photo URL</label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-4 text-slate-400" size={20} />
                <input 
                  type="text" 
                  value={photoURL}
                  onChange={(e) => setPhotoURL(e.target.value)}
                  placeholder="Paste image link here"
                  className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-6 py-4 focus:ring-4 focus:ring-indigo-50 focus:border-indigo-500 outline-none transition-all font-semibold text-slate-700"
                />
              </div>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-5 rounded-2xl shadow-xl shadow-indigo-200 transition-all flex items-center justify-center gap-3 active:scale-95 ${loading ? "opacity-70 cursor-wait" : ""}`}
          >
            {loading ? <span className="loading loading-spinner"></span> : <Save size={22} />}
            {loading ? "Updating..." : "Save Changes"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ProfileSettings;