import React, { useRef, useState, useEffect, useCallback } from "react";
import {
  User, Mail, Phone, CheckCircle, ShieldCheck,
  CalendarDays, BadgeCheck, FileSignature, AlertCircle, X,
  Calendar, MapPin, ChevronDown,
} from "lucide-react";
import IdentityVerification from "../../Components/IdentityVerification";
import PaymentForm from "../../Components/PaymentForm";
import { useSearchParams } from "react-router-dom";

const steps = [
  {
    icon: <FileSignature size={20} className="text-cyan-400" />,
    title: "Sign Agreement",
    desc: "Complete and sign the subscription agreement sent to your email.",
  },
  {
    icon: <BadgeCheck size={20} className="text-cyan-400" />,
    title: "Confirm Enrollment",
    desc: "Our team reviews your application and confirms your course place.",
  },
  {
    icon: <CalendarDays size={20} className="text-cyan-400" />,
    title: "Direct Debit Setup",
    desc: "We set up your monthly direct debit of £100 for the remaining 11 months.",
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400" />,
    title: "Start Learning",
    desc: "Full course access from day one of your confirmed start date.",
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

// Step IDs
const STEP_FORM = "form";
const STEP_AGREEMENT = "agreement";
const STEP_IDENTITY = "identity";
const STEP_PAYMENT = "payment";     // £250 Stripe card payment
const STEP_MANDATE = "mandate";     // £100/month GoCardless Direct Debit
const STEP_DONE = "done";

const STEP_LABELS = {
  [STEP_FORM]: "Your Details",
  [STEP_AGREEMENT]: "Agreement",
  [STEP_IDENTITY]: "Identity",
  [STEP_PAYMENT]: "First Payment",
  [STEP_MANDATE]: "Direct Debit",
};

const SIGNWELL_EMBED_SCRIPT_SRC = "https://static.signwell.com/assets/embedded.js";
const SIGNWELL_EMBED_CONTAINER_ID = "signwell-embed-container";

const StepIndicator = ({ current }) => {
  const order = [STEP_FORM, STEP_AGREEMENT, STEP_IDENTITY, STEP_PAYMENT, STEP_MANDATE];
  const currentIdx = order.indexOf(current);
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {order.map((step, i) => (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                i < currentIdx
                  ? "bg-cyan-400 text-black"
                  : i === currentIdx
                  ? "border-2 border-cyan-400 text-cyan-400"
                  : "border border-white/20 text-white/20"
              }`}
            >
              {i < currentIdx ? "✓" : i + 1}
            </div>
            <span
              className={`text-xs ${
                i === currentIdx ? "text-cyan-400" : "text-white/20"
              }`}
            >
              {STEP_LABELS[step]}
            </span>
          </div>
          {i < order.length - 1 && (
            <div
              className={`flex-1 h-px mb-4 transition-colors ${
                i < currentIdx ? "bg-cyan-400/50" : "bg-white/10"
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const SubscriptionEnroll = () => {
  const form = useRef(null);

  const [step, setStep] = useState(STEP_FORM);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Stripe (£250 first payment)
  const hasFetchedIntent = useRef(false);
  const [clientSecret, setClientSecret] = useState("");
  const [stripeLoading, setStripeLoading] = useState(true);

  // Collected data across steps
  const [identityData, setIdentityData] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [formSnapshot, setFormSnapshot] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [agreementSigned, setAgreementSigned] = useState(false);
  const [signingUrl, setSigningUrl] = useState(null);

  // Embedded SignWell iframe state
  const [embedScriptReady, setEmbedScriptReady] = useState(
    typeof window !== "undefined" && !!window.SignWellEmbed
  );
  const [embedError, setEmbedError] = useState(false);
  const [verifyingAgreement, setVerifyingAgreement] = useState(false);
  const embedInstanceRef = useRef(null);
  const verifyAttemptsRef = useRef(0);
  const verifyTimeoutRef = useRef(null);

  const [searchParams] = useSearchParams();

  const [selectedSchedule, setSelectedSchedule] = useState(null);
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
    const date = searchParams.get("date");
    const location = searchParams.get("location");

    if (date && location) {
      localStorage.setItem(
        "selectedSchedule",
        JSON.stringify({ date, location })
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

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setScheduleLocation(location);
    setScheduleDate("");

    if (!location) {
      localStorage.removeItem("selectedSchedule");
      setSelectedSchedule(null);
    }
  };

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

  const createPaymentIntent = async () => {
    try {
      setStripeLoading(true);
      setErrorMsg("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-subscription-payment-intent`,
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
      setStripeLoading(false);
    }
  };

  // ── Load the SignWell embedded-signing JS SDK once ──────────────
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.SignWellEmbed) {
      setEmbedScriptReady(true);
      return;
    }
    if (document.querySelector(`script[src="${SIGNWELL_EMBED_SCRIPT_SRC}"]`)) {
      // Already being loaded elsewhere; poll briefly for it to attach.
      const check = setInterval(() => {
        if (window.SignWellEmbed) {
          setEmbedScriptReady(true);
          clearInterval(check);
        }
      }, 200);
      return () => clearInterval(check);
    }
    const script = document.createElement("script");
    script.src = SIGNWELL_EMBED_SCRIPT_SRC;
    script.async = true;
    script.onload = () => setEmbedScriptReady(true);
    script.onerror = () => setEmbedError(true);
    document.body.appendChild(script);
  }, []);

  // ── Server-side re-verification. This is the single source of truth —
  // the SignWell iframe's `completed` event is only a trigger to check,
  // never trusted on its own. ─────────────────────────────────────────
  const verifyAgreementSigned = useCallback(async () => {
    if (!enrollmentId || agreementSigned) return;
    setVerifyingAgreement(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/subscription-agreement-status/${enrollmentId}`
      );
      if (!res.ok) throw new Error("status check failed");
      const data = await res.json();

      if (data.signed || data.status === "completed") {
        verifyAttemptsRef.current = 0;
        if (verifyTimeoutRef.current) clearTimeout(verifyTimeoutRef.current);
        setAgreementSigned(true);
        setVerifyingAgreement(false);
        setStep(STEP_IDENTITY);
        return;
      }

      if (data.signingUrl && !signingUrl) {
        setSigningUrl(data.signingUrl);
      }

      // SignWell can take a few seconds to fully register completion
      // server-side after the iframe fires `completed`. Retry a handful
      // of times before falling back to slow background polling.
      verifyAttemptsRef.current += 1;
      setVerifyingAgreement(false);
      if (verifyAttemptsRef.current <= 6) {
        verifyTimeoutRef.current = setTimeout(verifyAgreementSigned, 2000);
      }
    } catch {
      setVerifyingAgreement(false);
      verifyAttemptsRef.current += 1;
      if (verifyAttemptsRef.current <= 6) {
        verifyTimeoutRef.current = setTimeout(verifyAgreementSigned, 3000);
      }
    }
  }, [enrollmentId, agreementSigned, signingUrl]);

  // ── Background safety-net polling. Slower interval — the primary
  // transition now comes from the iframe's `completed` event, this just
  // covers refreshes, closed tabs, or a missed event. ──────────────────
  useEffect(() => {
    if (step !== STEP_AGREEMENT || !enrollmentId || agreementSigned) return;

    let timeoutId = null;
    let isMounted = true;

    const poll = async () => {
      await verifyAgreementSigned();
      if (isMounted) timeoutId = setTimeout(poll, 15000);
    };

    timeoutId = setTimeout(poll, 15000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId);
    };
  }, [step, enrollmentId, agreementSigned, verifyAgreementSigned]);

  // ── Extra safety net: if the tab regains focus while on this step,
  // check immediately instead of waiting for the next interval tick. ──
  useEffect(() => {
    if (step !== STEP_AGREEMENT) return;
    const onFocus = () => verifyAgreementSigned();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    return () => {
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
    };
  }, [step, verifyAgreementSigned]);

  // ── Mount the SignWell embedded iframe once we have a signing URL
  // and the SDK script has loaded. ─────────────────────────────────
  useEffect(() => {
    if (step !== STEP_AGREEMENT) return;
    if (!signingUrl || !embedScriptReady || agreementSigned) return;
    if (!window.SignWellEmbed) return;

    // Tear down any previous instance before creating a new one
    if (embedInstanceRef.current?.close) {
      try { embedInstanceRef.current.close(); } catch {}
    }

    const container = document.getElementById(SIGNWELL_EMBED_CONTAINER_ID);
    if (!container) return;
    container.innerHTML = "";

    const embed = new window.SignWellEmbed({
      url: signingUrl,
      containerId: SIGNWELL_EMBED_CONTAINER_ID,
      allowDecline: true,
      allowClose: false,
      events: {
        completed: () => {
          verifyAttemptsRef.current = 0;
          verifyAgreementSigned();
        },
        error: () => setEmbedError(true),
      },
    });
    embed.open();
    embedInstanceRef.current = embed;

    return () => {
      if (embedInstanceRef.current?.close) {
        try { embedInstanceRef.current.close(); } catch {}
      }
      embedInstanceRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, signingUrl, embedScriptReady, agreementSigned]);

  useEffect(() => {
    return () => {
      if (verifyTimeoutRef.current) clearTimeout(verifyTimeoutRef.current);
    };
  }, []);

  // Step 1 → Step 2: validate form fields then proceed to Agreement
  const handleFormNext = async () => {
    const f = form.current;
    const name = f.querySelector('[name="name"]').value.trim();
    const email = f.querySelector('[name="email"]').value.trim();
    const phone = f.querySelector('[name="phone"]').value.trim();

    const errors = {};
    if (!name) errors.name = "Full name is required";
    if (!email) errors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Please enter a valid email address";
    if (!phone) errors.phone = "Phone number is required";

    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setErrorMsg("");
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-subscription-agreement`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Could not start the agreement process.");
      }
      setFormSnapshot({ name, email, phone });
      setEnrollmentId(data.enrollmentId);
      if (data.signingUrl) setSigningUrl(data.signingUrl);
      setStep(STEP_AGREEMENT);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Step 3 → Step 4: identity verified, create pre-enrollment, then go to Payment
  const handleIdentityConfirmed = async (data) => {
    if (!data) return;
    setIdentityData(data);
    setErrorMsg("");

    try {
      const body = new FormData();
      body.append("name", formSnapshot.name);
      body.append("email", formSnapshot.email);
      body.append("phone", formSnapshot.phone);
      body.append("enrollmentId", enrollmentId);
      body.append("addressProofType", data.addressProofType);
      body.append("identityProofType", data.identityProofType);
      if (data.identityProofNumber) body.append("identityProofNumber", data.identityProofNumber);
      body.append("addressProofFile", data.addressProofFile);
      body.append("identityFrontFile", data.identityFrontFile);
      if (data.identityBackFile) body.append("identityBackFile", data.identityBackFile);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/create-subscription-pre-enrollment`,
        { method: "POST", body }
      );

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create enrollment");
      }

      const result = await res.json();
      if (!result.enrollmentId) throw new Error("No enrollment ID returned");
      setEnrollmentId(result.enrollmentId);
      setStep(STEP_PAYMENT);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setIdentityData(null);
    }
  };

  // Step 4: Stripe card payment success → mark enrollment paid, move to mandate step
  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      setErrorMsg("");

      const savedSchedule = JSON.parse(
        localStorage.getItem("selectedSchedule") || "null"
      );

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-subscription-enrollment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentIntentId,
            enrollmentId,
            name: formSnapshot.name,
            email: formSnapshot.email,
            phone: formSnapshot.phone,
            selectedDate: savedSchedule?.date || null,
            selectedLocation: savedSchedule?.location || null,
          }),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Enrollment failed");
      }

      const result = await response.json();

     if (result.success) {
  setIsTermsAccepted(false);
  localStorage.removeItem("selectedSchedule");
  setSelectedSchedule(null);

  localStorage.removeItem("enrollContactDetails");   
  setContactDetails({ name: "", email: "", phone: "" }); 

  setStep(STEP_MANDATE);
} else {
        throw new Error("Enrollment failed. Please contact support.");
      }
    } catch (err) {
      setErrorMsg(
        err.message || "Something went wrong. Please contact support."
      );
    }
  };

  useEffect(() => {
    if (step !== STEP_PAYMENT || hasFetchedIntent.current) return;
    hasFetchedIntent.current = true;
    createPaymentIntent();
  }, [step]);

  // Step 5: kick off the GoCardless Direct Debit setup (redirects to the bank)
  const handleGoCardlessPayment = async () => {
    if (!enrollmentId) {
      setErrorMsg("Missing enrollment reference. Please restart the process.");
      return;
    }
    try {
      setLoading(true);
      setErrorMsg("");

      localStorage.setItem("enrollmentId", enrollmentId);

      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/gc/create-redirect-flow`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            enrollmentId,
            name: formSnapshot.name,
            email: formSnapshot.email,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.message || "Failed to start bank payment setup.");
      }

      window.location.href = data.redirectUrl;
    } catch (err) {
      console.error(err);
      setErrorMsg(err.message || "Something went wrong starting your bank setup.");
      setLoading(false);
    }
  };

  const inputClass =
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none placeholder:text-white/30 transition-colors";

  const renderRightPanel = () => {
    if (step === STEP_DONE) {
      return (
        <div className="flex flex-col items-center justify-center h-full py-16 text-center">
          <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/10">
            <CheckCircle size={32} className="text-green-400" />
          </div>
          <h3 className="mb-3 text-2xl font-bold text-white">First Payment Confirmed!</h3>
          <p className="max-w-xs leading-relaxed text-white/50">
            Your subscription enrollment has been received. We will send
            your direct debit details to your email within 24 hours.
          </p>
        </div>
      );
    }

    return (
      <>
        {errorMsg && (
          <div className="flex items-start gap-3 p-4 mb-5 border rounded-xl border-red-500/30 bg-red-500/10">
            <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
            <p className="text-sm text-red-400">{errorMsg}</p>
          </div>
        )}

        <StepIndicator current={step} />

        {/* Step 1: Personal details */}
        {step === STEP_FORM && (
          <>
            <form ref={form} className="space-y-5">
              <div>
                <label className="block mb-2 text-sm text-white/70">Full Name</label>
                <div className="relative">
                  <User size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                 <input
  type="text"
  name="name"
  required
  placeholder="Enter your full name"
  maxLength={100}
  value={contactDetails.name}
  onChange={handleContactChange}
  className={inputClass}
/>
                  {fieldErrors.name && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.name}</p>
                  )}
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
  placeholder="Enter your email"
  value={contactDetails.email}
  onChange={handleContactChange}
  className={inputClass}
/>
                  {fieldErrors.email && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.email}</p>
                  )}
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
  placeholder="Enter your phone number"
  maxLength={20}
  value={contactDetails.phone}
  onChange={handleContactChange}
  className={inputClass}
/>
                  {fieldErrors.phone && (
                    <p className="mt-1 text-xs text-red-400">{fieldErrors.phone}</p>
                  )}
                </div>
              </div>
              <div>
                <label className="block mb-2 text-sm text-white/70">Course</label>
                <input type="text" value="14 Certificate Fast-Track Course" readOnly className="w-full px-4 py-4 text-white border opacity-50 cursor-not-allowed rounded-xl bg-white/5 border-white/10" />
              </div>

              {!selectedSchedule && (
                <>
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Location</label>
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
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white/70">Date</label>
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
                  </div>
                </>
              )}

              {selectedSchedule && (
                <div className="p-4 border rounded-2xl border-cyan-400/20 bg-cyan-400/5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <div>
                          <p className="text-xs text-white/40">Selected Course Date</p>
                          <p className="mt-1 font-semibold text-white">
                            {selectedSchedule.date}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            localStorage.removeItem("selectedSchedule");
                            setSelectedSchedule(null);
                            setScheduleLocation("");
                            setScheduleDate("");
                          }}
                          className="transition-colors text-white/40 hover:text-red-400"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      <div className="mt-4">
                        <p className="text-xs text-white/40">Location</p>
                        <p className="mt-1 font-semibold text-cyan-400">
                          {selectedSchedule.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
            <button
              type="button"
              onClick={handleFormNext}
              disabled={loading}
              className="flex items-center justify-center w-full gap-2 py-4 mt-5 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 rounded-full border-black/40 border-t-black animate-spin" />
                  Preparing Agreement...
                </>
              ) : (
                "Continue to Agreement →"
              )}
            </button>
          </>
        )}

        {/* Step 2: Agreement signing — embedded inline, no new tab */}
        {step === STEP_AGREEMENT && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white">
                Sign Your Subscription Agreement
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Complete the form below. This page will continue automatically
                the moment your signature is confirmed — no need to switch tabs
                or press back.
              </p>
            </div>

            {embedError && (
              <div className="flex items-start gap-3 p-4 border rounded-xl border-red-500/30 bg-red-500/10">
                <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-400">
                  We couldn't load the signing widget. Please refresh the page,
                  or contact us if the problem continues.
                </p>
              </div>
            )}

            {(!signingUrl || !embedScriptReady) && !embedError && (
              <div className="flex flex-col items-center gap-3 py-10">
                <div className="w-8 h-8 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                <p className="text-xs text-white/30">Preparing your agreement…</p>
              </div>
            )}
<style>{`
  #${SIGNWELL_EMBED_CONTAINER_ID} {
    width: 100%;
    height: 520px;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
    touch-action: pan-x pan-y pinch-zoom;
  }
  #SignWell-Embedded-Iframe-Container {
    width: 100% !important;
    height: 520px !important;
  
  }
  #SignWell-Embedded-Iframe-Container iframe {
    width: 100% !important;
    height: 520px !important;
    border: none !important;
    
  }
`}</style>
            <div
              id={SIGNWELL_EMBED_CONTAINER_ID}
              className="min-h-[520px] rounded-xl overflow-hidden bg-white/5 border border-white/10"
            />

            {verifyingAgreement && (
              <div className="flex items-center justify-center gap-2 text-xs text-white/40">
                <div className="w-4 h-4 border-2 rounded-full border-cyan-400/60 border-t-transparent animate-spin" />
                Confirming your signature…
              </div>
            )}

            <button
              type="button"
              onClick={() => setStep(STEP_FORM)}
              className="text-sm transition-colors text-white/30 hover:text-white/60"
            >
              ← Back to details
            </button>
          </div>
        )}

        {/* Step 3: Identity verification */}
        {step === STEP_IDENTITY && (
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-white">Identity Verification</h3>
              <p className="text-sm text-white/40">
                Upload one valid identity or address document to continue.
              </p>
            </div>
            <IdentityVerification
              onVerified={(data) => {
                if (data) handleIdentityConfirmed(data);
              }}
            />
            <button
              type="button"
              onClick={() => { setStep(STEP_AGREEMENT); setErrorMsg(""); }}
              className="text-sm transition-colors text-white/30 hover:text-white/60"
            >
              ← Back to agreement
            </button>
          </div>
        )}

        {/* Step 4: Stripe £250 first payment */}
        {step === STEP_PAYMENT && (
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-white">Complete First Payment</h3>
              <p className="text-sm text-white/40">
                Your identity is verified. Pay £250 by card to secure your place.
              </p>
            </div>
            {stripeLoading ? (
              <div className="flex items-center justify-center p-5">
                <div className="w-6 h-6 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                <span className="ml-3 text-sm text-white/50">Setting up payment...</span>
              </div>
            ) : clientSecret ? (
              <>
                <div className={`flex items-start gap-3 p-4 mb-5 border rounded-xl transition-colors duration-200 ${isTermsAccepted ? "border-cyan-400/30 bg-cyan-400/5" : "border-white/10 bg-white/5"}`}>
                  <input
                    type="checkbox"
                    id="sub-terms"
                    checked={isTermsAccepted}
                    onChange={(e) => setIsTermsAccepted(e.target.checked)}
                    className="w-4 h-4 mt-0.5 shrink-0 accent-cyan-400 cursor-pointer"
                  />
                  <label htmlFor="sub-terms" className="text-sm leading-relaxed cursor-pointer text-white/60">
                    I have read and agree to the{" "}
                    <a href="/subscription-agreement" target="_blank" rel="noopener noreferrer" className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2">
                      Subscription Agreement
                    </a>{" "}
                    and understand that a Direct Debit mandate for £100/month
                    will be set up after this first payment.
                  </label>
                </div>
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

        {/* Step 5: GoCardless Direct Debit mandate for the £100/month */}
        {step === STEP_MANDATE && (
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-white">Set Up Direct Debit</h3>
              <p className="text-sm text-white/40">
                First payment received. Now set up your bank Direct Debit for
                the remaining £100/month — you'll be redirected to your bank to authorise it.
              </p>
            </div>

            <div className={`flex items-start gap-3 p-4 mb-5 border rounded-xl transition-colors duration-200 ${isTermsAccepted ? "border-cyan-400/30 bg-cyan-400/5" : "border-white/10 bg-white/5"}`}>
              <input
                type="checkbox"
                id="mandate-terms"
                checked={isTermsAccepted}
                onChange={(e) => setIsTermsAccepted(e.target.checked)}
                className="w-4 h-4 mt-0.5 shrink-0 accent-cyan-400 cursor-pointer"
              />
              <label htmlFor="mandate-terms" className="text-sm leading-relaxed cursor-pointer text-white/60">
                I authorise Faces On Faces Academy to collect £100 per
                month by Direct Debit via GoCardless, in line with the{" "}
                <a href="/subscription-agreement" target="_blank" rel="noopener noreferrer" className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2">
                  Subscription Agreement
                </a>.
              </label>
            </div>

            <div className="relative">
              {!isTermsAccepted && (
                <div className="absolute inset-0 z-10 rounded-xl bg-black/60 backdrop-blur-sm" />
              )}
              <button
                type="button"
                onClick={handleGoCardlessPayment}
                disabled={!isTermsAccepted || loading}
                className="flex items-center justify-center w-full gap-2 py-4 text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 rounded-full border-black/40 border-t-transparent animate-spin" />
                    Redirecting to your bank...
                  </>
                ) : (
                  "Continue to Bank Payment →"
                )}
              </button>
            </div>
          </div>
        )}
      </>
    );
  };

  return (
    <section className="min-h-screen bg-[#050505] py-20 px-6 overflow-x-hidden">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-xs tracking-widest uppercase border rounded-full border-cyan-400/30 text-cyan-400">
            Flexible Payment
          </span>
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Subscription{" "}
            <span className="italic font-light text-cyan-300">Enrollment</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-white/50">
           So you've decided to go down the subscription route, thats fantastic! Let me break 
           down exactly how ours works. It's £100 per month, with a £250 upfront fee, covering 
           academy operations. You'll get lifetime support, take a break, come back, retrain 
           free. If you face complications, we step in. You have a course credit allowance, 
           add courses, your fee stays £100. If regulations change, we'll adapt, any needed 
           upgrades just add a small extra monthly cost. Many return for this flexible, 
           ongoing support. Please read the agreement for full details!
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left — unchanged */}
          <div className="space-y-6">
            <div className="p-7 border rounded-3xl border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-light text-white">£250</span>
                <span className="mb-2 text-white/40">today</span>
              </div>
              <p className="text-sm text-cyan-400">Then £100 / month</p>
              <div className="pt-5 mt-6 space-y-3 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Deposit Today</span>
                  <span className="font-medium text-cyan-400">£250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">First Payments</span>
                  <span className="text-white">£100 /month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Course</span>
                  <span className="text-white text-right max-w-[180px]">14 Certificate Fast-Track Course</span>
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

          {/* Right */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
            {renderRightPanel()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionEnroll;