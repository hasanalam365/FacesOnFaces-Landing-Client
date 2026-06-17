
import React, { useRef, useState } from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  MessageSquare,
  MapPin,
  Calendar,
} from "lucide-react";

const courseFeatures = [
  "Infection Control",
  "Safety in Medicine",
  "Anatomy & Physiology Level 3",
  "Complications Management",
  "Health & Safety",
  "Skin Booster",
  "Lumi Eyes",
  "Polynucleotide",
  "Microneedling",
  "Fat Dissolver",
  "Chemical Skin Peels",
  "Foundation Dermal Filler",
  "Foundation Anti-Wrinkle",
  "Use of Hyaluronidase",
];

const locations = [
  "London",
  "Upminster",
  "Edinburgh",
  "Belfast",
  
  "Dublin",
];

const upcomingDates = [
  "London • 3rd–5th October",
  "London • 7th–9th November",
  "Upminster • 17th–19th October",
  "Edinburgh • 21st–23rd November",
];

const Enroll = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);

  const sendEmail = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const formData = new FormData(form.current);

      const response = await fetch(
        "https://api.web3forms.com/submit",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();

      if (result.success) {
        alert("Enrollment submitted successfully!");
        form.current.reset();
      } else {
        alert(result.message || "Something went wrong.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

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

          {/* Course Details */}
          <div className="overflow-hidden border rounded-3xl border-white/10 bg-white/[0.03] backdrop-blur-xl">

            <img
              src="https://i.ibb.co.com/YBvghy3R/14-certificates.webp"
              alt="Course"
              className="object-cover w-full h-[350px]"
            />

            <div className="p-8">

              <span className="px-4 py-2 text-sm font-medium text-black rounded-full bg-cyan-400">
                14 Certificates Included
              </span>

              <h2 className="mt-5 text-3xl font-bold text-white">
                14 Certificate Fast-Track Course
              </h2>

              <div className="mt-6 space-y-4">

                <div className="flex items-center justify-between">
                  <span className="text-white/60">
                    Course Fee
                  </span>

                  <div className="flex items-center gap-3">
                    <span className="line-through text-white/40">
                      $1,599
                    </span>

                    <span className="text-2xl font-bold text-cyan-400">
                      $1,099
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60">
                    Duration
                  </span>

                  <span className="text-white">
                    3 Day Intensive Training
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-white/60">
                    Certifications
                  </span>

                  <span className="text-white">
                    14 Included
                  </span>
                </div>
              </div>

              {/* Course Includes */}
              <div className="mt-10">
                <h3 className="mb-5 text-xl font-semibold text-white">
                  Course Includes
                </h3>

                <div className="grid gap-3 sm:grid-cols-2">
                  {courseFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02]"
                    >
                      <BookOpen
                        size={16}
                        className="text-cyan-400"
                      />

                      <span className="text-sm text-white/80">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations */}
              <div className="mt-10">
                <h3 className="mb-5 text-xl font-semibold text-white">
                  Available Locations
                </h3>

                <div className="flex flex-wrap gap-3">
                  {locations.map((location, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 px-4 py-2 border rounded-full bg-cyan-400/10 border-cyan-400/20"
                    >
                      <MapPin
                        size={14}
                        className="text-cyan-400"
                      />

                      <span className="text-sm text-white">
                        {location}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Dates */}
              <div className="mt-10">
                <h3 className="mb-5 text-xl font-semibold text-white">
                  Upcoming Course Dates
                </h3>

                <div className="space-y-3">
                  {upcomingDates.map((date, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 border rounded-xl border-white/10"
                    >
                      <Calendar
                        size={16}
                        className="text-cyan-400"
                      />

                      <span className="text-white/80">
                        {date}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Enrollment Form */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">

            <form
              ref={form}
              onSubmit={sendEmail}
              className="space-y-5"
            >
             <input
  type="hidden"
  name="access_key"
  value={import.meta.env.VITE_WEB3_MESSAGE_KEY}
/>

              <input
                type="hidden"
                name="subject"
                value="New Course Enrollment"
              />

              <input
                type="hidden"
                name="payment_status"
                value="Pending"
              />

              <input
                type="hidden"
                name="course_price"
                value="1599"
              />

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
                    placeholder="Enter your full name"
                    className="w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
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
                    placeholder="Enter your email"
                    className="w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
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
                    className="w-full py-4 pl-12 pr-4 text-white border rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
                  />
                </div>
              </div>

              {/* Course */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Course Name
                </label>

                <input
                  type="text"
                  name="course"
                  value="14 Certificate Foundation Course"
                  readOnly
                  className="w-full px-4 py-4 text-white border rounded-xl bg-white/5 border-white/10"
                />
              </div>

              {/* Fee */}
              <div>
                <label className="block mb-2 text-sm text-white/70">
                  Course Fee
                </label>

                <input
                  type="text"
                  name="course_fee"
                  value="£1,599"
                  readOnly
                  className="w-full px-4 py-4 font-semibold border rounded-xl text-cyan-400 bg-white/5 border-white/10"
                />
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
                    className="w-full pt-4 pl-12 pr-4 text-white border resize-none rounded-xl bg-white/5 border-white/10 focus:border-cyan-400 focus:outline-none"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 font-semibold text-black transition-all duration-300 rounded-xl bg-cyan-400 hover:bg-cyan-300 hover:scale-[1.02] disabled:opacity-50"
              >
                {loading
                  ? "Submitting..."
                  : "Submit Enrollment"}
              </button>
            </form>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;

