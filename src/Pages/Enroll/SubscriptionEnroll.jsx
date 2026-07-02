import React, { useRef, useState, useEffect } from "react";
import {
  User, Mail, Phone, CheckCircle, ShieldCheck,
  CalendarDays, BadgeCheck, FileSignature, AlertCircle,
} from "lucide-react";
import PaymentForm from "../../Components/PaymentForm";
import IdentityVerification from "../../Components/IdentityVerification";
// import AgreementStatus from "../../Components/AgreementStatus";
// import AgreementSigning from "../../Components/AgreementSigning";



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
const STEP_IDENTITY = "identity";
const STEP_AGREEMENT = "agreement";
const STEP_PAYMENT = "payment";
const STEP_DONE = "done";

const STEP_LABELS = {
  [STEP_FORM]: "Your Details",
  [STEP_IDENTITY]: "Identity",
  [STEP_AGREEMENT]: "Agreement",
  [STEP_PAYMENT]: "Payment",
};

const StepIndicator = ({ current }) => {
  const order = [STEP_FORM, STEP_IDENTITY, STEP_AGREEMENT, STEP_PAYMENT];
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
  const hasFetched = useRef(false);

  const [step, setStep] = useState(STEP_FORM);
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Collected data across steps
  const [identityData, setIdentityData] = useState(null);
  const [enrollmentId, setEnrollmentId] = useState(null);
  const [formSnapshot, setFormSnapshot] = useState(null);
const [fieldErrors, setFieldErrors] = useState({});
const [agreementSigned, setAgreementSigned] = useState(false);
const [checkingAgreement, setCheckingAgreement] = useState(false);

  
  const createPaymentIntent = async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    createPaymentIntent();
  }, []);

  // Step 1 → Step 2: validate form fields then proceed to identity
  const handleFormNext = () => {
    const f = form.current;
    const name = f.querySelector('[name="name"]').value.trim();
    const email = f.querySelector('[name="email"]').value.trim();
    const phone = f.querySelector('[name="phone"]').value.trim();

    if (!name || !email || !phone) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setErrorMsg("Please enter a valid email address.");
      return;
    }
    setErrorMsg("");
    setFormSnapshot({ name, email, phone });
    setStep(STEP_IDENTITY);
  };

  // Step 2 → Step 3: identity verified, send agreement via backend
  const handleIdentityConfirmed = async (data) => {
  if (!data) return;
  setIdentityData(data);
  setErrorMsg("");

  try {
    const body = new FormData();
    body.append("name", formSnapshot.name);
    body.append("email", formSnapshot.email);
    body.append("phone", formSnapshot.phone);
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
    setStep(STEP_AGREEMENT); // Agreement signing step এ যাবে
  } catch (err) {
    setErrorMsg(err.message || "Something went wrong. Please try again.");
    setIdentityData(null);
  }
};

  // Step 3 → Step 4: agreement signed
//  const handleAgreementSigned = async (signatureDataUrl) => {
//   try {
//     setErrorMsg("");
//     const res = await fetch(
//       `${import.meta.env.VITE_API_URL}/save-subscription-signature`,
//       {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           enrollmentId,
//           signature: signatureDataUrl,
//         }),
//       }
//     );

//     if (!res.ok) {
//       const err = await res.json();
//       throw new Error(err.message || "Failed to save signature");
//     }

//     setTimeout(() => setStep(STEP_PAYMENT), 1200);
//   } catch (err) {
//     setErrorMsg(err.message || "Could not save signature. Please try again.");
//   }
// };

  // Step 4: payment success → enrollment complete
  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      setErrorMsg("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-subscription-enrollment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            paymentIntentId,
            enrollmentId,
            name: formSnapshot.name,
            email: formSnapshot.email,
            phone: formSnapshot.phone,
          }),
        }
      );
      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Enrollment failed");
      }
      const result = await response.json();
      if (result.success) {
        setStep(STEP_DONE);
        setClientSecret("");
      } else {
        throw new Error("Enrollment failed. Please contact support.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please contact support.");
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

const handleFormNext = () => {
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
  setFormSnapshot({ name, email, phone });
  setStep(STEP_IDENTITY);
};
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
              <div>
                <label className="block mb-2 text-sm text-white/70">First Payment</label>
                <input type="text" value="£250 — First Payment" readOnly className="w-full px-4 py-4 font-medium border cursor-not-allowed rounded-xl text-cyan-400 bg-white/5 border-white/10" />
              </div>
            </form>
            <button
              type="button"
              onClick={handleFormNext}
              className="w-full py-4 mt-5 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
            >
              Continue to Identity Verification →
            </button>
          </>
        )}

        {/* Step 2: Identity verification */}
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
              onClick={() => { setStep(STEP_FORM); setErrorMsg(""); }}
              className="text-sm transition-colors text-white/30 hover:text-white/60"
            >
              ← Back to details
            </button>
          </div>
        )}

        {/* Step 3: Agreement signing */}
{step === STEP_AGREEMENT && enrollmentId && (
  <div className="space-y-6 text-center">
    
    <div>
      <h3 className="text-lg font-semibold text-white">
        Sign Your Subscription Agreement
      </h3>
      <p className="mt-2 text-sm text-white/40">
        You will be redirected to SignWell to complete your contract signing.
      </p>
    </div>

    <a
      href="https://www.signwell.com/new_doc/mJqGWFFh9guBx8e5"
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-full py-4 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
      onClick={() => {
        setCheckingAgreement(true);
        setTimeout(() => setCheckingAgreement(false), 60000);
      }}
    >
      Open Contract in SignWell →
    </a>

    <p className="text-xs text-white/30">
      After signing, return here and continue.
    </p>

    {checkingAgreement && (
      <p className="text-xs text-amber-400">
        Checking agreement status...
      </p>
    )}

    <button
      type="button"
      onClick={async () => {
        try {
          setCheckingAgreement(true);

          const res = await fetch(
            `${import.meta.env.VITE_API_URL}/check-agreement-status/${enrollmentId}`
          );

          const data = await res.json();

          if (data.signed === true) {
            setAgreementSigned(true);
            setStep(STEP_PAYMENT);
          } else {
            alert("Agreement not signed yet. Please complete signing first.");
          }
        } catch (err) {
          alert("Unable to verify agreement. Try again.");
        } finally {
          setCheckingAgreement(false);
        }
      }}
      className="w-full py-3 text-sm transition border text-cyan-400 border-cyan-400/30 rounded-xl hover:bg-cyan-400/10"
    >
      I’ve Signed → Verify & Continue
    </button>

  </div>
)}

        {/* Step 4: Payment */}
        {step === STEP_PAYMENT && (
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-white">Complete Payment</h3>
              <p className="text-sm text-white/40">
                Your agreement is signed. Pay £250 to secure your place.
              </p>
            </div>
            {loading ? (
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
                    and understand that a signed subscription agreement is required before enrollment is confirmed.
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
      </>
    );
  };

  return (
    <section className="min-h-screen bg-[#050505] py-20 px-6">
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
            Pay your first month today and spread the remaining cost over equal every month payments.
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
                  <span className="text-white/50">First Payment (Today)</span>
                  <span className="font-medium text-cyan-400">£250</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Remaining Payments</span>
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

            <div className="flex items-start gap-3 p-5 border rounded-2xl border-amber-400/20 bg-amber-400/5">
              <ShieldCheck size={18} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs leading-relaxed text-amber-300/80">
                A signed subscription agreement is required before enrollment is confirmed.
                Our team will send this to you after your first payment. Cancellation terms
                apply as per our Terms & Conditions.
              </p>
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