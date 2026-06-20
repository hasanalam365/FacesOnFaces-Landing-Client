import React from "react";
import {
  Cookie,
  BarChart3,
  Shield,
  Settings,
  Globe,
  Eye,
  Mail,
} from "lucide-react";

const CookiePolicy = () => {
  const sections = [
    {
      icon: <Cookie size={22} />,
      title: "Use of Cookies",
      content: [
        "Cookies are small text files stored on your device.",
        "They help us remember your preferences and improve website functionality.",
        "Cookies allow us to understand how visitors interact with our website.",
        "They may be used during booking and payment processes.",
      ],
    },
    {
      icon: <BarChart3 size={22} />,
      title: "Analytics Cookies",
      content: [
        "Analytics cookies help us understand visitor behaviour.",
        "They show which pages are most popular.",
        "They help us improve website performance and user experience.",
      ],
    },
    {
      icon: <Shield size={22} />,
      title: "Security Cookies",
      content: [
        "Security cookies help protect user accounts and personal information.",
        "They assist in preventing fraud and unauthorised access.",
        "These cookies support secure website functionality.",
      ],
    },
    {
      icon: <Settings size={22} />,
      title: "Personalisation Cookies",
      content: [
        "These cookies remember your preferences and settings.",
        "They help provide a more personalised browsing experience.",
        "They recognise returning visitors to the website.",
      ],
    },
    {
      icon: <Globe size={22} />,
      title: "Third-Party Cookies",
      content: [
        "Third-party services may place cookies through our website.",
        "These may include payment processors, analytics providers and social media platforms.",
        "Each third-party provider has its own privacy and cookie policies.",
      ],
    },
    {
      icon: <Eye size={22} />,
      title: "Other Tracking Technologies",
      content: [
        "We may use web beacons and pixel tags to improve website performance.",
        "These technologies help us understand visitor engagement.",
        "They collect limited technical information for statistical purposes.",
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
              Cookie Policy
            </span>

            <h1 className="mt-6 text-4xl font-bold md:text-6xl">
              Cookie Policy
            </h1>

            <p className="max-w-2xl mt-6 text-lg text-gray-300">
              This Cookie Policy explains how Faces On Faces Academy
              uses cookies and similar technologies to improve your
              browsing experience, analyse website traffic, and
              maintain website security.
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
          {/* INTRODUCTION */}
          <div className="p-8 mb-12 border border-gray-200 rounded-3xl bg-gray-50">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Introduction
            </h2>

            <p className="leading-relaxed text-gray-600">
              Faces On Faces Academy may use cookies, tracking pixels,
              web beacons, and similar technologies when you visit our
              website. These technologies help us provide a better user
              experience, improve website performance, and understand
              how visitors interact with our content.
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

          {/* CONTROL COOKIES */}
          <div className="p-8 mt-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Control of Cookies
            </h2>

            <p className="leading-relaxed text-gray-600">
              Most web browsers accept cookies automatically. However,
              you can modify your browser settings to refuse or delete
              cookies if you prefer. Please note that disabling cookies
              may affect certain features and functionality of the
              website.
            </p>
          </div>

          {/* POLICY CHANGES */}
          <div className="p-8 mt-8 bg-white border border-gray-200 shadow-sm rounded-3xl">
            <h2 className="mb-4 text-2xl font-bold text-gray-900">
              Changes to This Policy
            </h2>

            <p className="leading-relaxed text-gray-600">
              We reserve the right to update this Cookie Policy at any
              time. Any changes will be posted on this page along with
              an updated revision date.
            </p>
          </div>

          {/* CONTACT */}
          <div className="p-10 mt-8 text-white bg-black rounded-3xl">
            <div className="flex items-center gap-3 mb-4">
              <Mail size={28} />
              <h2 className="text-3xl font-bold">
                Contact Us
              </h2>
            </div>

            <p className="mb-6 text-gray-300">
              If you have any questions regarding this Cookie Policy,
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

export default CookiePolicy;