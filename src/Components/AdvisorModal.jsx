import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Phone, X, ChevronRight } from "lucide-react";

const WHATSAPP_NUMBER = "+447308888874";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25 },
  },
  exit: {
    opacity: 0,
    y: 30,
    scale: 0.97,
    transition: { duration: 0.2 },
  },
};

const AdvisorModal = ({ open, onClose }) => {
  const modalRef = useRef(null);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        if (showLeadForm) {
          setShowLeadForm(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [open, onClose, showLeadForm]);

  useEffect(() => {
    if (!open) setShowLeadForm(false);
  }, [open]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  const handleWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
  };

  const handleNavigate = () => {
    navigate("/lead-form");
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onMouseDown={handleBackdropClick}
          className="fixed inset-0 z-[999] flex items-start justify-center overflow-y-auto bg-black/70 backdrop-blur-md p-4 sm:p-6 sm:items-center"
        >
          <motion.div
            ref={modalRef}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onMouseDown={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl my-auto overflow-hidden border shadow-2xl rounded-3xl bg-[#091017] border-cyan-500/20"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute z-20 flex items-center justify-center w-10 h-10 text-gray-400 transition rounded-full top-4 right-4 hover:text-white hover:bg-white/10"
            >
              <X size={18} />
            </button>

            {/* Background Glow */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute rounded-full w-72 h-72 bg-cyan-500/10 blur-[120px] -top-24 -left-24" />
              <div className="absolute rounded-full w-80 h-80 bg-cyan-400/10 blur-[140px] -bottom-20 -right-20" />
            </div>

            <div className="relative z-10 p-6 sm:p-10">
              <p className="mb-3 text-xs tracking-[5px] uppercase text-cyan-400">
                Need Assistance?
              </p>
              <h2 className="text-2xl font-light text-white sm:text-3xl md:text-4xl">
                Talk To An Advisor
              </h2>
              <p className="mt-3 text-sm leading-7 text-gray-400 sm:mt-4 sm:text-base">
                Choose how you'd like to connect with our admissions team. We're
                here to help you choose the right course and answer any
                questions.
              </p>

              <div className="grid grid-cols-1 gap-4 mt-6 sm:gap-6 sm:mt-10 md:grid-cols-2">
                {/* WhatsApp Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-5 sm:p-7"
                >
                  <div className="absolute inset-0 transition duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-green-500/15">
                      <MessageCircle size={28} className="text-green-400 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white sm:mt-6 sm:text-xl">
                      WhatsApp Chat
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-400 sm:mt-3">
                      Start chatting with one of our advisors instantly on
                      WhatsApp. Get answers about courses, pricing, enrollment
                      and career opportunities.
                    </p>
                    <button
                      onClick={handleWhatsApp}
                      className="flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-sm font-medium text-white transition bg-green-500 rounded-xl hover:bg-green-400 sm:mt-8 sm:text-base"
                    >
                      Chat on WhatsApp
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>

                {/* Lead Form Card */}
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.25 }}
                  className="group relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-white/[0.03] p-5 sm:p-7"
                >
                  <div className="absolute inset-0 transition duration-500 opacity-0 group-hover:opacity-100 bg-gradient-to-br from-cyan-500/10 via-cyan-400/5 to-transparent" />
                  <div className="relative z-10">
                    <div className="flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-cyan-500/15">
                      <Phone size={26} className="text-cyan-400 sm:w-8 sm:h-8" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white sm:mt-6 sm:text-xl">
                      Request A Call
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-gray-400 sm:mt-3">
                      Leave your information and tell us the best time to reach
                      you. One of our advisors will contact you as soon as
                      possible.
                    </p>
                    <button
                      onClick={handleNavigate}
                      className="flex items-center justify-center w-full gap-2 px-5 py-3 mt-6 text-sm font-medium text-black transition rounded-xl bg-cyan-400 hover:bg-cyan-300 sm:mt-8 sm:text-base"
                    >
                      Leave My Details
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AdvisorModal;