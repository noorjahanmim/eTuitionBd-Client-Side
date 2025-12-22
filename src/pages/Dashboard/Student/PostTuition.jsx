import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, MapPin, Banknote, ClipboardList, GraduationCap, Send, XCircle, Sparkles } from "lucide-react";
import toast from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";


const PostTuition = () => {
  const navigate = useNavigate();
  const { user } = useAuth(); // Logged-in student info
  const axiosSecure = useAxiosSecure();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;

    const tuitionData = {
      subject: form.subject.value,
      class: form.class.value,
      location: form.location.value,
      budget: parseInt(form.budget.value),
      description: form.description.value,
      studentName: user?.displayName,
      studentEmail: user?.email,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    const toastId = toast.loading("Processing your request...");

    try {
      const res = await axiosSecure.post("/tuitions", tuitionData);
      if (res.status === 200 || res.status === 201) {
        toast.success("Tuition Posted Successfully! ✨", { id: toastId });
        navigate("/dashboard/student/my-tuitions");
      } else {
        throw new Error();
      }
    } catch (error) {
      toast.error("Failed to post. Please try again.", { id: toastId });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen py-6 md:py-10 px-4">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10">
          <div className="bg-indigo-600/10 inline-block p-4 rounded-3xl mb-6">
            <BookOpen size={40} className="text-indigo-600" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">
            Post New <span className="text-indigo-600">Tuition</span>
          </h2>
          <p className="text-slate-500 mt-3 font-medium flex items-center justify-center gap-2">
            <Sparkles size={18} className="text-amber-500" /> Let's find the best tutor for you
          </p>
        </motion.div>

        {/* Form */}
        <motion.div variants={itemVariants} className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50">
          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Subject & Class */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <BookOpen size={18} className="text-indigo-500" /> Subject Name
                </label>
                <input name="subject" placeholder="e.g. Mathematics" className="w-full input input-bordered" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <GraduationCap size={18} className="text-indigo-500" /> Class/Grade
                </label>
                <input name="class" placeholder="e.g. Class 10" className="w-full input input-bordered" required />
              </div>
            </div>

            {/* Location & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <MapPin size={18} className="text-rose-500" /> Location
                </label>
                <input name="location" placeholder="e.g. Amberkhana, Sylhet" className="w-full input input-bordered" required />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                  <Banknote size={18} className="text-emerald-500" /> Monthly Budget (৳)
                </label>
                <input name="budget" type="number" placeholder="e.g. 5000" className="w-full input input-bordered" required />
              </div>
            </div>

            {/* Student Name & Email (pre-filled) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Student Name</label>
                <input
                  name="studentName"
                  defaultValue={user?.displayName || ""}
                  readOnly
                  className="w-full input input-bordered bg-slate-100 cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 ml-1">Student Email</label>
                <input
                  name="studentEmail"
                  defaultValue={user?.email || ""}
                  readOnly
                  className="w-full input input-bordered bg-slate-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2 ml-1">
                <ClipboardList size={18} className="text-amber-500" /> Requirements & Details
              </label>
              <textarea
                name="description"
                rows="4"
                placeholder="Time, schedule, and other preferences..."
                className="w-full textarea textarea-bordered"
                required
              />
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-5 pt-6">
              <button type="submit" className="btn btn-primary flex-1 gap-2">
                <Send size={20} /> Submit Tuition Post
              </button>
              <button type="button" onClick={() => navigate(-1)} className="btn flex-1 gap-2">
                <XCircle size={20} /> Cancel
              </button>
            </div>

          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default PostTuition;
