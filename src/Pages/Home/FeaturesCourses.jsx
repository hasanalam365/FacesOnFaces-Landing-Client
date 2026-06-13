import React from "react";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const courses = [
  {
    id: 1,
    title: "Foundation Aesthetics",
    image:
      "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=1200&q=80",
    description:
      "Master the fundamentals of aesthetic treatments, facial contouring and client consultation.",
  },
  {
    id: 2,
    title: "Advanced Injectables",
    image:
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&q=80",
    description:
      "Specialised training in dermal fillers and advanced facial sculpting techniques.",
  },
  {
    id: 3,
    title: "Skin Science & Treatments",
    image:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&q=80",
    description:
      "Deep understanding of skin anatomy, rejuvenation and corrective procedures.",
  },
  {
    id: 4,
    title: "Clinical Practice Mastery",
    image:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=1200&q=80",
    description:
      "Hands-on clinical workflow, patient care and expert consultation skills.",
  },
];

const FeaturesCourses = () => {
  return (
    <section className="px-5 py-24 bg-black">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="uppercase tracking-[4px] text-cyan-400 text-sm mb-3">
            Professional Learning
          </p>

          <h2 className="mb-4 font-serif text-4xl text-white md:text-5xl">
            Featured Courses
          </h2>

          <p className="max-w-2xl mx-auto text-gray-400">
            Industry-leading programs designed to elevate your expertise,
            confidence and professional growth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid gap-6 lg:grid-cols-2">
          {courses.map((course, index) => (
            <motion.div
              key={course.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
              className="relative overflow-hidden border group rounded-2xl border-white/10 bg-zinc-950"
            >
              {/* Image */}
              <div className="h-[260px] overflow-hidden">
                <img
                  src={course.image}
                  alt={course.title}
                  className="object-cover w-full h-full transition duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 z-10 p-8">
                <div className="inline-block px-3 py-1 mb-4 text-xs tracking-widest uppercase border rounded-full border-cyan-400/30 bg-cyan-400/10 text-cyan-300">
                  Featured
                </div>

                <h3 className="mb-3 font-serif text-2xl text-white">
                  {course.title}
                </h3>

                <p className="max-w-md mb-5 text-sm leading-relaxed text-gray-300">
                  {course.description}
                </p>

                <button className="flex items-center gap-2 font-medium transition-all duration-300 text-cyan-400 group-hover:gap-4">
                  Learn More
                  <ArrowRight size={18} />
                </button>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 transition duration-500 opacity-0 group-hover:opacity-100 bg-cyan-400/5" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCourses;