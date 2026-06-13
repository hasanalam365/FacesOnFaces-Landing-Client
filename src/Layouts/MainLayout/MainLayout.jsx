// MainLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      
      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="flex-1 pt-20">
        <Outlet />
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
};

export default MainLayout;
