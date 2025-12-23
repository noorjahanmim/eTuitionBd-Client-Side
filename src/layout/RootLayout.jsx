import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/NavBar/NavBar";

const RootLayout = () => {
  return (
    <div className="flex flex-col min-h-screen font-sans bg-gray-50">
      
      <Navbar />

      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Outlet />
        </div>
      </main>

      
      <Footer />
    </div>
  );
};

export default RootLayout;
