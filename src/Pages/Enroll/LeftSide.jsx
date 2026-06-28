import { BookOpen, Calendar, ChevronDown, MapPin, X } from 'lucide-react'
import React, { useState } from 'react'

const courseFeatures = [
  "Infection Control",
  "Safety in Medicine",
  "Anatomy & Physiology",
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
    location: "Dublin",
    dates: [
      "31st Oct–3rd Nov",
    ],
  },
];

const LeftSide = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  const handleLocationClick = (locationName) => {
    const found = courseSchedules.find((s) => s.location === locationName);
    if (!found) return;
    setActiveLocation(activeLocation?.location === locationName ? null : found);
  };

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
            <span className="text-white/60">Course Fee</span>
            <div className="flex items-center gap-3">
              <span className="line-through text-white/40">£1,599</span>
              <span className="text-2xl font-bold text-cyan-400">£1,099</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/60">Duration</span>
            <span className="text-white">3 Day Intensive Training</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-white/60">Certifications</span>
            <span className="text-white">14 Included</span>
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
                <BookOpen size={16} className="text-cyan-400" />
                <span className="text-sm text-white/80">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Locations */}
        <div className="mt-10">
          <h3 className="mb-2 text-xl font-semibold text-white">
            Available Locations
          </h3>
          <p className="mb-5 text-sm text-white/40">Click a location to see available dates</p>

          <div className="flex flex-wrap gap-3">
            {courseSchedules.map((item, index) => {
              const isActive = activeLocation?.location === item.location;
              return (
                <button
                  key={index}
                  onClick={() => handleLocationClick(item.location)}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-full transition-all duration-200 cursor-pointer
                    ${isActive
                      ? "bg-cyan-400/25 border-cyan-600 text-white"
                      : "bg-cyan-400/10 border-cyan-400/20 text-white hover:bg-cyan-400/20 hover:border-cyan-400/40"
                    }`}
                >
                  <MapPin size={14} className={isActive ? "text-cyan-400" : "text-cyan-400"} />
                  <span className="text-sm">{item.location}</span>
                </button>
              );
            })}
          </div>

          {/* Dates Dropdown */}
          {activeLocation && (
            <div className="mt-4 overflow-hidden border rounded-2xl border-cyan-400/20 bg-cyan-400/5 backdrop-blur-xl">
              <div className="flex items-center justify-between px-5 py-4 border-b border-cyan-400/10">
                <div className="flex items-center gap-2">
                  <MapPin size={16} className="text-cyan-400" />
                  <span className="font-medium text-white">{activeLocation.location}</span>
                  <span className="text-sm text-white/40">— Upcoming Dates</span>
                </div>
                <button
                  onClick={() => setActiveLocation(null)}
                  className="transition-colors text-white/40 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-4 space-y-3">
                {activeLocation.dates.map((date, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 p-4 border rounded-xl bg-white/[0.03] border-white/10"
                  >
                    <Calendar size={16} className="text-cyan-400" />
                    <span className="text-white">{date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default LeftSide;