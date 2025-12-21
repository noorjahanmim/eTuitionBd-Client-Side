import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  Mail, Phone, GraduationCap, Briefcase, 
  BadgeCheck, Banknote, Calendar, MapPin, 
  Star, Award, BookOpen, MessageCircle 
} from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const TutorProfile = () => {
  const { id } = useParams();
  const [tutor, setTutor] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/tutors/${id}`)
      .then((res) => setTutor(res.data))
      .catch((err) => console.error(err));
  }, [id, axiosSecure]);

  if (!tutor) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <span className="loading loading-ring loading-lg text-indigo-600"></span>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto py-10 px-4"
    >
      {/* Top Profile Header Card */}
      <motion.div variants={itemVariants} className="relative bg-white rounded-[3rem] p-8 md:p-12 border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden mb-8">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-indigo-50 rounded-full blur-3xl opacity-60"></div>
        
        <div className="relative flex flex-col md:flex-row items-center gap-10">
          {/* Tutor Photo */}
          <div className="relative group">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-[2.5rem] overflow-hidden border-8 border-white shadow-2xl">
              <img
                src={tutor.photoUrl || "https://i.ibb.co.com/mR70vBR/user.png"}
                alt={tutor.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            {tutor.verified && (
              <div className="absolute -bottom-4 -right-4 bg-white p-3 rounded-2xl shadow-xl border border-slate-50">
                <BadgeCheck size={32} className="text-indigo-600" />
              </div>
            )}
          </div>

          {/* Core Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
              <h2 className="text-4xl font-black text-slate-900 tracking-tight">{tutor.name}</h2>
              <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                tutor.status === 'Available' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'
              }`}>
                ● {tutor.status}
              </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-500 font-medium">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Mail size={18} className="text-indigo-500" /> {tutor.email}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Phone size={18} className="text-indigo-500" /> {tutor.phone}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <MapPin size={18} className="text-rose-500" /> {tutor.location || "Sylhet, Bangladesh"}
              </div>
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Star size={18} className="text-amber-500 fill-amber-500" /> 4.9 (42 Reviews)
              </div>
            </div>

            {/* <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-4">
              <button className="flex  gap-2btn btn-primary btn-lg hover:scale-105 active:scale-95 gap-2 group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden  ">
                <MessageCircle size={20} /> Hire Tutor
              </button>
              <button className="bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-2xl font-black hover:bg-slate-50 transition-all active:scale-95 hover:scale-105">
                Download CV
              </button>
            </div> */}
          </div>
        </div>
      </motion.div>

      {/* Stats Section */}
      <motion.div variants={itemVariants} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8 text-center">
        {[
          { icon: <Banknote className="text-emerald-500" />, label: "Monthly Salary", value: `${tutor.expectedSalary} BDT` },
          { icon: <Award className="text-indigo-500" />, label: "Experience", value: tutor.experience || "Not Shared" },
          { icon: <BookOpen className="text-amber-500" />, label: "Total Students", value: "15+" },
          { icon: <Calendar className="text-rose-500" />, label: "Teaching Days", value: "4 Days/Week" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <div className="flex justify-center mb-3">{stat.icon}</div>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter mb-1">{stat.label}</p>
            <h4 className="text-lg font-black text-slate-800">{stat.value}</h4>
          </div>
        ))}
      </motion.div>

      {/* Detailed Info Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Education & Qualifications */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">
          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <GraduationCap className="text-indigo-600" /> Educational Background
            </h3>
            <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-0 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white shadow-md"></div>
                <h4 className="text-lg font-black text-slate-800">Higher Qualifications</h4>
                <p className="text-slate-500 font-medium mt-1 leading-relaxed">
                  {tutor.qualifications}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <h3 className="text-2xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <Briefcase className="text-indigo-600" /> Professional Summary
            </h3>
            <p className="text-slate-500 font-medium leading-relaxed">
              Extremely passionate about teaching and mentoring students to achieve their academic goals. 
              Specialized in science subjects with a proven track record of improving student grades.
              {/* If you have a description/bio field, use tutor.description here */}
            </p>
          </div>
        </motion.div>

        {/* Right Column: Expert Subjects */}
        <motion.div variants={itemVariants} className="space-y-8">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30">
            <h3 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-3">
              <BookOpen className="text-indigo-600" /> Teaching Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {['Mathematics', 'Physics', 'Chemistry', 'English', 'Biology'].map((skill, i) => (
                <span key={i} className="bg-slate-50 text-slate-600 font-bold px-4 py-2 rounded-xl text-sm border border-slate-100">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-primary via-indigo-500 to-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
            <h3 className="text-xl font-black mb-4 flex items-center gap-2">
              <BadgeCheck /> Safe & Trusted
            </h3>
            <p className="text-indigo-100 text-sm font-medium mb-6 leading-relaxed">
              Your safety is our priority. This tutor has been manually verified by our administration.
            </p>
            <div className="bg-white/10 p-4 rounded-2xl border border-white/20">
              <p className="text-xs font-black uppercase tracking-widest text-indigo-200 mb-1">Response Time</p>
              <p className="font-bold">Less than 1 hour</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default TutorProfile;