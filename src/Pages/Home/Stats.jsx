import React from "react";
import {
  Users,
  TrendingUp,
  ShieldCheck,
  GraduationCap,
} from "lucide-react";

const stats = [
  {
    id: 1,
    icon: Users,
    value: "5,000+",
    label: "Students Trained",
  },
  {
    id: 2,
    icon: TrendingUp,
    value: "98%",
    label: "Success Rate",
  },
  {
    id: 3,
    icon: ShieldCheck,
    value: "100%",
    label: "Industry Certified",
  },
  {
    id: 4,
    icon: GraduationCap,
    value: "25+",
    label: "Expert Trainers",
  },
];

const Stats = () => {
  return (
    <section className="relative py-20 bg-[#05090A]">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/5 blur-[180px] left-1/2 -translate-x-1/2"></div>
      </div>

      <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.id}
                className="
                  group
                  relative
                  overflow-hidden
                  rounded-2xl
                  border
                  border-cyan-500/20
                  bg-[#071012]
                  hover:border-cyan-400/40
                  transition-all
                  duration-500
                  hover:-translate-y-2
                  hover:shadow-[0_0_40px_rgba(34,211,238,0.08)]
                "
              >
                {/* Glow */}
                <div className="absolute inset-0 transition duration-500 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 to-transparent"></div>
                </div>

                <div className="relative flex flex-col items-center justify-center px-6 py-10">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 mb-6 border rounded-xl bg-cyan-500/10 border-cyan-500/10">
                    <Icon
                      size={20}
                      className="text-cyan-300"
                    />
                  </div>

                  {/* Number */}
                 <h3 className="text-2xl text-white font-['Cormorant_Garamond']">
  {stat.value}
</h3>

                  {/* Label */}
                  <p className="text-sm text-gray-400">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;