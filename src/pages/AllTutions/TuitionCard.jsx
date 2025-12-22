import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, Banknote, Calendar, ArrowRight, BookOpen, GraduationCap } from "lucide-react";

const TuitionCard = ({ tuition }) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="h-full"
    >
      <div className="relative group bg-white rounded-[2rem] p-7 shadow-lg shadow-indigo-100/50 hover:shadow-2xl hover:shadow-primary/20 transition-all duration-500 border border-gray-100 flex flex-col h-full overflow-hidden">
        
        {/* Top Decorative Glow */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all" />

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 text-primary border border-indigo-100">
              <BookOpen size={14} className="animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-widest">{tuition.subject}</span>
            </div>
            <div className="p-2 bg-yellow-50 rounded-lg">
               <GraduationCap size={18} className="text-yellow-600" />
            </div>
          </div>

          {/* Title / Class */}
          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-tighter mb-1">Tuition Category</p>
            <h3 className="text-2xl font-black text-gray-800 group-hover:text-primary transition-colors">
              Class {tuition.class}
            </h3>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <div className="bg-gray-50 p-3 rounded-2xl border border-transparent group-hover:border-primary/10 group-hover:bg-white transition-all">
              <div className="flex items-center gap-2 text-primary mb-1">
                <MapPin size={14} />
                <span className="text-[10px] font-bold uppercase">Location</span>
              </div>
              <p className="text-sm font-semibold text-gray-700 truncate">{tuition.location}</p>
            </div>

            <div className="bg-gray-50 p-3 rounded-2xl border border-transparent group-hover:border-green-100 group-hover:bg-white transition-all">
              <div className="flex items-center gap-2 text-green-600 mb-1">
                <Banknote size={14} />
                <span className="text-[10px] font-bold uppercase">Salary</span>
              </div>
              <p className="text-sm font-black text-gray-800">৳ {tuition.budget}</p>
            </div>
          </div>

          {/* Spacer to push button down */}
          <div className="flex-grow"></div>

          
          <Link
            to={`/tuitions/${tuition._id}`}
            className="group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              View Details
              <ArrowRight size={18} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
            </span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default TuitionCard;