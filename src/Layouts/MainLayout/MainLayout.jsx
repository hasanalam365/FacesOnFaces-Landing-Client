import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../../Shared/Navbar/Navbar";
import Footer from "../../Shared/Footer/Footer";
import ScrollToTop from "../../Components/ScrollToTop";

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      {/* Auto Scroll Top */}
      <ScrollToTop />

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