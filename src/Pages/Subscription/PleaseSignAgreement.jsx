import React from "react";
import { FileSignature } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

const PleaseSignAgreement = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const enrollmentId = searchParams.get("enrollmentId");

  const handleBack = () => {
    // If we know which enrollment this was, let SubscriptionEnroll try to
    // resume it (it reads subEnrollmentId/subFormSnapshot from localStorage
    // itself); otherwise just start fresh.
    navigate("/subscription-enroll");
  };

  return (
    <section className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 w-full max-w-md p-8 text-center border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
        <div className="flex items-center justify-center mx-auto mb-6 rounded-full w-14 h-14 bg-cyan-400/10">
          <FileSignature size={24} className="text-cyan-400" />
        </div>
        <h1 className="mb-3 text-2xl font-bold text-white">Please Sign In First</h1>
        <p className="mb-8 text-sm leading-relaxed text-white/50">
          {enrollmentId
            ? "We couldn't confirm that your subscription agreement has been signed yet. Please finish signing before continuing to identity verification and payment."
            : "You'll need to complete your details and sign your subscription agreement before you can continue."}
        </p>
        <button
          type="button"
          onClick={handleBack}
          className="w-full py-4 text-sm font-medium text-black transition-colors rounded-xl bg-cyan-400 hover:bg-cyan-300"
        >
          Go to Agreement →
        </button>
      </div>
    </section>
  );
};

export default PleaseSignAgreement;