import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";

export default function PageLoader() {
  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden text-white bg-black">

      {/* Background Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 w-full h-px -translate-x-1/2 left-1/2 bg-gradient-to-r from-transparent via-rose-400/50 to-transparent" />
        <div className="absolute rounded-full top-10 left-1/4 w-96 h-96 bg-rose-500/10 blur-3xl animate-pulse" />
        <div className="absolute delay-300 rounded-full top-10 right-1/4 w-80 h-80 bg-amber-500/10 blur-3xl animate-pulse" />
      </div>

      {/* Loader Content */}
      <div className="relative z-10 flex flex-col items-center">

        {/* Spinning Glow Ring */}
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="relative border-4 rounded-full w-28 h-28 border-t-rose-500/60 border-l-amber-400/50 border-r-transparent border-b-transparent"
        />

        {/* ShoppingBag Icon (Centered & Fixed) */}
        <div className="absolute flex items-center justify-center w-28 h-28">
          <ShoppingBag className="w-10 h-10 text-white" />
        </div>

        {/* Brand Text */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-10 text-2xl font-serif tracking-[0.25em] text-white/90"
        >
          Arabian Essense
        </motion.p>

        {/* Sub-text glow */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.2, duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
          className="mt-2 text-xs uppercase tracking-[0.35em] text-amber-300/70"
        >
         YEMEN 1878
        </motion.p>
      </div>
    </div>
  );
}
