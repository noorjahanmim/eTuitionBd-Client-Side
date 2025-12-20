import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { TbBrandX } from "react-icons/tb";
import { Send } from "lucide-react"; 
import Logo from "../../../components/Logo/Logo"; 

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white mt-20 border-t border-slate-800">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* 1. Brand & About Section  */}
          <div className="space-y-5">
            <div className="flex flex-col items-start gap-2">
              <span className="text-xl">
                 <Logo />
              </span>
              
              {/* <h2 className="text-2xl font-bold tracking-tight text-white">
                eTuition<span className="text-primary">Bd</span>
              </h2> */}
            </div>
            
            <p className="text-[15px] leading-relaxed text-gray-200 font-medium">
              A trusted platform connecting Students & Tutors with a smooth, secure
              and transparent tuition management system.
            </p>

            {/* Social Icons */}
            <div className="flex gap-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-all duration-300">
                <FaFacebook size={20} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-all duration-300">
                <TbBrandX size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-all duration-300">
                <FaInstagram size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-primary transition-all duration-300">
                <FaYoutube size={20} />
              </a>
            </div>
          </div>

          {/* 2. Quick Links Section */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-primary w-fit pb-1">
              Quick Links
            </h3>
            <ul className="space-y-3 font-semibold text-gray-200">
              <li>
                <Link to="/all-tuitions" className="hover:text-primary transition-all duration-200">
                  Find Tuitions
                </Link>
              </li>
              <li>
                <Link to="/all-tutors" className="hover:text-primary transition-all duration-200">
                  Find Tutors
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-all duration-200">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary transition-all duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* 3. Contact Information */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-primary w-fit pb-1">
              Contact Us
            </h3>
            <ul className="space-y-4 font-semibold text-gray-200">
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary" />
                <span>support@etuitionbd.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhoneAlt className="text-primary" />
                <span>+880 1234-567890</span>
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-primary" />
                <span>Dhaka, Bangladesh</span>
              </li>
            </ul>
          </div>

          {/* 4. Stay Updated */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 border-b-2 border-primary w-fit pb-1">
              Stay Updated
            </h3>
            <p className="text-sm mb-4 font-medium text-gray-300">
              Subscribe for latest updates.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-slate-800 border-none rounded-l-lg px-4 py-3 w-full focus:ring-1 focus:ring-primary text-sm text-white outline-none"
              />
              <button className="bg-primary hover:bg-blue-700 px-5 py-3 rounded-r-lg transition-colors">
                <Send size={20} className="text-white" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-800 bg-black/30 py-6">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm font-medium">
            © {new Date().getFullYear()} <span className="font-bold">eTuitionBd</span> — All Rights Reserved.
          </p>
          <div className="flex gap-6 text-sm font-medium opacity-80">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;