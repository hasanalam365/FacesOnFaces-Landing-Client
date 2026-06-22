
import React, { useRef, useState,useEffect } from "react";
import {User,Mail,Phone,MessageSquare} from "lucide-react";

import PaymentForm from "../../Components/PaymentForm";
import LeftSide from "./LeftSide";







const Enroll = () => {
  const form = useRef(null);
  const [loading, setLoading] = useState(false);
 
   const [clientSecret, setClientSecret] =useState("");
  
const [paymentCompleted, setPaymentCompleted] = useState(false);


   const createPaymentIntent = async () => {

  try {
    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/create-payment-intent`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
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

  

const handlePaymentSuccess = async (
  paymentIntentId
) => {
  try {
    const formData = new FormData(
      form.current
    );

    const enrollmentData = {
      paymentIntentId,

      name: formData.get("name"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      course: formData.get("course"),
      course_fee:
        formData.get("course_fee"),
      message: formData.get("message"),
    };

    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/create-enrollment`,
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify(
          enrollmentData
        ),
      }
    );

    const result =
      await response.json();

    if (result.success) {
      alert(
        "Payment Successful & Enrollment Submitted!"
      );

      setPaymentCompleted(true);
      setClientSecret("");

      form.current.reset();
    } else {
      alert("Enrollment failed");
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
         <LeftSide/>

          {/* Enrollment Form */}
          <div className="border rounded-3xl border-white/10 bg-white/[0.03] p-8 lg:p-10 backdrop-blur-xl">

            <form
              ref={form}
             
              className="space-y-5"
            >


              <input
                type="hidden"
                name="subject"
                value="New Course Enrollment"
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
                  value="£1,099"
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

