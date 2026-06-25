import React from "react";
import Banner from "./Banner";
import Stats from "./Stats";
import SponsorName from "./SponsorName";
import WhyChoose from "./WhyChoose";
import StartJourney from "./StartJourney";
import Instructors from "./Instructors";
import FAQ from "./FAQ";
import SuccessStory from "./SuccessStory";
import GallaryShowcase from "./GallaryShowcase";
import LearningExperience from "./LearningExperience";
import PricePlan from "./PricePlan";

const Homes = () => {
  return (
    <div>
      <section id="home">
        <Banner />
      </section>

      <Stats />
      <SponsorName />

      <section id="why-us">
        <WhyChoose />
      </section>

      <StartJourney />

      <section id="instructors">
        <Instructors />
      </section>

      <section id="stories">
        <SuccessStory />
      </section>
      <section id="gallary">
        <GallaryShowcase />
      </section>

     

      <section id="faq">
        <FAQ />
      </section>
      <section id="price-plane">
      <PricePlan/>
      </section>




      <LearningExperience />
    </div>
  );
};

export default Homes;