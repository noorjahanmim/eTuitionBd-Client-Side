import { motion, useScroll, useTransform } from "framer-motion";
import { Search, BookOpen, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

import hero from '../../../assets/hero.jpg'

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -100]);

  return (
    <section className="relative bg-gradient-to-br from-slate-50 to-indigo-50/50 py-16 md:py-28 overflow-hidden min-h-[90vh] flex items-center">
      
      {/* Background Animated Shapes */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div 
        animate={{ scale: [1, 1.3, 1], rotate: [0, -90, 0] }}
        transition={{ duration: 15, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          
          {/* 1. Left Side: Text Content */}
          <motion.div 
            style={{ y: y1 }}
            className="flex-1 text-center md:text-left"
          >
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-bold text-primary bg-primary/10 rounded-full border border-primary/20">
                <Star size={16} fill="currentColor" />
                <span>Top Rated Tuition Platform in BD</span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] text-slate-900 tracking-tight">
                Find the Perfect <span className="text-primary">Tutor</span> <br className="hidden lg:block" /> 
                for Your Success
              </h1>

              <p className="mt-8 text-lg md:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto md:mx-0">
                eTuitionBd connects students with verified expert tutors for high-quality, 
                personalized learning. Start your journey today!
              </p>

              


              {/* Buttons */}
              <div className="mt-10 flex flex-wrap justify-center md:justify-start gap-4">
                <Link 
                  to="/all-tuitions" 
                  className="btn btn-primary btn-lg rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2 px-10 group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden"
                >
                  <Search size={20} />
                  Find Tuitions
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-ghost btn-lg rounded-2xl border-2 border-slate-200 hover:border-primary hover:text-primary transition-all gap-2 px-10"
                >
                  <BookOpen size={20} />
                  Become a Tutor
                </Link>
              </div>

              {/* Success Stats */}
              <div className="mt-12 flex items-center justify-center md:justify-start gap-10">
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-800">5k+</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Expert Tutors</span>
                </div>
                <div className="h-10 w-[2px] bg-slate-200"></div>
                <div className="flex flex-col">
                  <span className="text-3xl font-black text-slate-800">4k+</span>
                  <span className="text-xs uppercase tracking-widest font-bold text-slate-400">Active Students</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* 2. Right Side: Image with Full Motion */}
          <motion.div
            style={{ y: y2 }}
            className="flex-1 relative w-full max-w-[600px]"
          >
            {/* Main Image Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative group"
            >
              {/* Floating Animation for the entire image block */}
              <motion.div
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 1, 0]
                }}
                transition={{ 
                  duration: 6, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                {/* Image Glow Effect */}
                <div className="absolute -inset-4 bg-linear-to-tr from-primary/30 to-indigo-500/30 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
                
                <img 
                  src={hero}
                  alt="Quality Learning" 
                  className="relative rounded-[2rem] shadow-2xl object-cover w-full aspect-[4/3] border-8 border-white"
                />

                {/* New Floating Card: Instead of Verified Profile */}
                <motion.div 
                   animate={{ x: [0, 15, 0] }}
                   transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                   className="absolute -bottom-10 -left-10 bg-white p-5 rounded-2xl shadow-2xl z-30 hidden sm:flex items-center gap-4 border border-slate-50"
                >
                  <div className="bg-orange-100 p-3 rounded-xl text-orange-600">
                    <Users size={24} />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-800 leading-none">500+</p>
                    <p className="text-sm font-bold text-slate-500">Students Trusted Us</p>
                  </div>
                </motion.div>

                {/* Experience Badge */}
                <motion.div 
                   animate={{ x: [0, -15, 0] }}
                   transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                   className="absolute -top-10 -right-5 bg-primary p-4 rounded-2xl shadow-2xl z-30 hidden sm:block text-white"
                >
                  <p className="text-center">
                    <span className="block text-2xl font-black">08+</span>
                    <span className="text-[10px] uppercase font-bold tracking-tighter">Years Experience</span>
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;


