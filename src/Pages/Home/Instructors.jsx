import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const instructors = [
  {
    id: 1,
    name: "Doctor Vahid",
    image: "https://i.ibb.co.com/F48xW4CC/Dr-Vahid.jpg",
  },
  {
    id: 2,
    name: "Advanced Practitioner Mobina",
    image: "https://i.ibb.co.com/tTbDmTL8/mobina.jpg",
  },
  {
    id: 3,
    name: "Doctor Mario",
    image: "https://i.ibb.co.com/kgSmyHXf/Dr-mario.jpg",
  },
];

const Instructors = () => {
  const [active, setActive] = useState(2);
  const itemRefs = useRef([]);

  // ✅ Mobile active detection
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(Number(entry.target.dataset.id));
          }
        });
      },
      {
        threshold: 0.65,
        root: null,
      }
    );

    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-24 bg-black">
      <div className="px-4 mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 text-[11px] tracking-[4px] uppercase mb-3">
            Our Team
          </p>

          <h2 className="text-4xl font-light text-white md:text-6xl">
            Meet Your <span className="italic text-cyan-400">Instructors</span>
          </h2>
        </div>

        {/* MOBILE CAROUSEL */}
        <div
          className="flex gap-5 px-2 overflow-x-auto md:hidden snap-x snap-mandatory scroll-smooth"
        >
          {instructors.map((item, index) => {
            const isActive = active === item.id;

            return (
              <motion.div
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                data-id={item.id}
                className="
                  min-w-[75%]
                  snap-center
                  relative
                  h-[500px]
                  rounded-3xl
                  overflow-hidden
                "
                animate={{
                  scale: isActive ? 1 : 0.92,
                }}
                transition={{ duration: 0.4 }}
              >
                {/* IMAGE with parallax effect */}
                <motion.img
                  src={item.image}
                  className="object-cover w-full h-full"
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    y: isActive ? -10 : 10,
                  }}
                  transition={{ duration: 0.6 }}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 transition-all duration-300 ${
                    isActive ? "bg-black/20" : "bg-black/50"
                  }`}
                />

                {/* Bottom content */}
                <div className="absolute bottom-0 p-6 text-white">
                  <h3 className="text-2xl font-light">
                    {item.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* DESKTOP GRID (unchanged simple version) */}
        <div className="hidden gap-6 md:grid md:grid-cols-3">
          {instructors.map((item) => (
            <div
              key={item.id}
              className="relative h-[520px] rounded-3xl overflow-hidden"
            >
              <img
                src={item.image}
                className="object-cover w-full h-full transition grayscale hover:grayscale-0"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Instructors;