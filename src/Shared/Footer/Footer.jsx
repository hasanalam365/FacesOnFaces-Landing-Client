import React from "react";
import { Link } from "react-router-dom";
import {
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#040707] border-t border-cyan-500/10">
      <div className="px-6 mx-auto max-w-7xl lg:px-10">

        {/* TOP */}
        <div className="grid gap-12 py-16 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">

          {/* BRAND */}
          <div>
            <div className="flex items-center mb-5">
             
              {/* <h3 className="text-lg font-semibold text-white">
                Faces On Faces
              </h3> */}

               <img
                src="https://i.ibb.co.com/TM5zgDgD/logo-png.webp"
                alt="Logo"
                className="w-auto h-10"
              />
            </div>

            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              Empowering beauty professionals with world-class
              aesthetic education, certification, and career
              development opportunities.
            </p>

            {/* Newsletter */}
            <div className="mt-8">
              <h4 className="mb-3 text-sm font-medium text-white">
                Stay Updated
              </h4>

              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 text-sm text-white border rounded-l-xl border-white/10 bg-white/5 focus:outline-none"
                />

                <button className="flex items-center justify-center w-12 transition rounded-r-xl bg-cyan-400 hover:bg-cyan-300">
                  <Send
                    size={16}
                    className="text-black"
                  />
                </button>
              </div>
            </div>

            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition border rounded-lg border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-500/10"
              >
                <Facebook
                  size={18}
                  className="text-gray-300"
                />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition border rounded-lg border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-500/10"
              >
                <Instagram
                  size={18}
                  className="text-gray-300"
                />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition border rounded-lg border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-500/10"
              >
                <Twitter
                  size={18}
                  className="text-gray-300"
                />
              </a>

              <a
                href="#"
                className="flex items-center justify-center w-10 h-10 transition border rounded-lg border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-500/10"
              >
                <Linkedin
                  size={18}
                  className="text-gray-300"
                />
              </a>
            </div>
          </div>

          {/* Academy */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              Academy
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/courses"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Our Courses
                </Link>
              </li>

              <li>
                <Link
                  to="/careers"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Careers
                </Link>
              </li>

              <li>
                <Link
                  to="/press"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Press
                </Link>
              </li>
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              Programs
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/advanced"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Advanced
                </Link>
              </li>

              <li>
                <Link
                  to="/fundamental"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Fundamental
                </Link>
              </li>

              <li>
                <Link
                  to="/certifications"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Certifications
                </Link>
              </li>

              <li>
                <Link
                  to="/masterclasses"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Masterclasses
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              Resources
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/blog"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Blog
                </Link>
              </li>

              <li>
                <Link
                  to="/tutorials"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Tutorials
                </Link>
              </li>

              <li>
                <Link
                  to="/faqs"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  FAQs
                </Link>
              </li>

              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="mb-5 text-sm font-semibold text-white">
              Legal
            </h4>

            <ul className="space-y-3">
              <li>
                <Link
                  to="/privacy-policy"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Privacy Policy
                </Link>
              </li>

              <li>
                <Link
                  to="/terms-and-conditions"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Terms of Service
                </Link>
              </li>

              <li>
                <Link
                  to="/cookie-policy"
                  className="text-sm text-gray-400 hover:text-cyan-300"
                >
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col items-center justify-between gap-4 py-6 border-t border-white/10 md:flex-row">
          <p className="text-xs text-gray-500">
            © 2026 Faces On Faces Academy. All rights reserved.
          </p>

          <p className="text-xs text-gray-500">
            Designed for modern aesthetic professionals.
          </p>
        </div>
      </div>
    </footer>
  );
}