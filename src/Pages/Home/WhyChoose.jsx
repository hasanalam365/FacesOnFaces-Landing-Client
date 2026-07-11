import React from "react";
import {
  Briefcase,
  ShieldCheck,
  MonitorPlay,
  GraduationCap,
  Globe,
  Rocket,
} from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Briefcase,
    title: "Industry Experts",
    description:
      "Learn from practitioners with 10+ years of clinical experience in aesthetics.",
  },
  {
    icon: GraduationCap,
    title: "Hands-On Training",
    description:
      "Real clinical practice with live patients from your very first module.",
  },
  {
    icon: ShieldCheck,
    title: "Lifetime Support",
    description:
      "Ongoing Lifetime Support and Complication Support.",
  },
  {
    icon: MonitorPlay,
    title: "Flexible Learning",
    description:
      "Hybrid programs with online theory and in-person practical sessions.",
  },
  {
    icon: Globe,
    title: "International Certification",
    description:
      "Globally recognised credentials accepted in over 50 countries.",
  },
  {
    icon: Rocket,
    title: "Career Guidance",
    description:
      "Dedicated support to help launch and grow your aesthetic practice.",
  },
];

const WhyChoose = () => {
  return (
    <section className="px-5 py-24 bg-black">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto mb-16 text-center"
        >
          <p className="mb-5 text-xs uppercase tracking-[4px] text-cyan-400">
            The Difference
          </p>

          <h2 className="mb-6 font-serif text-4xl leading-tight text-white md:text-5xl">
            Why Choose{" "}
            <span className="italic text-cyan-400">
              Faces On Faces
            </span>
          </h2>

          <p className="leading-relaxed text-gray-400">
            {/* Learn from experienced professionals through hands-on clinical
            training, internationally recognised certifications, and lifetime
            support designed to help you succeed in aesthetic medicine. */}
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -6,
                  scale: 1.02,
                }}
                className="p-6 transition-all duration-300 border group rounded-2xl border-white/10 bg-zinc-950 hover:border-cyan-400/30"
              >
                <div className="flex items-center justify-center mb-5 border h-11 w-11 rounded-xl border-cyan-400/20 bg-cyan-400/10">
                  <Icon
                    size={18}
                    className="text-cyan-400"
                  />
                </div>

                <h3 className="mb-3 text-lg font-medium text-white">
                  {item.title}
                </h3>

                <p className="text-sm leading-relaxed text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;