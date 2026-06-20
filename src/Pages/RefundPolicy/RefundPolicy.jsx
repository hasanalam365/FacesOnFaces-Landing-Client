import React from "react";
import {
  Receipt,
  CalendarX,
  RefreshCw,
  AlertTriangle,
  ShieldAlert,
  Mail,
} from "lucide-react";

const RefundPolicy = () => {
  const sections = [
    {
      icon: <CalendarX size={22} />,
      title: "Course Cancellations",
      content: [
        "Cancellations made more than 4 weeks before the course date incur a 25% administration fee.",
        "This fee helps cover staffing, administrative costs, and model arrangements.",
      ],
    },
    {
      icon: <Receipt size={22} />,
      title: "Late Cancellation Fees",
      content: [
        "Cancellations made within 4 weeks of the course date incur a 50% cancellation fee.",
        "Refund amounts will be calculated after applicable cancellation charges have been deducted.",
      ],
    },
    {
      icon: <RefreshCw size={22} />,
      title: "Course Transfers",
      content: [
        "Where possible, students may be transferred to an alternative course date.",
        "Alternative dates are subject to availability and academy approval.",
      ],
    },
    {
      icon: <AlertTriangle size={22} />,
      title: "Acts of God",
      content: [
        "Refunds are not available for cancellations caused by events beyond human control.",
        "Examples include severe weather, flooding, natural disasters, transport disruptions, and similar circumstances.",
      ],
    },
    {
      icon: <ShieldAlert size={22} />,
      title: "OFQUAL Registered Courses",
      content: [
        "Courses registered with an OFQUAL awarding body cannot be cancelled once registration has been completed.",
        "Any outstanding balance remains payable according to your invoice terms.",
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
              Refund Policy
            </span>

            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              Refund & Cancellation Policy
            </h1>

            <p className="max-w-2xl mt-6 text-lg text-gray-300">
              Please review our refund and cancellation terms before
              booking any training course with Faces On Faces Academy.
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
              Refund Policy Overview
            </h2>

            <p className="leading-relaxed text-gray-600">
              We understand that circumstances can change. This Refund
              Policy explains the conditions under which course bookings
              may be cancelled, transferred, or refunded.
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

          {/* CONSUMER RIGHTS */}
          <div className="p-8 mt-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Consumer Cancellation Rights
            </h2>

            <p className="leading-relaxed text-gray-600">
              Students may have the right to cancel within 14 days of
              booking, provided that no course materials have been
              accessed and no part of the training has been attended.
              Once course materials have been provided or training has
              commenced, this cancellation right may no longer apply.
            </p>
          </div>

          {/* CONTACT */}
          <div className="p-10 mt-8 text-white bg-black rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={28} />
              <h2 className="text-3xl font-bold">
                Need Assistance?
              </h2>
            </div>

            <p className="mb-6 text-gray-300">
              If you have any questions regarding refunds,
              cancellations, or booking amendments, please contact us.
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

export default RefundPolicy;