import React, { useState } from "react";
import { BookOpen, Calendar, MapPin, X } from "lucide-react";

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

const courseSchedules = [
  {
    location: "London",
    dates: ["3rd–5th October", "7th–9th November"],
  },
  {
    location: "Upminster",
    dates: ["17th–19th October"],
  },
  {
    location: "Edinburgh",
    dates: ["21st–23rd November"],
  },
  {
    location: "Belfast",
    dates: ["10th–12th October"],
  },
  {
    location: "Glasgow",
    dates: ["28th–30th November"],
  },
  {
    location: "Dublin",
    dates: ["31st Oct–3rd Nov"],
  },
];

const CourseDetails = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  const handleLocationClick = (locationName) => {
    const found = courseSchedules.find(
      (s) => s.location === locationName
    );

    if (!found) return;

    setActiveLocation(
      activeLocation?.location === locationName ? null : found
    );
  };

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto overflow-hidden border shadow-2xl rounded-3xl border-cyan-400/20 bg-[#0f1519]">

        <div className="p-6 lg:p-10">

          {/* Header */}
          <div className="pb-8 mb-10 border-b border-cyan-400/10">
            <span className="inline-block px-4 py-2 text-sm font-medium text-black rounded-full bg-cyan-400">
              14 Certificates Included
            </span>

            <h2 className="mt-5 text-4xl font-bold text-white">
              14 Certificate Fast-Track Course
            </h2>

            <p className="max-w-3xl mt-4 leading-relaxed text-white/60">
              Master the UK's most in-demand aesthetic treatments through
              intensive hands-on practical training. Build your confidence,
              gain industry-recognised certifications, and start your
              aesthetics career faster.
            </p>
          </div>

          {/* Course Info */}
          <div className="grid gap-6 mb-12 md:grid-cols-3">

            <div className="p-6 border rounded-2xl border-cyan-400/20 bg-white/[0.03]">
              <p className="text-sm text-white/50">
                Course Fee
              </p>

              <div className="flex items-center gap-3 mt-3">
                <span className="text-lg line-through text-white/30">
                  £1,599
                </span>

                <span className="text-3xl font-bold text-cyan-400">
                  £1,099
                </span>
              </div>
            </div>

            <div className="p-6 border rounded-2xl border-cyan-400/20 bg-white/[0.03]">
              <p className="text-sm text-white/50">
                Duration
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                3 Days
              </h3>

              <p className="mt-1 text-white/60">
                Intensive Practical Training
              </p>
            </div>

            <div className="p-6 border rounded-2xl border-cyan-400/20 bg-white/[0.03]">
              <p className="text-sm text-white/50">
                Certifications
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-white">
                14 Included
              </h3>

              <p className="mt-1 text-white/60">
                Industry Recognised Certificates
              </p>
            </div>

          </div>

          {/* Course Includes */}
          <div className="mb-12">
            <h3 className="mb-6 text-2xl font-semibold text-white">
              Course Includes
            </h3>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {courseFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-4 transition-all border rounded-xl border-cyan-400/10 bg-white/[0.03] hover:border-cyan-400/30 hover:bg-cyan-400/5"
                >
                  <BookOpen
                    size={18}
                    className="text-cyan-400"
                  />

                  <span className="text-white/90">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="mb-2 text-2xl font-semibold text-white">
              Available Locations
            </h3>

            <p className="mb-6 text-white/50">
              Select a location to view upcoming course dates.
            </p>

            <div className="flex flex-wrap gap-3">

              {courseSchedules.map((item, index) => {
                const isActive =
                  activeLocation?.location === item.location;

                return (
                  <button
                    key={index}
                    onClick={() =>
                      handleLocationClick(item.location)
                    }
                    className={`flex items-center gap-2 px-5 py-3 rounded-full border transition-all duration-300
                    ${
                      isActive
                        ? "bg-cyan-400/20 border-cyan-400 text-white"
                        : "border-cyan-400/20 bg-white/[0.03] hover:bg-cyan-400/10 hover:border-cyan-400/50 text-white"
                    }`}
                  >
                    <MapPin
                      size={16}
                      className="text-cyan-400"
                    />

                    {item.location}
                  </button>
                );
              })}
            </div>

            {activeLocation && (
              <div className="p-6 mt-6 border rounded-2xl border-cyan-400/20 bg-cyan-400/5">

                <div className="flex items-center justify-between pb-4 mb-5 border-b border-cyan-400/10">

                  <div className="flex items-center gap-2">
                    <MapPin
                      size={18}
                      className="text-cyan-400"
                    />

                    <h4 className="text-lg font-semibold text-white">
                      {activeLocation.location}
                    </h4>

                    <span className="text-white/40">
                      Upcoming Dates
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      setActiveLocation(null)
                    }
                    className="transition text-white/50 hover:text-white"
                  >
                    <X size={18} />
                  </button>

                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  {activeLocation.dates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 border rounded-xl border-cyan-400/10 bg-white/[0.03]"
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
            )}

          </div>

        </div>
      </div>
    </section>
  );
};

export default CourseDetails;