import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const courseFeatures = [
  "Infection Control",
  "Safety in Medicine",
  "Anatomy and Physiology",
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



const CourseDetails = () => {
  const [activeLocation, setActiveLocation] = useState(null);

  

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
             <p className="mt-1 text-white/60">For a limited time only</p>
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
                Industry recognised CPD certificates
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

        <div className="flex justify-center mt-10">
  <Link
    to="/subscription-enroll"
    className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-black transition-all duration-300 bg-cyan-400 rounded-xl hover:bg-cyan-300 hover:scale-105"
  >
    Enroll Now
  </Link>
</div>
        </div>
      </div>
    </section>
  );
};

export default CourseDetails;