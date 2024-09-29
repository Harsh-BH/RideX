import { useState } from "react";
import HeroSection from "../components/HeroSection";
import Banner from "../components/Banner";
import Navbar from "../components/shared/Navbar";
import Footer from "../components/shared/Footer";

const HomePage = () => {
  const [showVideo, setShowVideo] = useState(true); // Start with showVideo set to true

  const handleVideoEnd = () => {
    // When the video ends, hide it
    setShowVideo(false);
  };

  return (
    <div className="bg-gray-950">
      {/* Conditionally render the video */}
      {showVideo && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black z-50 animate-fade-out">
          <video
            src="src/assets/maingif.mp4" // Ensure this is the correct path
            autoPlay
            muted // Ensure it's muted to allow autoplay
            playsInline // Ensures it plays inline on mobile devices
            onEnded={handleVideoEnd}
            className="w-[100vw] h-[100vh] object-cover"
          />
        </div>
      )}

      {/* The rest of your homepage content */}
      <Navbar />
      <Banner />
      <div className="flex my-8 flex-col items-center justify-center gap-16"></div>
      <HeroSection />
      <div className="flex my-32 flex-col items-center justify-center gap-16"></div>
      <Footer />
    </div>
  );
};

export default HomePage;


