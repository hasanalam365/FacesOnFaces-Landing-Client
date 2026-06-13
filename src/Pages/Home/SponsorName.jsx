import React from "react";
import { motion } from "framer-motion";

const sponsors = [
  "HARPER'S",
  "TATLER",
  "COSMOPOLITAN",
  "ALLURE",
  "GLAMOUR",
  "MARIE CLAIRE",
  "VOGUE",
  "ELLE",
];

const SponsorName = () => {
  return (
    <section className="py-10 overflow-hidden bg-black border-y border-white/10">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{
          x: ["0%", "-50%"],
        }}
        transition={{
          repeat: Infinity,
          repeatType: "loop",
          duration: 20,
          ease: "linear",
        }}
      >
        {[...sponsors, ...sponsors].map((item, index) => (
          <div
            key={index}
            className="
              mx-10 md:mx-16
              text-white/50
              hover:text-white
              transition-colors
              duration-300
              tracking-[6px]
              uppercase
              text-sm
              md:text-lg
              font-light
              flex-shrink-0
            "
          >
            {item}
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default SponsorName;