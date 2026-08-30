import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import IdentityVerification from "../../Components/IdentityVerification";
import PaymentForm from "../../Components/PaymentForm";
import { trackEvent } from "../../utils/analytics";

// NOTE: this page's structure (identity -> payment -> GoCardless mandate)
// duplicates SubscriptionEnroll.jsx's inline flow. Confirmed first-payment
// amount is £250 (deposit today), then £100/month via GoCardless mandate —
// this file's UI text and tracking value are corrected to match below.
const FUNNEL_STEP = "subscription_continue";
const PAGE_NAME = "subscription_continue";

// Step IDs owned by this page
const STEP_IDENTITY = "identity";
const STEP_PAYMENT = "payment";
const STEP_MANDATE = "mandate";
const STEP_DONE = "done";

const STEP_LABELS = {
  [STEP_IDENTITY]: "Identity",
  [STEP_PAYMENT]: "First Payment",
  [STEP_MANDATE]: "Direct Debit",
};

const StepIndicator = ({ current }) => {
  const order = [STEP_IDENTITY, STEP_PAYMENT, STEP_MANDATE];
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
            <span className={`text-xs ${i === currentIdx ? "text-cyan-400" : "text-white/20"}`}>
              {STEP_LABELS[step]}
            </span>
          </div>
          {i < order.length - 1 && (
            <div className={`flex-1 h-px mb-4 transition-colors ${i < currentIdx ? "bg-cyan-400/50" : "bg-white/10"}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// Full-page gate states while we verify with the backend
const GateScreen = ({ label }) => (
  <section className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="border-2 rounded-full w-9 h-9 border-cyan-400 border-t-transparent animate-spin" />
      <p className="text-sm text-white/40">{label}</p>
    </div>
  </section>
);

const SubscriptionContinue = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // "checking" | "verified" | "denied"
  const [gateStatus, setGateStatus] = useState("checking");

  const [step, setStep] = useState(STEP_IDENTITY);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [enrollmentId, setEnrollmentId] = useState(null);
  const [formSnapshot, setFormSnapshot] = useState(null);
  const [identityData, setIdentityData] = useState(null);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const hasFetchedIntent = useRef(false);
  const [clientSecret, setClientSecret] = useState("");
  const [stripeLoading, setStripeLoading] = useState(true);

  // ── The gate: authoritative, server-side signed check.
  // We deliberately IGNORE ?signed=1 / ?document_status=completed from the
  // URL for access control — those are just SignWell's return params and a
  // user could type them by hand. The only source of truth is asking our
  // own backend, keyed by enrollmentId.
  useEffect(() => {
    const idFromUrl = searchParams.get("enrollmentId");
    const idFromStorage = localStorage.getItem("subEnrollmentId");
    const id = idFromUrl || idFromStorage;

    if (!id) {
      navigate("/please-sign-agreement", { replace: true });
      return;
    }

    let cancelled = false;

    const verify = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/subscription-agreement-status/${id}`);
        if (!res.ok) throw new Error("lookup failed");
        const data = await res.json();

        if (cancelled) return;

        const isSigned = Boolean(data.signed || data.status === "completed");
        if (!isSigned) {
          navigate(`/please-sign-agreement?enrollmentId=${id}`, { replace: true });
          return;
        }

        setEnrollmentId(id);

        // Rehydrate name/email/phone — prefer backend (works cross-device/tab),
        // fall back to localStorage snapshot saved before signing.
        const localSnapshot = JSON.parse(localStorage.getItem("subFormSnapshot") || "null");
        const snapshot =
          data.name && data.email && data.phone
            ? { name: data.name, email: data.email, phone: data.phone }
            : localSnapshot;

        if (!snapshot) {
          // Signed, but we have no way to know who — safest is to send them
          // back rather than let identity/payment run with empty data.
          navigate("/please-sign-agreement", { replace: true });
          return;
        }

        setFormSnapshot(snapshot);
        setGateStatus("verified");

        trackEvent("funnel_step_view", {
          step: FUNNEL_STEP,
          page: PAGE_NAME,
        });
      } catch (err) {
        if (!cancelled) {
          navigate("/please-sign-agreement", { replace: true });
        }
      }
    };

    verify();
    return () => { cancelled = true; };
  }, [searchParams, navigate]);

  const createPaymentIntent = async () => {
    try {
      setStripeLoading(true);
      setErrorMsg("");
      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-subscription-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      if (data.clientSecret) setClientSecret(data.clientSecret);
      else throw new Error("No client secret received");
    } catch {
      setErrorMsg("Payment setup failed. Please refresh and try again.");
    } finally {
      setStripeLoading(false);
    }
  };

  useEffect(() => {
    if (step !== STEP_PAYMENT || hasFetchedIntent.current) return;
    hasFetchedIntent.current = true;
    createPaymentIntent();
  }, [step]);

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
      body.append("documentType", data.documentType);
      if (data.documentNumber) body.append("documentNumber", data.documentNumber);
      body.append("frontFile", data.frontFile);
      if (data.backFile) body.append("backFile", data.backFile);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/create-subscription-pre-enrollment`, {
        method: "POST",
        body,
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || "Failed to create enrollment");
      }

      const result = await res.json();
      if (!result.enrollmentId) throw new Error("No enrollment ID returned");
      setEnrollmentId(result.enrollmentId);

      trackEvent("identity_verification_completed", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        substep: STEP_IDENTITY,
        next_substep: STEP_PAYMENT,
      });

      setStep(STEP_PAYMENT);
    } catch (err) {
      trackEvent("identity_verification_error", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        substep: STEP_IDENTITY,
        error_message: err.message,
      });

      setErrorMsg(err.message || "Something went wrong. Please try again.");
      setIdentityData(null);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      setErrorMsg("");
      const savedSchedule = JSON.parse(localStorage.getItem("selectedSchedule") || "null");

      const response = await fetch(`${import.meta.env.VITE_API_URL}/create-subscription-enrollment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          enrollmentId,
          name: formSnapshot.name,
          email: formSnapshot.email,
          phone: formSnapshot.phone,
          selectedDate: savedSchedule?.date || null,
          selectedLocation: savedSchedule?.location || null,
        }),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Enrollment failed");
      }

      const result = await response.json();
      if (result.success) {
        setIsTermsAccepted(false);
        localStorage.removeItem("selectedSchedule");

        // First payment (£250 deposit) is a real conversion in its own
        // right, tracked separately from the eventual £100/month mandate
        // completion (which happens off-site at the bank).
        trackEvent("subscription_first_payment_completed", {
          page: PAGE_NAME,
          step: FUNNEL_STEP,
          substep: STEP_PAYMENT,
          value: 250,
          currency: "GBP",
          plan: "subscription",
        });

        setStep(STEP_MANDATE);
      } else {
        throw new Error("Enrollment failed. Please contact support.");
      }
    } catch (err) {
      trackEvent("enrollment_error", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        substep: STEP_PAYMENT,
        error_message: err.message,
      });

      setErrorMsg(err.message || "Something went wrong. Please contact support.");
    }
  };

  const handleGoCardlessPayment = async () => {
    if (!enrollmentId) {
      setErrorMsg("Missing enrollment reference. Please restart the process.");
      return;
    }
    try {
      setLoading(true);
      setErrorMsg("");
      localStorage.setItem("enrollmentId", enrollmentId);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/gc/create-redirect-flow`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ enrollmentId, name: formSnapshot.name, email: formSnapshot.email }),
      });

      const data = await res.json();
      if (!res.ok || !data.redirectUrl) {
        throw new Error(data.message || "Failed to start bank payment setup.");
      }

      // Flow is complete from our side — clear the resumable state.
      localStorage.removeItem("subEnrollmentId");
      localStorage.removeItem("subFormSnapshot");
      localStorage.removeItem("subSigningUrl");

      trackEvent("mandate_setup_started", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        substep: STEP_MANDATE,
      });

      window.location.href = data.redirectUrl;
    } catch (err) {
      console.error(err);

      trackEvent("mandate_setup_error", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        substep: STEP_MANDATE,
        error_message: err.message,
      });

      setErrorMsg(err.message || "Something went wrong starting your bank setup.");
      setLoading(false);
    }
  };

  if (gateStatus === "checking") {
    return <GateScreen label="Checking your agreement status…" />;
  }

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

        {step === STEP_IDENTITY && (
          <div className="space-y-5">
            <div>
              <h3 className="mb-1 text-lg font-semibold text-white">Identity Verification</h3>
              <p className="text-sm text-white/40">
                Thanks, {formSnapshot?.name?.split(" ")[0] || "there"} — your agreement is
                signed. Upload one valid identity or address document to continue.
              </p>
            </div>
            <IdentityVerification onVerified={(data) => { if (data) handleIdentityConfirmed(data); }} />
          </div>
        )}

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
                  {!isTermsAccepted && <div className="absolute inset-0 z-10 rounded-xl bg-black/60 backdrop-blur-sm" />}
                  <PaymentForm clientSecret={clientSecret} onPaymentSuccess={handlePaymentSuccess} />
                </div>
              </>
            ) : null}
          </div>
        )}

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
              {!isTermsAccepted && <div className="absolute inset-0 z-10 rounded-xl bg-black/60 backdrop-blur-sm" />}
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

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-xs tracking-widest uppercase border rounded-full border-cyan-400/30 text-cyan-400">
            Agreement Signed
          </span>
          <h1 className="text-4xl font-bold text-white md:text-5xl">
            Finish Your <span className="italic font-light text-cyan-300">Enrollment</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-white/50">
            Just identity verification, your first payment, and your Direct
            Debit setup left to go.
          </p>
        </div>

        <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">
          {renderRightPanel()}
        </div>
      </div>
    </section>
  );
};

export default SubscriptionContinue;