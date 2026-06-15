// Navbar.jsx

import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate =useNavigate()

  const navLinks = [
    { name: "Courses", path: "/" },
    { name: "Why Us", path: "/why-us" },
    { name: "Instructors", path: "/instructors" },
    { name: "Stories", path: "/stories" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      {/* Background */}
      <div className="border-b backdrop-blur-xl bg-black/90 border-white/5">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between h-[78px]">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              {/* <h2 className="text-xl font-semibold text-white">
                Faces On Faces
              </h2> */}

              
              
              <img
                src="https://i.ibb.co.com/TM5zgDgD/logo-png.webp"
                alt="Logo"
                className="w-auto h-10"
              />
             
            </Link>

            {/* Desktop Menu */}
            <div className="items-center hidden gap-10 lg:flex">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-[14px] transition-all duration-300 ${
                      isActive
                        ? "text-white"
                        : "text-white/60 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="items-center hidden lg:flex">
               <button
    onClick={() => navigate("/enroll")}
    className="py-3 text-sm font-medium text-black transition-all duration-300 rounded-full px-7 bg-cyan-400 hover:scale-105 hover:bg-cyan-300"
  >
    Enroll Now
  </button>
            </div>

            {/* Mobile Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white lg:hidden"
            >
              {mobileMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ${
          mobileMenuOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-[#050505] border-b border-white/10">
          <div className="px-6 py-6">
            <div className="flex flex-col gap-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-base transition ${
                      isActive
                        ? "text-cyan-400"
                        : "text-white/70 hover:text-white"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

               <button
    onClick={() => navigate("/enroll")}
    className="py-3 text-sm font-medium text-black transition-all duration-300 rounded-full px-7 bg-cyan-400 hover:scale-105 hover:bg-cyan-300"
  >
    Enroll Now
  </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}