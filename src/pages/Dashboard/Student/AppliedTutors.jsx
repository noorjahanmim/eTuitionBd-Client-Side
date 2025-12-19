import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Users, GraduationCap, Banknote, CheckCircle, XCircle, Mail, Search, Sparkles } from "lucide-react";
import toast from "react-hot-toast";

const AppliedTutors = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // API Call logic (placeholder)
    // fetch(`http://localhost:3000/applications`)
    //   .then(res => res.json())
    //   .then(data => { setApplications(data); setLoading(false); })
    //   .catch(() => setLoading(false));
    
    // সাময়িকভাবে লোডিং ফলস করে রাখছি ডেমো দেখার জন্য
    setLoading(false);
  }, []);

  const handleAction = (id, status) => {
    toast.success(`Tutor application ${status}ed!`);
    // এখানে আপনার একসেপ্ট/রিজেক্ট লজিক অ্যাড করবেন
  };

  return (
    <div className="w-full min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }}
        >
          <h2 className="text-3xl font-black text-slate-800 flex items-center gap-3">
            <span className="p-3 bg-indigo-100 text-indigo-600 rounded-2xl">
              <Users size={28} />
            </span>
            Applied Tutors
          </h2>
          <p className="text-slate-500 mt-2 flex items-center gap-2 font-medium pl-1">
            <Sparkles size={16} className="text-amber-500" /> 
            Review and select the best tutor for your needs
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white px-6 py-3 rounded-2xl border border-indigo-100 shadow-sm"
        >
          <span className="text-sm font-bold text-slate-400 uppercase tracking-widest block leading-none mb-1">Total Applications</span>
          <span className="text-2xl font-black text-indigo-600">{applications.length}</span>
        </motion.div>
      </div>

      {/* Main Content Area */}
      {loading ? (
        <div className="flex justify-center py-20">
          <span className="loading loading-spinner loading-lg text-indigo-600"></span>
        </div>
      ) : (
        <AnimatePresence>
          {applications.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border-2 border-dashed border-slate-200 rounded-[3rem] py-24 text-center"
            >
              <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Search size={44} />
              </div>
              <h3 className="text-2xl font-bold text-slate-700 mb-2">No Applications Yet</h3>
              <p className="text-slate-500 max-w-xs mx-auto font-medium">
                Wait a bit! Tutors will start applying to your posts soon.
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-6">
              {applications.map((a, index) => (
                <motion.div
                  key={a._id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white border border-slate-100 rounded-[2.5rem] p-8 hover:shadow-2xl hover:shadow-indigo-100/50 transition-all duration-500 group relative overflow-hidden"
                >
                  {/* Background Decoration */}
                  <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-indigo-50 rounded-full blur-3xl group-hover:bg-indigo-100 transition-colors"></div>

                  <div className="relative">
                    {/* Tutor Profile Info */}
                    <div className="flex items-start gap-4 mb-8">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-2xl font-black shadow-lg shadow-indigo-100">
                        {a.tutorName?.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-black text-slate-800 group-hover:text-indigo-600 transition-colors">
                          {a.tutorName}
                        </h3>
                        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-wider flex items-center gap-1 mt-1">
                           <Mail size={12} className="text-indigo-400" /> {a.tutorEmail || "email@example.com"}
                        </p>
                      </div>
                    </div>

                    {/* Qualifications */}
                    <div className="space-y-4 mb-8">
                      <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:border-indigo-100 transition-colors">
                        <GraduationCap className="text-indigo-500" size={20} />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Qualifications</p>
                          <p className="text-sm font-bold text-slate-700">{a.qualifications}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 bg-indigo-50/50 p-4 rounded-2xl border border-indigo-100/50">
                        <Banknote className="text-emerald-500" size={20} />
                        <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase leading-none mb-1">Expected Salary</p>
                          <p className="text-lg font-black text-indigo-600">৳ {a.salary}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4 pt-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(a._id, 'Reject')}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-rose-50 hover:text-rose-600 transition-all border border-transparent hover:border-rose-100"
                      >
                        <XCircle size={18} /> Reject
                      </motion.button>
                      
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAction(a._id, 'Accept')}
                        className="flex-1 flex items-center justify-center gap-2 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                      >
                        <CheckCircle size={18} /> Accept
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default AppliedTutors;