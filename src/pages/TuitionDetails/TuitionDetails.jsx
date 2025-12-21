import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Calendar, BookOpen, User, Clock, CheckCircle, ArrowLeft } from "lucide-react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TuitionDetails = () => {
  const { id } = useParams();
  const [tuition, setTuition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ qualifications: "", experience: "", expectedSalary: "" });

  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  useEffect(() => {
    axiosSecure.get(`/tuitions/${id}`).then(res => {
      setTuition(res.data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [id, axiosSecure]);

  const handleApply = async e => {
    e.preventDefault();
    const application = {
      tutorId: user?.uid || "unknown",
      tutorName: user?.displayName || "Anonymous",
      tutorEmail: user?.email || "no-email",
      tuitionId: tuition._id,
      ...formData,
      createdAt: new Date(),
      status: "Pending"
    };

    try {
      const res = await axiosSecure.post("/applications", application);
      if (res.data.insertedId) {
        toast.success("Application submitted!");
        setShowModal(false);
      } else if (res.status === 409 || res.data?.message?.includes("already applied")) {
        toast.error("You have already applied for this tuition.");
      } else {
        toast.error("Failed to submit application.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error submitting application.");
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (!tuition) return (
    <div className="text-center mt-20">
      <h2 className="text-2xl font-bold text-red-500">Tuition Not Found!</h2>
      <Link to="/tuitions" className="btn btn-link">Back to list</Link>
    </div>
  );

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-20">
      <div className="bg-primary/5 border-b border-primary/10 pt-28 pb-16">
        <div className="max-w-6xl mx-auto px-6">
          <Link to="/tuitions" className="flex items-center gap-2 text-primary font-semibold mb-6 hover:gap-3 transition-all w-fit">
            <ArrowLeft size={18} /> Back to All Tuitions
          </Link>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <div className="flex items-center gap-3 mb-4">
                <span className="px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest shadow-lg shadow-primary/20">{tuition.subject}</span>
                <span className="flex items-center gap-1 text-sm text-gray-500 font-medium"><Clock size={14} /> Posted 2 days ago</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-black text-gray-900 mb-3">Need Tutor for Class {tuition.class}</h1>
              <div className="flex items-center gap-4 text-gray-600">
                <p className="flex items-center gap-1.5 font-medium"><MapPin size={18} className="text-primary" /> {tuition.location}</p>
                <p className="flex items-center gap-1.5 font-medium"><User size={18} className="text-primary" /> {tuition.studentGender || "Any"} Student</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-white p-6 rounded-3xl shadow-xl shadow-gray-200/50 border border-white flex flex-col items-center text-center min-w-[240px]">
              <p className="text-gray-400 font-bold uppercase text-[10px] tracking-widest mb-1">Monthly Budget</p>
              <h2 className="text-4xl font-black text-primary">৳{tuition.budget}</h2>
              <p className="text-xs text-gray-500 mt-1 italic">Negotiable</p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-[2rem] p-8 md:p-10 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3"><BookOpen className="text-primary" /> Tuition Description</h3>
              <p className="text-gray-600 leading-relaxed text-lg italic">"{tuition.description || "Looking for a dedicated tutor who can help with core concepts and regular homework."}"</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-primary"><Calendar size={20} /></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">Schedule</p><p className="font-bold text-gray-700">{tuition.daysPerWeek || "3"} Days / Week</p></div>
                </div>
                <div className="flex items-start gap-4 p-5 rounded-2xl bg-gray-50 border border-gray-100">
                  <div className="p-3 bg-white rounded-xl shadow-sm text-primary"><CheckCircle size={20} /></div>
                  <div><p className="text-xs font-bold text-gray-400 uppercase">Status</p><p className="font-bold text-green-600 capitalize">{tuition.status}</p></div>
                </div>
              </div>
            </motion.div>

            <div className="bg-gradient-to-r from-primary to-indigo-600 rounded-[2rem] p-10 text-white relative overflow-hidden group">
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <img src="https://i.ibb.co/5GzXkwq/user.png" alt="Tutor" className="w-32 h-32 rounded-full border-4 border-white/20 object-cover shadow-2xl" />
                <div>
                  <h3 className="text-2xl font-bold mb-2">Want to apply for this job?</h3>
                  <p className="text-white/80 mb-6">Complete your profile and click the apply button to start your journey with this student.</p>
                  <button onClick={() => setShowModal(true)} className="bg-white text-primary px-8 py-3 rounded-xl font-bold hover:bg-opacity-90 transition-all shadow-lg">Apply Now</button>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110" />
            </div>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100 sticky top-24">
              <h4 className="text-lg font-bold text-gray-800 mb-6">Requirements</h4>
                           <ul className="space-y-4">
                {[
                  "Must be from a reputable University",
                  "Minimum 1 year experience",
                  "Fluency in English/Bengali",
                  "Verified Profile Holder"
                ].map((req, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-gray-600">
                    <CheckCircle size={16} className="text-primary shrink-0" /> {req}
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-8 border-t border-dashed border-gray-200">
                <p className="text-sm text-gray-500 mb-4 text-center italic">Don't miss this opportunity!</p>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full py-4 bg-primary text-white rounded-2xl font-black text-lg shadow-xl shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all bg-gradient-to-r from-primary via-indigo-500 to-primary"
                >
                  APPLY
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ✅ Inline ApplyModal */}
      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <form onSubmit={handleApply} className="space-y-4">
              <h2 className="text-xl font-bold mb-4">Apply for Tuition</h2>
              <p><strong>Name:</strong> {user?.displayName || "Anonymous Tutor"}</p>
              <p><strong>Email:</strong> {user?.email || "no-email"}</p>

              <input
                type="text"
                placeholder="Qualifications"
                value={formData.qualifications}
                onChange={e => setFormData({ ...formData, qualifications: e.target.value })}
                className="input input-bordered w-full"
                required
              />

              <input
                type="text"
                placeholder="Experience"
                value={formData.experience}
                onChange={e => setFormData({ ...formData, experience: e.target.value })}
                className="input input-bordered w-full"
                required
              />

              <input
                type="number"
                placeholder="Expected Salary"
                value={formData.expectedSalary}
                onChange={e => setFormData({ ...formData, expectedSalary: e.target.value })}
                className="input input-bordered w-full"
                required
              />

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">Submit</button>
                <button type="button" className="btn" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TuitionDetails;
