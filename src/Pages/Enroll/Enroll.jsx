import React, { useRef, useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  CheckCircle,
  AlertCircle,
  Check,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import PaymentForm from "../../Components/PaymentForm";
import LeftSide from "./LeftSide";

// ─── Price Plans ───────────────────────────────────────────────
const plans = [
  {
    id: "full",
    badge: "Best Value",
    title: "Pay in Full",
    description:
      "One simple payment — no ongoing commitments. Unlock full course materials and lifetime access.",
    price: "£1,099",
    subText: "Save £500",
    buttonText: "Enroll & Pay in Full",
    featured: false,
    features: [
      "Full course access immediately",
      "Lifetime alumni network",
      "Save £500 vs other plans",
      "Priority scheduling",
    ],
  },
  {
    id: "deposit",
    badge: "Most Popular",
    title: "Deposit",
    description:
      "Reserve your spot with a deposit now and pay the remaining balance before your course start date.",
    price: "£250",
    subText: "Deposit today, then £849",
    buttonText: "Pay Deposit Now",
    featured: true,
    features: [
      "Secure your place instantly",
      "Balance due 14 days before start",
      "Full course access on day one",
      "Dedicated enrollment advisor",
    ],
  },
  {
    id: "subscription",
    badge: "Flexible",
    title: "Subscription",
    description:
      "Spread the cost with a monthly direct debit. Requires a signed subscription agreement before enrolment.",
    price: "£100",
    subText: "per month",
    buttonText: "Start Subscription",
    featured: false,
    features: [
      "12 equal monthly payments",
      "Direct debit setup",
      "Signed subscription agreement",
      "Cancel terms apply",
    ],
  },
];

// ─── Main Component ────────────────────────────────────────────
const Enroll = () => {
  const navigate = useNavigate();
  const form = useRef(null);
  const hasFetched = useRef(false);
  const formRef = useRef(null); // for scroll

  const [selectedPlan, setSelectedPlan] = useState(null); // null | 'full'
  const [clientSecret, setClientSecret] = useState("");
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);

  // Fetch payment intent only when full plan is selected
  const createPaymentIntent = async () => {
    try {
      setLoading(true);
      setErrorMsg("");
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/create-payment-intent`,
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

  const handlePlanSelect = (planId) => {
    if (planId === "deposit") {
      navigate("/deposit-enroll");
      return;
    }
    if (planId === "subscription") {
      navigate("/subscription-enroll");
      return;
    }
    // full
    setSelectedPlan("full");
    // scroll to form after short delay
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  // Fetch payment intent once when full plan is selected
  useEffect(() => {
    if (selectedPlan === "full" && !hasFetched.current) {
      hasFetched.current = true;
      createPaymentIntent();
    }
  }, [selectedPlan]);

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

        {/* ── Header ── */}
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Enroll Today &
            <span className="text-cyan-400"> Start Learning</span>
          </h1>
          <p className="max-w-2xl mx-auto text-white/60">
            Review the course details below and choose your preferred payment
            plan to secure your place.
          </p>
        </div>

        {/* ── Price Plan Cards ── */}
        <div className="relative mb-20">
          {/* background glow */}
          <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none" />

          <div className="relative z-10 mb-10 text-center">
            <p className="text-cyan-400 text-xs tracking-[4px] uppercase mb-4">
              Enrollment Options
            </p>
            <h2 className="font-serif text-4xl font-light text-white md:text-5xl">
              Choose Your{" "}
              <span className="italic text-cyan-300">Payment Plan</span>
            </h2>
            <p className="max-w-2xl mx-auto mt-4 text-gray-400">
              Flexible ways to start your journey — pay in full, leave a
              deposit, or subscribe monthly via direct debit.
            </p>
          </div>

          <div className="relative z-10 grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 flex flex-col min-h-[620px]
                  transition-all duration-500 cursor-pointer
                  ${
                    plan.featured
                      ? "bg-[#0f1519] border border-cyan-400 shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_30px_80px_rgba(34,211,238,0.35)]"
                      : selectedPlan === plan.id
                      ? "bg-[#0c1014] border border-cyan-400 scale-[1.02]"
                      : "bg-[#0c1014] border border-gray-800 hover:-translate-y-3 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]"
                  }`}
              >
                {/* Badge */}
                {plan.featured ? (
                  <div className="absolute -translate-x-1/2 -top-3 left-1/2">
                    <span className="px-4 py-1 text-xs font-semibold text-black rounded-full bg-cyan-400">
                      {plan.badge}
                    </span>
                  </div>
                ) : (
                  <div className="inline-flex px-4 py-1 mb-6 text-xs text-gray-300 border border-gray-700 rounded-full w-fit">
                    {plan.badge}
                  </div>
                )}

                <div className={plan.featured ? "mt-6" : ""}>
                  <h3 className="mb-3 text-2xl font-medium text-white">
                    {plan.title}
                  </h3>
                  <p className="mb-8 text-sm leading-relaxed text-gray-400">
                    {plan.description}
                  </p>
                  <div className="mb-8">
                    <h2 className="text-5xl font-light text-white">
                      {plan.price}
                    </h2>
                    <p
                      className={`text-sm mt-2 ${
                        plan.featured ? "text-cyan-400" : "text-gray-500"
                      }`}
                    >
                      {plan.subText}
                    </p>
                  </div>
                  <ul className="flex-grow space-y-4">
                    {plan.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-3 text-gray-300"
                      >
                        <Check
                          size={16}
                          className="flex-shrink-0 text-cyan-400"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Button */}
                <button
                  onClick={() => handlePlanSelect(plan.id)}
                  className={`mt-auto w-full py-4 rounded-full flex items-center justify-center gap-2 font-medium transition-all duration-300 ${
                    plan.featured
                      ? "bg-cyan-400 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)]"
                      : "border border-gray-700 hover:border-cyan-400 hover:bg-cyan-400/10 hover:text-cyan-300 text-white"
                  }`}
                >
                  {plan.buttonText}
                  <ArrowRight size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Course Details + Enrollment Form (shown after selecting full pay) ── */}
        <div ref={formRef} className="grid gap-10 lg:grid-cols-2">
          <LeftSide />

          {/* Right: Form */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">

            {!selectedPlan ? (
              /* Placeholder before plan selected */
              <div className="flex flex-col items-center justify-center h-full py-20 text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-cyan-400/10">
                  <ArrowRight size={28} className="text-cyan-400" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-white">
                  Select a Payment Plan
                </h3>
                <p className="max-w-xs text-white/40">
                  Choose your preferred payment option above to continue with
                  enrollment.
                </p>
              </div>
            ) : (
              <>
                {/* Global error */}
                {errorMsg && (
                  <div className="flex items-start gap-3 p-4 mb-5 border rounded-xl border-red-500/30 bg-red-500/10">
                    <AlertCircle
                      size={18}
                      className="text-red-400 mt-0.5 shrink-0"
                    />
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
                      <User
                        size={18}
                        className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2"
                      />
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
                      <Mail
                        size={18}
                        className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2"
                      />
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
                      <Phone
                        size={18}
                        className="absolute -translate-y-1/2 text-white/40 left-4 top-1/2"
                      />
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
                    <div className="flex items-center justify-center gap-3 p-5 border rounded-xl border-green-500/30 bg-green-500/10">
                      <CheckCircle
                        size={20}
                        className="text-green-400 shrink-0"
                      />
                      <p className="font-semibold text-green-400">
                        Payment Completed & Enrollment Confirmed!
                      </p>
                    </div>
                  ) : loading ? (
                    <div className="flex items-center justify-center p-5">
                      <div className="w-6 h-6 border-2 rounded-full border-cyan-400 border-t-transparent animate-spin" />
                      <span className="ml-3 text-sm text-white/50">
                        Setting up payment...
                      </span>
                    </div>
                  ) : clientSecret ? (
                    <>
                      {/* Terms checkbox */}
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
                          onChange={(e) =>
                            setIsTermsAccepted(e.target.checked)
                          }
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

                      {/* Payment form with overlay */}
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

export default Enroll;
