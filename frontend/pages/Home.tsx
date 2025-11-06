import HeroSection from '../components/homePage/HeroSection.tsx';
import SystemInfoSection from '../components/homePage/SystemInfo.tsx'
import FeaturesSection from '../components/homePage/FeaturesSection.tsx'
import FrequentAskedQuestionSection from '../components/homePage/FrequentlyAsked.tsx'
import { useEffect } from 'react';
const Home = () => {
  useEffect(() => {   
    document.title = "Home - Resume Analyzer";
  }, []); 
  return (
    <div className='overflow-x-hidden'>
      <HeroSection></HeroSection>
      <SystemInfoSection></SystemInfoSection>
      <FeaturesSection></FeaturesSection>
      <FrequentAskedQuestionSection></FrequentAskedQuestionSection>
    </div>
  )
}

export default Home