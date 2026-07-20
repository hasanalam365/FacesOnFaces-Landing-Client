import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AlertCircle, Lock } from "lucide-react";
import { trackEvent } from "../utils/analytics";

const PaymentForm = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [cardComplete, setCardComplete] = useState(false);
  const hasTrackedStart = React.useRef(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!cardComplete) {
      setError("Please complete your card details.");
      return;
    }

    setProcessing(true);
    setError("");

    trackEvent("payment_submit_attempt", {
      component: "payment_form",
    });

    const card = elements.getElement(CardElement);

    // card null check
    if (!card) {
      setError("Card element not found. Please refresh.");
      setProcessing(false);
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: { card },
    });

    if (result.error) {
      // Stripe এর error message 
      setError(result.error.message);
      setProcessing(false);

      // Stripe's decline/error codes (card_declined, insufficient_funds,
      // expired_card, etc.) are the single most useful signal for why
      // people drop off right at the finish line — worth its own event
      // rather than folding into a generic enrollment_error.
      trackEvent("payment_declined", {
        component: "payment_form",
        error_code: result.error.code || "unknown",
        error_message: result.error.message,
      });
      return;
    }

    if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      await onPaymentSuccess(result.paymentIntent.id);
    } else {
      setError("Payment was not completed. Please try again.");
      trackEvent("payment_incomplete", {
        component: "payment_form",
        status: result.paymentIntent?.status || "unknown",
      });
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">

      {/* Card input */}
      <div className="p-5 border rounded-xl border-white/10 bg-white/5">
        <CardElement
          options={{
            style: {
              base: {
                color: "#ffffff",
                fontSize: "16px",
                "::placeholder": { color: "#94a3b8" },
              },
              invalid: {
                color: "#f87171", 
              },
            },
             hidePostalCode: true,
          }}
          onChange={(e) => {
            // Fires once, the first time someone actually starts typing
            // into the card field — a cleaner "began payment" signal than
            // the submit click, since it captures people who start but
            // never finish entering card details.
            if (!hasTrackedStart.current && (e.complete || e.value)) {
              hasTrackedStart.current = true;
              trackEvent("card_details_started", {
                component: "payment_form",
              });
            }

            setCardComplete(e.complete); 
            if (e.error) {
              setError(e.error.message);
            } else {
              setError("");
            }
          }}
        />
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 mt-3">
          <AlertCircle size={15} className="text-red-400 mt-0.5 shrink-0" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      {/* Submit button */}
      <button
        type="submit"
        disabled={!stripe || !clientSecret || processing || !cardComplete} 
        className="flex items-center justify-center w-full gap-2 py-4 mt-5 font-semibold text-black transition rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-100 disabled:cursor-not-allowed"
      >
        <Lock size={16} />
        {processing ? "Processing Payment..." : "Pay  & Enroll"}
      </button>

      {/*  Trust badge */}
      <p className="mt-3 text-xs text-center text-white/30">
        🔒 Secured by Stripe — your card details are never stored on our servers
      </p>
    </form>
  );
};

export default PaymentForm;