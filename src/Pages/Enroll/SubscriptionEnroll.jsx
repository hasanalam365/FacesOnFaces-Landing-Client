import React, { useRef, useState, useEffect } from "react";
import {
  User, Mail, Phone, CheckCircle, ShieldCheck,
  CalendarDays, BadgeCheck, FileSignature, AlertCircle, X,
  Calendar,
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

// Modal shown right before the user is taken to open+sign the agreement,
// so they know they need to come back to this page after signing.
const AgreementNoticeModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-md p-7 border rounded-3xl border-cyan-500/20 bg-[#0a0a0a]">
        <div className="flex items-center justify-center w-12 h-12 mb-5 rounded-full bg-cyan-400/10">
          <FileSignature size={22} className="text-cyan-400" />
        </div>
        <h3 className="mb-2 text-lg font-semibold text-white">
          Before You Sign
        </h3>
        <p className="mb-6 text-sm leading-relaxed text-white/50">
          Your agreement will open in a new tab. Once you have finished
          signing, please return to this page — it will automatically
          continue to the next step for you.
        </p>
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 text-sm font-medium transition-colors border rounded-xl border-white/10 text-white/60 hover:text-white hover:border-white/20"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex items-center justify-center flex-1 gap-2 py-3 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
          >
            Got it, Open Agreement →
          </button>
        </div>
      </div>
    </div>
  );
};

const SubscriptionEnroll = () => {
  const form = useRef(null);

  const [step, setStep] = useState(STEP_FORM);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [canVerify, setCanVerify] = useState(false);
  

  // Modal shown before moving from the details form into the agreement step
  const [showAgreementNotice, setShowAgreementNotice] = useState(false);

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
  const [checkingAgreement, setCheckingAgreement] = useState(false);
  const [agreementSigned2, setAgreementSigned2] = useState(false);
  const pollRef = useRef(null);
  const [signingUrl, setSigningUrl] = useState(null);
  const [searchParams] = useSearchParams();

const [selectedSchedule, setSelectedSchedule] = useState(null);

useEffect(() => {
  const date = searchParams.get("date");
  const location = searchParams.get("location");

  if (date && location) {
    localStorage.setItem(
      "selectedSchedule",
      JSON.stringify({
        date,
        location,
      })
    );
  }
}, [searchParams]);

useEffect(() => {
  const savedSchedule = JSON.parse(
    localStorage.getItem("selectedSchedule") || "null"
  );

  if (savedSchedule) {
    setSelectedSchedule(savedSchedule);
  }
}, []);

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

  useEffect(() => {
    if (step !== STEP_AGREEMENT || !enrollmentId || agreementSigned) return;

    let timeoutId = null;
    let isMounted = true; // Component active ache কিনা track korbe

    const checkStatus = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/subscription-agreement-status/${enrollmentId}`
        );

        // Backend jodi 429 dey, tahole loop ektu dhire chalabo (15 second opekka korbo)
        if (res.status === 429) {
          console.warn("Rate limited! Retrying in 15 seconds...");
          if (isMounted) timeoutId = setTimeout(checkStatus, 15000);
          return;
        }

        if (!res.ok) {
          // Onno kono error hole 8 second por abar try korbe
          if (isMounted) timeoutId = setTimeout(checkStatus, 8000);
          return;
        }

        const data = await res.json();

        console.log("Backend response data:", data);

        if (data.signed || data.status === 'completed') {
          setAgreementSigned(true);
          setStep(STEP_IDENTITY);
          return; // stop here, no need to touch signingUrl or reschedule
        }

        // Not signed yet — grab/refresh the Client's embedded signing URL if we don't have one
        if (data.signingUrl && !signingUrl) {
          setSigningUrl(data.signingUrl);
        }

        // User jodi ekhono sign na kore, tobe thik 8 second por porer request-ta jabe
        if (isMounted) timeoutId = setTimeout(checkStatus, 8000);
      } catch (error) {
        console.error("Polling error:", error);
        // Network crash ba onno error-eও 8 second por try korbe
        if (isMounted) timeoutId = setTimeout(checkStatus, 8000);
      }
    };

    // Prothom request-ta 3 second por shuru hobe, jate mount hobar sathe sathe hit na khay
    timeoutId = setTimeout(checkStatus, 3000);

    return () => {
      isMounted = false;
      clearTimeout(timeoutId); // Component unmount ba step change hole loop ekbare bondho!
    };
  }, [step, enrollmentId, agreementSigned, signingUrl]);

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
      if (data.signingUrl) setSigningUrl(data.signingUrl); // embedded signing URL for the Client
      setStep(STEP_AGREEMENT);
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // "Open Agreement to Sign" button (Step 2) → show the notice modal first.
  // Only once the user confirms does the agreement actually open in a new tab.
  const handleOpenAgreementClick = () => {
    setShowAgreementNotice(true);
  };

  // Modal confirmed → open the signing link in a new tab and close the modal
  const confirmOpenAgreement = () => {
    if (signingUrl) {
      window.open(signingUrl, "_blank", "noopener,noreferrer");
    }
    setShowAgreementNotice(false);
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
      body.append("enrollmentId", enrollmentId); // ⬅️ same record update হবে
      body.append("documentType", data.documentType);
      if (data.documentNumber) body.append("documentNumber", data.documentNumber);
      body.append("frontFile", data.frontFile);
      if (data.backFile) body.append("backFile", data.backFile);

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

  // Step 4-এ ঢোকার সাথে সাথে একবার Stripe payment intent তৈরি করা
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

      // Needed on the success page after the bank redirect brings the user back
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

      window.location.href = data.redirectUrl; // 🚀 redirect to bank page
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
             {selectedSchedule && (
  <div className="p-4 border rounded-2xl border-cyan-400/20 bg-cyan-400/5">
    <div className="flex items-start justify-between gap-4">

      <div className="flex-1">
        <div className="flex justify-between">

          <div>
            <p className="text-xs text-white/40">
              Selected Course Date
            </p>

            <p className="mt-1 font-semibold text-white">
              {selectedSchedule.date}
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              localStorage.removeItem("selectedSchedule");
              setSelectedSchedule(null);
            }}
            className="transition-colors text-white/40 hover:text-red-400"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-4">
          <p className="text-xs text-white/40">
            Location
          </p>

          <p className="mt-1 font-semibold text-cyan-400">
            {selectedSchedule.location}
          </p>
        </div>

      </div>

    </div>
  </div>
)}
              {/* <div>
                <label className="block mb-2 text-sm text-white/70">Deposit Today</label>
                <input type="text" value="£250 — Deposit Today" readOnly className="w-full px-4 py-4 font-medium border cursor-not-allowed rounded-xl text-cyan-400 bg-white/5 border-white/10" />
              </div> */}
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

        {/* Step 2: Agreement signing */}
        {step === STEP_AGREEMENT && (
          <div className="space-y-4 text-center">
            <div>
              <h3 className="text-lg font-semibold text-white">
                Sign Your Subscription Agreement
              </h3>
              <p className="mt-2 text-sm text-white/40">
                Open your agreement below and sign it — this page will continue
                automatically once it's confirmed.
              </p>
            </div>

            {signingUrl ? (
              <button
                type="button"
                onClick={handleOpenAgreementClick}
                className="inline-block w-full py-4 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
              >
                Open Agreement to Sign →
              </button>
            ) : (
              <div className="flex flex-col items-center gap-3 py-6">
                <div className="w-8 h-8 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                <p className="text-xs text-white/30">Preparing your agreement…</p>
              </div>
            )}

            <div className="flex flex-col items-center gap-3 pt-2">
              <div className="w-6 h-6 border-2 rounded-full border-cyan-400/50 border-t-transparent animate-spin" />
              <p className="text-xs text-white/30">Waiting for signature confirmation…</p>
            </div>

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

      {showAgreementNotice && (
        <AgreementNoticeModal
          onCancel={() => setShowAgreementNotice(false)}
          onConfirm={confirmOpenAgreement}
        />
      )}

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
           down exactly how ours works. It’s £100 per month, with a £250 upfront fee, covering 
           academy operations. You’ll get lifetime support, take a break, come back, retrain 
           free. If you face complications, we step in. You have a course credit allowance, 
           add courses, your fee stays £100. If regulations change, we’ll adapt, any needed 
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