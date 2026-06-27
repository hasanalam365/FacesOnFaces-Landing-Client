import React, { useState } from "react";
import { motion } from "framer-motion";

const instructors = [
  {
    id: 1,
    name: "Dr. Vahid",
    role: "Lead Instructor",
    image:
      "https://i.ibb.co.com/F48xW4CC/Dr-Vahid.jpg",
    experience: "7+ Years",
    specialty: "Advanced Facial Procedures",
  },
  {
    id: 2,
    name: "Dr. Mobina",
    role: "Clinical Director",
    image:
      "https://i.ibb.co.com/tTbDmTL8/mobina.jpg",
    experience: "3+ Years",
    specialty: "Regenerative Aesthetics & Skin Science",
  },
  {
    id: 3,
    name: "Dr. Mario",
    role: "Head of Dermatology",
    image:
      "https://i.ibb.co.com/kgSmyHXf/Dr-mario.jpg",
    experience: "7+ Years",
    specialty: "Dermatology & Clinical Training",
  },
];

const Instructors = () => {
  const [active, setActive] = useState(2);

  return (
    <section className="py-24 bg-black">
      <div className="px-4 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 text-[11px] tracking-[4px] uppercase mb-3">
            Our Team
          </p>

          <h2 className="text-4xl font-light text-white md:text-6xl">
            Meet Your{" "}
            <span className="italic text-cyan-400">
              Instructors
            </span>
          </h2>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {instructors.map((item) => {
            const isActive = active === item.id;

            return (
              <motion.div
                key={item.id}
                onHoverStart={() =>
                  setActive(item.id)
                }
                className="relative overflow-hidden rounded-3xl h-[520px] cursor-pointer group"
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className={`w-full h-full object-cover transition-all duration-700 ${
                    isActive
                      ? "grayscale-0 scale-105"
                      : "grayscale"
                  }`}
                />

                {/* Dark Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-500 ${
                    isActive
                      ? "bg-black/20"
                      : "bg-black/45"
                  }`}
                />

                {/* Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-black via-black/80 to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="mb-2 text-2xl font-light text-white">
                    {item.name}
                  </h3>

                  <p className="text-sm font-medium text-cyan-400">
                    {item.role}
                  </p>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isActive
                        ? "auto"
                        : 0,
                      opacity: isActive
                        ? 1
                        : 0,
                      marginTop: isActive
                        ? 20
                        : 0,
                    }}
                    transition={{
                      duration: 0.35,
                    }}
                    className="overflow-hidden"
                  >
                    <div className="pt-4 border-t border-white/10">
                      <div className="flex justify-between mb-4 text-sm text-white/80">
                        <span>
                          Experience
                        </span>
                        <span className="text-white">
                          {item.experience}
                        </span>
                      </div>

                      <div className="flex justify-between gap-4 text-sm">
                        <span className="text-white/80">
                          Specialty
                        </span>

                        <span className="text-right text-white max-w-[180px]">
                          {item.specialty}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Instructors;