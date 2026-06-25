import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Courses", id: "home" },
    { name: "Why Us", id: "why-us" },
    { name: "Instructors", id: "instructors" },
    { name: "Stories", id: "stories" },
    { name: "Gallary", id: "gallary" },
    { name: "Price Plans", id: "price-plans" },
    { name: "FAQ", id: "faq" },
  ];

  const handleScroll = (sectionId) => {
  setMobileMenuOpen(false);

  const scrollToSection = () => {
    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  if (location.pathname !== "/") {
    navigate("/");

    setTimeout(() => {
      scrollToSection();
    }, 300);
  } else {
    setTimeout(() => {
      scrollToSection();
    }, 300);
  }
};

  return (
    <nav className="fixed top-0 left-0 z-50 w-full">
      <div className="bg-[#050505]/90 backdrop-blur-md border-b border-white/10">
        <div className="px-6 mx-auto max-w-7xl">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/">
              <img
                src="https://i.ibb.co.com/TM5zgDgD/logo-png.webp"
                alt="Logo"
                className="w-auto h-10"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="items-center hidden gap-10 lg:flex">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-[14px] text-white/60 hover:text-white transition-all duration-300"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="items-center hidden lg:flex">
              <button
                onClick={() => navigate("/enroll")}
                className="py-3 text-sm font-medium text-black transition-all duration-300 rounded-full px-7 bg-cyan-400 hover:bg-cyan-300 hover:scale-105"
              >
                Enroll Now
              </button>
            </div>

            {/* Mobile Menu Button */}
            
            <button
            
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              
              className="text-white lg:hidden"
            >
              {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
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
                <button
                  key={link.id}
                  onClick={() => handleScroll(link.id)}
                  className="text-left transition text-white/70 hover:text-white"
                >
                  {link.name}
                </button>
              ))}

             <button
  onClick={() => {
    setMobileMenuOpen(false);
    navigate("/enroll");
  }}
  className="py-3 text-sm font-medium text-black transition-all duration-300 rounded-full px-7 bg-cyan-400 hover:bg-cyan-300"
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