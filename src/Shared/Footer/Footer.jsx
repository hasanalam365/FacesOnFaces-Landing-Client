import React, { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {Facebook} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

import { trackEvent } from "../../utils/analytics";

export default function Footer() {
const footerRef = useRef(null);

useEffect(() => {
  const element = footerRef.current;
  if (!element) return;

  let tracked = false;

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting && !tracked) {
        tracked = true;

        trackEvent("view_footer", {
          section_name: "Footer",
        });

        observer.disconnect();
      }
    },
    {
      threshold: 0.4,
    }
  );

  observer.observe(element);

  return () => observer.disconnect();
}, []);

  return (
    <footer  ref={footerRef} className="relative bg-black border-t border-white/10">
      <div className="px-6 mx-auto max-w-7xl">

        {/* Main Footer */}
        <div className="flex flex-col items-center justify-between gap-8 py-10 md:flex-row">

          {/* Logo + Description */}
          <div className="max-w-md text-center md:text-left">
            <img
              src="https://i.ibb.co.com/TM5zgDgD/logo-png.webp"
              alt="Faces On Faces"
              className="w-auto h-10 mx-auto mb-4 md:mx-0"
            />

            <p className="text-sm leading-relaxed text-gray-400">
              Empowering beauty professionals with world-class aesthetic
              education, certification, and career development opportunities.
            </p>
          </div>

          {/* Social + Links */}
          <div className="flex flex-col items-center gap-5">

            {/* Social */}
         <div className="flex gap-3">
  {/* Facebook */}
  <a
    href="#"
    onClick={() =>
      trackEvent("social_click", {
        social_platform: "facebook",
        location: "footer",
      })
    }
    className="flex items-center justify-center w-10 h-10 transition border rounded-lg border-white/10 bg-white/5 hover:border-cyan-400/30 hover:bg-cyan-500/10"
  >
    <Facebook
      size={18}
      className="text-gray-300"
    />
  </a>

  {/* WhatsApp */}
  <a
    href="https://wa.me/447308888874"
    target="_blank"
    rel="noopener noreferrer"
    onClick={() =>
      trackEvent("whatsapp_click", {
        location: "footer",
      })
    }
    className="flex items-center justify-center w-10 h-10 transition border rounded-lg border-white/10 bg-white/5 hover:border-green-400/30 hover:bg-green-500/10"
  >
    <FaWhatsapp
      size={18}
      className="text-gray-300"
    />
  </a>
</div>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
              onClick={() =>
    trackEvent("footer_link_click", {
      link_name: "Privacy Policy",
    })
  }
                to="/privacy-policy"
                className="text-gray-400 transition hover:text-cyan-300"
              >
                Privacy Policy
              </Link>

              <span className="text-gray-600">•</span>

              <Link
               onClick={() =>
    trackEvent("footer_link_click", {
      link_name: "Terms and Conditions",
    })
  }
                to="/terms-and-conditions"
                className="text-gray-400 transition hover:text-cyan-300"
              >
                Terms and Conditions
              </Link>
               <span className="text-gray-600">•</span>
              <Link
              onClick={() =>
    trackEvent("footer_link_click", {
      link_name: "Refund Policy",
    })
  }
                to="/refund-policy"
                className="text-gray-400 transition hover:text-cyan-300"
              >
                Refund Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="py-5 text-center border-t border-white/10">
          <p className="text-xs text-gray-500">
            © 2026 Faces On Faces Academy. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}