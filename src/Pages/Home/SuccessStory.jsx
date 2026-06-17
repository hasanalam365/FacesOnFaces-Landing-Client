import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Quote,
  Star,
} from "lucide-react";
import Stats from "./Stats";

const testimonials = [
  {
    id: 1,
    name: "James Wilson",
    role: "Clinical Practitioner",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "The level of professionalism and depth of knowledge at Luminary is unmatched. I went from complete novice to leading a team of practitioners in under two years.",
  },
  {
    id: 2,
    name: "Sarah Mitchell",
    role: "Aesthetic Specialist",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Every module was practical and incredibly detailed. The hands-on training gave me confidence from day one.",
  },
  {
    id: 3,
    name: "Michael Carter",
    role: "Clinic Owner",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    review:
      "The mentorship and lifetime support are exceptional. It transformed the way I approach my business and patients.",
  },
  {
    id: 4,
    name: "Emma Richardson",
    role: "Advanced Aesthetic Practitioner",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    review:
      "I enrolled to expand my skills, but the experience exceeded every expectation. The trainers were supportive, knowledgeable, and genuinely invested in my success.",
  },

  {
    id: 5,
    name: "Daniel Brooks",
    role: "Medical Aesthetics Consultant",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    review:
      "The combination of theory and practical sessions gave me the confidence to start treating clients immediately. My career progressed faster than I ever imagined.",
  },

  {
    id: 6,
    name: "Olivia Bennett",
    role: "Skin Rejuvenation Expert",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    review:
      "From the first session to post-course support, everything was outstanding. The training helped me build a loyal client base and grow my business significantly.",
  },
];

const SuccessStory = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrent(
      (prev) =>
        (prev - 1 + testimonials.length) %
        testimonials.length
    );
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="px-5 py-24 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="uppercase tracking-[4px] text-cyan-400 text-xs mb-4">
            Testimonials
          </p>

          <h2 className="font-serif text-4xl text-white md:text-5xl">
            Success Stories
          </h2>
        </div>

        {/* Card */}
        <div className="relative">
          <div className="p-10 overflow-hidden border rounded-3xl border-cyan-400/20 bg-gradient-to-r from-cyan-950/20 to-zinc-950 md:p-14">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  x: -30,
                }}
                transition={{
                  duration: 0.8,
                }}
              >
                <Quote
                  className="mb-6 text-cyan-400"
                  size={30}
                />

                <p className="mb-8 font-serif text-lg leading-relaxed text-white/90 md:text-2xl">
                  "{testimonials[current].review}"
                </p>

                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonials[current].image}
                      alt={testimonials[current].name}
                      className="object-cover border rounded-full w-14 h-14 border-cyan-400/20"
                    />

                    <div>
                      <h4 className="font-medium text-white">
                        {testimonials[current].name}
                      </h4>

                      <p className="text-sm text-gray-400">
                        {testimonials[current].role}
                      </p>

                      <div className="flex mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            fill="currentColor"
                            className="text-cyan-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <button className="px-5 py-2 text-sm transition border rounded-full border-cyan-400/30 bg-cyan-400/10 text-cyan-300 hover:bg-cyan-400/20">
                    Read Full Story
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="flex items-center justify-center w-10 h-10 text-gray-400 border rounded-full border-white/10 bg-zinc-900 hover:text-white"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setCurrent(index)
                  }
                  className={`h-2 rounded-full transition-all duration-300 ${
                    current === index
                      ? "w-8 bg-cyan-400"
                      : "w-2 bg-gray-600"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="flex items-center justify-center w-10 h-10 text-gray-400 border rounded-full border-white/10 bg-zinc-900 hover:text-white"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

     <div className="mt-5">
       <Stats/>
     </div>
    </section>
    
  );
};

export default SuccessStory;

