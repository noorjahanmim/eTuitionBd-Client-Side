import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, MapPin, GraduationCap, CheckCircle2,ArrowRight } from "lucide-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TutorCard from "../../AllTutors/TutorCard";
// import { Link } from "react-router";
import { Link } from "react-router-dom"; 



const LatestTutors = () => {
  const [tutors, setTutors] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/latest-tutors") 
      .then((res) => {
        setTutors(res.data); 
      })
      .catch((err) => console.error(err));
  }, [axiosSecure]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };



  return (
    <section className="bg-base-200/30 py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-primary font-bold tracking-[0.2em] uppercase text-sm"
          >
            Expert Instructors
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black mt-3 mb-4 bg-gradient-to-r from-base-content to-base-content/60 bg-clip-text text-transparent"
          >
            Meet Our Top Tutors
          </motion.h2>
          <div className="w-20 h-1.5 bg-primary mx-auto rounded-full" />
        </div>

        <div className="flex justify-between items-center px-6 mb-10">
        <h2 className="text-3xl font-bold">Latest Tutors</h2>
        <Link
          to="/all-tutors"
          className="text-primary font-semibold hover:underline"
        >
          Show More →
        </Link>
      </div>
        

        {/* Tutor Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {tutors.map((tutor) => (


         <TutorCard  key={tutor._id} tutor={tutor}></TutorCard>



          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LatestTutors;

