import React from "react";
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
// import LeftSide from "../Enroll/LeftSide";


const Homes = () => {
  return (
    <div>
      <section id="home">
        <Banner />
      </section>

{/* <section className="w-[75%] py-8 mx-auto">
  <LeftSide/>
</section> */}



      <Stats />
      <Location />

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
      <section id="price-plans">
      <PricePlan/>
      </section>




      <LearningExperience />
    </div>
  );
};

export default Homes;