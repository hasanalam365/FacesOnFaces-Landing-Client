import React, { useRef, useEffect, useState } from "react";
import { Play, Pause } from "lucide-react";
import { trackEvent } from "../../utils/analytics";

const Banner = () => {
  const videoRef = useRef(null);

  // ===============================
  // UI States
  // ===============================
  const [isPlaying, setIsPlaying] = useState(true);
  const [showIcon, setShowIcon] = useState(false);

  // ===============================
  // Tracking Refs
  // ===============================
  const trackingRef = useRef({
    viewed: false,

    play: false,

    p25: false,
    p50: false,
    p75: false,
    completed: false,

    bannerExit: false,
  });

  const bannerEnterTime = useRef(null);

  // ===============================
  // Banner View Observer
  // ===============================
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bannerEnterTime.current = Date.now();

          video.play().catch(() => {});

          if (!trackingRef.current.viewed) {
            trackingRef.current.viewed = true;

            trackEvent("view_banner", {
              page: "Home",
              section: "Hero Banner",
            });

            trackEvent("banner_impression", {
              page: "Home",
            });
          }
        } else {
          video.pause();

          if (
            bannerEnterTime.current &&
            !trackingRef.current.bannerExit
          ) {
            trackingRef.current.bannerExit = true;

            const seconds = Math.round(
              (Date.now() - bannerEnterTime.current) / 1000
            );

            trackEvent("banner_exit", {
              time_in_banner: seconds,
            });

            trackEvent("banner_dropoff", {
              time_in_banner: seconds,
            });
          }
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, []);

  // ===============================
  // Video Progress Tracking
  // ===============================
  useEffect(() => {
    const video = videoRef.current;

    if (!video) return;

    const handlePlay = () => {
      if (!trackingRef.current.play) {
        trackingRef.current.play = true;

        trackEvent("banner_video_start", {
          video_name: "Homepage Hero Video",
        });
      } else {
        trackEvent("banner_video_resume", {
          video_name: "Homepage Hero Video",
        });
      }

      setIsPlaying(true);
    };

    const handlePause = () => {
      trackEvent("banner_video_pause", {
        video_name: "Homepage Hero Video",
      });

      setIsPlaying(false);
    };

    const handleTimeUpdate = () => {
      if (!video.duration) return;

      const percent =
        (video.currentTime / video.duration) * 100;

      if (percent >= 25 && !trackingRef.current.p25) {
        trackingRef.current.p25 = true;

        trackEvent("banner_video_progress", {
          progress: 25,
        });
      }

      if (percent >= 50 && !trackingRef.current.p50) {
        trackingRef.current.p50 = true;

        trackEvent("banner_video_progress", {
          progress: 50,
        });
      }

      if (percent >= 75 && !trackingRef.current.p75) {
        trackingRef.current.p75 = true;

        trackEvent("banner_video_progress", {
          progress: 75,
        });
      }

      if (
        percent >= 99 &&
        !trackingRef.current.completed
      ) {
        trackingRef.current.completed = true;

        trackEvent("banner_video_complete", {
          video_name: "Homepage Hero Video",
        });
      }
    };

    video.addEventListener("play", handlePlay);
    video.addEventListener("pause", handlePause);
    video.addEventListener("timeupdate", handleTimeUpdate);

    return () => {
      video.removeEventListener("play", handlePlay);
      video.removeEventListener("pause", handlePause);
      video.removeEventListener(
        "timeupdate",
        handleTimeUpdate
      );
    };
  }, []);

  // ===============================
  // Video Click Toggle
  // ===============================
 const handleVideoClick = () => {
  const video = videoRef.current;

  if (!video) return;

  if (video.paused) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }

  // Show play/pause animation
  setShowIcon(true);

  setTimeout(() => {
    setShowIcon(false);
  }, 500);
};
  // ===============================
  // RETURN JSX
  // ===============================
  return (
    <section
      id="hero-banner"
      className="relative min-h-screen overflow-hidden bg-[#05090A]"
    >
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] -top-40 left-20" />
        <div className="absolute w-[400px] h-[400px] bg-emerald-500/10 blur-[160px] top-20 right-20" />
      </div>

      <div className="relative z-10 px-6 mx-auto max-w-7xl lg:px-10">
        <div className="grid items-center min-h-screen gap-16 md:grid-cols-2">

          {/* ================= LEFT CONTENT ================= */}

          <div className="order-2 md:order-1">

            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border rounded-full border-cyan-500/20 bg-cyan-500/5">
              <div className="w-2 h-2 rounded-full bg-cyan-400" />

              <span className="text-xs tracking-wider uppercase text-cyan-300">
                Trusted by Thousands
              </span>
            </div>

            <h1 className="max-w-xl text-5xl font-light leading-tight text-white md:text-6xl lg:text-7xl">
              14{" "}
              <span className="italic text-cyan-300">
                Certificate
              </span>

              <br />

              Fast-Track

              <br />

              Course
            </h1>

            <p className="max-w-md mt-8 mb-5 text-base leading-relaxed text-gray-400">
              • Successful careers in aesthetics •
            </p>

          </div>

          {/* ================= RIGHT VIDEO ================= */}

          <div className="relative flex justify-center order-1 md:order-2 lg:justify-end">

            <div
              className="relative overflow-hidden border rounded-[30px] border-white/10 bg-white/5 backdrop-blur-xl w-[320px] md:w-[420px] cursor-pointer"
              onClick={handleVideoClick}
            >

         <video
  ref={videoRef}
  autoPlay
  controls
  loop
  playsInline
  preload="metadata"
  onClick={handleVideoClick}
  className="object-cover w-full h-[500px] md:h-[600px]"
>
                <source
                  src="https://res.cloudinary.com/dutdi2jfa/video/upload/v1782397846/course-video_e2yx4f.mp4"
                  type="video/mp4"
                />

                Your browser does not support the video tag.
              </video>

              {/* ================= PLAY / PAUSE ICON ================= */}

              {showIcon && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none bg-black/20">

                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-black/50 backdrop-blur-sm">

                    {isPlaying ? (
                      <Play
                        size={28}
                        fill="white"
                        className="ml-1 text-white"
                      />
                    ) : (
                      <Pause
                        size={28}
                        fill="white"
                        className="text-white"
                      />
                    )}

                  </div>

                </div>
              )}

            </div>

            {/* ================= FLOATING RATING ================= */}

            <div className="absolute px-4 py-3 border bottom-8 right-8 rounded-2xl bg-white/10 backdrop-blur-xl border-white/10">

              <div className="flex items-center gap-3">

                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                </div>

                <span className="text-sm text-white">
                  4.9/5
                </span>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default Banner;