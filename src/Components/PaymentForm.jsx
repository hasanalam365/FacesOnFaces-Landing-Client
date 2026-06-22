import React, { useState } from "react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const PaymentForm = ({
  clientSecret,
  onPaymentSuccess,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);

   

    const result =
      await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card,
          },
        }
      );

    if (result.error) {
      setError(result.error.message);
      setProcessing(false);
      return;
    }

   if (
  result.paymentIntent &&
  result.paymentIntent.status ===
    "succeeded"
) {
  await onPaymentSuccess(
    result.paymentIntent.id
  );
} 

    setProcessing(false);
  };

  return (
  <form onSubmit={handleSubmit} className="mt-6">
    <div className="p-5 border rounded-xl border-white/10 bg-white/5">
      <CardElement
        options={{
          style: {
            base: {
              color: "#ffffff",
              fontSize: "16px",
              "::placeholder": {
                color: "#94a3b8",
              },
            },
          },
        }}
      />
    </div>

    {error && (
      <p className="mt-3 text-sm text-red-400">
        {error}
      </p>
    )}

    <button
      type="submit"
      disabled={!stripe || !clientSecret || processing}
      className="w-full py-4 mt-5 font-semibold text-black transition rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:opacity-50"
    >
      {processing
        ? "Processing Payment..."
        : "Pay & Enroll"}
    </button>
  </form>
);
};

export default PaymentForm;