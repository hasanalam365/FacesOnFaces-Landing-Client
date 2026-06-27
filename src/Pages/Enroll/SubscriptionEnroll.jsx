import React, { useRef, useState, useEffect } from "react";
import {
  User, Mail, Phone, CheckCircle, ShieldCheck,
  CalendarDays, BadgeCheck, FileSignature, AlertCircle,
} from "lucide-react";
import PaymentForm from "../../Components/PaymentForm";

const steps = [
  {
    icon: <FileSignature size={20} className="text-cyan-400" />,
    title: "Sign Agreement",
    desc: "Complete and sign the subscription agreement sent to your email.",
  },
  {
    icon: <BadgeCheck size={20} className="text-cyan-400" />,
    title: "Confirm Enrollment",
    desc: "Our team reviews your application and confirms your course place.",
  },
  {
    icon: <CalendarDays size={20} className="text-cyan-400" />,
    title: "Direct Debit Setup",
    desc: "We set up your monthly direct debit of £100 for the remaining 11 months.",
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400" />,
    title: "Start Learning",
    desc: "Full course access from day one of your confirmed start date.",
  },
];

const SubscriptionEnroll = () => {
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
      setErrorMsg("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-subscription-payment-intent`,
        { method: "POST", headers: { "Content-Type": "application/json" } }
      );
      if (!response.ok) throw new Error("Server error");
      const data = await response.json();
      if (data.clientSecret) {
        setClientSecret(data.clientSecret);
      } else {
        throw new Error("No client secret received");
      }
    } catch {
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
        `${import.meta.env.VITE_API_URL}/create-subscription-enrollment`,
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
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none placeholder:text-white/30 transition-colors disabled:opacity-40 disabled:cursor-not-allowed";

  return (
    <section className="min-h-screen bg-[#050505] py-20 px-6">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-xs tracking-widest uppercase border rounded-full border-cyan-400/30 text-cyan-400">
            Flexible Payment
          </span>
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Subscription{" "}
            <span className="italic font-light text-cyan-300">Enrollment</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-white/50">
            Pay your first month today and spread the remaining cost over 11 equal monthly payments.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* Left */}
          <div className="space-y-6">
            <div className="p-7 border rounded-3xl border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-light text-white">£100</span>
                <span className="mb-2 text-white/40">today</span>
              </div>
              <p className="text-sm text-cyan-400">Then £100 / month × 11 remaining months</p>
              <div className="pt-5 mt-6 space-y-3 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">First Payment (Today)</span>
                  <span className="font-medium text-cyan-400">£100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Remaining Payments</span>
                  <span className="text-white">£100 × 11 months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total Amount</span>
                  <span className="text-white">£1,200</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Course</span>
                  <span className="text-white text-right max-w-[180px]">14 Certificate Fast-Track Course</span>
                </div>
              </div>
            </div>

            <div className="p-7 border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <h3 className="mb-6 text-lg font-semibold text-white">How It Works</h3>
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-cyan-400/10">
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{step.title}</p>
                      <p className="mt-0.5 text-xs text-white/40 leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-start gap-3 p-5 border rounded-2xl border-amber-400/20 bg-amber-400/5">
              <ShieldCheck size={18} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs leading-relaxed text-amber-300/80">
                A signed subscription agreement is required before enrollment is confirmed.
                Our team will send this to you after your first payment. Cancellation terms
                apply as per our Terms & Conditions.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

            {errorMsg && (
              <div className="flex items-start gap-3 p-4 mb-5 border rounded-xl border-red-500/30 bg-red-500/10">
                <AlertCircle size={18} className="text-red-400 mt-0.5 shrink-0" />
                <p className="text-sm text-red-400">{errorMsg}</p>
              </div>
            )}

            {paymentCompleted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/10">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">First Payment Confirmed!</h3>
                <p className="max-w-xs leading-relaxed text-white/50">
                  Your subscription enrollment has been received. We will send
                  your agreement and direct debit details to your email within 24 hours.
                </p>
              </div>
            ) : (
              <>
                <form ref={form} className="space-y-5">
                  <div>
                    <label className="block mb-2 text-sm text-white/70">Full Name</label>
                    <div className="relative">
                      <User size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                      <input type="text" name="name" required disabled={paymentCompleted} placeholder="Enter your full name" maxLength={100} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white/70">Email Address</label>
                    <div className="relative">
                      <Mail size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                      <input type="email" name="email" required disabled={paymentCompleted} placeholder="Enter your email" className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white/70">Phone Number</label>
                    <div className="relative">
                      <Phone size={18} className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2" />
                      <input type="tel" name="phone" required disabled={paymentCompleted} placeholder="Enter your phone number" maxLength={20} className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white/70">Course</label>
                    <input type="text" value="14 Certificate Fast-Track Course" readOnly className="w-full px-4 py-4 text-white border opacity-50 cursor-not-allowed rounded-xl bg-white/5 border-white/10" />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm text-white/70">First Payment</label>
                    <input type="text" value="£100 — First Month" readOnly className="w-full px-4 py-4 font-medium border cursor-not-allowed rounded-xl text-cyan-400 bg-white/5 border-white/10" />
                  </div>
                </form>

                <div className="mt-5">
                  {loading ? (
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
                          <a href="/terms-and-conditions" target="_blank" rel="noopener noreferrer" className="underline transition-colors text-cyan-400 hover:text-cyan-300 underline-offset-2">
                            Terms & Conditions
                          </a>{" "}
                          and understand that a signed subscription agreement is required
                          before enrollment is confirmed. The first payment of £100 is non-refundable.
                        </label>
                      </div>

                      <div className="relative">
                        {!isTermsAccepted && (
                          <div className="absolute inset-0 z-10 rounded-xl bg-black/60 backdrop-blur-sm" />
                        )}
                        <PaymentForm
                          clientSecret={clientSecret}
                          onPaymentSuccess={handlePaymentSuccess}
                        />
                      </div>
                    </>
                  ) : null}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionEnroll;