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
    // Assuming loading is happening while setting up components (e.g., fetching map data)
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
        <Navbar/>
        <div className="min-h-screen flex flex-col gap-0 md:gap-5 pt-24">
          <div className="h-[60vh] flex flex-col md:flex-row gap-0 md:gap-5">
            {/* Search Section */}
            <div className="md:w-1/3 h-full p-4">
              <Search setDistance={setDistance} />
            </div>

            {/* Map Section */}
            <div className="md:w-2/3 h-full relative flex-grow">
              <Maps />
            </div>
          </div>

          {/* Display CarListOption once distance is available */}
          {distance && (
            <div className="p-4 bg-white mt-6">
              <CarListOption distance={distance} />
            </div>
          )}
        </div>
        </>
      )}
    </LoadScript>
  );
};

export default RideBookingPage;
