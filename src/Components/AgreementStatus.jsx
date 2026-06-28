import React, { useEffect, useState, useRef } from "react";
import { FileSignature, Clock, CheckCircle2, RefreshCw } from "lucide-react";

const POLL_INTERVAL_MS = 8000;

const AgreementStatus = ({ enrollmentId, onSigned }) => {
  const [status, setStatus] = useState("pending"); // pending | signed | error
  const [checking, setChecking] = useState(false);
  const intervalRef = useRef(null);

  const checkStatus = async () => {
    if (checking) return;
    setChecking(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/subscription-agreement-status/${enrollmentId}`
      );
      const data = await res.json();
      if (data.signed) {
        setStatus("signed");
        clearInterval(intervalRef.current);
        onSigned();
      }
    } catch {
      // silently retry
    } finally {
      setChecking(false);
    }
  };

  useEffect(() => {
    checkStatus();
    intervalRef.current = setInterval(checkStatus, POLL_INTERVAL_MS);
    return () => clearInterval(intervalRef.current);
  }, [enrollmentId]);

  if (status === "signed") {
    return (
      <div className="flex flex-col items-center gap-4 py-8 text-center">
        <div className="flex items-center justify-center rounded-full w-14 h-14 bg-green-500/10">
          <CheckCircle2 size={28} className="text-green-400" />
        </div>
        <div>
          <p className="font-semibold text-white">Agreement signed!</p>
          <p className="mt-1 text-sm text-white/40">
            Proceeding to payment...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 py-8 text-center">
      <div className="relative flex items-center justify-center rounded-full w-14 h-14 bg-amber-400/10">
        <FileSignature size={26} className="text-amber-400" />
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-amber-400" />
          <span className="relative inline-flex h-3.5 w-3.5 rounded-full bg-amber-400" />
        </span>
      </div>
      <div>
        <p className="font-semibold text-white">Waiting for your signature</p>
        <p className="max-w-xs mt-1 text-sm leading-relaxed text-white/40">
          We've sent the subscription agreement to your email via SignWell.
          Please open it and sign to continue.
        </p>
      </div>
      <div className="flex items-center gap-2 text-xs text-white/30">
        <Clock size={12} />
        <span>Checking automatically every 8 seconds</span>
      </div>
      <button
        type="button"
        onClick={checkStatus}
        disabled={checking}
        className="flex items-center gap-2 px-4 py-2 text-xs transition-colors border border-white/10 rounded-xl text-white/40 hover:text-white hover:border-white/20 disabled:opacity-40"
      >
        <RefreshCw size={12} className={checking ? "animate-spin" : ""} />
        Check now
      </button>
    </div>
  );
};

export default AgreementStatus;