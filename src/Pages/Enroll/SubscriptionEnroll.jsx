import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  CheckCircle,
  ShieldCheck,
  CalendarDays,
  BadgeCheck,
  FileSignature,
} from "lucide-react";

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
    desc: "We set up your monthly direct debit of £100 for 12 months.",
  },
  {
    icon: <CheckCircle size={20} className="text-cyan-400" />,
    title: "Start Learning",
    desc: "Full course access from day one of your confirmed start date.",
  },
];

const SubscriptionEnroll = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isTermsAccepted) return;
    // TODO: connect to backend subscription endpoint
    setSubmitted(true);
  };

  const inputClass =
    "w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none placeholder:text-white/30 transition-colors";

  return (
    <section className="min-h-screen bg-[#050505] py-20 px-6">
      {/* Background glow */}
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 blur-[180px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-xs tracking-widest uppercase border rounded-full border-cyan-400/30 text-cyan-400">
            Flexible Payment
          </span>
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Subscription{" "}
            <span className="italic font-light text-cyan-300">Enrollment</span>
          </h1>
          <p className="max-w-xl mx-auto mt-4 text-white/50">
            Spread the cost of your training over 12 equal monthly payments.
            No large upfront commitment required.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-2">

          {/* ── Left: Summary + Steps ── */}
          <div className="space-y-6">

            {/* Price Summary */}
            <div className="p-7 border rounded-3xl border-cyan-500/20 bg-white/[0.03] backdrop-blur-xl">
              <div className="flex items-end gap-3 mb-1">
                <span className="text-5xl font-light text-white">£100</span>
                <span className="mb-2 text-white/40">/ month</span>
              </div>
              <p className="text-sm text-cyan-400">12 equal monthly payments</p>

              <div className="pt-5 mt-6 space-y-3 border-t border-white/10">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Total Course Fee</span>
                  <span className="text-white">£1,099</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Monthly Payment</span>
                  <span className="font-medium text-cyan-400">£100</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Duration</span>
                  <span className="text-white">12 months</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Course</span>
                  <span className="text-white text-right max-w-[180px]">
                    14 Certificate Fast-Track Course
                  </span>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="p-7 border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">
              <h3 className="mb-6 text-lg font-semibold text-white">
                How It Works
              </h3>
              <div className="space-y-5">
                {steps.map((step, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 rounded-full w-9 h-9 bg-cyan-400/10">
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {step.title}
                      </p>
                      <p className="mt-0.5 text-xs text-white/40 leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="flex items-start gap-3 p-5 border rounded-2xl border-amber-400/20 bg-amber-400/5">
              <ShieldCheck size={18} className="text-amber-400 mt-0.5 shrink-0" />
              <p className="text-xs leading-relaxed text-amber-300/80">
                A signed subscription agreement is required before enrollment is
                confirmed. Our team will send this to you after your application
                is received. Cancellation terms apply as per our Terms &
                Conditions.
              </p>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 backdrop-blur-xl">

            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-green-500/10">
                  <CheckCircle size={32} className="text-green-400" />
                </div>
                <h3 className="mb-3 text-2xl font-bold text-white">
                  Application Received!
                </h3>
                <p className="max-w-xs leading-relaxed text-white/50">
                  Thank you, <span className="text-white">{formData.name}</span>. Our team will review your
                  application and send the subscription agreement to{" "}
                  <span className="text-cyan-400">{formData.email}</span> within
                  24 hours.
                </p>
              </div>
            ) : (
              <>
                <h2 className="mb-6 text-xl font-semibold text-white">
                  Your Details
                </h2>

                <form onSubmit={handleSubmit} className="space-y-5">

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
                        value={formData.name}
                        onChange={handleChange}
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
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Enter your phone number"
                        maxLength={20}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Course — display only */}
                  <div>
                    <label className="block mb-2 text-sm text-white/70">
                      Course
                    </label>
                    <input
                      type="text"
                      value="14 Certificate Fast-Track Course"
                      readOnly
                      className="w-full px-4 py-4 text-white border opacity-50 cursor-not-allowed rounded-xl bg-white/5 border-white/10"
                    />
                  </div>

                  {/* Plan — display only */}
                  <div>
                    <label className="block mb-2 text-sm text-white/70">
                      Payment Plan
                    </label>
                    <input
                      type="text"
                      value="Subscription — £100 / month × 12"
                      readOnly
                      className="w-full px-4 py-4 font-medium border cursor-not-allowed rounded-xl text-cyan-400 bg-white/5 border-white/10"
                    />
                  </div>

                  {/* Terms */}
                  <div
                    className={`flex items-start gap-3 p-4 border rounded-xl transition-colors duration-200 ${
                      isTermsAccepted
                        ? "border-cyan-400/30 bg-cyan-400/5"
                        : "border-white/10 bg-white/5"
                    }`}
                  >
                    <input
                      type="checkbox"
                      id="sub-terms"
                      checked={isTermsAccepted}
                      onChange={(e) => setIsTermsAccepted(e.target.checked)}
                      className="w-4 h-4 mt-0.5 shrink-0 accent-cyan-400 cursor-pointer"
                    />
                    <label
                      htmlFor="sub-terms"
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
                      and understand that a signed subscription agreement is
                      required before enrollment is confirmed.
                    </label>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isTermsAccepted}
                    className="w-full py-4 mt-2 font-semibold text-black transition-all duration-300 rounded-full bg-cyan-400 hover:bg-cyan-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
                  >
                    Submit Application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubscriptionEnroll;
