import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, CreditCard, LayoutDashboard, Handshake } from "lucide-react";

const features = [
  {
    title: "Verified Tutors",
    desc: "All tutors undergo a rigorous background check and admin verification.",
    icon: <ShieldCheck className="w-8 h-8 text-primary" />,
    color: "bg-blue-500/10",
  },
  {
    title: "Secure Payments",
    desc: "Your transactions are protected with industry-leading encryption.",
    icon: <CreditCard className="w-8 h-8 text-secondary" />,
    color: "bg-purple-500/10",
  },
  {
    title: "Easy Dashboard",
    desc: "A seamless experience to manage lessons, schedules, and payments.",
    icon: <LayoutDashboard className="w-8 h-8 text-accent" />,
    color: "bg-green-500/10",
  },
  {
    title: "Trusted Platform",
    desc: "Connecting thousands of students with expert tutors daily.",
    icon: <Handshake className="w-8 h-8 text-info" />,
    color: "bg-orange-500/10",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-base-100">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent  tracking-wide bg-gradient-to-r from-primary via-indigo-500 to-primary bg-clip-text text-transparent text-xl md:text-2xl font-bold tracking-wide">
            Why Choose eTuitionBd?
          </h2>
          <p className="max-w-2xl mx-auto text-base-content/70">
            We provide a secure and efficient ecosystem for both students and tutors to excel.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -10 }}
              className="group p-8 rounded-3xl bg-base-200/50 border border-base-300 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300"
            >
              <div className={`w-16 h-16 ${item.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {item.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-base-content/60 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;