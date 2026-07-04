import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";


 const plans = [
    {
      id: "full payment",
      title: "Pay in Full",
      description:"One simple payment — no ongoing commitments. Unlock full course materials immediately.",
      
      price: "£1,099",
      subText: "Save £500",
      buttonText: "Enroll & Pay in Full",
      featured: false,
      features: [
        "Secure your place instantly",
        "Dedicated enrollment advisor",
        "Balance due on the day of the course",
        "Manuals sent out after payment",
        
        
      ],
      link: '/enroll'
    },
    {
      id:"deposit",
      title: "Deposit",
      description:
        "Reserve your spot with a deposit now and pay the remaining balance on the day of the course.",
      price: "£250",
      subText: "Deposit today, then £849",
      buttonText: "Pay Deposit Now",
      featured: true,
      features: [
         "Secure your place instantly",
        "Dedicated enrollment advisor",
        "Balance due on the day of the course",
        "Manuals sent out after payment",
      ],
      link: '/deposit-enroll'
    },
    {
       id:"subscription",
      badge: "Flexible",
      title: "Subscription",
      description:
        "One simple monthly subscription payment, no large upfront amount to pay",
      price: "£100",
      subText: "per month",
      buttonText: "Start Subscription",
      featured: false,
      features: [
       
        "Direct debit setup",
        "Signed subscription agreement",
        "Ongoing Support",
        "Add course with no additional monthly cost",
        "No long term contract, cancel anytime"
      ],
      link: '/subscription-enroll'
    },
  ];

const PricePlan = ({ onSelectPlan }) => {

  const navigate = useNavigate();

  const handleEnroll = (plan) => {
    if (onSelectPlan) {
      onSelectPlan(plan.id);
    } else {
      navigate(plan.link);
    }
  };


  return (
   <section className="relative px-6 py-16 overflow-hidden text-white bg-[#0a0e12]">
      {/* Background Glow */}
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full"></div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-16 text-center">
          <p className="text-cyan-400 text-xs tracking-[4px] uppercase mb-4">
            Enrollment Options
          </p>

          <h2 className="font-serif text-4xl font-light md:text-5xl">
            Choose Your{" "}
            <span className="italic text-cyan-300">Payment Plan</span>
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-gray-400">
            Flexible ways to start your journey — pay in full, leave a deposit,
            or subscribe monthly via direct debit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 flex flex-col min-h-[620px]
border border-cyan-400/30
transition-all duration-500 cursor-pointer
              ${
  plan.featured
    ? "bg-[#0f1519] shadow-[0_0_40px_rgba(34,211,238,0.15)] hover:-translate-y-4 hover:scale-[1.03] hover:shadow-[0_30px_80px_rgba(34,211,238,0.35)]"
    : "bg-[#0c1014] hover:-translate-y-3 hover:scale-[1.02] hover:border-cyan-400/60 hover:shadow-[0_20px_60px_rgba(34,211,238,0.15)]"
}`}
            >
              {/* Badge */}
              {/* {plan.featured ? (
                <div className="absolute -translate-x-1/2 -top-3 left-1/2">
                  <span className="px-4 py-1 text-xs font-semibold text-black rounded-full bg-cyan-400">
                    {plan.badge}
                  </span>
                </div>
              ) : (
                <div className="inline-flex px-4 py-1 mb-6 text-xs text-gray-300 border border-gray-700 rounded-full w-fit">
                  {plan.badge}
                </div>
              )} */}

              {/* Content */}
              <div className={plan.featured ? "mt-6" : ""}>
                <h3 className="mb-3 text-2xl font-medium">{plan.title}</h3>

                <p className="mb-8 text-sm leading-relaxed text-gray-400">
                  {plan.description}
                </p>

                <div className="mb-8">
                  <h2 className="text-5xl font-light">{plan.price}</h2>

                  <p
                    className={`text-sm mt-2 ${
                      plan.featured
                        ? "text-cyan-400"
                        : "text-gray-500"
                    }`}
                  >
                    {plan.subText}
                  </p>
                </div>

                <ul className="flex-grow space-y-4">
                  {plan.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <Check
                        size={16}
                        className="flex-shrink-0 text-cyan-400"
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Button */}
              <button onClick={() => handleEnroll(plan)}
                className={`mt-auto w-full py-4 rounded-full flex items-center justify-center gap-2 font-medium 
                  transition-all duration-300 bg-cyan-400 text-black hover:scale-105 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] `}
              > 
                {plan.buttonText}
                <ArrowRight size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      
    </section>
  );
};

export default PricePlan;