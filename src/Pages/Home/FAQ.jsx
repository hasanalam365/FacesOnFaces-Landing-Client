import React, { useState, useRef, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, Minus, Plus } from "lucide-react";

// Height (in px) of your site's fixed/sticky top navbar (the "FACES" bar
// that stays pinned while scrolling). scrollIntoView aligns an element's
// top edge to the very top of the viewport by default - which places it
// right behind/under a fixed navbar. This offset tells the scroll to stop
// short by that many pixels instead, so the category title lands just
// below the navbar, fully visible.
//
// IMPORTANT: set this to your actual navbar's real rendered height
// (check it in DevTools - element inspector - on the live page). If the
// title still lands slightly under the navbar, increase this number a
// little; if it stops too far below, decrease it.
const STICKY_HEADER_OFFSET = 90;

const faqData = [
  {
    category: "General",
    questions: [
      {
        q: "What is a CPD course?",
        a: "A CPD (Continuing Professional Development) course is a structured training programme designed to help professionals enhance their skills, remain up to date within their industry, and continue their professional development. In aesthetics, CPD training ensures practitioners maintain high standards of knowledge, safety and clinical practice.",
      },
      {
        q: "Who is this course suitable for?",
        a: "This course is suitable for non healthcare professionals and healthcare professionals who are looking to begin a career in aesthetics. Whether you're completely new or looking to expand your knowledge, this course provides the perfect foundation.",
      },
      {
        q: "Is the course CPD accredited?",
        a: "Yes. This course is fully CPD accredited, meaning it meets recognised educational standards and contributes towards your Continuing Professional Development.",
      },
    ],
  },

  {
    category: "Eligibility",
    questions: [
      {
        q: "Do I need any previous experience?",
        a: "No. No previous experience is required. This course has been designed for complete beginners as well as those looking to develop their existing knowledge.",
      },
      {
        q: "Is this course suitable for beginners?",
        a: "Absolutely. Our Foundation Aesthetics Course has been designed specifically for beginners. We'll guide you step-by-step throughout your training to help build your confidence and practical skills.",
      },
      {
        q: "Do I need to be a healthcare professional?",
        a: "No. You do not need to be a healthcare professional to enrol on this course.",
      },
      {
        q: "What qualifications do I need?",
        a: "There are no formal qualifications required. If you have an interest in aesthetics and are committed to learning safely and professionally, you're welcome to join.",
      },
    ],
  },

  {
    category: "Course Delivery",
    questions: [
      {
        q: "Is the course online or in person?",
        a: "The course is delivered over three days of face-to-face practical training. Prior to attending, you'll receive comprehensive online learning materials and manuals via email to complete your pre-course revision.",
      },
      {
        q: "How long does the course take?",
        a: "The practical training takes place over three consecutive days. We recommend allowing approximately 2–3 weeks beforehand to complete your pre-course study and revision. Should you require additional support after the course, you're welcome to return and attend the practical training again at no additional training cost until you feel confident.",
      },
      {
        q: "Is the course self-paced or live?",
        a: "Your pre-course revision is completed at your own pace, allowing you to study around your schedule. Throughout this period, our team remains available to answer any questions you may have. The practical element is delivered live over three days in the classroom with your trainer.",
      },
      {
        q: "Will there be practical demonstrations?",
        a: "Yes. Days 2 and 3 are dedicated to live practical training where you'll work on live models under full supervision.",
      },
      {
        q: "Can I ask questions during the course?",
        a: "Absolutely. Our training is highly interactive, and you're encouraged to ask as many questions as you like throughout your training. Your trainer will be available throughout the course to support you.",
      },
    ],
  },

  {
    category: "Learning Outcomes",
    questions: [
      {
        q: "What will I learn?",
        a: `You'll gain a solid foundation in aesthetics including:

• Anatomy & Physiology
• Infection Control
• Safety in Medicine
• Complication Management
• Health and Safety
• Skin Booster
• Lumi Eyes
• Polynucleotide
• Microneedling
• Fat Dissolving Injections
• Vitamins B12
• Foundation Dermal Filler
• Foundation Anti-Wrinkle
• Use of Hyaluronidase`,
      },
      {
        q: "Will I be able to perform treatments after completing the course?",
        a: "Yes. Once you have successfully completed the course and obtained the appropriate insurance, you'll be able to offer all of the treatments covered during your training.",
      },
      {
        q: "Does this course include hands-on training?",
        a: "Yes. Days 2 and 3 are entirely practical, giving you hands-on experience working on live models under trainer supervision.",
      },
    ],
  },

  {
    category: "Certification",
    questions: [
      {
        q: "Is the certificate recognised?",
        a: "Yes. Our CPD certificate is internationally recognised. However, you must always ensure you comply with the regulations and licensing requirements within the country you intend to practise.",
      },
      {
        q: "When will I receive my certificate?",
        a: "You'll receive a Course Completion Certificate on the final day of your training. Your official CPD Certificate will then be issued within approximately seven days once your assessments have been marked and verified.",
      },
      {
        q: "Does my certificate expire?",
        a: "No. Your CPD certificate does not expire.",
      },
    ],
  },

  {
    category: "Booking & Payments",
    questions: [
      {
        q: "How much does the course cost?",
        a: "The course is currently available for £1,099, reduced from £1,599 for a limited time only.",
      },
      {
        q: "Are payment plans available?",
        a: `Yes. We work with four finance providers:

• Klarna
• Clearpay
• Plim
• Payl8r

We also offer a subscription payment option. Please contact our team for further information regarding this package.`,
      },
      {
        q: "Is there a refund policy?",
        a: "Yes. We operate a 14-day cooling-off period in line with UK consumer regulations. However, if your course begins within this period, your right to cancel and receive a refund may no longer apply.",
      },
      {
        q: "Can I transfer my booking?",
        a: "Yes. Your first course transfer is completely free of charge. Any additional date changes may be subject to a 25% administration fee.",
      },
    ],
  },

  {
    category: "Aftercare & Ongoing Support",
    questions: [
      {
        q: "Will I have access to the course materials after training?",
        a: "Yes. Once your manuals and learning resources have been sent to you, they're yours to keep permanently.",
      },
      {
        q: "Do you provide ongoing support?",
        a: "Absolutely. Every student receives lifetime support. If you ever require additional guidance, you're welcome to return with your own models for further assessment and supervision.",
      },
      {
        q: "Can I contact my trainer after the course?",
        a: "Yes. You'll be added to a dedicated WhatsApp support group with your trainer and fellow students. You'll be able to ask questions at any time. If your trainer is unavailable, another experienced trainer will always be available to assist you.",
      },
      {
        q: "Are there advanced courses available?",
        a: "Yes. Once you've completed the Foundation Course, you'll have access to a wide range of advanced aesthetic training courses. Your trainer or course advisor will be happy to discuss the best progression pathway for your career.",
      },
      {
        q: "How do I maintain my competency?",
        a: "We recommend practising regularly, continuing your CPD education and attending advanced training. If you feel you need additional support at any stage, you're always welcome to return with your own models for further supervision and assessment.",
      },
    ],
  },
];

const FAQ = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState({});
  const categoryRefs = useRef([]);

  // WHY THIS IS DIFFERENT FROM THE scrollIntoView WE REMOVED EARLIER:
  // Last time, scrollIntoView raced against a live height animation (fired via
  // setTimeout, while Framer was still mid-transition) - two independent
  // animations fighting over scroll position at once, which is what actually
  // caused the jump.
  //
  // There is no animation left now. Opening/closing a category is a single,
  // instant DOM change. So the real bug here is plain and simple: closing the
  // previously-open category (which sits above the one you just tapped)
  // instantly removes its height, so everything below - including the
  // category you just opened - shifts upward. That's why it looks like the
  // page "jumps up", and why the newly-revealed questions end up below the
  // fold, needing a manual scroll.
  //
  // useLayoutEffect runs synchronously after the DOM has updated but before
  // the browser paints, so this scroll correction happens in the very same
  // frame as the open/close - no delay, no timer, nothing to race against.
  useLayoutEffect(() => {
    if (openCategory === null) return;
    const el = categoryRefs.current[openCategory];
    if (!el) return;

    el.scrollIntoView({ behavior: "auto", block: "start" });
  }, [openCategory]);

  const toggleCategory = (index) => {
    const isOpening = openCategory !== index;
    setOpenCategory(isOpening ? index : null);

    if (isOpening) {
      setOpenQuestion({});
    }
  };

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestion((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    // overflow-anchor: none on the whole section opts the entire subtree out of
    // the browser's native "scroll anchoring" feature (the thing that tries to
    // auto-compensate scroll position when off-screen content resizes). It's kept
    // here as defense-in-depth even though removing scrollIntoView was the real fix.
    <section
      className="relative overflow-hidden bg-[#050816] py-24"
      style={{ overflowAnchor: "none" }}
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-cyan-400/10 blur-[120px]" />

      <div className="relative z-10 max-w-5xl px-4 mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-[11px] uppercase tracking-[5px] text-cyan-400">
            Frequently Asked Questions
          </p>

          <h2 className="font-light leading-tight text-white">
            <span className="block text-4xl md:text-6xl">
              Everything You Need
            </span>

            <span className="block text-4xl italic md:text-6xl text-cyan-400">
              To Know
            </span>
          </h2>

          <p className="max-w-2xl mx-auto mt-6 leading-8 text-gray-400">
            Find answers to the most common questions about our CPD accredited
            Foundation Aesthetics Course.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-5" style={{ overflowAnchor: "none" }}>
          {faqData.map((section, index) => (
            <motion.div
              key={index}
              ref={(el) => (categoryRefs.current[index] = el)}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              // overflow-anchor: none on each card ensures none of these
              // individually-resizing boxes can ever be picked as a scroll
              // anchor node, on browsers where subtree opt-out from an
              // ancestor is applied inconsistently to elements added later.
              // scroll-margin-top tells scrollIntoView to leave room for the
              // fixed navbar instead of scrolling this card's top edge all
              // the way to the very top of the viewport (where it would end
              // up hidden behind the navbar).
              style={{ overflowAnchor: "none", scrollMarginTop: STICKY_HEADER_OFFSET }}
              className="overflow-hidden transition-all duration-300 border rounded-3xl border-cyan-600 bg-white/[0.03] backdrop-blur-xl hover:border-cyan-400/30 hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]"
            >
              <button
                onClick={() => toggleCategory(index)}
                className="flex items-center justify-between w-full px-8 py-6 text-left"
              >
                <span className="text-lg font-medium text-white md:text-xl">
                  {section.category}
                </span>

                {openCategory === index ? (
                  <ChevronUp size={22} className="text-cyan-400" />
                ) : (
                  <ChevronDown size={22} className="text-cyan-400" />
                )}
              </button>

              {openCategory === index && (
                <div className="border-t border-white/10">
                  {section.questions.map((item, i) => {
                    const key = `${index}-${i}`;

                    return (
                      <div
                        key={i}
                        className="border-b border-white/5 last:border-b-0"
                      >
                        <button
                          onClick={() => toggleQuestion(index, i)}
                          className="flex items-center justify-between w-full px-8 py-6 text-left transition-colors hover:bg-white/[0.02]"
                        >
                          <h3 className="pr-6 text-base font-medium text-white md:text-lg">
                            {i + 1}. {item.q}
                          </h3>

                          {openQuestion[key] ? (
                            <Minus
                              size={18}
                              className="flex-shrink-0 text-cyan-400"
                            />
                          ) : (
                            <Plus
                              size={18}
                              className="flex-shrink-0 text-cyan-400"
                            />
                          )}
                        </button>

                        {openQuestion[key] && (
                          <div className="px-8 pb-6">
                            <p className="leading-8 text-gray-400 whitespace-pre-line">
                              {item.a}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;