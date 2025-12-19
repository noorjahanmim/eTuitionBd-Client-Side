import React from 'react';
import Hero from './Hero/Hero';
import LatestTuitions from './LatestTuitions/LatestTuitions';
import LatestTutors from './LatestTutors/LatestTutors';
import HowItWorks from './HowItWorks/HowItWorks';
import WhyChooseUs from './WhyChooseUs/WhyChooseUs';

const Home = () => {
  return (
    <div>
      <Hero />
      <LatestTuitions />
      <LatestTutors />
      <HowItWorks />
      <WhyChooseUs />
    </div>
  );
};

export default Home;