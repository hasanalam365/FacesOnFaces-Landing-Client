
import React, { useRef, useState,useEffect } from "react";
import { motion } from "framer-motion";
import {User,Mail,Phone,BookOpen,MessageSquare,MapPin,Calendar,ChevronDown} from "lucide-react";

import PaymentForm from "../../Components/PaymentForm";

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

const courseSchedules = [
  {
    location: "London",
    dates: [
      "3rd–5th October",
      "7th–9th November",
    ],
  },
  {
    location: "Upminster",
    dates: [
      "17th–19th October",
    ],
  },
  {
    location: "Edinburgh",
    dates: [
      "21st–23rd November",
    ],
  },
  {
    location: "Belfast",
    dates: [
      "10th–12th October",
    ],
  },
  {
    location: "Glasgow",
    dates: [
      "28th–30th November",
    ],
  },
  {
    location: "Dublin",
    dates: [
      "31st Oct–3rd Nov",
    ],
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    },
  },
};

const Enroll = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
   const [activeLocation, setActiveLocation] = useState(null);
   const [clientSecret, setClientSecret] =useState("");
  
const [paymentCompleted, setPaymentCompleted] = useState(false);


   const createPaymentIntent = async () => {

  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create-payment-intent`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          amount: 1099,
        }),
      }
    );

    const data = await response.json();

    if (data.clientSecret) {
      setClientSecret(data.clientSecret);
    }
  } catch (error) {
    console.log(error);
  }
};

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

const handlePaymentSuccess = async () => {
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
      alert(
        "Payment Successful & Enrollment Submitted!"
      );

      setPaymentCompleted(true);
      setClientSecret("");

      form.current.reset();
    } else {
      alert(
        result.message || "Enrollment failed"
      );
    }
  } catch (error) {
    console.log(error);
  }
};

useEffect(() => {
  createPaymentIntent();
}, []);

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
              src="https://i.ibb.co.com/k6h526HM/faces3.jpg"
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
              {/* Schedule */}
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={fadeUp}
  className="mt-16"
>
  <h3 className="mb-8 text-3xl font-bold text-center text-white">
    Upcoming Course Dates
  </h3>

  <div className="max-w-4xl mx-auto space-y-4">
    {courseSchedules.map((item, index) => (
      <div
        key={index}
        className="
          overflow-hidden
          border
          rounded-2xl
          border-white/10
          bg-white/[0.03]
          backdrop-blur-xl
          transition-all
          duration-300
          hover:border-cyan-400/30
        "
      >
        {/* Header */}
        <button
          onClick={() =>
            setActiveLocation(
              activeLocation === index ? null : index
            )
          }
          className="flex items-center justify-between w-full px-6 py-5 text-left "
        >
          <div className="flex items-center gap-3">
            <MapPin
              size={20}
              className="text-cyan-400"
            />

            <span className="text-lg font-medium text-white">
              {item.location}
            </span>
          </div>

          <ChevronDown
            className={`text-cyan-400 transition-transform duration-300 ${
              activeLocation === index
                ? "rotate-180"
                : ""
            }`}
          />
        </button>

        {/* Content */}
        <div
          className={`overflow-hidden transition-all duration-500 ${
            activeLocation === index
              ? "max-h-96"
              : "max-h-0"
          }`}
        >
          <div className="px-6 pb-5 space-y-3">
            {item.dates.map((date, i) => (
              <div
                key={i}
                className="flex items-center gap-3 p-4 border rounded-xl bg-cyan-400/5 border-cyan-400/10"
              >
                <Calendar
                  size={18}
                  className="text-cyan-400"
                />

                <span className="text-white">
                  {date}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
</motion.div>

            </div>
          </div>

          {/* Enrollment Form */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">

            <form
              ref={form}
             
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
                  value="$1,099"
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

              
            </form>
{paymentCompleted ? (
  <div className="p-4 text-center border rounded-xl border-green-500/30 bg-green-500/10">
    <p className="font-semibold text-green-400">
      Payment Completed Successfully ✅
    </p>
  </div>
) : (
  clientSecret && (
    <PaymentForm
      clientSecret={clientSecret}
      onPaymentSuccess={handlePaymentSuccess}
    />
  )
)}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Enroll;

