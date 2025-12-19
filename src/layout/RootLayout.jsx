import React from 'react';
import { Outlet } from 'react-router-dom';
import Footer from '../pages/Shared/Footer/Footer';
import Navbar from '../pages/Shared/NavBar/NavBar';

const RootLayout = () => {
  return (


    <div className=" flex flex-col min-h-screen font-sans">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>




//     <div className='bg-b    lue-500'>
//  <Navbar />
//       <Outlet />
//       <Footer />


//     </div>
    // <div className="flex flex-col min-h-screen font-sans">
     
      

    //   {/* <main className="flex-grow">
    //     <div className="container mx-auto px-4">
    //       <Outlet />
    //     </div>
    //   </main> */}

      
    // </div>
  );
};

export default RootLayout;
