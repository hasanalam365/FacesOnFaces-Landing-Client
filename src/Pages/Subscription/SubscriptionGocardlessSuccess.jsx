import React, { useEffect, useRef, useState } from "react";
import { CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { completeGoCardlessFlow, createSubscription } from "./subscription.service";
import { trackEvent } from "../../utils/analytics";

// NOTE: this component completes the exact same GoCardless flow as
// SubscriptionSuccess.jsx (same completeGoCardlessFlow + createSubscription
// calls). If both routes are actually live for the same user journey,
// "mandate_completed" could fire twice for one real conversion. Confirm
// which of the two pages GoCardless actually redirects to, and consider
// removing tracking from (or deleting) whichever one is unused.
const FUNNEL_STEP = "subscription_success";
const FUNNEL_STEP_ORDER = 4;
const PAGE_NAME = "subscription_gocardless_success";

// "processing" | "success" | "error"
const SubscriptionGoCardlessSuccess = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("processing");
  const [errorMsg, setErrorMsg] = useState("");
  const ranOnce = useRef(false);

  const runCompletion = async () => {
    setStatus("processing");
    setErrorMsg("");

    trackEvent("funnel_step_view", {
      step: FUNNEL_STEP,
      step_order: FUNNEL_STEP_ORDER,
      page: PAGE_NAME,
    });

    // GoCardless's Redirect Flow API appends this on the way back from the bank.
    const flowId = searchParams.get("redirect_flow_id");
    // Set by handleGoCardlessPayment() in SubscriptionContinue.jsx right before
    // sending the user off to their bank — survives the off-site redirect.
    const enrollmentId = localStorage.getItem("enrollmentId");

    if (!flowId || !enrollmentId) {
      // Nothing to complete — most likely someone landed here directly.
      navigate("/please-sign-agreement", { replace: true });
      return;
    }

    try {
      // Step 1: exchange the redirect flow for a confirmed mandate.
      const completeResult = await completeGoCardlessFlow(flowId, enrollmentId);

      // Step 2: create the recurring £100/month subscription against that mandate.
      await createSubscription({
        enrollmentId,
        mandateId: completeResult.mandateId,
      });

      // All done — clear every bit of resumable state from the whole flow.
      localStorage.removeItem("enrollmentId");
      localStorage.removeItem("subEnrollmentId");
      localStorage.removeItem("subFormSnapshot");
      localStorage.removeItem("subSigningUrl");
      localStorage.removeItem("selectedSchedule");

      trackEvent("mandate_completed", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        plan: "subscription",
        value: 100,
        currency: "GBP",
        billing_cycle: "monthly",
      });

      setStatus("success");
    } catch (err) {
      setErrorMsg(err.message || "We couldn't finish setting up your Direct Debit.");
      setStatus("error");

      trackEvent("mandate_completion_error", {
        page: PAGE_NAME,
        step: FUNNEL_STEP,
        error_message: err.message,
      });
    }
  };

  useEffect(() => {
    if (ranOnce.current) return;
    ranOnce.current = true;
    runCompletion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 text-center border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
        {status === "processing" && (
          <>
            <div className="mx-auto mb-6 border-2 rounded-full w-9 h-9 border-cyan-400 border-t-transparent animate-spin" />
            <h1 className="mb-2 text-xl font-semibold text-white">Confirming Your Direct Debit</h1>
            <p className="text-sm leading-relaxed text-white/50">
              Your bank has authorised the mandate. We're finishing setting up
              your monthly subscription now — this only takes a moment.
            </p>
          </>
        )}

        {status === "success" && (
          <>
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-6 rounded-full bg-green-500/10">
              <CheckCircle size={32} className="text-green-400" />
            </div>
            <h1 className="mb-3 text-2xl font-bold text-white">You're All Set!</h1>
            <p className="max-w-xs mx-auto leading-relaxed text-white/50">
              Your £100/month Direct Debit is confirmed. We'll email you your
              course start details shortly.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <div className="flex items-center justify-center mx-auto mb-6 rounded-full w-14 h-14 bg-red-500/10">
              <AlertCircle size={24} className="text-red-400" />
            </div>
            <h1 className="mb-3 text-xl font-semibold text-white">Something Went Wrong</h1>
            <p className="mb-6 text-sm leading-relaxed text-white/50">
              {errorMsg} Your bank mandate may still have gone through — please
              try again, and contact us if this keeps happening.
            </p>
            <button
              type="button"
              onClick={() => {
                trackEvent("mandate_retry_click", {
                  page: PAGE_NAME,
                  step: FUNNEL_STEP,
                });
                runCompletion();
              }}
              className="inline-flex items-center justify-center w-full gap-2 py-4 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
            >
              <RefreshCw size={16} />
              Try Again
            </button>
          </>
        )}
      </div>
    </section>
  );
};

export default SubscriptionGoCardlessSuccess;