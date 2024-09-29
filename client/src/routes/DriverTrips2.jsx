import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useTronLink } from "../utils/useTronLink"; 
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";
import carImage from "../assets/car-illustration.jpeg";  // Add your car illustration path
import "./RiderTrips.css";  // Import the CSS file here
import Maps from "../components/shared/Maps";

const RiderTrips = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [acceptedTrips, setAcceptedTrips] = useState(new Set()); // State to track accepted trips

  const { ridexContract, account } = useTronLink(); 
 
  const fetchRiderTrips = async () => {
    if (!account) {
      toast.error("Please connect to TronLink.");
      return;
    }

    try {
      if (ridexContract) {
        const result = await ridexContract.tripCounter().call();

        for(let i = 0; i < result; i++){
          getTripDetails(i);
        }
      } else {
        console.error("Ridex contract is not set.");
      }
    } catch (error) {
      console.error("Error fetching rider trips:", error.message);
      toast.error("Error fetching rider trips: " + error.message);
    }
  };

  const getTripDetails = async (tripId) => {
    try {
      if (ridexContract) {
        const result = await ridexContract.getTripDetails(tripId).call();
        setTrips((prevTrips) => {
          if (!prevTrips.find(trip => Number(trip[0]) === Number(result[0]))) {
            return [...prevTrips, result];
          }
          return prevTrips;
        });
      }
    } catch (error) {
      console.error("Error fetching trip details:", error.message);
      toast.error("Error fetching trip details: " + error.message);
    }
  };
  
  const TripStatus = {
    0: "Created",
    1: "Accepted",
    2: "Completed",
    3: "Cancelled",
  };

  useEffect(() => {
    fetchRiderTrips(); 
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // Function to handle accepting a trip
  const handleAcceptTrip = async (tripId) => {
    const result = await ridexContract.acceptTrip(Number(tripId)).send({
      feeLimit: 100_000_000,
      callValue: 0,
      shouldPollResponse: true,
    });
    console.log("Trip Accepted:", result);
    setAcceptedTrips((prev) => new Set(prev).add(Number(tripId))); // Add tripId to acceptedTrips set
  };

  return (
    <div  className="bg-main">
      {loading ? (
        <BikeLoader />
      ) : (
        <>
          <Navbar />
          <div className="rider-trips-layout flex flex-col h-full overflow-y-hidden">
            <div className="h-[60vh] w-full relative top-24 px-20 flex justify-evenly">
              <div className="h-full w-[40%] bg-[url(./assets/img3.jpg)] bg-cover rounded-2xl border-2 border-submain"></div>
              <div className="w-[40%] relative top-[-50px]">
                <Maps/>
              </div>
            </div>
            <div className="relative top-32">
              <h5 className="trip-list-title border-b-2 border-white w-fit text-[30px] font-bold">
                RIDER TRIP REQUESTS
              </h5>
              <div className="trip-list flex flex-col gap-8 justify-cevenly">
                {trips.map((trip, index) => (
                  <li key={index} className="">
                    <div className="trip-details flex w-[93vw] justify-center gap-4 font-semibold text-[20px]  py-8 px-6 items-center rounded-xl bg-submain bg-opacity-25 shadow-xl">
                      <p className="w-[100px]">TRIP ID: {Number(trip[0])}</p>
                      <div className="flex gap-2 justify-center items-center"> FROM:
                      <p className="w-[20vw] h-[5vh] bg-gray-300 rounded overflow-auto p-2"> {trip[3]}</p>
                      </div>
                      <div className="flex gap-2 justify-center items-center">TO:
                      <p className="w-[20vw] h-[5vh] bg-gray-300 rounded overflow-auto p-2"> {trip[4]}</p>
                      </div>
                      <div className="w-44 h-[5vh]"><strong>Fare:</strong> {Number(trip[7]) / 1000000} TRX</div>
                      <p className={` ${TripStatus[trip[8]] === "Created" ? "status-created text-white" : TripStatus[trip[8]] === "Accepted" ? "status-accepted text-blue-500" : TripStatus[trip[8]] === "Completed" ? "status-completed text-green-400" : "status-cancelled text-red-500"}`}>
                        <strong>Status:</strong> {TripStatus[trip[8]] || "Unknown"}
                      </p>

                      {/* Conditionally render Accept or Complete Trip button */}
                      {!acceptedTrips.has(Number(trip[0])) ? (
                        <button className="px-4 py-2 rounded-full w-[200px] bg-green-500 hover:bg-green-600 transition"
                          onClick={() => handleAcceptTrip(Number(trip[0]))}>
                          Accept
                        </button>
                      ) : (
                        <button className="px-4 py-2 rounded-full w-[200px] bg-red-500"
                          onClick={async () => {
                            const result = await ridexContract.completeTrip(Number(trip[0])).send({
                              feeLimit: 100_000_000,
                              callValue: 0,
                              shouldPollResponse: true,
                            });
                            console.log("Trip Completed:", result);
                          }}>
                          Complete Trip
                        </button>
                      )}
                    </div>
                  </li>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default RiderTrips;
