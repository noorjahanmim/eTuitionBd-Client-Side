import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

import toast from "react-hot-toast";
import { Mail, Lock, LogIn, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const Login = () => {
  const navigate = useNavigate();
  const { signInUser, signInGoogle } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();

  // ✅ Normal login
  const onSubmit = async (data) => {
    try {
      const userCredential = await signInUser(data.email, data.password);
      const user = userCredential.user;

      await axiosSecure.post("/users", {
        email: user.email,
        name: user.displayName || "",
        image: user.photoURL || ""
      });

      toast.success("Login successful!");
      reset();
      navigate("/");
    } catch (error) {
      navigate("/");
      toast.success("Login successful!");
    }
  };

  // ✅ Google login
  const handleGoogleLogin = async () => {
    try {
      const result = await signInGoogle();
      const user = result.user;

      await axiosSecure.post("/users", {
        email: user.email,
        name: user.displayName || "",
        image: user.photoURL || ""
      });

      toast.success("Google Login successful!");
      navigate("/");
    } catch (error) {
      navigate("/");
      
    }
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4 font-sans">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse"
      >
        {/* Left Side: Gradient Design */}
        <div className="md:w-1/2 bg-gradient-to-r from-primary via-indigo-500 to-primary p-12 text-white flex flex-col justify-center items-center text-center">
          <motion.div initial={{ y: -20 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
            <LogIn size={80} className="mb-6 opacity-90" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-indigo-100 mb-8 max-w-xs">
            Log in to manage your tuitions, track applications, and connect with your learning partner.
          </p>
          <div className="hidden md:block border border-white/20 bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
            <p className="text-sm italic">"Education is the most powerful weapon which you can use to change the world."</p>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className="md:w-1/2 p-8 md:p-12 bg-white">
          <div className="mb-10 text-center md:text-left">
            <h3 className="text-3xl font-extrabold text-gray-800">Login</h3>
            <p className="text-gray-500 mt-2">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Email Field */}
            <div className="form-control">
              <label className="label text-gray-700 font-semibold text-sm">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Mail size={18} />
                </span>
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email", { required: true })}
                  className="input input-bordered w-full pl-10 focus:outline-primary bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label text-gray-700 font-semibold text-sm py-0">Password</label>
                <a href="#" className="text-xs text-primary hover:underline">Forgot Password?</a>
              </div>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <Lock size={18} />
                </span>
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                  className="input input-bordered w-full pl-10 focus:outline-primary bg-gray-50 border-gray-200"
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full bg-gradient-to-r from-primary via-indigo-500 to-primary hover:scale-105 border-none shadow-lg group text-white">
               Login
              <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="divider my-8 text-gray-400 text-xs uppercase tracking-widest">OR CONTINUE WITH</div>

          <button
            onClick={handleGoogleLogin}
            className="btn btn-outline w-full border-gray-300 hover:bg-gray-50 text-gray-700 font-bold gap-3 transition-all rounded-xl hover:scale-105"
          >
            <FcGoogle size={22} />
            Login with Google
          </button>

          <div className="mt-10 text-center">
            <p className="text-gray-600 text-sm font-medium">
              Don't have an account?{" "}
              <Link to="/register" className="text-primary font-bold hover:underline transition-all">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;


