import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, ArrowDownAZ, ArrowUpNarrowWide, ArrowDown01, ArrowUp } from "lucide-react";

const faqs = [
  {
    question: "What qualifications do I need to enroll?",
    answer:
      "Our Foundation program is open to anyone with a passion for aesthetics. Advanced courses may require prior medical or clinical training. Our admissions team will guide you through the requirements for your chosen program.",
  },
  {
    question: "How long are the training programs?",
    answer:
      "Programs range from 6 to 12 weeks depending on the specialization. We offer both full-time intensive and part-time flexible schedules to accommodate your lifestyle.",
  },
  {
    question: "Are the certifications internationally recognized?",
    answer:
      "Yes. All Luminary certifications are accredited by leading international aesthetic medicine bodies and recognized in over 50 countries worldwide.",
  },
  {
    question: "Do you offer financing or payment plans?",
    answer:
      "We offer flexible payment plans and partnerships with education financing providers. Contact our admissions team to discuss the options that work best for you.",
  },
  {
    question: "What kind of career support do you provide?",
    answer:
      "From resume building to interview prep, clinic placement to business mentorship — our dedicated career services team supports you from enrollment through your first year of practice.",
  },
  {
    question: "Can I visit the academy before enrolling?",
    answer:
      "Absolutely. We host open days monthly and offer private tours by appointment. You can also attend a free introductory masterclass to experience our teaching style.",
  },
];

const FAQ = () => {
  const [active, setActive] = useState(0);

  const toggleFAQ = (index) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="py-24 bg-black">
      <div className="max-w-4xl px-4 mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="text-cyan-400 text-[11px] tracking-[4px] uppercase mb-3">
            Questions
          </p>

          <h2 className="text-4xl font-light text-white md:text-5xl">
            Frequently{" "}
            <span className="italic text-cyan-400">
              Asked
            </span>
          </h2>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = active === index;

            return (
              <motion.div
                key={index}
                layout
                transition={{
                  duration: 0.35,
                }}
                className={`rounded-xl border overflow-hidden
                ${
                  isOpen
                    ? "border-cyan-400/40 bg-[#071112]"
                    : "border-white/10 bg-[#050505]"
                }`}
              >
                <button
                  onClick={() =>
                    toggleFAQ(index)
                  }
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                >
                  <h3 className="pr-4 text-sm font-medium text-white md:text-base">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isOpen ? 0 : 180,
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className="text-cyan-400"
                  >
                    {isOpen ? (
                      <ArrowUp size={18} />
                    ) : (
                      <ArrowUp size={18} />
                    )}
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    >
                      <div className="px-6 pb-6">
                        <p className="text-sm leading-7 text-gray-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQ;