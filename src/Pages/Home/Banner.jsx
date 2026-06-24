import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  const handleExplore = () => {
    navigate("/explore-course");
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#05090A]">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] -top-40 left-20"></div>
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[160px] top-20 right-20"></div>
      </div>

      <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-10">
        <div className="grid items-center min-h-screen gap-16 md:grid-cols-2">

          {/* LEFT CONTENT */}
          <div className="order-2 md:order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full border-cyan-500/20 bg-cyan-500/5">
              <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
              <span className="text-xs tracking-wider uppercase text-cyan-300">
                Trusted by Thousands
              </span>
            </div>

            <h1 className="max-w-xl text-5xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
              14
              <br />
              <span className="italic text-cyan-300">Certificate</span>
              <br />
              Fast-Track
              <br />
              Course
            </h1>

            <p className="max-w-md mt-8 text-base leading-relaxed text-gray-400">
              Professional training programs designed to help
              ambitious students launch successful careers in
              aesthetics and beauty.
            </p>

            <div className="flex flex-col gap-4 mt-10 sm:flex-row">
              <button
                onClick={handleExplore}
                className="px-8 py-4 font-medium text-black transition rounded-full bg-cyan-400 hover:scale-105"
              >
                Explore Courses →
              </button>
            </div>
          </div>

          {/* RIGHT VIDEO SECTION */}
          <div className="relative flex justify-center order-1 md:order-2 lg:justify-end">
            <div className="relative overflow-hidden border rounded-[30px] border-white/10 bg-white/5 backdrop-blur-xl w-[320px] md:w-[420px]">
              <video
                ref={videoRef}
                autoPlay
                controls
                loop
                playsInline
                className="object-cover w-full h-[500px] md:h-[600px]"
              >
                <source
                  src="https://res.cloudinary.com/dutdi2jfa/video/upload/v1782271944/course-video_louzql.mp4"
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Floating Bottom */}
            <div className="absolute px-4 py-3 border bottom-8 right-8 rounded-2xl bg-white/10 backdrop-blur-xl border-white/10">
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                  <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                </div>
                <span className="text-sm text-white">4.9/5</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;