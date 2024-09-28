import { useContext } from "react";
import InputItem from "./shared/InputItem";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";

// Haversine formula to calculate distance between two lat/lng points
const haversineDistance = (coords1, coords2) => {
  const toRad = (x) => (x * Math.PI) / 180;

  const lat1 = coords1.lat;
  const lon1 = coords1.lng;
  const lat2 = coords2.lat;
  const lon2 = coords2.lng;

  const R = 6371; // Radius of the Earth in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance * 0.621371; // Convert kilometers to miles
};

function Search({ setDistance }) {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);

  const calculateDistance = () => {
    if (source && destination) {
      const dist = haversineDistance(
        { lat: source.lat, lng: source.lng },
        { lat: destination.lat, lng: destination.lng }
      );
      setDistance(dist); // Distance in miles
    }
  };

  return (
    <div className="bg-gray-900 p-10 rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
        <div>
          <p className="text-white mb-4 font-extrabold text-2xl md:text-4xl">Pick-Up Location</p>
          <InputItem type="source" />
        </div>
        <div>
          <p className="text-white mb-4 font-extrabold text-2xl md:text-4xl">Destination</p>
          <InputItem type="destination" />
        </div>
      </div>
      <div className="flex justify-center mt-8">
        <button
          className="py-3 px-10 bg-teal-500 hover:bg-teal-600 text-white rounded-full text-lg font-semibold"
          onClick={calculateDistance}
        >
          Find Ride
        </button>
      </div>
    </div>
  );
}

export default Search;
