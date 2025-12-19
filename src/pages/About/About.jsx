import React from "react";
import { motion, useScroll } from "framer-motion";
import { Target, CheckCircle } from "lucide-react"; 
import { Link } from "react-router";


const teamMembers = [
  { 
    name: "Noor Jahan Rahman Mim", 
    role: "Founder", 
    img: "https://i.pinimg.com/736x/56/28/11/562811a72efe837a85bdc4b84a7e63d4.jpg" 
  },
  { 
    name: "Musfika Rahman Bushra", 
    role: "Developer", 
    img: "https://i.pinimg.com/736x/22/eb/74/22eb74a3001be3546dc36e4e1652d950.jpg" 
  },
  { 
    name: "Israth Jahan Sadia", 
    role: "Designer", 
    img: "https://i.pinimg.com/736x/32/13/1d/32131d770c0829188810bd492f04932c.jpg" 
  },
  { 
    name: "Minhazur Rahman Siyam", 
    role: "Support", 
    img: "https://i.pinimg.com/736x/a9/0a/21/a90a210e53399ee804ef3c8a551cabfe.jpg" 
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Counter = ({ value, label }) => {
  return (
    <motion.div
      whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
      viewport={{ once: true }}
      className="bg-white rounded-xl shadow-md p-6 text-center border border-gray-100"
    >
      <h3 className="text-4xl font-bold text-primary mb-2">{value}+</h3>
      <p className="text-gray-600 font-medium">{label}</p>
    </motion.div>
  );
};

const About = () => {
  const { scrollYProgress } = useScroll();

  return (
    <div className="relative text-gray-800">
      {/* SCROLL PROGRESS */}
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-50"
      />

    

      {/* 🏔️ VISION SECTION  */}
      <section className="py-20 max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-2 bg-primary/10 rounded-2xl rotate-2" />
            <img
              src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2070&auto=format&fit=crop"
              alt="Our Vision"
              className="relative rounded-xl shadow-lg z-10 grayscale hover:grayscale-0 transition-all duration-700"
            />
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="space-y-6"
          >
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase">
              <Target size={20} />
              <span>Our Purpose</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              Revolutionizing the way you find <span className="text-primary">Tutors.</span>
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We believe quality education is a right, not a luxury. Our automated matching algorithm ensures you find a tutor who understands your unique pace of learning in less than 24 hours.
            </p>
            <ul className="space-y-4 pt-2">
               {['Verified Expert Tutors', 'Personalized Matching', 'Secure Payment System'].map((item, i) => (
                 <li key={i} className="flex items-center gap-3 font-semibold text-gray-700">
                    <CheckCircle className="text-primary" size={18} /> {item}
                 </li>
               ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Counter value={500} label="Students Helped" />
          <Counter value={200} label="Verified Tutors" />
          <Counter value={50} label="Subjects Covered" />
          <Counter value={99} label="Satisfaction Rate" />
        </div>
      </section>

      {/* IMAGE + STORY */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-12 items-center"
        >
          {/* <div>
            <h2 className="text-3xl font-bold mb-4">
              📘 Learning Made Simple
            </h2>
            <p className="text-gray-600 leading-relaxed">
              From posting tuition needs to selecting the perfect tutor,
              everything is designed to be smooth, fast, and student-friendly.
            </p>
          </div> */}

          <div className="space-y-6">
  {/* Title with subtle accent */}
  <div className="relative inline-block">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
      📘 Learning Made <span className="text-primary relative">Simple
        <svg className="absolute -bottom-1 left-0 w-full h-2 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
          <path d="M0 5 Q 25 0, 50 5 T 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
        </svg>
      </span>
    </h2>
  </div>

  <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
    From posting tuition needs to selecting the perfect tutor, 
    everything is designed to be <span className="font-semibold text-gray-800">smooth, fast, and student-friendly.</span>
  </p>

  {/* Quick Highlights */}
  <div className="grid grid-cols-1 gap-4 pt-4">
    {[
      { icon: "⚡", text: "Post needs in seconds" },
      { icon: "🎯", text: "Smart matching algorithm" },
      { icon: "🛡️", text: "Verified & secure process" }
    ].map((item, index) => (
      <div key={index} className="flex items-center gap-3 bg-white p-3 rounded-xl shadow-sm border border-gray-50 hover:border-primary/20 transition-colors">
        <span className="text-xl">{item.icon}</span>
        <span className="text-sm font-medium text-gray-700">{item.text}</span>
      </div>
    ))}
  </div>
</div>

          <img
            src="/src/assets/learning.jpg"
            alt="Learning"
            className="rounded-xl shadow-lg"
          />
        </motion.div>
      </section>

      {/* TEAM SECTION */}

      <section className="bg-gradient-to-b from-base-100 to-base-200 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">🤝 Meet Our Awesome Team</h2>
            <p className="text-gray-500 max-w-2xl mx-auto font-medium">
             The faces behind our efforts—constantly working to ensure the best experience for you.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 text-center border border-gray-100 group"
              >
                <div className="relative inline-block mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full scale-110 group-hover:bg-primary/30 transition-all duration-300 blur-sm"></div>
                  <img
                    src={member.img}
                    alt={member.name}
                    className="relative w-28 h-28 mx-auto rounded-full object-cover border-4 border-white shadow-md bg-gray-200"
                    onError={(e) => { e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=random`; }}
                  />
                </div>
                <h3 className="font-bold text-xl text-gray-800 mb-1">{member.name}</h3>
                <p className="text-sm font-bold text-primary uppercase tracking-widest">{member.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
  

      <section className="py-20 px-6">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="max-w-5xl mx-auto bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
  >
    <h2 className="text-3xl md:text-4xl font-bold mb-6">
      🚀 Ready to Start Your Learning Journey?
    </h2>
    <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
      Whether you are a student looking for the perfect tutor or a tutor
      ready to share knowledge, <span className="font-bold">eTuitionBd</span> is
      the right place to begin.
    </p>
    <div className="flex flex-col sm:flex-row gap-4 justify-center">
      {/* ✅ Post Tuition → Student Dashboard */}
      <Link
        to="/dashboard/student/post-tuition"
        className="btn btn-primary px-10"
      >
        Post a Tuition
      </Link>

      {/* ✅ Find Tutor → All Tutors Page */}
      <Link
        to="/all-tutors"
        className="btn btn-outline px-10"
      >
        Find a Tutor
      </Link>
    </div>
  </motion.div>
</section>

    </div>
  );
};

export default About;