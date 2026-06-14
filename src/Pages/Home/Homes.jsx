import React from 'react'
import Banner from './Banner'
import Stats from './Stats'
import SponsorName from './SponsorName'
import FeaturesCourses from './FeaturesCourses'
import WhyChoose from './WhyChoose'
// import StartJourney from './StartJourney'
// import Instructors from './Instructors'
// import FAQ from './FAQ'
import SuccessStory from './SuccessStory'
import GallaryShowcase from './GallaryShowcase'
import LearningExperience from './LearningExperience'

const Homes = () => {
  return (
    <div>
    <Banner/>
    <Stats/>
    <SponsorName/>
    <FeaturesCourses/>
    <WhyChoose/>
    <SuccessStory/>
    <GallaryShowcase/>
    <LearningExperience/>
    {/* <Instructors/> */}
    {/* <FAQ/> */}
    {/* <StartJourney/> */}
      
    </div>
  )
}

export default Homes
