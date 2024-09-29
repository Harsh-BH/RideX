
import Maps from "../components/shared/Maps";
import Search from "../components/Search";
import { useState, useEffect } from "react";
import CarListOption from "../components/CarListOption";
import BikeLoader from "../components/Loader/BikeLoader"; // Import the BikeLoader
import Navbar from "../components/shared/Navbar";

const RideBookingPage = () => {
  const [distance, setDistance] = useState(null);
  const [loading, setLoading] = useState(true); // New state to handle loading

  // Simulate loading for the map and search components
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Simulate loading complete after 2 seconds
    }, 1000); // Adjust time as needed
  }, []);

  return (
   <>
      {loading ? (
        <div>
          <BikeLoader />
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-main text-white">
            <Navbar />

            {/* Centered Map Section */}
            <div className="flex justify-center w-full p-6">
              <div className="w-full md:w-[80%] min-h-[50vh] h-auto rounded-xl overflow-hidden relative top-8">
                <Maps />
              </div>
            </div>

            {/* Search Section placed below the map */}
            <div className="flex justify-center w-full p-6">
              <div className="w-full md:w-[80%]">
                <Search setDistance={setDistance} />
              </div>
            </div>

            {/* Display CarListOption once distance is available */}
            {distance && (
              <div className="flex justify-center items-center w-full p-8 bg-white text-black">
                <div className="w-full md:w-[100%]">
                  <CarListOption distance={distance} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
 </>
  );
};

export default RideBookingPage;
