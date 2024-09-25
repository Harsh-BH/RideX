import { blocksData } from "../data/data";
import HeroSection from "../components/HeroSection";
import Banner from "../components/Banner";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const HomePage = () => {
  return (
    <>
    <Navbar/>
      <Banner />

      <div className="flex my-8 flex-col items-center justify-center gap-16"></div>
      {blocksData.map((block, index) => (
        <HeroSection
          key={index}
          heading={block.heading}
          paras={block.paras}
          linkBar={block.linkBar}
          picture={block.picture}
          TrowRev={block.TrowRev}
          Tfstc={block.Tfstc}
          Theight={block.Theight}
          Tmt={block.Tmt}
          TupperHalf={block.TupperHalf}
          button={block.button}
          TspecialCaseWMB={block.TspecialCaseWMB}
        />
      
      ))}
        <Footer/>
    </>
  );
};

export default HomePage;
