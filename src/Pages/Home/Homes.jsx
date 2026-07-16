import React, { useEffect, useRef } from "react";

import Banner from "./Banner";
import Stats from "./Stats";
import WhyChoose from "./WhyChoose";
import StartJourney from "./StartJourney";
import Instructors from "./Instructors";
import FAQ from "./FAQ";
import SuccessStory from "./SuccessStory";
import GallaryShowcase from "./GallaryShowcase";
import LearningExperience from "./LearningExperience";
import Location from "./Location";
import PricePlan from "./PricePlan";
import CourseDetails from "./CourseDetails";
import CallToAction from "../../Components/CallToAction";

import { trackEvent } from "../../utils/analytics";

const Homes = () => {
  const trackedScroll = useRef({
    pageView: false,
    funnelEntry: false,
    s25: false,
    s50: false,
    s75: false,
    s90: false,
    s100: false,
  });

  const startTime = useRef(Date.now());

  // ===============================
  // Home Page View
  // ===============================
  useEffect(() => {
    if (trackedScroll.current.pageView) return;

    trackedScroll.current.pageView = true;

    trackEvent("page_view_home", {
      page_name: "Home",
      page_type: "Landing Page",
    });

    trackEvent("homepage_funnel_entry", {
      step: 1,
      page: "Home",
    });

    trackedScroll.current.funnelEntry = true;
  }, []);

  // ===============================
  // Scroll Depth Tracking
  // ===============================
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      const documentHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      if (documentHeight <= 0) return;

      const percent = Math.round((scrollTop / documentHeight) * 100);

      if (percent >= 25 && !trackedScroll.current.s25) {
        trackedScroll.current.s25 = true;

        trackEvent("scroll_depth", {
          percentage: 25,
          page: "Home",
        });
      }

      if (percent >= 50 && !trackedScroll.current.s50) {
        trackedScroll.current.s50 = true;

        trackEvent("scroll_depth", {
          percentage: 50,
          page: "Home",
        });
      }

      if (percent >= 75 && !trackedScroll.current.s75) {
        trackedScroll.current.s75 = true;

        trackEvent("scroll_depth", {
          percentage: 75,
          page: "Home",
        });
      }

      if (percent >= 90 && !trackedScroll.current.s90) {
        trackedScroll.current.s90 = true;

        trackEvent("scroll_depth", {
          percentage: 90,
          page: "Home",
        });
      }

      if (percent >= 99 && !trackedScroll.current.s100) {
        trackedScroll.current.s100 = true;

        trackEvent("scroll_complete", {
          percentage: 100,
          page: "Home",
        });
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () =>
      window.removeEventListener("scroll", handleScroll);
  }, []);

  // ===============================
  // Time On Page + Drop Off
  // ===============================
  useEffect(() => {
    const sendExitEvent = () => {
      const seconds = Math.round(
        (Date.now() - startTime.current) / 1000
      );

      trackEvent("homepage_exit", {
        time_on_page: seconds,
      });

      trackEvent("homepage_dropoff", {
        time_on_page: seconds,
      });
    };

    window.addEventListener("beforeunload", sendExitEvent);

    return () => {
      sendExitEvent();
      window.removeEventListener("beforeunload", sendExitEvent);
    };
  }, []);

  return (
    <div>

      <section id="home">
        <Banner />
      </section>

      <section id="course-details">
        <CourseDetails />
      </section>

      <section id="stats">
        <Stats />
      </section>

      <section id="location">
        <Location />
      </section>

      <section id="why-us">
        <WhyChoose />
      </section>

      <section id="start-journey">
        <StartJourney />
      </section>

      <section id="instructors">
        <Instructors />
      </section>

      <section id="stories">
        <SuccessStory />
      </section>

      <section id="gallery">
        <GallaryShowcase />
      </section>

      <section id="faq">
        <FAQ />
      </section>

      <section id="price-plans">
        <PricePlan />
      </section>

      <section id="call-to-action">
        <CallToAction />
      </section>

      <section id="learning-experience">
        <LearningExperience />
      </section>

    </div>
  );
};

export default Homes;