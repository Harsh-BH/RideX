import { toast } from "react-toastify";
import { useState, useEffect } from "react";


import { useTronLink } from "../utils/useTronLink"; // Assuming this is where you store the contract and account
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";

const RiderTrips = () => {
  const [trips, setTrips] = useState([]);
  const [details, setDetails] = useState(null); // To store the trip details
  const [loading, setLoading] = useState(true);

  const { ridexContract, account, tronWebInstalled } = useTronLink(); // Use the TronLink context
 
  const fetchRiderTrips = async () => {


    if (!account) {
      toast.error("Please connect to TronLink.");
      return;
    }


    try {
      if (ridexContract) {

        const result = await ridexContract.getRiderTrips().call();
        console.log(result)
        setTrips(result);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getRiderTrips.");
      }
    } catch (error) {
      console.error("Error fetching rider trips:", error.message);
      toast.error("Error fetching rider trips: " + error.message);
    }
  };

  const getTripDetails = async (tripId) => {
    try {
      if (ridexContract) {
        console.log("Fetching trip details...");
        const result = await ridexContract.getTripDetails(tripId).call();
        console.log("result of trips is :",result)
        console.log("Trip details retrieved:", result);
        setDetails(result); // Set the details in state
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getTripDetails.");
      }
    } catch (error) {
      console.error("Error fetching trip details:", error.message);
      toast.error("Error fetching trip details: " + error.message);
    }
  };

  useEffect(() => {
    fetchRiderTrips(); // Fetch trips on component load
  }, []);



   // Simulate loading for the registration page
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Loading finished after a timeout (for simulating real load)
    }, 1000); // Adjust the time for your loading requirements
  }, []);

  return (
    <>
    {loading ? (
      <div>
        <BikeLoader />
      </div>
    ) : (
      <>
  <Navbar />
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Rider Trips List
          </h5>
        </div>
        <div className="flow-root">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {trips.map((trip, index) => (
              <li key={index} className="py-3 sm:py-4">
                <div className="flex items-center">
                  <div className="flex-1 min-w-0 ms-4">
                    <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                      Trip ID: {trip.tripId}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Origin: {trip.origin}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Destination: {trip.destination}
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Fare: {trip.fare} TRX
                    </p>
                    <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                      Status: {trip.status}
                    </p>
                    <button
                      onClick={() => getTripDetails(trip.tripId)} // Fetch trip details on click
                      className="mt-2 bg-blue-500 text-white py-1 px-3 rounded"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Trip Details Modal or Section */}
        {details && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow">
            <h3 className="text-lg font-bold mb-2">Trip Details</h3>
            <p>Trip ID: {details.tripId}</p>
            <p>Rider Address: {details.riderAddress}</p>
            <p>Driver Address: {details.driverAddress}</p>
            <p>Origin: {details.origin}</p>
            <p>Destination: {details.destination}</p>
            <p>Fare: {details.fare} TRX</p>
            <p>Status: {details.status}</p>
            <p>Start Time: {new Date(details.startTime * 1000).toLocaleString()}</p>
            <p>End Time: {new Date(details.endTime * 1000).toLocaleString()}</p>
            <p>Transaction ID: {details.transactionId}</p>
          </div>
        )}
      </div>
    </div>
    </>
    )}
</>
  );

};

export default RiderTrips;
