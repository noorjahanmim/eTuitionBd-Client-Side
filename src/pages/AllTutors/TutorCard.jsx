import React from 'react';
import { motion } from "framer-motion";
import { Star, MapPin, GraduationCap, CheckCircle2 } from "lucide-react";
import { Link } from 'react-router';



const TutorCard = ({tutor}) => {
      const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
  };
    return (
           <motion.div
             
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group relative bg-base-100 rounded-[2.5rem] p-4 shadow-xl shadow-base-300/50 border border-base-300 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-72 w-full overflow-hidden rounded-[2rem] mb-6">
                <img
                  src={tutor.photoUrl || "https://i.ibb.co/5GzXkwq/user.png"}
                  alt={tutor.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {/* Verified Badge */}
                {tutor.verified && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-primary px-4 py-1.5 rounded-2xl flex items-center gap-1.5 shadow-lg">
                    <CheckCircle2 size={16} className="fill-primary text-white" />
                    <span className="text-xs font-bold uppercase tracking-wider">Verified</span>
                  </div>
                )}
              </div>

              {/* Tutor Info */}
              <div className="px-3 pb-4">
                <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                  {tutor.name}
                </h3>
                <div className="flex items-center gap-1 text-base-content/60 text-sm mt-1">
                  <GraduationCap size={16} className="text-primary" />
                  <span>{tutor.qualifications || "Academic Expert"}</span>
                </div>
                <div className="flex items-center gap-1 text-base-content/50 text-xs mb-6 mt-2">
                  <MapPin size={14} />
                  <span>{tutor.location || "Dhaka, Bangladesh"}</span>
                </div>
                 <Link
          to={`/tutors/${tutor._id}`} // 
          className="group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden w-full"
        >
          View Full Profile
        </Link>



              </div>
            </motion.div>

    );
};

export default TutorCard;

