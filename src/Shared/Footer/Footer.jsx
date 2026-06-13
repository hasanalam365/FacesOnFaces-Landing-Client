// Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";

export default function Footer() {
  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categories = [
    { name: "Floral", path: "/products" },
    { name: "Woody", path: "/products" },
    { name: "Fresh", path: "/products" },
    { name: "Oriental", path: "/products" },
  ];

  return (
    <footer className="pt-20 pb-8 text-white bg-black">
      <div className="px-6 mx-auto max-w-7xl">

        {/* TOP GRID */}
        <div className="grid grid-cols-1 gap-12 mb-16 md:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <h4 className="mb-4 font-serif text-2xl tracking-widest">
           Demo Footer
            </h4>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
         brings
              timeless fragrance traditions to the modern world.
            </p>

            <div className="flex gap-4">
              <a href="#" className="text-white/60 hover:text-white">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/60 hover:text-white">
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h5 className="mb-6 text-sm tracking-widest uppercase">
              Quick Links
            </h5>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/50 hover:text-white"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* COLLECTIONS */}
          <div>
            <h5 className="mb-6 text-sm tracking-widest uppercase">
              Collections
            </h5>
            <ul className="space-y-3">
              {categories.map((cat) => (
                <li key={cat.name}>
                  <Link
                    to={cat.path}
                    className="text-sm text-white/50 hover:text-white"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h5 className="mb-6 text-sm tracking-widest uppercase">
              Contact
            </h5>
            <div className="flex items-center gap-3 text-sm text-white/50">
              <Mail size={16} />
             demo@email.com
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col items-center justify-between gap-4 pt-6 border-t border-white/10 md:flex-row">
          <p className="text-sm text-white/40">
            © 2026 Demo. All rights reserved.
          </p>

          <div className="flex gap-4">
            <Link to="/privacy-policy" className="text-sm text-white/50 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms-and-conditions" className="text-sm text-white/50 hover:text-white">
              Terms & Conditions
            </Link>
            <Link to="/return-and-refunds" className="text-sm text-white/50 hover:text-white">
              Return & Refunds
            </Link>
          </div>
        </div>

        {/* CREDIT */}
        <div className="mt-4 text-center">
          <p className="text-xs text-white/30">
            Developed by <span className="text-rose-400">Faces Media</span>
          </p>
        </div>

      </div>
    </footer>
  );
}
