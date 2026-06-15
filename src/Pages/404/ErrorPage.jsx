import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home } from "lucide-react";
import { motion } from "framer-motion";

const ErrorPage = () => {
  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  const glowAnimation = {
    scale: [1, 1.15, 1],
    opacity: [0.4, 0.7, 0.4],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden bg-[#050505] px-6">
      {/* Animated Background Glow */}
      <motion.div
        animate={glowAnimation}
        className="absolute top-0 left-0 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px]"
      />

      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-0 right-0 w-[450px] h-[450px] rounded-full bg-cyan-400/10 blur-[150px]"
      />

      {/* Animated Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -300],
              opacity: [0, 1, 0],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeOut",
            }}
            className="absolute w-2 h-2 rounded-full bg-cyan-400/40"
            style={{
              left: `${Math.random() * 100}%`,
              bottom: "-20px",
            }}
          />
        ))}
      </div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Main Content */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="relative z-10 max-w-3xl mx-auto text-center"
      >
        {/* Floating 404 */}
        <motion.h1
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-[120px] md:text-[220px] font-bold leading-none text-transparent bg-gradient-to-b from-cyan-300 via-cyan-400 to-cyan-600 bg-clip-text"
        >
          404
        </motion.h1>

        {/* Badge */}
        <motion.div
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
          className="inline-flex items-center gap-2 px-4 py-2 mb-6 border rounded-full border-cyan-400/20 bg-cyan-400/10 backdrop-blur-md"
        >
          <div className="w-2 h-2 rounded-full bg-cyan-400"></div>

          <span className="text-sm text-cyan-300">
            Page Not Found
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="mb-4 text-3xl font-bold text-white md:text-5xl">
          Oops! You've Lost Your Way
        </h2>

        {/* Description */}
        <p className="max-w-xl mx-auto mb-10 text-lg leading-relaxed text-white/60">
          The page you're looking for doesn't exist, has been moved,
          or is temporarily unavailable.
        </p>

        {/* Buttons */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <motion.div
            whileHover={{
              scale: 1.05,
              y: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
          >
            <Link
              to="/"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-8
                py-4
                font-medium
                text-black
                transition-all
                duration-300
                rounded-full
                bg-cyan-400
                hover:bg-cyan-300
                hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]
              "
            >
              <Home size={18} />
              Back Home
            </Link>
          </motion.div>

          <motion.button
            whileHover={{
              scale: 1.05,
              y: -4,
            }}
            whileTap={{
              scale: 0.95,
            }}
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white transition-all duration-300 border rounded-full  border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10"
          >
            <ArrowLeft size={18} />
            Go Back
          </motion.button>
        </div>

        {/* Floating Glass Card */}
        <motion.div
          animate={floatingAnimation}
          className="
            max-w-md
            p-5
            mx-auto
            mt-12
            border
            rounded-2xl
            border-white/10
            bg-white/[0.03]
            backdrop-blur-xl
            hover:border-cyan-400/30
            transition-all
            duration-500
          "
        >
          <p className="text-sm text-white/50">
            Need help finding something?
          </p>

          <p className="mt-2 font-medium text-cyan-400">
            Explore our courses and start your journey today.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ErrorPage;