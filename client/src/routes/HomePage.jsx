import { blocksData } from "../data/data";
import HeroSection from "../components/HeroSection";
import Banner from "../components/Banner";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const HomePage = () => {
  return (
    <div className="bg-gray-950">
    <Navbar/>
      <Banner />

      <div className="flex my-8 flex-col items-center justify-center gap-16"></div>
      
        <HeroSection
         
        />
      
      <div className="flex my-32 flex-col items-center justify-center gap-16"></div>
        <Footer/>
    </div>
  );
};

export default HomePage;
