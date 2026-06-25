import React, { useRef, useState, useEffect } from "react";
import { User, Mail, Phone, MessageSquare, CheckCircle, AlertCircle } from "lucide-react";
import PaymentForm from "../../Components/PaymentForm";
import LeftSide from "./LeftSide";

const Enroll = () => {
  const form = useRef(null);
  const hasFetched = useRef(false);

  const [clientSecret, setClientSecret] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(true);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setErrorMsg("");

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) throw new Error("Server error");

      const data = await response.json();

      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("No client secret received");
      }
    } catch (err) {
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

  const handlePaymentSuccess = async (paymentIntentId) => {
    try {
      setErrorMsg("");

      const formData = new FormData(form.current);

      const enrollmentData = {
        paymentIntentId,
        name: formData.get("name"),
        email: formData.get("email"),
        phone: formData.get("phone"),
       
      };

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-enrollment`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(enrollmentData),
        }
      );

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || "Enrollment failed");
      }

      const result = await response.json();

      if (result.success) {
        setPaymentCompleted(true);
        setClientSecret("");
        form.current.reset();
      } else {
        throw new Error("Enrollment failed. Please contact support.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong. Please contact support.");
    }
  };

  const inputClass =
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <section className="min-h-screen bg-[#050505] py-20">
      <div className="px-6 mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Enroll Today &
            <span className="text-cyan-400"> Start Learning</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/60">
            Review the course details below and complete your enrollment
            form to secure your place.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">
          <LeftSide />

          {/* Enrollment Form */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">

            {/* Global error message */}
            {errorMsg && (
              <div className="flex items-start gap-3 p-4 mb-5 border rounded-xl border-red-500/30 bg-red-500/10">
                <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-400">{errorMsg}</p>
              </div>
            )}

            <form ref={form} className="space-y-5">

              {/* Name */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Full Name
                </label>
                <div className="relative">
                  <User size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                  <input
                    type="text"
                    name="name"
                    required
                    disabled={paymentCompleted}
                    placeholder="Enter your full name"
                    maxLength={100}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Email Address
                </label>
                <div className="relative">
                  <Mail size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                  <input
                    type="email"
                    name="email"
                    required
                    disabled={paymentCompleted}
                    placeholder="Enter your email"
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Phone Number
                </label>
                <div className="relative">
                  <Phone size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    required
                    disabled={paymentCompleted}
                    placeholder="Enter your phone number"
                    maxLength={20}
                    className={inputClass}
                  />
                </div>
              </div>

              {/* Course — display only */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Course Name
                </label>
                <input
                  type="text"
                  value="14 Certificate Fast-Track Course"
                  readOnly
                  className="w-full px-4 py-4 text-white border cursor-not-allowed rounded-xl bg-white/5 border-white/10 opacity-60"
                />
              </div>

              {/* Fee — display only */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Course Fee
                </label>
                <input
                  type="text"
                  value="£1,099"
                  readOnly
                  className="w-full px-4 py-4 font-semibold border cursor-not-allowed rounded-xl text-cyan-400 bg-white/5 border-white/10"
                />
              </div>

            
            </form>

            {/* Payment section */}
            <div className="mt-5">
              {paymentCompleted ? (
                /* Success state */
                <div className="flex items-center justify-center gap-3 p-5 border rounded-xl border-green-500/30 bg-green-500/10">
                  <CheckCircle size={20} className="text-green-400 shrink-0" />
                  <p className="font-semibold text-green-400">
                    Payment Completed & Enrollment Confirmed!
                  </p>
                </div>
              ) : loading ? (
                /* Loading state */
                <div className="flex items-center justify-center p-5">
                  <div className="w-6 h-6 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                  <span className="ml-3 text-sm text-white/50">
                    Setting up payment...
                  </span>
                </div>
              ) : clientSecret ? (
                <>
                  {/* Terms & Conditions Checkbox */}
                  <div
                    className={`flex items-start gap-3 p-4 mb-5 border rounded-xl transition-colors duration-200 ${
                      isTermsAccepted
                        ? "border-cyan-400/30 bg-cyan-400/5"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="terms"
                      checked={isTermsAccepted}
                      onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 shrink-0 accent-cyan-400 cursor-pointer"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm leading-relaxed cursor-pointer text-white/60"
                    >
                      I have read and agree to the{" "}
                      <a
                        href="/terms-and-conditions"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2"
                      >
                        Terms & Conditions
                      </a>{" "}
                      and{" "}
                      <a
                        href="/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2"
                      >
                        Privacy Policy
                      </a>
                      . I understand that the enrollment fee of £1,099 is
                      non-refundable.
                    </label>
                  </div>

                  {/* Payment Form with overlay if terms not accepted */}
                  <div className="relative">
                    {!isTermsAccepted && (
                      <div className="absolute inset-0 z-10 flex items-center justify-center px-6 rounded-xl bg-black/60 backdrop-blur-sm">
                        <p className="text-sm text-center text-white/60">
                         
                        </p>
                      </div>
                    )}
                    <PaymentForm
                      clientSecret={clientSecret}
                      onPaymentSuccess={handlePaymentSuccess}
                    />
                  </div>
                </>
              ) : null}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;