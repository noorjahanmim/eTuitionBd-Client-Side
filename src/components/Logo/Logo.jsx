import React from 'react';
import logo from '../../assets/logo.png';
import { Link } from 'react-router-dom'; 

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-3">
      <img
        src={logo}
        alt="eTuitionBD logo"
        className="w-12 h-12 rounded-full  shadow"
      />
      <h3 className="text-indigo-600 text-xl md:text-2xl font-bold tracking-wide">
        eTuitionBD
      </h3>
    </Link>
  );
};

export default Logo;
