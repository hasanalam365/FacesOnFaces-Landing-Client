import React, { useState } from "react";
import {
  Award,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  ChevronDown,
} from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";


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
  "Chemical Skin Peels",
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

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

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


const ExploreCourses = () => {

      const navigate=useNavigate()
      const [activeLocation, setActiveLocation] = useState(null);
    
      const handleEnroll=()=>{
        navigate('/enroll')
      }
      const handleBackHome=()=>{
        navigate('/')
      }

  return (
   <section className="relative overflow-hidden bg-[#050505] py-24 px-4">
  {/* Background Glow */}
  <div className="absolute top-40 left-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full"></div>
  <div className="absolute bottom-20 right-0 w-[400px] h-[400px] bg-cyan-400/10 blur-[150px] rounded-full"></div>

  <div className="relative mx-auto max-w-7xl">
    {/* Heading */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="mb-16 text-center"
    >
      <span className="inline-flex items-center gap-2 px-5 py-2 text-sm border rounded-full border-cyan-400/20 bg-cyan-400/10 text-cyan-400">
        <Award size={16} />
        Featured Course
      </span>

      <h2 className="mt-6 text-4xl font-bold text-white md:text-6xl">
        14 Certificate
        <span className="text-cyan-400"> Fast-Track Course</span>
      </h2>

      <p className="max-w-3xl mx-auto mt-6 text-lg text-white/60">
        3 Day In-Person Course & Online Learning designed for beginners
        looking to start a successful career in aesthetics.
      </p>
    </motion.div>

    {/* Main Card */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="
      group
      overflow-hidden
      border
      border-white/10
      rounded-3xl
      bg-white/[0.03]
      backdrop-blur-xl
      transition-all
      duration-500
      hover:border-cyan-400/30
      hover:shadow-[0_0_60px_rgba(34,211,238,0.15)]
    "
    >
      <div className="grid lg:grid-cols-2">
        {/* Left Side */}
        <div className="relative overflow-hidden">
          <img
            src="https://i.ibb.co.com/mM4p59N/faces2.jpg"
            alt="Course"
            className="
            object-contain
            w-full
            h-full
            min-h-[500px]
            transition-transform
            duration-700
            group-hover:scale-105
          "
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>

          <div className="absolute bottom-8 left-8">
            <span className="px-4 py-2 text-sm font-medium text-black rounded-full bg-cyan-400">
              14 Certificates Included
            </span>
          </div>
        </div>

        {/* Right Side */}
        <div className="p-8 lg:p-12">
          {/* Pricing */}
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <span className="text-xl line-through text-white/40">
               £1,599
              </span>

              <span className="text-4xl font-bold text-cyan-400">
               £1,099
              </span>
            </div>

            <p className="mt-2 text-white/60">
              Secure your booking with a 25% deposit or pay in full.
            </p>
          </div>

          {/* Info */}
          <div className="flex flex-wrap gap-5 mb-8 text-white/70">
            <div className="flex items-center gap-2">
              <Clock size={18} />
              3 Day Intensive Training
            </div>

            <div className="flex items-center gap-2">
              <Award size={18} />
              14 Certifications
            </div>
          </div>

          {/* Features */}
          <h3 className="mb-5 text-2xl font-semibold text-white">
            Course Includes
          </h3>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid gap-3 mb-10 sm:grid-cols-2"
          >
            {courseFeatures.map((feature, index) => (
              <motion.div
                variants={fadeUp}
                key={index}
                className="flex items-center gap-3 p-3 transition-all duration-300 rounded-xl hover:bg-cyan-400/5 hover:translate-x-2"
              >
                <CheckCircle
                  size={18}
                  className="text-cyan-400"
                />

                <span className="text-white/80">
                  {feature}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Locations */}
          <h3 className="mb-5 text-2xl font-semibold text-white">
            Available Locations
          </h3>

          <div className="flex flex-wrap gap-3 mb-10">
            {locations.map((location, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-4 py-2 transition-all duration-300 border rounded-full border-cyan-400/20 bg-cyan-400/5 hover:scale-105 hover:bg-cyan-400/10 hover:border-cyan-400/40"
              >
                <MapPin
                  size={16}
                  className="text-cyan-400"
                />

                <span className="text-white">
                  {location}
                </span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
            onClick={handleEnroll}
              className="
              px-8
              py-4
              font-semibold
              text-black
              transition-all
              duration-300
              rounded-full
              bg-cyan-400
              hover:bg-cyan-300
              hover:scale-105
              hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]
            "
            >
              Enroll Now
            </button>

            <button onClick={handleBackHome} className="px-8 py-4 text-white transition-all duration-300 border rounded-full border-white/15 hover:border-cyan-400 hover:text-cyan-400 hover:scale-105">
              Back Home
            </button>
          </div>
        </div>
      </div>
    </motion.div>

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
</section>
  );
};

export default ExploreCourses;