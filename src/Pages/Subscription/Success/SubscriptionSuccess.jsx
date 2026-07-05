import React, { useEffect, useState, useRef } from "react";
import { CheckCircle, Loader2, CreditCard, ShieldCheck } from "lucide-react";
import {
  completeGoCardlessFlow,
  createSubscription,
} from "../subscription.service";

const SubscriptionSuccess = () => {
  const [loading, setLoading] = useState(true);
  const [step, setStep] = useState("processing");
  const [error, setError] = useState("");
  const [data, setData] = useState(null);
  const hasRun = useRef(false);

  useEffect(() => {
    // React 18 StrictMode runs effects twice in development. A GoCardless
    // redirect flow can only be completed once, so a second call here would
    // fail with a 500. This guard makes sure `init` only ever runs once.
    if (hasRun.current) return;
    hasRun.current = true;

    const init = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams(window.location.search);
        const flowId = params.get("redirect_flow_id");
        // We append enrollmentId to success_redirect_url on the backend,
        // but fall back to localStorage in case it's ever missing.
        const enrollmentId =
          params.get("enrollmentId") || localStorage.getItem("enrollmentId");

        if (!flowId) {
          throw new Error("Missing redirect flow ID");
        }
        if (!enrollmentId) {
          throw new Error("Missing enrollment reference. Please contact support.");
        }

        // 1️⃣ complete redirect flow (session_token = enrollmentId, must match creation)
        const flowResult = await completeGoCardlessFlow(flowId, enrollmentId);

        if (!flowResult?.mandateId) {
          throw new Error("Mandate not created");
        }

        setStep("creating_subscription");

        // 2️⃣ create subscription (monthly payment)
        const subscriptionRes = await createSubscription({
          mandateId: flowResult.mandateId,
          enrollmentId,
        });

        if (!subscriptionRes.success) {
          throw new Error("Subscription failed");
        }

        setData({
          mandateId: flowResult.mandateId,
          subscriptionId: subscriptionRes.subscriptionId,
        });

        localStorage.removeItem("enrollmentId");
        setStep("done");
      } catch (err) {
        console.error(err);
        setError(err.message || "Something went wrong");
        setStep("error");
      } finally {
        setLoading(false);
      }
    };

    init();
  }, []);

  // UI states
  if (step === "processing" || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-white bg-black">
        <div className="space-y-4 text-center">
          <Loader2 className="mx-auto animate-spin text-cyan-400" size={40} />
          <h2 className="text-xl font-semibold">
            Processing your bank setup...
          </h2>
          <p className="text-sm text-white/50">
            Please wait while we confirm your direct debit mandate
          </p>
        </div>
      </div>
    );
  }

  if (step === "error") {
    return (
      <div className="flex items-center justify-center min-h-screen px-6 text-white bg-black">
        <div className="max-w-md space-y-4 text-center">
          <div className="text-red-400">
            <ShieldCheck size={50} className="mx-auto" />
          </div>
          <h2 className="text-xl font-semibold">Setup Failed</h2>
          <p className="text-sm text-white/60">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 mt-4 text-black bg-cyan-400 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center px-6">
      <div className="w-full max-w-xl p-8 space-y-6 text-center border border-white/10 bg-white/5 backdrop-blur-xl rounded-2xl">

        {/* Success Icon */}
        <div className="flex justify-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500/10">
            <CheckCircle className="text-green-400" size={32} />
          </div>
        </div>

        <h1 className="text-2xl font-bold">Bank Setup Complete 🎉</h1>

        <p className="text-sm leading-relaxed text-white/60">
          Your direct debit mandate has been successfully created.
          Your monthly subscription of <span className="font-medium text-cyan-400">£100</span> is now active.
        </p>

        {/* Details */}
        <div className="p-5 space-y-3 text-sm text-left border bg-white/5 border-white/10 rounded-xl">

          <div className="flex justify-between">
            <span className="text-white/50">Mandate ID</span>
            <span className="text-white">{data?.mandateId}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Subscription</span>
            <span className="text-cyan-400">Active</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Billing Cycle</span>
            <span>Monthly</span>
          </div>

          <div className="flex justify-between">
            <span className="text-white/50">Amount</span>
            <span>£100 / month</span>
          </div>
        </div>

        {/* Info box */}
        <div className="flex items-start gap-3 p-4 text-left border bg-cyan-400/5 border-cyan-400/20 rounded-xl">
          <CreditCard className="mt-1 text-cyan-400" size={18} />
          <p className="text-xs leading-relaxed text-white/60">
            Payments will be automatically deducted from your bank account every month.
            You can cancel anytime according to your subscription agreement.
          </p>
        </div>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          className="w-full py-3 font-medium text-black transition bg-cyan-400 rounded-xl hover:bg-cyan-300"
        >
          Go to Dashboard →
        </button>
      </div>
    </div>
  );
};

export default SubscriptionSuccess;