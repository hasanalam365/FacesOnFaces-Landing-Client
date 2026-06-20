import React from "react";
import { FileText, ShieldCheck, CreditCard, AlertCircle } from "lucide-react";

const sections = [
  {
    id: "general",
    title: "General Conditions of Booking",
  },
  {
    id: "payment",
    title: "Paying For Your Training Course",
  },
  {
    id: "cancellation",
    title: "Cancelling Your Training Course Booking",
  },
  {
    id: "amendments",
    title: "Amending Your Training Course Booking",
  },
  {
    id: "insurance",
    title: "Insurance & Regulation",
  },
  {
    id: "contact",
    title: "Contact Information",
  },
  {
    id: "data",
    title: "Data Protection",
  },
  {
    id: "complaints",
    title: "Complaints",
  },
];

const TermsAndCondition = () => {
  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden text-white bg-gradient-to-br from-slate-900 via-slate-800 to-black">
        <div className="container px-6 py-24 mx-auto">
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm border rounded-full border-white/20 bg-white/10 backdrop-blur">
              <FileText size={16} />
              Terms & Conditions
            </div>

            <h1 className="mb-6 text-4xl font-bold md:text-6xl">
              Faces On Faces Academy
              <span className="block text-gray-300">
                Terms & Conditions
              </span>
            </h1>

            <p className="max-w-2xl text-lg text-gray-300">
              Please read these terms carefully before booking any training
              course with Faces On Faces Academy.
            </p>

            <div className="inline-flex px-4 py-2 mt-8 text-sm rounded-full bg-white/10">
              Last Updated: June 2026
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="container px-6 py-16 mx-auto">
        <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky p-6 bg-white border shadow-sm top-28 rounded-2xl">
              <h3 className="mb-4 font-semibold">
                Quick Navigation
              </h3>

              <div className="space-y-3">
                {sections.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="block text-sm text-gray-600 transition hover:text-black"
                  >
                    {item.title}
                  </a>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="space-y-8">
            {/* INTRO */}
            <div className="p-8 border rounded-3xl bg-gray-50">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-green-600" />
                <h2 className="text-2xl font-bold">
                  About These Terms
                </h2>
              </div>

              <p className="mt-4 leading-relaxed text-gray-700">
                In these terms and conditions “we”, “our”, and “us”
                refer to Faces On Faces Academy and “you” refers
                to the delegate purchasing a training course.
              </p>
            </div>

            {/* GENERAL */}
            <section
              id="general"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                General Conditions of Booking
              </h2>

              <ul className="space-y-4 leading-relaxed text-gray-700">
                <li>
                  Faces On Faces Academy reserves the right to
                  decline admission to any training course.
                </li>

                <li>
                  Course dates, locations and content may be
                  amended where necessary.
                </li>

                <li>
                  No liability is accepted for loss of earnings,
                  travel expenses or model-related expenses.
                </li>

                <li>
                  Students must wear black clinic wear and
                  closed-toe shoes.
                </li>

                <li>
                  Valid ID must be submitted before and brought
                  on the training day.
                </li>

                <li>
                  Arriving more than 45 minutes late may result
                  in refusal of entry.
                </li>

                <li>
                  One model per student is intended but cannot
                  always be guaranteed.
                </li>
              </ul>
            </section>

            {/* PAYMENT */}
            <section
              id="payment"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="text-blue-600" />
                <h2 className="text-2xl font-bold">
                  Paying For Your Training Course
                </h2>
              </div>

              <div className="space-y-4 text-gray-700">
                <p>
                  Training courses may be paid in full or via an
                  agreed payment scheme.
                </p>

                <p>
                  Deposits secure your place and are non-refundable.
                </p>

                <p>
                  Full balances must be paid no later than 3 days
                  before the course start date.
                </p>

                <p>
                  Failure to pay may result in cancellation of your
                  place and forfeiture of payments already made.
                </p>
              </div>
            </section>

            {/* CANCELLATION */}
            <section
              id="cancellation"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <AlertCircle className="text-red-500" />
                <h2 className="text-2xl font-bold">
                  Cancelling Your Booking
                </h2>
              </div>

              <div className="space-y-4 leading-relaxed text-gray-700">
                <p>
                  Cancellations made more than 4 weeks before the
                  course date incur a 25% administration fee.
                </p>

                <p>
                  Cancellations made within 4 weeks incur a 50%
                  cancellation fee.
                </p>

                <p>
                  Students may be transferred to another course
                  date where appropriate.
                </p>

                <p>
                  No refunds are issued for Acts of God, including
                  severe weather and natural disasters.
                </p>

                <p>
                  OFQUAL registered courses cannot be cancelled
                  once registration has taken place.
                </p>

                <p>
                  Consumer cancellation rights apply within 14
                  days where no course materials have been
                  accessed and no training attended.
                </p>
              </div>
            </section>

            {/* AMENDMENTS */}
            <section
              id="amendments"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Amending Your Booking
              </h2>

              <p className="leading-relaxed text-gray-700">
                Requests to change course dates must be submitted
                in writing and may incur a 25% administration fee.
                Alternative dates are subject to availability.
              </p>
            </section>

            {/* INSURANCE */}
            <section
              id="insurance"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Insurance & Regulation
              </h2>

              <div className="space-y-4 text-gray-700">
                <p>
                  Students are covered under the academy group
                  insurance while learning on site.
                </p>

                <p>
                  Students remain responsible for obtaining their
                  own insurance to practice professionally.
                </p>

                <p>
                  Compliance with local legal and regulatory
                  requirements remains the student's
                  responsibility.
                </p>
              </div>
            </section>

            {/* CONTACT */}
            <section
              id="contact"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Contact Information
              </h2>

              <div className="space-y-3 text-gray-700">
                <p>Email: support@facesonfaces.com</p>
                <p>Instagram: @facesonfaces_</p>
                <p>Facebook: @facesonfaces</p>
                <p>Phone: 08009991751</p>
              </div>
            </section>

            {/* DATA */}
            <section
              id="data"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Data Protection
              </h2>

              <p className="leading-relaxed text-gray-700">
                By booking a course, you consent to the use of
                your information for order processing and future
                marketing communications. Your information will
                never be shared with third parties without your
                written consent.
              </p>
            </section>

            {/* COMPLAINTS */}
            <section
              id="complaints"
              className="p-8 border shadow-sm rounded-3xl"
            >
              <h2 className="mb-6 text-2xl font-bold">
                Complaints
              </h2>

              <p className="leading-relaxed text-gray-700">
                Complaints should be submitted in writing to
                support@facesonfaces.com. Written complaints will
                be acknowledged within 14 working days.
              </p>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsAndCondition;