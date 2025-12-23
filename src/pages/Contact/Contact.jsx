import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare } from "lucide-react";
import toast, { Toaster } from "react-hot-toast"; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);


     toast.success("Message submitted successfully!", {
    duration: 3000,
    position: "top-center",
  });


 
  };



  return (
    <div className="bg-base-100 min-h-screen">
       <Toaster />
      {/* 🌟 Header Section */}
      <section className="bg-base-200 py-16">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="container mx-auto px-6 text-center"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Get In <span className=" bg-gradient-to-r from-primary via-indigo-500 to-primary bg-clip-text text-transparent md:text-2xltracking-wide">Touch</span></h1>
          <p className="text-gray-600 max-w-xl mx-auto">
            Have a question about our platform or need assistance? Our team is here to help you 24/7.
          </p>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 📞 Contact Info Cards */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Email Us</h3>
                <p className="text-gray-500 text-sm">support@etuitionbd.com</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Call Us</h3>
                <p className="text-gray-500 text-sm">+880 1234-567890</p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-start gap-4">
              <div className="bg-primary/10 p-3 rounded-xl text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg">Location</h3>
                <p className="text-gray-500 text-sm">Dhaka, Bangladesh</p>
              </div>
            </div>

            {/* Support Message Box */}
            <div className="bg-gradient-to-r from-primary via-indigo-500 to-primary p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-200">
              <MessageSquare size={32} className="mb-4 opacity-50" />
              <h3 className="text-xl font-bold mb-2">Live Support?</h3>
              <p className="text-white/80 text-sm mb-4">Our dedicated support team is available for urgent queries.</p>
              <button className="btn btn-sm btn-outline border-white text-white hover:bg-white hover:text-primary">Chat Now</button>
            </div>
          </motion.div>

          {/* 📝 Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2 bg-white shadow-xl shadow-gray-100 rounded-3xl p-8 md:p-12 border border-gray-50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Your Name</span></label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className="input input-bordered focus:input-primary bg-gray-50 border-none h-14"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-control">
                  <label className="label"><span className="label-text font-semibold">Email Address</span></label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    className="input input-bordered focus:input-primary bg-gray-50 border-none h-14"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Subject</span></label>
                <input
                  type="text"
                  name="subject"
                  placeholder="How can we help?"
                  className="input input-bordered focus:input-primary bg-gray-50 border-none h-14"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label"><span className="label-text font-semibold">Message</span></label>
                <textarea
                  name="message"
                  placeholder="Write your message here..."
                  className="textarea textarea-bordered focus:textarea-primary bg-gray-50 border-none min-h-[150px] pt-4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button type="submit" className="flex  gap-2btn btn-primary btn-lg hover:scale-105 active:scale-95 gap-2 group/btn relative inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-primary via-indigo-500 to-primary bg-size-200 bg-pos-0 hover:bg-pos-100 rounded-2xl shadow-lg shadow-primary/25 overflow-hidden">
                <Send size={18} />
                Send Message
              </button>
            </form>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default Contact;