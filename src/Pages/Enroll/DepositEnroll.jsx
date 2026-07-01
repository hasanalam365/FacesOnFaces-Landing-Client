import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from "lucide-react";

import PaymentForm from "../../Components/PaymentForm";

const DepositEnroll = () => {
  const form = useRef(null);
  const hasFetched = useRef(false);

  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-deposit-payment-intent`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      }
    } catch (err) {
      setErrorMsg("Unable to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched.current) return;

    hasFetched.current = true;
    createPaymentIntent();
  }, []);

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      const formData = new FormData(form.current);

      const enrollmentData = {
        paymentIntentId,
        enrollmentType: "Deposit",

        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),

        course:
          "14 Certificate Fast-Track Course",

        depositPaid: "£250",
        remainingBalance: "£849",
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-deposit-enrollment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(enrollmentData),
        }
       
      );

      const result = await response.json();

      if (result.success) {
        setPaymentCompleted(true);
        form.current.reset();
      }
    } catch (err) {
      setErrorMsg(
        "Enrollment failed. Please contact support."
      );
    }
  };

  const inputClass =
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none";

  return (
    <section className="min-h-screen px-6 py-20 bg-black">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="px-4 py-1 text-sm border rounded-full border-cyan-400/30 text-cyan-400">
            Deposit Enrollment
          </span>

          <h1 className="mt-5 text-5xl font-bold text-white">
            Secure Your Place
          </h1>

          <p className="mt-4 text-white/60">
            Pay your deposit today and reserve
            your seat instantly.
          </p>
        </div>

        {/* Card */}
        <div className="border border-cyan-500/20 rounded-3xl bg-white/[0.03] backdrop-blur-xl p-8 shadow-[0_0_60px_rgba(34,211,238,0.08)]">

          {/* Course Summary */}
          <div className="p-6 mb-8 border rounded-2xl border-cyan-500/20 bg-cyan-500/5">
            <h3 className="text-xl font-semibold text-white">
              14
Certificate
Fast-Track
Course
            </h3>

            <div className="mt-5 space-y-3">
              <div className="flex justify-between">
                <span className="text-white/60">
                  Deposit Today
                </span>

                <span className="text-xl font-bold text-cyan-400">
                  £250
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-white/60">
                  Remaining Balance
                </span>

                <span className="text-white">
                  £849
                </span>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="flex gap-3 p-4 mb-6 border rounded-xl border-red-500/30 bg-red-500/10">
              <AlertCircle
                size={18}
                className="text-red-400 shrink-0"
              />
              <p className="text-sm text-red-400">
                {errorMsg}
              </p>
            </div>
          )}

          <form
            ref={form}
            className="space-y-5"
          >
            <div className="relative">
              <User
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-white/40"
              />

              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Mail
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-white/40"
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className={inputClass}
              />
            </div>

            <div className="relative">
              <Phone
                size={18}
                className="absolute -translate-y-1/2 left-4 top-1/2 text-white/40"
              />

              <input
                type="tel"
                name="phone"
                placeholder="Phone Number"
                required
                className={inputClass}
              />
            </div>
          </form>

          <div className="flex gap-3 p-4 mt-6 border rounded-xl border-cyan-400/20 bg-cyan-400/5">
            <input
              type="checkbox"
              checked={isTermsAccepted}
              onChange={(e) =>
                setIsTermsAccepted(
                  e.target.checked
                )
              }
              className="mt-1 accent-cyan-400"
            />

            <p className="text-sm text-white/60">
  I agree to the{" "}
  <Link to="/terms-and-conditions" className="text-blue-400 underline">
    Terms & Conditions
  </Link>
  {" "}and understand that the £250 deposit secures my place on the course.
</p>
          </div>

          <div className="mt-8">
            {paymentCompleted ? (
              <div className="flex items-center justify-center gap-3 p-5 border rounded-xl border-green-500/20 bg-green-500/10">
                <CheckCircle
                  className="text-green-400"
                />
                <span className="font-semibold text-green-400">
                  Deposit Paid Successfully
                </span>
              </div>
            ) : loading ? (
              <div className="flex justify-center py-8">
                <div className="w-8 h-8 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
              </div>
            ) : (
              <>
                {!isTermsAccepted && (
                  <div className="flex items-center gap-2 mb-4 text-sm text-amber-400">
                    <ShieldCheck size={16} />
                    Accept terms to continue.
                  </div>
                )}

                <div
                  className={
                    !isTermsAccepted
                      ? "pointer-events-none opacity-40"
                      : ""
                  }
                >
                  <PaymentForm
                    clientSecret={clientSecret}
                    onPaymentSuccess={
                      handlePaymentSuccess
                    }
                  />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DepositEnroll;