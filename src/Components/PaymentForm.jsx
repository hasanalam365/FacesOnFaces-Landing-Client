import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { AlertCircle, Lock } from "lucide-react";

const PaymentForm = ({ clientSecret, onPaymentSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");
  const [cardComplete, setCardComplete] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;
    if (!cardComplete) {
      setError("Please complete your card details.");
      return;
    }

    setProcessing(true);
    setError("");

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
      return;
    }

    if (
      result.paymentIntent &&
      result.paymentIntent.status === "succeeded"
    ) {
      await onPaymentSuccess(result.paymentIntent.id);
    } else {
      setError("Payment was not completed. Please try again.");
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
          }}
          onChange={(e) => {
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
        className="flex items-center justify-center w-full gap-2 py-4 mt-5 font-semibold text-black transition rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Lock size={16} />
        {processing ? "Processing Payment..." : "Pay £1,099 & Enroll"}
      </button>

      {/*  Trust badge */}
      <p className="mt-3 text-xs text-center text-white/30">
        🔒 Secured by Stripe — your card details are never stored on our servers
      </p>
    </form>
  );
};

export default PaymentForm;