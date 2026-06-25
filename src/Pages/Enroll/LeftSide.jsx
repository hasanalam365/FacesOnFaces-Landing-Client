import { BookOpen, Calendar, ChevronDown, MapPin } from 'lucide-react'
import React from 'react'
import { useState } from 'react';
import { motion } from "framer-motion";

const courseFeatures = [
  "Infection Control",
  "Safety in Medicine",
  "Anatomy & Physiology Level 3",
  "Complications Management",
  "Health & Safety",
  "Skin Booster",
  "Lumi Eyes",
  "Polynucleotide",
  "Microneedling",
  "Fat Dissolver",
  "Vitamin B12",
  "Foundation Dermal Filler",
  "Foundation Anti-Wrinkle",
  "Use of Hyaluronidase",
];

const locations = [
  "London",
  "Upminster",
  "Edinburgh",
  "Belfast",
  
  "Dublin",
];

const courseSchedules = [
  {
    location: "London",
    dates: [
      "3rd–5th October",
      "7th–9th November",
    ],
  },
  {
    location: "Upminster",
    dates: [
      "17th–19th October",
    ],
  },
  {
    location: "Edinburgh",
    dates: [
      "21st–23rd November",
    ],
  },
  {
    location: "Belfast",
    dates: [
      "10th–12th October",
    ],
  },
  {
    location: "Glasgow",
    dates: [
      "28th–30th November",
    ],
  },
  {
    location: "Dublin",
    dates: [
      "31st Oct–3rd Nov",
    ],
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};


const LeftSide = () => {
 const [activeLocation, setActiveLocation] = useState(null);
    
  return (
   <div className="overflow-hidden border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">

            <img
              src="https://i.ibb.co.com/k6h526HM/faces3.jpg"
              alt="Course"
              className="object-cover w-full h-[350px]"
            />

            <div className="p-8">

              <span className="px-4 py-2 text-sm font-medium text-black rounded-full bg-cyan-400">
                14 Certificates Included
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white">
                14 Certificate Fast-Track Course
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-white/60">
                    Course Fee
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="line-through text-white/40">
                      £1,599
                    </span>

                    <span className="text-2xl font-bold text-cyan-400">
                      £1,099
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60">
                    Duration
                  </span>

                  <span className="text-white">
                    3 Day Intensive Training
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60">
                    Certifications
                  </span>

                  <span className="text-white">
                    14 Included
                  </span>
                </div>
              </div>

              {/* Course Includes */}
              <div className="mt-10">
                <h3 className="mb-5 text-xl font-semibold text-white">
                  Course Includes
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {courseFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]"
                    >
                      <BookOpen
                        size={16}
                        className="text-cyan-400"
                      />

                      <span className="text-sm text-white/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="mt-10">
                <h3 className="mb-5 text-xl font-semibold text-white">
                  Available Locations
                </h3>

                <div className="flex flex-wrap gap-3">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 border rounded-full bg-cyan-400/10 border-cyan-400/20"
                    >
                      <MapPin
                        size={14}
                        className="text-cyan-400"
                      />

                      <span className="text-sm text-white">
                        {location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Dates */}
              {/* Schedule */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUp}
  className="mt-16"
>
  <h3 className="mb-8 text-3xl font-bold text-center text-white">
    Upcoming Course Dates
  </h3>

  <div className="max-w-4xl mx-auto space-y-4">
    {courseSchedules.map((item, index) => (
      <div
        key={index}
        className="
          overflow-hidden
          border
          rounded-2xl
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-cyan-400/30
        "
      >
        {/* Header */}
        <button
          onClick={() =>
            setActiveLocation(
              activeLocation === index ? null : index
            )
          }
          className="flex items-center justify-between w-full px-6 py-5 text-left "
        >
          <div className="flex items-center gap-3">
            <MapPin
              size={20}
              className="text-cyan-400"
            />

            <span className="text-lg font-medium text-white">
              {item.location}
            </span>
          </div>

          <ChevronDown
            className={`text-cyan-400 transition-transform duration-300 ${
              activeLocation === index
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {/* Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            activeLocation === index
              ? "max-h-96"
              : "max-h-0"
          }`}
        >
          <div className="px-6 pb-5 space-y-3">
            {item.dates.map((date, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 border rounded-xl bg-cyan-400/5 border-cyan-400/10"
              >
                <Calendar
                  size={18}
                  className="text-cyan-400"
                />

                <span className="text-white">
                  {date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</motion.div>

            </div>
          </div>
  )
}

export default LeftSide
