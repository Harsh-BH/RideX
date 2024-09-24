import { useContext, useState } from "react";
import InputItem from "./shared/InputItem";
import CarListOption from "./CarListOption";
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
    <div>
      <div className="p-2 md:pd-6 border-[2px] rounded-xl">
        <p className="text-[20px] font-bold p-3">Get a ride</p>
        <InputItem type="source" />
        <InputItem type="destination" />
        <button
          className="p-3 bg-black w-full mt-5 text-white rounded-lg"
          onClick={calculateDistance}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default Search;
