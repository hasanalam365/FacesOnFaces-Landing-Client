import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Check,
  ArrowRight,
  ChevronDown,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../../Components/PaymentForm";
import LeftSide from "./LeftSide";

// ─── Price Plans ───────────────────────────────────────────────
const plans = [
  {
    id: "full",
   
    title: "Pay in Full",
    description:
      "One simple payment — no ongoing commitments. Unlock full course materials and lifetime access.",
    price: "£1,099",
    subText: "Save £500",
    buttonText: "Enroll & Pay in Full",
    featured: false,
    features: [
      "Full course access immediately",
      "Lifetime Support",
      "Save £500 vs other plans",
      "Priority scheduling",
    ],
  },
  {
    id: "deposit",
    
    title: "Deposit",
    description:
      "Reserve your spot with a deposit now and pay the remaining balance before your course start date.",
    price: "£250",
    subText: "Deposit today, then £849",
    buttonText: "Pay Deposit Now",
    featured: true,
    features: [
      "Secure your place instantly",
      "Balance due 14 days before start",
      "Full course access on day one",
      "Dedicated enrollment advisor",
      "Balance due on the day of the course",
      "Manuals sent out after deposit"
    ],
  },
  {
    id: "subscription",
   
    title: "Subscription",
    description:
      "Spread the cost with a monthly direct debit. Requires a signed subscription agreement before enrolment.",
    price: "£100",
    subText: "per month",
    buttonText: "Start Subscription",
    featured: false,
    features: [
      
      "Direct debit setup",
      "Signed subscription agreement",
      "Cancel terms apply",
    ],
  },
];

// ─── Plan Modal ────────────────────────────────────────────────
const PlanModal = ({ isOpen, onClose, onSelectPlan, selectedPlan }) => {
  // ESC key to close
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    // Prevent body scroll while modal is open
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Click-outside backdrop handler
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <>
      {/* Inject keyframe animation via a style tag */}
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .modal-enter {
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1rem",
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "auto" : "none",
          transition: "opacity 0.25s ease",
        }}
      >
        {/* Modal panel */}
        {isOpen && (
          <div
            className="modal-enter"
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "1100px",
              maxHeight: "90vh",
              overflowY: "auto",
              backgroundColor: "#0a0e12",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1.5rem",
              padding: "2.5rem",
              boxShadow: "0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(34,211,238,0.06)",
            }}
          >
            {/* Glow */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%,-50%)",
                width: "500px",
                height: "400px",
                background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)",
                pointerEvents: "none",
                borderRadius: "9999px",
              }}
            />

            {/* Close button */}
            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                position: "absolute",
                top: "1.25rem",
                right: "1.25rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "2.25rem",
                height: "2.25rem",
                borderRadius: "9999px",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.05)",
                color: "rgba(255,255,255,0.6)",
                cursor: "pointer",
                transition: "all 0.2s",
                zIndex: 10,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(34,211,238,0.15)";
                e.currentTarget.style.borderColor = "rgba(34,211,238,0.5)";
                e.currentTarget.style.color = "#22d3ee";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
                e.currentTarget.style.color = "rgba(255,255,255,0.6)";
              }}
            >
              <X size={16} />
            </button>

            {/* Modal header */}
            <div className="mb-10 text-center" style={{ position: "relative", zIndex: 1 }}>
              <p className="text-cyan-400 text-xs tracking-[4px] uppercase mb-4">
                Enrollment Options
              </p>
              <h2 className="font-serif text-3xl font-light text-white md:text-4xl">
                Choose Your{" "}
                <span className="italic text-cyan-300">Payment Plan</span>
              </h2>
              <p className="max-w-xl mx-auto mt-3 text-sm text-gray-400">
                Flexible ways to start your journey — pay in full, leave a
                deposit, or subscribe monthly via direct debit.
              </p>
            </div>

            {/* Plan cards */}
            <div
              style={{ position: "relative", zIndex: 1 }}
              className="grid gap-6 lg:grid-cols-3"
            >
              {plans.map((plan) => (
                <div
                  key={plan.id}
                  className={`relative rounded-3xl p-7 flex flex-col
                    transition-all duration-500 cursor-pointer border border-cyan-400
                    ${
                      plan.featured
                        ? "bg-[#0f1519] border border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_20px_60px_rgba(34,211,238,0.3)]"
                        : selectedPlan === plan.id
                        ? "bg-[#0c1014] border border-cyan-400 scale-[1.02]"
                        : "bg-[#0c1014] border  border-gray-800 hover:-translate-y-2 hover:scale-[1.01] hover:border-cyan-400/60 hover:shadow-[0_12px_40px_rgba(34,211,238,0.12)]"
                    }`}
                >
                 

                  <div className={plan.featured ? "mt-5" : ""}>
                    <h3 className="mb-2 text-xl font-medium text-white">
                      {plan.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-gray-400">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <h2 className="text-4xl font-light text-white">
                        {plan.price}
                      </h2>
                      <p
                        className={`text-sm mt-1 ${
                          plan.featured ? "text-cyan-400" : "text-gray-500"
                        }`}
                      >
                        {plan.subText}
                      </p>
                    </div>
                    <ul className="flex-grow mb-6 space-y-3">
                      {plan.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-3 text-sm text-gray-300"
                        >
                          <Check
                            size={14}
                            className="flex-shrink-0 text-cyan-400"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`mt-auto w-full py-3.5 rounded-full flex items-center justify-center gap-2 text-sm font-medium transition-all duration-300 ${
                      plan.featured
                        ? "bg-cyan-400 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                        : "bg-cyan-400 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                    }`}
                  >
                    {plan.buttonText}
                    <ArrowRight size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

// ─── Main Component ────────────────────────────────────────────
const Enroll = () => {
  const navigate = useNavigate();
  const form = useRef(null);
  const hasFetched = useRef(false);
  const formRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Controls modal visibility
  const [modalOpen, setModalOpen] = useState(false);

  // Fetch payment intent only when full plan is selected
  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("No client secret received");
      }
    } catch {
      setErrorMsg("Payment setup failed. Please refresh and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handlePlanSelect = (planId) => {
    if (planId === "deposit") {
      navigate("/deposit-enroll");
      return;
    }
    if (planId === "subscription") {
      navigate("/subscription-enroll");
      return;
    }
    // Pay in Full: close modal, stay on page, set plan
    setModalOpen(false);
    setSelectedPlan("full");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // Open modal when Course Fee field is clicked
  const handleFeeFieldClick = () => {
    if (paymentCompleted) return;
    setModalOpen(true);
  };

  // Fetch payment intent once when full plan is selected
  useEffect(() => {
    if (selectedPlan === "full" && !hasFetched.current) {
      hasFetched.current = true;
      createPaymentIntent();
    }
  }, [selectedPlan]);

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      setErrorMsg("");
      const formData = new FormData(form.current);
      const enrollmentData = {
        paymentIntentId,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
      };
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-enrollment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enrollmentData),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Enrollment failed");
      }
      const result = await response.json();
      if (result.success) {
        setPaymentCompleted(true);
        setClientSecret("");
        form.current.reset();
      } else {
        throw new Error("Enrollment failed. Please contact support.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please contact support.");
    }
  };

  const inputClass =
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";

  // Derived label for the Course Fee selector field
  const feeSelectorLabel = selectedPlan === "full" ? "£1,099" : null;

  return (
    <section className="min-h-screen bg-[#050505] py-20">
      {/* Plan selection modal */}
      <PlanModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSelectPlan={handlePlanSelect}
        selectedPlan={selectedPlan}
      />

      <div className="px-6 mx-auto max-w-7xl">

        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Enroll Today &
            <span className="text-cyan-400"> Start Learning</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/60">
            Review the course details below and choose your preferred payment
            plan to secure your place.
          </p>
        </div>

        {/* ── Course Details + Enrollment Form (always visible) ── */}
        <div ref={formRef} className="grid gap-10 lg:grid-cols-2">
          <LeftSide />

          {/* Right: Form — always shown */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">

            {/* Global error */}
            {errorMsg && (
              <div className="flex items-start gap-3 p-4 mb-5 border rounded-xl border-red-500/30 bg-red-500/10">
                <AlertCircle
                  size={18}
                  className="text-red-400 mt-0.5 shrink-0"
                />
                <p className="text-sm text-red-400">{errorMsg}</p>
              </div>
            )}

            <form ref={form} className="space-y-5">
              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Full Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2"
                  />
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={paymentCompleted}
                    placeholder="Enter your full name"
                    maxLength={100}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2"
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={paymentCompleted}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone
                    size={18}
                    className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2"
                  />
                  <input
                    type="tel"
                    name="phone"
                    required
                    disabled={paymentCompleted}
                    placeholder="Enter your phone number"
                    maxLength={20}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Course — display only */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Course Name
                </label>
                <input
                  type="text"
                  value="14 Certificate Fast-Track Course"
                  readOnly
                  className="w-full px-4 py-4 text-white border cursor-not-allowed rounded-xl bg-white/5 border-white/10 opacity-60"
                />
              </div>

              {/* Course Fee — clickable plan selector that opens modal */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Course Fee
                </label>
                <button
                  type="button"
                  onClick={handleFeeFieldClick}
                  disabled={paymentCompleted}
                  className={`w-full px-4 py-4 text-left border rounded-xl transition-all duration-200 flex items-center justify-between
                    ${paymentCompleted ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
                    ${
                      modalOpen
                        ? "border-cyan-400 bg-cyan-400/5"
                        : feeSelectorLabel
                        ? "border-cyan-400/60 bg-white/5"
                        : "border-white/10 bg-white/5 hover:border-cyan-400/50"
                    }`}
                >
                  <span
                    className={
                      feeSelectorLabel
                        ? "font-semibold text-cyan-400"
                        : "text-white/40"
                    }
                  >
                    {feeSelectorLabel ?? "Click to Select Payment Option"}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-white/40 transition-transform duration-300 ${
                      modalOpen ? "rotate-180 text-cyan-400" : ""
                    }`}
                  />
                </button>
              </div>
            </form>

            {/* Payment section — only shown after Pay in Full is selected */}
            {selectedPlan === "full" && (
              <div className="mt-5">
                {paymentCompleted ? (
                  <div className="flex items-center justify-center gap-3 p-5 border rounded-xl border-green-500/30 bg-green-500/10">
                    <CheckCircle
                      size={20}
                      className="text-green-400 shrink-0"
                    />
                    <p className="font-semibold text-green-400">
                      Payment Completed & Enrollment Confirmed!
                    </p>
                  </div>
                ) : loading ? (
                  <div className="flex items-center justify-center p-5">
                    <div className="w-6 h-6 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                    <span className="ml-3 text-sm text-white/50">
                      Setting up payment...
                    </span>
                  </div>
                ) : clientSecret ? (
                  <>
                    {/* Terms checkbox */}
                    <div
                      className={`flex items-start gap-3 p-4 mb-5 border rounded-xl transition-colors duration-200 ${
                        isTermsAccepted
                          ? "border-cyan-400/30 bg-cyan-400/5"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      <input
                        type="checkbox"
                        id="terms"
                        checked={isTermsAccepted}
                        onChange={(e) => setIsTermsAccepted(e.target.checked)}
                        className="w-4 h-4 mt-0.5 shrink-0 accent-cyan-400 cursor-pointer"
                      />
                      <label
                        htmlFor="terms"
                        className="text-sm leading-relaxed cursor-pointer text-white/60"
                      >
                        I have read and agree to the{" "}
                        <a
                          href="/terms-and-conditions"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2"
                        >
                          Terms & Conditions
                        </a>{" "}
                        and{" "}
                        <a
                          href="/privacy-policy"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2"
                        >
                          Privacy Policy
                        </a>
                        
                      </label>
                    </div>

                    {/* Payment form with overlay */}
                    <div className="relative">
                      {!isTermsAccepted && (
                        <div className="absolute inset-0 z-10 rounded-xl bg-black/60 backdrop-blur-sm" />
                      )}
                      <PaymentForm
                        clientSecret={clientSecret}
                        onPaymentSuccess={handlePaymentSuccess}
                      />
                    </div>
                  </>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;
