import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  MessageCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const StartJourney = () => {
const navigate=useNavigate()

const handleEnroll=()=>{
  navigate('/enroll')
}

  return (
    <section className="relative overflow-hidden bg-black py-28">
      {/* Background Glow */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl px-4 mx-auto text-center">
        {/* Small Heading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-5 text-[11px] uppercase tracking-[5px] text-cyan-400"
        >
          Begin Your Journey
        </motion.p>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-8 font-light leading-tight text-white"
        >
          <span className="block text-4xl md:text-6xl">
            Start Your Aesthetic
          </span>

          <span className="block text-4xl italic text-cyan-400 md:text-6xl">
            Career Today
          </span>
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="max-w-2xl mx-auto mb-12 leading-8 text-gray-400"
        >
          Join thousands of successful students
          building their future in the world's
          fastest-growing beauty industry.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{
            delay: 0.3,
            duration: 0.6,
          }}
          className="flex flex-col items-center justify-center gap-5 sm:flex-row"
        >
          {/* Primary Button */}
          <motion.button
          onClick={handleEnroll}
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="flex items-center gap-3 px-8 py-4 font-medium text-black transition-all rounded-full group bg-cyan-400"
          >
            Enroll Now

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.97,
            }}
            className="flex items-center gap-3 px-8 py-4 font-medium text-white transition-all border rounded-full group border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/30"
          >
            <MessageCircle
              size={18}
              className="text-cyan-400"
            />

            Talk To Advisor
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default StartJourney;