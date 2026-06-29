import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Clock,
  MessageSquare,
  Loader2,
  CheckCircle2,
  ArrowLeft,
  ChevronDown,
} from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const initialState = {
  fullName: "",
  email: "",
  phone: "",
  preferredContact: "Phone",
  bestTime: "",
  message: "",
};

const LeadFormPage = ({ onBack }) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    }

    if (!formData.bestTime.trim()) {
      newErrors.bestTime = "Please tell us the best time to call.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setLoading(true);
      await axios.post(`${API_URL}/lead-form`, formData);
      setSuccess(true);
    } catch (err) {
      alert(err?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#060d13] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-cyan-500/10 blur-[160px]" />
        <div className="absolute -bottom-32 -right-32 h-[30rem] w-[30rem] rounded-full bg-cyan-400/8 blur-[180px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-64 w-64 rounded-full bg-cyan-500/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-2xl px-5 mx-auto py-14">
        {/* Back Button */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-10 text-sm text-gray-400 transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back
          </button>
        )}

        {success ? (
          /* ── Success State ── */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="py-24 text-center"
          >
            <CheckCircle2 size={80} className="mx-auto text-green-400" />
            <h2 className="mt-8 text-4xl font-semibold text-white">
              Thank You!
            </h2>
            <p className="max-w-md mx-auto mt-5 leading-8 text-gray-400">
              Your information has been submitted successfully. One of our
              advisors will contact you soon.
            </p>
            {onBack && (
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 px-6 py-3 mt-10 text-sm text-gray-300 transition border rounded-xl border-white/10 hover:border-white/20 hover:text-white"
              >
                <ArrowLeft size={15} />
                Go Back
              </button>
            )}
          </motion.div>
        ) : (
          /* ── Form State ── */
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Heading */}
            <p className="mb-3 text-xs uppercase tracking-[5px] text-cyan-400">
              Request A Callback
            </p>
            <h1 className="text-4xl font-light text-white">
              Leave Your Details
            </h1>
            <p className="mt-4 leading-7 text-gray-400">
              Fill out the form below and let us know the best time to contact
              you.
            </p>

            <form onSubmit={handleSubmit} className="mt-12 space-y-6">
              {/* Full Name */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Full Name
                </label>
                <div className="flex items-center px-4 border rounded-xl border-white/10 bg-white/5">
                  <User size={18} className="shrink-0 text-cyan-400" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full px-3 py-4 text-white bg-transparent outline-none"
                  />
                </div>
                {errors.fullName && (
                  <p className="mt-2 text-sm text-red-400">{errors.fullName}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Email Address
                </label>
                <div className="flex items-center px-4 border rounded-xl border-white/10 bg-white/5">
                  <Mail size={18} className="shrink-0 text-cyan-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@email.com"
                    className="w-full px-3 py-4 text-white bg-transparent outline-none"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Phone Number
                </label>
                <div className="flex items-center px-4 border rounded-xl border-white/10 bg-white/5">
                  <Phone size={18} className="shrink-0 text-cyan-400" />
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+44..."
                    className="w-full px-3 py-4 text-white bg-transparent outline-none"
                  />
                </div>
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-400">{errors.phone}</p>
                )}
              </div>

             

             
{/* Best Time */}
<div>
  <label className="block mb-2 text-sm text-gray-300">
    Best Time To Call
  </label>

  <div className="relative flex items-center px-4 border rounded-xl border-white/10 bg-white/5">
  <Clock size={18} className="shrink-0 text-cyan-400" />

  <select
    name="bestTime"
    value={formData.bestTime}
    onChange={handleChange}
    className="w-full px-3 py-4 pr-10 text-white bg-transparent outline-none appearance-none cursor-pointer"
  >
      <option value="" className="bg-[#091017]">
        Select a time Slot
      </option>

      <option value="09:00 - 11:00" className="bg-[#091017]">
        09:00 - 11:00
      </option>

      <option value="11:00 - 13:00" className="bg-[#091017]">
        11:00 - 13:00
      </option>

      <option value="13:00 - 15:00" className="bg-[#091017]">
        13:00 - 15:00
      </option>

      <option value="15:00 - 17:00" className="bg-[#091017]">
        15:00 - 17:00
      </option>

      <option value="17:00 - 19:00" className="bg-[#091017]">
        17:00 - 19:00
      </option>

      <option value="19:00 - 21:00" className="bg-[#091017]">
        19:00 - 21:00
      </option>
    </select>
    <ChevronDown
    size={18}
    className="absolute text-gray-400 pointer-events-none right-4"
  />
  </div>

  {errors.bestTime && (
    <p className="mt-2 text-sm text-red-400">{errors.bestTime}</p>
  )}
</div>


              {/* Message */}
              <div>
                <label className="block mb-2 text-sm text-gray-300">
                  Message (Optional)
                </label>
                <div className="p-4 border rounded-xl border-white/10 bg-white/5">
                  <div className="flex items-center gap-2 mb-3">
                    <MessageSquare size={18} className="text-cyan-400" />
                    <span className="text-sm text-gray-400">
                      Tell us how we can help
                    </span>
                  </div>
                  <textarea
                    rows={5}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="I'm interested in  Aesthetic Training..."
                    className="w-full text-white bg-transparent outline-none resize-none"
                  />
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="flex items-center justify-center w-full gap-3 px-6 py-4 font-semibold text-black transition rounded-xl bg-cyan-400 hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Request A Call"
                )}
              </button>
            </form>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default LeadFormPage;