import React from "react";
import { motion } from "framer-motion";

const locations = [
  "LONDON",
  "UPMINSTER",
  "EDINBURGH",
  "BELFAST",
  
  "DUBLIN",
];

const Location = () => {
  return (
    <section className="py-10 overflow-hidden bg-black border-y border-white/10">
      <motion.div
        className="flex w-max"
        animate={{
          x: [0, -1000], // move fixed pixels
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {Array(4)
          .fill(locations)
          .flat()
          .map((item, index) => (
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

export default Location;