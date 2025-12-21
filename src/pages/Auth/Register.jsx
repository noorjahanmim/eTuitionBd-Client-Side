import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { User, Mail, Lock, Phone, UserCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion"
import { Toaster } from "react-hot-toast";





const Register = () => {
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Student",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = formData;

    try {
      const userCredential = await registerUser(data.email, data.password);
      const userInfo = {
        email: data.email,
        displayName: data.name,
        role: data.role,
        phone: data.phone,
      };

      const res = await axiosSecure.post("/users", userInfo);
      if (res.data.insertedId) {
        toast.success(`🎉 Welcome ${data.name}, your account has been created!`);
      }

      await updateUserProfile({
        displayName: data.name,
        photoURL: "",
      });

      navigate("/");
    } catch (error) {
      // toast.error(error.message);

      if (error.code === "auth/email-already-in-use") {
        toast.error("This email is already registered. Please login instead.");
      } else {
        toast.error(error.message);
      }

      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <Toaster />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* Left Side: Illustration or Text */}
        <div className="md:w-1/2 bg-gradient-to-r from-primary via-indigo-500 to-primary p-12 text-white flex flex-col justify-center items-center text-center">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <UserCircle size={80} className="mb-6 opacity-80" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Join eTuitionBd</h2>
          <p className="text-primary-content/80 mb-8">
            Create an account to start your journey as a Student or a verified Tutor.
          </p>
          <div className="space-y-4 text-left hidden md:block">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">✓</div>
              <span>Access verified tuitions</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">✓</div>
              <span>Connect with expert tutors</span>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800">Create Account</h3>
            <p className="text-gray-500 text-sm">Fill in the details to get started</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            {/* Name Field */}
            <div className="form-control">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <User size={18} />
                </span>
                <input
                  className="input input-bordered w-full pl-10 focus:outline-primary bg-gray-50 border-none"
                  name="name"
                  type="text"
                  placeholder="Full Name"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  className="input input-bordered w-full pl-10 focus:outline-primary bg-gray-50 border-none"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  className="input input-bordered w-full pl-10 focus:outline-primary bg-gray-50 border-none"
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Phone Field */}
            <div className="form-control">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Phone size={18} />
                </span>
                <input
                  className="input input-bordered w-full pl-10 focus:outline-primary bg-gray-50 border-none"
                  name="phone"
                  type="text"
                  placeholder="Phone Number"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="form-control">
              <label className="label py-1">
                <span className="label-text font-semibold text-gray-600">Register as a:</span>
              </label>
              <select
                name="role"
                onChange={handleChange}
                className="select select-bordered w-full bg-gray-50 border-none focus:outline-primary"
                value={formData.role}
              >
                <option value="Student">Student</option>
                <option value="Tutor">Tutor</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-primary via-indigo-500 to-primary hover:scale-105 border-none shadow-lg group">
              Register Now
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-primary font-bold hover:underline">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;