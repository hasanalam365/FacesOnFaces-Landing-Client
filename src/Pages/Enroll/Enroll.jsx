import React, { useRef, useState, useEffect, useLayoutEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
  Calendar,
  MapPin,
  ClipboardList,
  CalendarCheck,
  CreditCard,
} from "lucide-react";
import { useNavigate,useLocation  } from "react-router-dom";
import PaymentForm from "../../Components/PaymentForm";
import PricePlan from "../Home/PricePlan";

// ─── Course Schedules (moved here from LeftSide) ───────────────
const courseSchedules = [
  {
    location: "London",
    dates: [
      "21st–23rd August",
      "18th–20th September",
      "16th–18th October",
      "20th–22nd November",
      "18th–20th December",
      "22nd–24th January",
    ],
  },
  {
    location: "Upminster",
    dates: [
      "28th–30th August",
      "25th–27th September",
      "23rd–25th October",
      "27th–29th November",
      "28th–30th December",
      "29th–31st January",
    ],
  },
  {
    location: "Edinburgh",
    dates: [
      "14th–16th August",
      "11th–13th September",
      "9th–11th October",
      "13th–15th November",
      "10th–12th December",
      "15th–17th January",
    ],
  },
  {
    location: "Belfast",
    dates: [
      "28th–30th August",
      "25th–27th September",
      "23rd–25th October",
      "27th–29th November",
      "28th–30th December",
      "29th–31st January",
    ],
  },
  {
    location: "Dublin",
    dates: [
      "21st–23rd August",
      "18th–20th September",
      "16th–18th October",
      "20th–22nd November",
      "18th–20th December",
      "22nd–24th January",
    ],
  },
];

// ─── How It Works Steps ─────────────────────────────────────────
const steps = [
  {
    icon: <ClipboardList size={20} className="text-cyan-400" />,
    title: "Fill Your Details",
    desc: "Enter your name, email and phone number to get started.",
  },
  {
    icon: <CalendarCheck size={20} className="text-cyan-400" />,
    title: "Choose Your Schedule",
    desc: "Select your preferred course date and location.",
  },
  {
    icon: <CreditCard size={20} className="text-cyan-400" />,
    title: "Select Payment Plan",
    desc: "Pay in full, put down a deposit, or start a subscription.",
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400" />,
    title: "Enrollment Confirmed",
    desc: "You're all set! We'll be in touch with next steps.",
  },
];

// ─── Shared body-scroll-lock hook ──────────────────────────────
function useScrollLock(active) {
  useLayoutEffect(() => {
    if (!active) return;

    const scrollY = window.scrollY;
    const { body } = document;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      left: body.style.left,
      right: body.style.right,
      width: body.style.width,
      overflow: body.style.overflow,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
    body.style.overflow = "hidden";

    return () => {
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.left = prev.left;
      body.style.right = prev.right;
      body.style.width = prev.width;
      body.style.overflow = prev.overflow;

      // 👇 এইটাই মিসিং ছিল — scroll position restore করা
        window.scrollTo({ top: scrollY, left: 0, behavior: "instant" });
    };
  }, [active]);
}

// ─── Plan Modal ────────────────────────────────────────────────
const PlanModal = ({ isOpen, onClose, onSelectPlan, selectedPlan }) => {
  useScrollLock(isOpen);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <>
      <style>{`
        @keyframes modalFadeIn {
          from { opacity: 0; transform: scale(0.96) translateY(12px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        .modal-enter {
          animation: modalFadeIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .plan-modal-box {
          padding: 1.25rem;
        }
        @media (min-width: 640px) {
          .plan-modal-box {
            padding: 1.75rem;
          }
        }
        @media (min-width: 1024px) {
          .plan-modal-box {
            padding: 2.5rem;
          }
        }
      `}</style>

      <div
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0.5rem",
          backgroundColor: "rgba(0,0,0,0.75)",
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
        }}
      >
        <div
          className="modal-enter plan-modal-box"
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "1100px",
            maxHeight: "92vh",
            overflowY: "auto",
            overscrollBehavior: "contain",
            backgroundColor: "#0a0e12",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "1.5rem",
            boxShadow:
              "0 40px 120px rgba(0,0,0,0.8), 0 0 60px rgba(34,211,238,0.06)",
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
              background:
                "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)",
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

          {/* Plan cards */}
          <div style={{ position: "relative", zIndex: 1 }}>
            <PricePlan onSelectPlan={onSelectPlan} />
          </div>
        </div>
      </div>
    </>,
    document.body
  );
};

// ─── Main Component ────────────────────────────────────────────
const Enroll = () => {
  const navigate = useNavigate();
    const location = useLocation()
  const form = useRef(null);
  const hasFetched = useRef(false);
  const formRef = useRef(null);

  const [selectedPlan, setSelectedPlan] = useState(null);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  // ── Selected schedule (from location/date select fields) ────
  // { date: "3rd–5th October", location: "London" } | null
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // ── NEW: values bound to the Location / Date select inputs ──
  const [scheduleLocation, setScheduleLocation] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const [contactDetails, setContactDetails] = useState({ name: "", email: "", phone: "" });

useEffect(() => {
  const saved = JSON.parse(localStorage.getItem("enrollContactDetails") || "null");
  if (saved) setContactDetails(saved);
}, []);

const handleContactChange = (e) => {
  const { name, value } = e.target;
  setContactDetails((prev) => {
    const updated = { ...prev, [name]: value };
    localStorage.setItem("enrollContactDetails", JSON.stringify(updated));
    return updated;
  });
};

  useEffect(() => {
  const savedSchedule = JSON.parse(
    localStorage.getItem("selectedSchedule") || "null"
  );

  if (savedSchedule) {
    setSelectedSchedule(savedSchedule);
    setScheduleLocation(savedSchedule.location || "");
    setScheduleDate(savedSchedule.date || "");
  }
}, []);

// PricePlan থেকে "full payment" সরাসরি select করে এলে
useEffect(() => {
  if (location.state?.plan === "full") {
    setSelectedPlan("full");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }
}, [location.state]);

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

  // ── Called when user picks a plan from the modal ────────────
  const handlePlanSelect = (planId) => {
    if (planId === "deposit") {
      // Pass schedule via query params so deposit page can also save it
      const params = new URLSearchParams();
      if (selectedSchedule) {
        params.set("date", selectedSchedule.date);
        params.set("location", selectedSchedule.location);
      }
      navigate(`/deposit-enroll${params.toString() ? `?${params}` : ""}`);
      return;
    }
    if (planId === "subscription") {
      const params = new URLSearchParams();
      if (selectedSchedule) {
        params.set("date", selectedSchedule.date);
        params.set("location", selectedSchedule.location);
      }
      navigate(`/subscription-enroll${params.toString() ? `?${params}` : ""}`);
      return;
    }
    // "full" plan — stay on this page
    setModalOpen(false);
    setSelectedPlan("full");
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const handleCloseModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  // ── Course Fee field click → open modal ─────────────────────
  const handleFeeFieldClick = (e) => {
    if (paymentCompleted) return;
    e.currentTarget.blur();
    
    setModalOpen(true);
  };

  // ── NEW: Location select change ──────────────────────────────
  const handleLocationChange = (e) => {
    const location = e.target.value;
    setScheduleLocation(location);
    setScheduleDate("");

    if (!location) {
      localStorage.removeItem("selectedSchedule");
      setSelectedSchedule(null);
    }
  };

  // ── NEW: Date select change ──────────────────────────────────
  const handleDateChange = (e) => {
    const date = e.target.value;
    setScheduleDate(date);

    if (date && scheduleLocation) {
      const schedule = { date, location: scheduleLocation };
      localStorage.setItem("selectedSchedule", JSON.stringify(schedule));
      setSelectedSchedule(schedule);
    }
  };

  const availableDates =
    courseSchedules.find((s) => s.location === scheduleLocation)?.dates || [];

  useEffect(() => {
    if (selectedPlan === "full" && !hasFetched.current) {
      hasFetched.current = true;
      createPaymentIntent();
    }
  }, [selectedPlan]);

  // ── Payment success → POST to backend (with schedule) ───────
 const handlePaymentSuccess = async (paymentIntentId) => {
  try {
    setErrorMsg("");

    const formData = new FormData(form.current);

    const savedSchedule = JSON.parse(
      localStorage.getItem("selectedSchedule") || "null"
    );

    const enrollmentData = {
      paymentIntentId,

      name: formData.get("name")?.trim(),
      email: formData.get("email")?.trim(),
      phone: formData.get("phone")?.trim(),

      selectedDate: savedSchedule?.date || "",
      selectedLocation: savedSchedule?.location || "",
    };

    console.log("Sending Enrollment:", enrollmentData);

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create-enrollment`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollmentData),
      }
    );

    const result = await response.json();

  

    if (!response.ok) {
      throw new Error(
        result.message ||
          result.errors?.[0]?.msg ||
          "Enrollment failed"
      );
    }

    if (result.success) {
  setPaymentCompleted(true);
  setClientSecret("");

  form.current.reset();

  localStorage.removeItem("selectedSchedule");
  setSelectedSchedule(null);

  localStorage.removeItem("enrollContactDetails");   
  setContactDetails({ name: "", email: "", phone: "" }); 
}
  } catch (err) {
    console.error(err);

    setErrorMsg(err.message);
  }
};

const handleRemoveSchedule = () => {
  localStorage.removeItem("selectedSchedule");
  setSelectedSchedule(null);
  setScheduleLocation("");
  setScheduleDate("");
};


  const inputClass = "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";

  const feeSelectorLabel = selectedPlan === "full" ? "£1,099" : null;




  return (
    <section className="min-h-screen bg-[#050505] py-20">
      <PlanModal
        isOpen={modalOpen}
        onClose={handleCloseModal}
        onSelectPlan={handlePlanSelect}
        selectedPlan={selectedPlan}
      />

      <div className="px-6 mx-auto max-w-7xl">
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

        <div ref={formRef} className="grid gap-10 lg:grid-cols-2">
          {/* Left — course details + how it works */}
          <div className="space-y-6">
            <div className="p-7 border rounded-3xl border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl">
              <span className="px-4 py-1 text-sm border rounded-full border-cyan-400/30 text-cyan-400">
                Course Details
              </span>

              <h3 className="mt-4 text-xl font-semibold text-white">
                14 Certificate Fast-Track Course
              </h3>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">Course Fee</span>
                  <div className="flex items-center gap-3">
                    <span className="line-through text-white/40">£1,599</span>
                    <span className="text-xl font-bold text-cyan-400">£1,099</span>
                  </div>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/60">Duration</span>
                  <span className="text-white">3 Day Intensive Training</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/60">Certifications</span>
                  <span className="text-white">14 Included</span>
                </div>
              </div>
            </div>

            <div className="p-7 border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <h3 className="mb-6 text-lg font-semibold text-white">How It Works</h3>
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-cyan-400/10">
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{step.title}</p>
                      <p className="mt-0.5 text-xs text-white/40 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">
            {errorMsg && (
              <div className="flex items-start gap-3 p-4 mb-5 border rounded-xl border-red-500/30 bg-red-500/10">
                <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-400">{errorMsg}</p>
              </div>
            )}

            <form ref={form} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm text-white/70">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                  <input
  type="text"
  name="name"
  required
  disabled={paymentCompleted}
  placeholder="Enter your full name"
  maxLength={100}
  value={contactDetails.name}
  onChange={handleContactChange}
  className={inputClass}
/>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-white/70">Email Address</label>
                <div className="relative">
                  <Mail size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                 <input
  type="email"
  name="email"
  required
  disabled={paymentCompleted}
  placeholder="Enter your email"
  value={contactDetails.email}
  onChange={handleContactChange}
  className={inputClass}
/>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-white/70">Phone Number</label>
                <div className="relative">
                  <Phone size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                  <input
  type="tel"
  name="phone"
  required
  disabled={paymentCompleted}
  placeholder="Enter your phone number"
  maxLength={20}
  value={contactDetails.phone}
  onChange={handleContactChange}
  className={inputClass}
/>
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm text-white/70">Course Name</label>
                <input
                  type="text"
                  value="14 Certificate Fast-Track Course"
                  readOnly
                  className="w-full px-4 py-4 text-white border cursor-not-allowed rounded-xl bg-white/5 border-white/10 opacity-60"
                />
              </div>

              {/* ── NEW: Location select field ─────────────────── */}
              <div>
                <label className="block mb-2 text-sm text-white/70">Location</label>
                <div className="relative">
                  <MapPin size={18} className="absolute -translate-y-1/2 pointer-events-none text-white/40 left-4 top-1/2" />
                  <select
                    value={scheduleLocation}
                    onChange={handleLocationChange}
                    disabled={paymentCompleted}
                    required
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#0a0e12]">
                      Select a location
                    </option>
                    {courseSchedules.map((s) => (
                      <option key={s.location} value={s.location} className="bg-[#0a0e12]">
                        {s.location}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute -translate-y-1/2 pointer-events-none text-white/40 right-4 top-1/2" />
                </div>
              </div>

              {/* ── NEW: Date select field ──────────────────────── */}
              <div>
                <label className="block mb-2 text-sm text-white/70">Date</label>
                <div className="relative">
                  <Calendar size={18} className="absolute -translate-y-1/2 pointer-events-none text-white/40 left-4 top-1/2" />
                  <select
                    value={scheduleDate}
                    onChange={handleDateChange}
                    disabled={paymentCompleted || !scheduleLocation}
                    required
                    className={`${inputClass} appearance-none cursor-pointer`}
                  >
                    <option value="" className="bg-[#0a0e12]">
                      {scheduleLocation ? "Select a date" : "Select location first"}
                    </option>
                    {availableDates.map((date) => (
                      <option key={date} value={date} className="bg-[#0a0e12]">
                        {date}
                      </option>
                    ))}
                  </select>
                  <ChevronDown size={18} className="absolute -translate-y-1/2 pointer-events-none text-white/40 right-4 top-1/2" />
                </div>
              </div>

              {/* ── Selected Schedule display (if any) ────────── */}
              {selectedSchedule && (
                <div className="flex items-center gap-3 p-4 border rounded-xl border-cyan-400/30 bg-cyan-400/5">
                  <Calendar size={16} className="text-cyan-400 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-white/40 mb-0.5">Selected Date & Location</p>
                    <p className="text-sm font-medium text-white">
                      {selectedSchedule.date}
                      <span className="mx-2 text-white/30">·</span>
                      <span className="text-cyan-400">{selectedSchedule.location}</span>
                    </p>
                  </div>
                  <button
  type="button"
  onClick={handleRemoveSchedule}
  className="transition-all duration-200 text-white/30 hover:text-red-400 shrink-0"
  title="Remove selected schedule"
>
  <X size={15} />
</button>
                </div>
              )}

              <div>
                <label className="block mb-2 text-sm text-white/70">Course Fee</label>
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
                  <span className={feeSelectorLabel ? "font-semibold text-cyan-400" : "text-white/40"}>
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

            {selectedPlan === "full" && (
              <div className="mt-5">
                {paymentCompleted ? (
                  <div className="flex items-center justify-center gap-3 p-5 border rounded-xl border-green-500/30 bg-green-500/10">
                    <CheckCircle size={20} className="text-green-400 shrink-0" />
                    <p className="font-semibold text-green-400">
                      Payment Completed & Enrollment Confirmed!
                    </p>
                  </div>
                ) : loading ? (
                  <div className="flex items-center justify-center p-5">
                    <div className="w-6 h-6 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                    <span className="ml-3 text-sm text-white/50">Setting up payment...</span>
                  </div>
                ) : clientSecret ? (
                  <>
                    <div
                      className={`flex items-start gap-3 p-4 mb-5 border rounded-xl transition-colors duration-200 ${
                        isTermsAccepted ? "border-cyan-400/30 bg-cyan-400/5" : "border-white/10 bg-white/5"
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

                    <div className="relative">
                      {!isTermsAccepted && (
                        <div className="absolute inset-0 z-10 rounded-xl bg-black/60 backdrop-blur-sm" />
                      )}
                      <PaymentForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess} />
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