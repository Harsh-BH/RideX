import { LoadScript } from "@react-google-maps/api";
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
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
    >
      {loading ? (
        <div>
          <BikeLoader />
        </div>
      ) : (
        <>
          <div className="min-h-screen bg-gray-900 text-white">
            <Navbar />

            {/* Centered Map Section */}
            <div className="flex justify-center w-full p-6">
              <div className="w-full md:w-[80%] min-h-[50vh] h-auto rounded-xl overflow-hidden">
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
              <div className="flex justify-center w-full p-6 bg-white text-black">
                <div className="w-full md:w-[60%]">
                  <CarListOption distance={distance} />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </LoadScript>
  );
};

export default RideBookingPage;
