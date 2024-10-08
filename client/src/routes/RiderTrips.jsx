import { toast } from "react-toastify";
import { useState, useEffect } from "react";
import { useTronLink } from "../utils/useTronLink"; 
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";
import carImage from "../assets/car-illustration.jpeg";  // Add your car illustration path
import "./RiderTrips.css";  // Import the CSS file here
import { Link } from 'react-router-dom';



const RiderTrips = () => {
  const [trips, setTrips] = useState([]);
  const [details, setDetails] = useState(null); 
  const [loading, setLoading] = useState(true);

  const { ridexContract, account } = useTronLink(); 

  // Define the TripStatus object here
  const TripStatus = {
    0: "Created",
    1: "Accepted",
    2: "Completed",
    3: "Cancelled",
  };

  const fetchRiderTrips = async () => {
    if (!account) {
      toast.error("Please connect to TronLink.");
      return;
    }


 const handleClick = () => {
  history.push('/review');
};


    try {
      if (ridexContract) {
        const result = await ridexContract.getRiderTrips().call();
        result.map((tripId) => {
          getTripDetails(Number(tripId));
        });
        console.log("Trips fetched successfully:", result);
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
        const rev = await ridexContract.getDriverDetails(account).call();
        result.push(rev[3]);
        console.log(result);
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

  useEffect(() => {
    fetchRiderTrips();
  }, [account, ridexContract]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <>
      {loading ? (
        <BikeLoader />
      ) : (
        <>
          <Navbar />
          <div className="rider-trips-layout">
            <div className="trips-details-section">
              <h5 className="trip-list-title">
                Rider Trips List
              </h5>
              <ul className="trip-list">
                {trips.map((trip, index) => (
                  <li key={index} className="trip-item">
                    <div className="trip-details">
                      <p className="trip-id">Trip ID: {Number(trip[0])}</p>
                      <p className="trip-id">Driver: {trip[1]} rating: {trip[10]} </p>
                      <Link to="/review" className="trip-id">
                        <button>Click me!</button>
                      </Link>
                      <p className="name"><strong>Origin:</strong> {trip[3]}</p>
                      <p className="name"><strong>Destination:</strong> {trip[4]}</p>
                      <p className="name"><strong>Fare:</strong> {Number(trip[7]) / 1000000} TRX</p>
                      <p className={`trip-status ${TripStatus[trip[8]] === "Created" ? "status-created" : TripStatus[trip[8]] === "Accepted" ? "status-accepted" : TripStatus[trip[8]] === "Completed" ? "status-completed" : "status-cancelled"}`}>
                        <strong>Status:</strong> {TripStatus[trip[8]] || "Unknown"}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="image-section">
              <img src={carImage} alt="Car Illustration" className="car-image" />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RiderTrips;
