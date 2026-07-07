// src/Components/ScrollToTop/ScrollToTop.jsx

import { useEffect, useRef } from "react";
import { useLocation, useNavigationType } from "react-router-dom";

// Module-level store — SPA-তে যতক্ষণ full page reload না হয়, ততক্ষণ এটা বেঁচে থাকবে।
const scrollPositions = new Map();

const ScrollToTop = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // "PUSH" | "REPLACE" | "POP"
  const currentKeyRef = useRef(location.key);

  // Browser এর নিজের auto-restore বন্ধ করে দিন — আমরা নিজেরাই handle করবো
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  // প্রতিটা scroll event এ current page এর position টা continuously save করা হচ্ছে
  useEffect(() => {
    currentKeyRef.current = location.key;

    const handleScroll = () => {
      scrollPositions.set(currentKeyRef.current, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.key]);

  // Location change হলে সিদ্ধান্ত নিন: restore করবে নাকি top এ scroll করবে
  useEffect(() => {
    if (navigationType === "POP") {
      const savedY = scrollPositions.get(location.key);

      if (typeof savedY === "number") {
        let attempts = 0;
        const maxAttempts = 25;

        const tryRestore = () => {
          window.scrollTo(0, savedY);
          attempts += 1;

          // Page height এখনো বাড়ছে কিনা চেক করে
          if (attempts < maxAttempts && Math.abs(window.scrollY - savedY) > 2) {
            requestAnimationFrame(tryRestore);
          }
        };

        requestAnimationFrame(tryRestore);
      }
    } else {
      // নতুন navigation (PUSH/REPLACE) — instant টপে নিয়ে যাবে (কোনো স্ক্রল অ্যানিমেশন হবে না)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }
  }, [location.key, navigationType]);

  return null;
};

export default ScrollToTop;