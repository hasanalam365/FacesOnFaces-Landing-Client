import React from "react";
import {
  ShieldCheck,
  Database,
  CreditCard,
  Mail,
  Lock,
  UserCheck,
} from "lucide-react";

const PrivacyPolicy = () => {
  const sections = [
    {
      icon: <Database size={22} />,
      title: "Information We Collect",
      content: [
        "Full Name",
        "Email Address",
        "Phone Number",
        "Course Booking Details",
        "Billing Information",
        "IP Address and Device Information",
      ],
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "How We Use Your Information",
      content: [
        "Process course bookings and payments",
        "Provide customer support",
        "Send booking confirmations and updates",
        "Improve website performance and user experience",
        "Comply with legal and regulatory obligations",
      ],
    },
    {
      icon: <CreditCard size={22} />,
      title: "Payment Processing",
      content: [
        "All payments are securely processed through Stripe.",
        "We never store your credit card details.",
        "Payment information is encrypted and handled by trusted payment providers.",
      ],
    },
    {
      icon: <Mail size={22} />,
      title: "Marketing Communications",
      content: [
        "We may occasionally send training updates and promotional offers.",
        "You can unsubscribe from marketing communications at any time.",
      ],
    },
    {
      icon: <Lock size={22} />,
      title: "Data Security",
      content: [
        "We use appropriate security measures to protect your personal data.",
        "Your information is protected against unauthorised access, misuse, or disclosure.",
      ],
    },
    {
      icon: <UserCheck size={22} />,
      title: "Your Rights",
      content: [
        "Request access to your personal data",
        "Request correction of inaccurate information",
        "Request deletion of your data",
        "Withdraw marketing consent at any time",
      ],
    },
  ];

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden text-white bg-gradient-to-br from-slate-950 via-slate-900 to-black">
        <div className="container px-6 py-24 mx-auto">
          <div className="max-w-4xl">
            <span className="inline-flex items-center px-4 py-2 text-sm border rounded-full border-white/20 bg-white/10 backdrop-blur">
              Privacy Policy
            </span>

            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              Your Privacy Matters
            </h1>

            <p className="max-w-2xl mt-6 text-lg text-gray-300">
              At Faces On Faces Academy, we are committed to protecting
              your personal information and ensuring transparency in
              how your data is collected, used, and stored.
            </p>

            <div className="inline-flex px-4 py-2 mt-8 text-sm rounded-full bg-white/10">
              Last Updated: June 2026
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container px-6 py-20 mx-auto">
        <div className="max-w-5xl mx-auto">
          {/* INTRO */}
          <div className="p-8 mb-12 border border-gray-200 rounded-3xl bg-gray-50">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Introduction
            </h2>

            <p className="leading-relaxed text-gray-600">
              This Privacy Policy explains how Faces On Faces Academy
              collects, uses, stores, and protects personal information
              when you visit our website, book a training course, or
              contact us regarding our services.
            </p>
          </div>

          {/* POLICY SECTIONS */}
          <div className="space-y-8">
            {sections.map((section, index) => (
              <div
                key={index}
                className="p-8 transition bg-white border border-gray-200 shadow-sm rounded-3xl hover:shadow-md"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex items-center justify-center w-12 h-12 text-white bg-black rounded-2xl">
                    {section.icon}
                  </div>

                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-gray-600"
                    >
                      <span className="w-2 h-2 mt-2 bg-black rounded-full"></span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* THIRD PARTY */}
          <div className="p-8 mt-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Third-Party Services
            </h2>

            <p className="leading-relaxed text-gray-600">
              Our website may use trusted third-party services such as
              Stripe for payment processing and social media platforms
              for communication. These providers have their own privacy
              policies governing how they handle your information.
            </p>
          </div>

          {/* CONTACT */}
          <div className="p-10 mt-8 text-white bg-black rounded-3xl">
            <h2 className="mb-4 text-3xl font-bold">
              Contact Us
            </h2>

            <p className="mb-6 text-gray-300">
              If you have any questions regarding this Privacy Policy,
              please contact us.
            </p>

            <div className="space-y-2 text-gray-200">
              <p>Email: support@facesonfaces.com</p>
              <p>Instagram: @facesonfaces_</p>
              <p>Phone: 08009991751</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;