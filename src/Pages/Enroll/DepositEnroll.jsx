import React, { useRef, useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  X,
  ClipboardList,
  CalendarCheck,
  CreditCard,
  Calendar,
  MapPin,
  ChevronDown,
} from "lucide-react";

import PaymentForm from "../../Components/PaymentForm";

const steps = [
  {
    icon: <ClipboardList size={20} className="text-cyan-400" />,
    title: "Fill Your Details",
    desc: "Enter your name, email and phone number to get started.",
  },
  {
    icon: <CalendarCheck size={20} className="text-cyan-400" />,
    title: "Confirm Your Schedule",
    desc: "Review your selected course date and location.",
  },
  {
    icon: <CreditCard size={20} className="text-cyan-400" />,
    title: "Pay Your Deposit",
    desc: "Secure your seat instantly with a £250 deposit.",
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400" />,
    title: "Seat Reserved",
    desc: "You're confirmed! We'll be in touch with next steps.",
  },
];

// ─── Course Schedules (same as Enroll page) ─────────────────────
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

const DepositEnroll = () => {
  const form = useRef(null);
  const hasFetched = useRef(false);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  // ── NEW: values bound to the Location / Date select inputs ──
  // (shown only when there's no schedule saved already)
  const [scheduleLocation, setScheduleLocation] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");

  const [searchParams] = useSearchParams();
  
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
  const date = searchParams.get("date");
  const location = searchParams.get("location");

  if (date && location) {
    const schedule = {
      date,
      location,
    };

    localStorage.setItem(
      "selectedSchedule",
      JSON.stringify(schedule)
    );
  }
}, [searchParams]);

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

  const createPaymentIntent = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-deposit-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      setErrorMsg("Unable to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    createPaymentIntent();
  }, []);

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const formData = new FormData(form.current);

     const savedSchedule = JSON.parse(
  localStorage.getItem("selectedSchedule") || "null"
);

const enrollmentData = {
  paymentIntentId,
  enrollmentType: "Deposit",

  name: formData.get("name"),
  email: formData.get("email"),
  phone: formData.get("phone"),

  course: "14 Certificate Fast-Track Course",

  depositPaid: "£250",
  remainingBalance: "£849",

  selectedDate: savedSchedule?.date || null,
  selectedLocation: savedSchedule?.location || null,
};

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-deposit-enrollment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollmentData),
        }
       
      );

      const result = await response.json();

      if (result.success) {
  setPaymentCompleted(true);
  form.current.reset();

  localStorage.removeItem("selectedSchedule");
  setSelectedSchedule(null);

  localStorage.removeItem("enrollContactDetails");  
  setContactDetails({ name: "", email: "", phone: "" }); 
}
    } catch (err) {
      setErrorMsg(
        "Enrollment failed. Please contact support."
      );
    }
  };


  const handleRemoveSchedule = () => {
  localStorage.removeItem("selectedSchedule");
  setSelectedSchedule(null);
  setScheduleLocation("");
  setScheduleDate("");
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

  const inputClass =
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none";

  return (
    <section className="min-h-screen px-6 py-20 bg-black">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="px-4 py-1 text-sm border rounded-full border-cyan-400/30 text-cyan-400">
            Deposit Enrollment
          </span>

          <h1 className="mt-5 text-5xl font-bold text-white">
            Secure Your Place
          </h1>

          <p className="max-w-xl mx-auto mt-4 text-white/60">
            Pay your deposit today and reserve
            your seat instantly.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — course details + how it works */}
          <div className="space-y-6">
            <div className="p-7 border rounded-3xl border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl">
              <h3 className="text-xl font-semibold text-white">
                14
Certificate
Fast-Track
Course
              </h3>

              <div className="mt-5 space-y-3">
                <div className="flex justify-between">
                  <span className="text-white/60">
                    Deposit Today
                  </span>

                  <span className="text-xl font-bold text-cyan-400">
                    £250
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-white/60">
                    Remaining Balance
                  </span>

                  <span className="text-white">
                    £849
                  </span>
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

          {/* Right — form */}
          <div className="border border-cyan-500/20 rounded-3xl bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)]">

            {errorMsg && (
              <div className="flex gap-3 p-4 mb-6 border rounded-xl border-red-500/30 bg-red-500/10">
                <AlertCircle
                  size={18}
                  className="text-red-400 shrink-0"
                />
                <p className="text-sm text-red-400">
                  {errorMsg}
                </p>
              </div>
            )}

            <form
              ref={form}
              className="space-y-5"
            >
              <div className="relative">
                <User
                  size={18}
                  className="absolute -translate-y-1/2 left-4 top-1/2 text-white/40"
                />

                <input
  type="text"
  name="name"
  placeholder="Full Name"
  required
  value={contactDetails.name}
  onChange={handleContactChange}
  className={inputClass}
/>
              </div>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute -translate-y-1/2 left-4 top-1/2 text-white/40"
                />

               <input
  type="email"
  name="email"
  placeholder="Email Address"
  required
  value={contactDetails.email}
  onChange={handleContactChange}
  className={inputClass}
/>
              </div>

              <div className="relative">
                <Phone
                  size={18}
                  className="absolute -translate-y-1/2 left-4 top-1/2 text-white/40"
                />

                <input
  type="tel"
  name="phone"
  placeholder="Phone Number"
  required
  value={contactDetails.phone}
  onChange={handleContactChange}
  className={inputClass}
/>
              </div>

              {/* ── NEW: if no schedule saved, let user pick location & date ── */}
              {!selectedSchedule && (
                <>
                  <div className="relative">
                    <MapPin
                      size={18}
                      className="absolute -translate-y-1/2 pointer-events-none text-white/40 left-4 top-1/2"
                    />
                    <select
                      value={scheduleLocation}
                      onChange={handleLocationChange}
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
                    <ChevronDown
                      size={18}
                      className="absolute -translate-y-1/2 pointer-events-none text-white/40 right-4 top-1/2"
                    />
                  </div>

                  <div className="relative">
                    <Calendar
                      size={18}
                      className="absolute -translate-y-1/2 pointer-events-none text-white/40 left-4 top-1/2"
                    />
                    <select
                      value={scheduleDate}
                      onChange={handleDateChange}
                      disabled={!scheduleLocation}
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
                    <ChevronDown
                      size={18}
                      className="absolute -translate-y-1/2 pointer-events-none text-white/40 right-4 top-1/2"
                    />
                  </div>
                </>
              )}
              
              {selectedSchedule && (
                <div className="flex items-center gap-3 p-4 mt-6 border rounded-2xl border-cyan-400/20 bg-cyan-400/5">
                  <div className="flex-1">
                    <p className="text-xs text-white/40">
                      Selected Course Date
                    </p>

                    <p className="mt-1 font-semibold text-white">
                      {selectedSchedule.date}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-white/40">
                      Location
                    </p>

                    <p className="mt-1 font-semibold text-cyan-400">
                      {selectedSchedule.location}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleRemoveSchedule}
                    title="Remove selected schedule"
                    className="ml-3 transition-all duration-200 text-white/30 hover:text-red-400 shrink-0"
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </form>

            <div className="flex gap-3 p-4 mt-6 border rounded-xl border-cyan-400/20 bg-cyan-400/5">
              <input
                type="checkbox"
                checked={isTermsAccepted}
                onChange={(e) =>
                  setIsTermsAccepted(
                    e.target.checked
                  )
                }
                className="mt-1 accent-cyan-400"
              />

              <p className="text-sm text-white/60">
    I agree to the{" "}
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
    {" "}and understand that the £250 deposit secures my place on the course.
  </p>
            </div>

            <div className="mt-8">
              {paymentCompleted ? (
                <div className="flex items-center justify-center gap-3 p-5 border rounded-xl border-green-500/20 bg-green-500/10">
                  <CheckCircle
                    className="text-green-400"
                  />
                  <span className="font-semibold text-green-400">
                    Deposit Paid Successfully
                  </span>
                </div>
              ) : loading ? (
                <div className="flex justify-center py-8">
                  <div className="w-8 h-8 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                </div>
              ) : (
                <>
                  {!isTermsAccepted && (
                    <div className="flex items-center gap-2 mb-4 text-sm text-amber-400">
                      <ShieldCheck size={16} />
                      Accept terms to continue.
                    </div>
                  )}

                  <div
                    className={
                      !isTermsAccepted
                        ? "pointer-events-none opacity-40"
                        : ""
                    }
                  >
                    <PaymentForm
                      clientSecret={clientSecret}
                      onPaymentSuccess={
                        handlePaymentSuccess
                      }
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositEnroll;