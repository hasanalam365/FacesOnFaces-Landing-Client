import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  GraduationCap,
  Stethoscope,
  Award,
  Rocket,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Enroll",
    description:
      "Choose your program and secure your place with a simple application process.",
    icon: <BookOpen size={14} />,
  },
  {
    id: 2,
    title: "Learn",
    description:
      "Immerse yourself in expert-led theory sessions and cutting-edge curriculum.",
    icon: <GraduationCap size={14} />,
  },
  {
    id: 3,
    title: "Practice",
    description:
      "Apply your knowledge in supervised clinical settings with real patients.",
    icon: <Stethoscope size={14} />,
  },
  {
    id: 4,
    title: "Get Certified",
    description:
      "Earn your internationally recognized certification upon completion.",
    icon: <Award size={14} />,
  },
  {
    id: 5,
    title: "Launch Career",
    description:
      "Step into the industry with confidence, backed by our career support team.",
    icon: <Rocket size={14} />,
  },
];

const LearningExperience = () => {
  return (
    <section className="py-24 overflow-hidden bg-black">
      <div className="px-6 mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-24 text-center"
        >
          <p className="text-[11px] tracking-[4px] uppercase text-cyan-400 mb-2">
            Your Journey
          </p>

          <h2 className="text-4xl font-light text-white md:text-5xl">
            Learning{" "}
            <span className="italic text-cyan-400">Experience</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
         
<div className="absolute top-0 bottom-0 left-3 md:left-1/2 md:-translate-x-1/2">
  <div className="w-[2px] h-full bg-cyan-400/60 shadow-[0_0_20px_#00eaff]" />
</div>
{steps.map((step, index) => {
  const isLeft = index % 2 === 0;

  return (
    <div
      key={step.id}
      className="relative min-h-[170px] md:min-h-[190px]"
    >
      {/* Timeline Dot */}
      <div className="absolute z-20 left-3 md:left-1/2 top-5 md:top-6 md:-translate-x-1/2">
        <div className="w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_15px_#00eaff]" />
      </div>

      {/* DESKTOP LEFT */}
      {isLeft && (
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            hidden md:block
            w-[320px]
            text-right
            mr-[calc(50%+90px)]
            ml-auto
          "
        >
          <div className="flex items-center justify-end gap-2 mb-3">
            <span className="text-[10px] tracking-[3px] uppercase text-cyan-400">
              STEP {step.id}
            </span>

           <motion.div
  animate={{
    y: [0, -4, 0],
    boxShadow: [
      "0 0 0px rgba(34,211,238,0.2)",
      "0 0 20px rgba(34,211,238,0.5)",
      "0 0 0px rgba(34,211,238,0.2)",
    ],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="flex items-center justify-center w-8 h-8 border rounded-lg border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
>
  {step.icon}
</motion.div>
          </div>

          <h3 className="mb-3 text-3xl font-light text-white">
            {step.title}
          </h3>

          <p className="text-sm leading-6 text-gray-400">
            {step.description}
          </p>
        </motion.div>
      )}

      {/* DESKTOP RIGHT */}
      {!isLeft && (
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="
            hidden md:block
            w-[320px]
            ml-[calc(50%+90px)]
          "
        >
          <div className="flex items-center gap-2 mb-3">
           <motion.div
  animate={{
    y: [0, -4, 0],
    boxShadow: [
      "0 0 0px rgba(34,211,238,0.2)",
      "0 0 20px rgba(34,211,238,0.5)",
      "0 0 0px rgba(34,211,238,0.2)",
    ],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="flex items-center justify-center w-8 h-8 border rounded-lg border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
>
  {step.icon}
</motion.div>

            <span className="text-[10px] tracking-[3px] uppercase text-cyan-400">
              STEP {step.id}
            </span>
          </div>

          <h3 className="mb-3 text-3xl font-light text-white">
            {step.title}
          </h3>

          <p className="text-sm leading-6 text-gray-400">
            {step.description}
          </p>
        </motion.div>
      )}

      {/* MOBILE VERSION */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="pl-12 md:hidden"
      >
        <div className="flex items-center gap-2 mb-3">
         <motion.div
  animate={{
    y: [0, -4, 0],
    boxShadow: [
      "0 0 0px rgba(34,211,238,0.2)",
      "0 0 20px rgba(34,211,238,0.5)",
      "0 0 0px rgba(34,211,238,0.2)",
    ],
  }}
  transition={{
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut",
  }}
  className="flex items-center justify-center w-8 h-8 border rounded-lg border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
>
  {step.icon}
</motion.div>

          <span className="text-[10px] tracking-[3px] uppercase text-cyan-400">
            STEP {step.id}
          </span>
        </div>

        <h3 className="mb-3 text-2xl font-light text-white">
          {step.title}
        </h3>

        <p className="text-sm leading-6 text-gray-400 max-w-[220px]">
          {step.description}
        </p>
      </motion.div>
    </div>
  );
})}
        </div>
      </div>
    </section>
  );
};

export default LearningExperience;