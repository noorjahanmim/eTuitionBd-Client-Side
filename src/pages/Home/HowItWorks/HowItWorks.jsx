import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUserPlus, FaClipboardList, FaBell, FaMoneyBillWave, FaSearch, FaFileAlt, FaHandshake, FaGraduationCap } from "react-icons/fa";

const tutorSteps = [
  {
    id: 1,
    title: "CREATE TUTOR PROFILE",
    description: "Create your profile in minutes with sign up information.",
    icon: <FaUserPlus />,
    color: "bg-purple-600",
  },
  {
    id: 2,
    title: "APPLY FOR JOBS",
    description: "Completing your profile start browsing our latest TUITION JOBS page and start applying.",
    icon: <FaClipboardList />,
    color: "bg-pink-500",
  },
  {
    id: 3,
    title: "GET FREE TUTORING JOB ALERT",
    description: "Get updated tutoring jobs alerts via SMS/CALL whenever new jobs are posted.",
    icon: <FaBell />,
    color: "bg-indigo-600",
  },
  {
    id: 4,
    title: "START TUTORING AND GROW YOUR INCOME",
    description: "If parent like the demo session, you can continue tuition and start earning.",
    icon: <FaMoneyBillWave />,
    color: "bg-green-600",
  },
];

const studentSteps = [
  {
    id: 1,
    title: "POST YOUR TUITION REQUIREMENT",
    description: "Post your tuition requirements to find the best tutors near you or online.",
    icon: <FaFileAlt />,
    color: "bg-blue-600",
  },
  {
    id: 2,
    title: "GET RELEVANT TUTORS LIST",
    description: "Our system will provide you with a list of verified tutors based on your requirements.",
    icon: <FaSearch />,
    color: "bg-orange-500",
  },
  {
    id: 3,
    title: "HIRE YOUR BEST MATCH",
    description: "Talk to the tutor, check their credentials, and hire the one who suits you best.",
    icon: <FaHandshake />,
    color: "bg-teal-600",
  },
  {
    id: 4,
    title: "START YOUR SUCCESSFUL JOURNEY",
    description: "Begin your lessons and achieve your academic goals with expert guidance.",
    icon: <FaGraduationCap />,
    color: "bg-yellow-500",
  },
];

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState("tutor");

  const currentSteps = activeTab === "tutor" ? tutorSteps : studentSteps;

  return (
    <section className="py-20 bg-base-100 overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl font-extrabold text-primary mb-6"
          >
            How it Works?
          </motion.h2>
          
          {/* Custom Tab Switcher */}
          <div className="inline-flex bg-base-200 p-1.5  rounded-2xl border border-base-300 shadow-inner ">
            <button 
              onClick={() => setActiveTab("tutor")}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all  duration-300 ${activeTab === "tutor" ? "bg-primary text-white shadow-md" : "text-gray-500 hover:text-primary"}`}
            >
              For Tutors
            </button>
            <button 
              onClick={() => setActiveTab("student")}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all duration-300 ${activeTab === "student" ? "bg-secondary text-white shadow-md" : "text-gray-500 hover:text-secondary"}`}
            >
              For Students
            </button>
          </div>
          
          <p className="mt-8 text-lg text-base-content/70">
            Here's how it works for <span className={`${activeTab === 'tutor' ? 'text-primary' : 'text-secondary'} font-bold underline`}>
              {activeTab === "tutor" ? "Tutors" : "Students"}
            </span>
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Middle Vertical Line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary/20 via-secondary/20 to-transparent"></div>

          <div className="space-y-12">
            <AnimatePresence mode="wait">
              {currentSteps.map((step, index) => {
                const isEven = index % 2 === 1;

                return (
                  <div key={`${activeTab}-${step.id}`} className={`flex flex-col md:flex-row items-center justify-between w-full ${isEven ? "md:flex-row-reverse" : ""}`}>
                    
                    {/* Content Card */}
                    <motion.div
                      initial={{ opacity: 0, x: isEven ? 100 : -100 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 100, 
                        damping: 15, 
                        bounce: 0.4,
                        delay: index * 0.1 
                      }}
                      className="w-full md:w-[45%] group"
                    >
                      <div className="bg-base-200 p-8 rounded-[2rem] shadow-xl border border-base-300 group-hover:border-primary/50 transition-all duration-300 relative">
                        {/* Icon Badge */}
                        <div className={`absolute top-[-20px] ${isEven ? 'right-8' : 'left-8'} md:static mb-4 w-12 h-12 rounded-2xl ${step.color} text-white flex items-center justify-center text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                          {step.icon}
                        </div>
                        
                        <span className="text-xs font-bold text-primary/50 tracking-widest uppercase">STEP 0{step.id}</span>
                        <h3 className="text-xl font-bold mt-1 mb-3 text-base-content uppercase leading-tight">
                          {step.title}
                        </h3>
                        <p className="text-base-content/60 leading-relaxed font-medium">
                          {step.description}
                        </p>
                      </div>
                    </motion.div>

                    {/* Center Dot Indicator */}
                    <motion.div 
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full border-4 border-base-100 bg-primary z-10 items-center justify-center shadow-lg"
                    >
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                    </motion.div>

                    {/* Spacer */}
                    <div className="hidden md:block w-[45%]"></div>
                  </div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;