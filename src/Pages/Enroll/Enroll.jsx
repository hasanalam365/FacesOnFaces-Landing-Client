import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
} from "lucide-react";

const Enroll = () => {
  const form = useRef();

  const [loading, setLoading] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    setLoading(true);

    emailjs
      .sendForm(
        "YOUR_SERVICE_ID",
        "YOUR_TEMPLATE_ID",
        form.current,
        "YOUR_PUBLIC_KEY"
      )
      .then(
        () => {
          alert("Enrollment submitted successfully!");

          form.current.reset();
          setLoading(false);
        },
        (error) => {
          console.log(error);

          alert("Something went wrong. Please try again.");

          setLoading(false);
        }
      );
  };

  return (
    <section className="py-24 bg-black">
      <div className="container px-6 mx-auto">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            Enroll Today &
            <span className="text-cyan-400"> Start Learning</span>
          </h1>

          <p className="max-w-2xl mx-auto text-white/60">
            Fill out the form below and our team will contact you shortly with
            all the course details and enrollment information.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2">
          {/* Left Side */}
          <div className="relative overflow-hidden border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-12">
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-cyan-400/10 blur-3xl"></div>

            <h2 className="mb-6 text-3xl font-bold text-white">
              Why Join Us?
            </h2>

            <div className="space-y-6">
              {[
                "Industry Expert Instructors",
                "Hands-On Practical Learning",
                "Real World Projects",
                "Career Support & Guidance",
                "Certificate After Completion",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-cyan-400/10">
                    <BookOpen size={18} className="text-cyan-400" />
                  </div>

                  <p className="text-white/80">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10">
            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-5"
            >
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
                    name="from_name"
                    required
                    placeholder="Enter your full name"
                    className="w-full py-4 pl-12 pr-4 text-white transition border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
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
                    name="from_email"
                    required
                    placeholder="Enter your email"
                    className="w-full py-4 pl-12 pr-4 text-white transition border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
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
                    placeholder="Enter your phone number"
                    className="w-full py-4 pl-12 pr-4 text-white transition border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Select Course
                </label>

                <select
                  name="course"
                  required
                  className="w-full px-4 py-4 text-white transition border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
                >
                  <option className="bg-black">
                    14 Certificate Foundation Course
                  </option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Message
                </label>

                <div className="relative">
                  <MessageSquare
                    size={18}
                    className="absolute top-5 left-4 text-white/40"
                  />

                  <textarea
                    rows="5"
                    name="message"
                    placeholder="Tell us about your goals..."
                    className="w-full pt-4 pl-12 pr-4 text-white transition border resize-none rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-semibold text-black transition-all duration-300 rounded-xl bg-cyan-400 hover:bg-cyan-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading ? "Sending..." : "Submit Enrollment"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;