import React, { useState } from "react";
import { BookOpen, ChevronDown, MessageCircle,ArrowRight, Info, ArrowDownNarrowWide } from "lucide-react";
import { Link } from "react-router-dom";
import {  X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AdvisorModal from "../../Components/AdvisorModal";




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



const CourseDetails = () => {

  const [openIndex, setOpenIndex] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
 const [advisorModalOpen, setAdvisorModalOpen] = useState(false);
 const navigate = useNavigate();

const toggleAccordion = (index) => {
  setOpenIndex(openIndex === index ? null : index);
};

  

const handleEnroll = () => {
  navigate("/enroll");
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

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
  {courseFeatures.map((feature, index) => (
  <button
    key={index}
    onClick={() => setSelectedCourse(feature)}
    className="group relative flex  items-center gap-3 rounded-2xl border border-cyan-400/10 bg-white/[0.03] p-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400 hover:bg-cyan-400/5 hover:shadow-[0_0_25px_rgba(34,211,238,.12)] cursor-pointer"
  >
    {/* Top row: icon + "tap" hint */}
    <div className="flex items-center w-full gap-4">
  {/* Left Icon */}
  <div className="flex items-center justify-center border w-11 h-11 rounded-xl bg-cyan-400/10 border-cyan-400/20 shrink-0">
    <motion.div
  animate={{
    rotate: [0, -6, 0, 6, 0],
    scale: [1, 1.05, 1],
  }}
  transition={{
    duration: 2,
    repeat: Infinity,
    ease: "easeInOut",
  }}
>
  <BookOpen size={20} className="text-cyan-400" />
</motion.div>
  </div>

  {/* Title */}
  <h4 className="flex-1 text-[17px] font-semibold text-white leading-snug transition-colors duration-300 group-hover:text-cyan-300">
    {feature.title}
  </h4>

  {/* Arrow */}
  <motion.div
  animate={{
    y: [0, -5, 0],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    repeatType: "mirror",
    ease: "easeInOut",
  }}
  className="flex items-center justify-center w-8 shrink-0"
>
  <ChevronDown
    size={20}
    className="text-white transition-colors duration-300 group-hover:text-cyan-400"
  />
</motion.div>
</div>
  </button>
))}
  </div>
</div>

      <div className="flex flex-col items-center justify-center gap-5 mt-12 sm:flex-row">

  {/* Enroll */}
  <motion.button
    onClick={handleEnroll}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center gap-3 px-8 py-4 font-medium text-black transition-all rounded-full group bg-cyan-400 hover:bg-cyan-300"
  >
    Enroll Now

    <ArrowRight
      size={18}
      className="transition-transform duration-300 group-hover:translate-x-1"
    />
  </motion.button>

  {/* Talk To Advisor */}
  <motion.button
    onClick={() => setAdvisorModalOpen(true)}
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    className="flex items-center gap-3 px-8 py-4 font-medium text-white transition-all border rounded-full group border-white/10 bg-white/5 backdrop-blur-sm hover:border-cyan-400/40 hover:bg-white/10"
  >
    <MessageCircle
      size={18}
      className="text-cyan-400"
    />

    Talk To Advisor
  </motion.button>

</div>
        </div>
      </div>
      {selectedCourse && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
    onClick={() => setSelectedCourse(null)}
  >
    <div
      onClick={(e) => e.stopPropagation()}
      className="relative w-full max-w-2xl rounded-3xl border border-cyan-400/20 bg-[#0f1519] p-8 shadow-[0_0_50px_rgba(34,211,238,.15)]"
    >
      {/* Close */}
      <button
        onClick={() => setSelectedCourse(null)}
        className="absolute flex items-center justify-center w-10 h-10 text-white transition rounded-full right-5 top-5 bg-white/5 hover:bg-cyan-400 hover:text-black"
      >
        <X size={20} />
      </button>

      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center justify-center text-black h-14 w-14 rounded-2xl bg-cyan-400">
          <BookOpen size={24} />
        </div>

        <h2 className="pr-10 text-3xl font-bold text-white">
          {selectedCourse.title}
        </h2>
      </div>

      <div className="h-px mb-6 bg-cyan-400/10" />

      <p className="leading-8 text-white/70">
        {selectedCourse.description}
      </p>

      <div className="flex justify-end mt-8">
        <button
          onClick={() => setSelectedCourse(null)}
          className="px-6 py-3 font-semibold text-black transition rounded-xl bg-cyan-400 hover:bg-cyan-300"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

<AdvisorModal
  open={advisorModalOpen}
  onClose={() => setAdvisorModalOpen(false)}
/>
    </section>
  );
};

export default CourseDetails;