import { BookOpen, Calendar, ChevronDown, MapPin, X } from 'lucide-react'
import React, { useState } from 'react'

const courseFeatures = [
  {
    title: "Infection Control",
    description:"In this course, students will master core infection control principles tailored to aesthetic practice, ensuring client safety, preventing complications, and maintaining a sterile environment every step of the way."
  },
  {
    title: "Safety in Medicine",
    description: "In this section, students will learn not only the proper storage and handling of all clinical aesthetic products, like Botox or fillers, but also the precise methods of administering each one safely. This ensures every product is applied with care, minimizing risk and prioritizing patient well-being."
  },
  {
    title: "Anatomy and Physiology",
    description:"In this course, we ensure every student masters facial anatomy, understanding the underlying structures critical for safe, effective treatments. We guide them through key anatomical landmarks, and at the end, they’ll demonstrate their knowledge in both a written and practical anatomy test, ensuring confidence and precision in their future procedures."
  },
  {
    title: "Complications Management",
    description:"In our Complications Management module, we empower students to first prevent complications through expert technique and risk assessment. However, should an issue arise, we provide in-depth training on swift, effective resolution. From recognizing early signs to hands-on correction strategies, students leave confident in prevention and adept complication care. And if further assistance is ever needed, students are more than welcome to return for additional support."
  },
  {
    title: "Health & Safety",
    description:"In our Health and Safety training, we cover the essential standards every aesthetic practitioner must uphold. From maintaining a safe clinic environment to ensuring proper hygiene, students will learn how to protect both themselves and their clients at all times. We emphasize practical safety protocols and regulatory compliance, ensuring a secure and professional practice every step of the way."
  },
  {
    title: "Skin Booster",
    description:"A skin booster is a revitalizing injectable treatment designed to deeply hydrate and improve facial skin quality from within. In this course, students will learn what makes skin boosters unique and how to safely administer them, focusing solely on facial application. They’ll gain hands-on experience in correct product placement, dosage, and technique, ensuring glowing, natural results every time."
  },
  {
    title: "Lumi Eyes",
    description:"Lumi Eyes is a specialized under-eye treatment designed to rejuvenate and brighten the delicate eye area. In this course, we teach students the unique properties of Lumi Eyes and how to administer it safely. They’ll learn precise injection techniques tailored to the eye region, ensuring natural, refreshed, and safe results for every client."
  },
  {
    title: "Polynucleotide",
    description:"Polynucleotide is a regenerative treatment that stimulates tissue repair and improves skin quality. In this course, students will learn the science behind polynucleotides and how to safely apply them. We guide students on precise facial injection methods, ensuring safe, rejuvenated, and natural outcomes."
  },
  {
    title: "Microneedling",
    description:"Microneedling is a minimally invasive facial procedure that uses tiny needles to stimulate collagen production and rejuvenate the skin. In our course, students will learn how microneedling improves skin texture, reduces fine lines, and boosts overall radiance. We focus on facial application only, teaching students safe techniques, proper depth, and hygienic protocols, ensuring optimal results and client safety every time."
  },
  {
    title: "Fat Dissolver",
    description:"In this course, we focus on fat dissolving techniques tailored to common areas like the chin, jawline, underarms, and belly. We teach you how to safely and effectively treat these areas, ensuring natural-looking results. Once you complete the course, you’ll be ready to use any fat dissolver confidently, as long as you carefully follow each product’s label and instructions."
  },
  {
    title: "Vitamin B12",
    description:"Vitamin B12 is a prescription-only medication, vital for energy and overall wellness. In our course, we guide students on how to collaborate with a prescriber, ensuring all treatments are fully compliant with regulations. Students will learn the benefits of B12, including its role in boosting energy and metabolism, and master safe injection techniques at appropriate points, ensuring a confident, compliant practice."
  },
  {
    title: "Foundation Dermal Filler",
    description:"In our Foundation Dermal Filler, we set you up for success in three key areas: lips, nasolabial folds, and marionette lines. You'll learn to craft beautifully balanced lips using careful volumizing techniques. We guide you step-by-step to soften nasolabial lines, restoring a youthful look, and refine marionette lines for a harmonious lower face. With hands-on practice and expert guidance, you’ll leave confident in delivering natural, stunning results."
  },
  {
    title: "Foundation Anti-Wrinkle",
    description:"Our Foundation Anti-Wrinkle course prepares you for safe, effective treatments in three key areas: forehead, frown lines, and crow’s feet. As a prescription-only treatment, we teach you how to work with a prescriber and conduct required face-to-face consultations. We emphasize proper local protocols and teach you the correct dosage, mixture ratios, and precise injection points,  ensuring every client receives the right balance for a natural, refreshed appearance. With hands-on guidance, you'll feel confident and compliant from start to finish."
  },
  {
    title: "Use of Hyaluronidase",
    description:"In our Use of Hyaluronidase training, we equip you with the essential skill of safely dissolving hyaluronic acid fillers. You’ll learn both emergency dissolving, in cases of complications, and elective dissolving to fine-tune results. We teach correct dosage, precise techniques, and safety protocols, ensuring you can confidently handle any situation. By mastering both proactive and corrective applications, you’ll ensure safe, confident, and tailored results for your clients."
  },
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

  const [openIndex, setOpenIndex] = useState(null);

const toggleAccordion = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

const [selectedCourse, setSelectedCourse] = useState(null);

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
      <div className="grid gap-3 sm:grid-cols-2">
  {courseFeatures.map((feature, index) => (
    <button
      key={index}
      onClick={() => setSelectedCourse(feature)}
      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/[0.03] p-4 text-left transition-all duration-300 hover:border-cyan-400/40 hover:bg-cyan-400/5"
    >
      <div className="flex items-center gap-3">
        <BookOpen
          size={18}
          className="text-cyan-400"
        />

        <span className="font-medium text-white">
          {feature.title}
        </span>
      </div>

      <ChevronDown
        size={18}
        className="transition-transform duration-300 text-cyan-400 group-hover:rotate-180"
      />
    </button>
  ))}
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
{selectedCourse && (
  <div
    onClick={() => setSelectedCourse(null)}
    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/75 backdrop-blur-md p-4"
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl border border-cyan-400/20 bg-[#0f1519] p-8 shadow-[0_0_60px_rgba(34,211,238,0.18)] animate-in fade-in zoom-in duration-300"
    >
      {/* Close Button */}
      <button
        onClick={() => setSelectedCourse(null)}
        className="absolute flex items-center justify-center w-10 h-10 text-white transition-all duration-300 rounded-full right-5 top-5 bg-white/5 hover:bg-cyan-400 hover:text-black"
      >
        <X size={20} />
      </button>

      {/* Header */}
      <div className="flex items-center gap-5">
        <div className="flex items-center justify-center w-16 h-16 text-black shadow-lg rounded-2xl bg-cyan-400">
          <BookOpen size={28} />
        </div>

        <div>
          <span className="text-sm uppercase tracking-[3px] text-cyan-400">
            Course Module
          </span>

          <h2 className="mt-1 text-3xl font-bold text-white">
            {selectedCourse.title}
          </h2>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px my-6 bg-gradient-to-r from-cyan-400/50 via-cyan-400/10 to-transparent" />

      {/* Description */}
      <p className="leading-8 text-white/70">
        {selectedCourse.description}
      </p>

      {/* Footer */}
      <div className="flex justify-end mt-8">
        <button
          onClick={() => setSelectedCourse(null)}
          className="px-6 py-3 font-semibold text-black transition-all duration-300 rounded-xl bg-cyan-400 hover:scale-105 hover:bg-cyan-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
      </div>
      
    </div>
  );
};

export default LeftSide;