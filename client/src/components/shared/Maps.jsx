import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import RecenterButton from './RecenterButton'; // Import the RecenterButton

// Custom hook to get live location
const useLiveLocation = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error fetching location:", error);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 0,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId); // Cleanup on unmount
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }, []);

  return location;
};

// Component to center the map on live location
const MapCenterOnLocation = ({ location }) => {
  const map = useMap(); // Access the map instance

  useEffect(() => {
    if (location) {
      map.setView([location.lat, location.lng], 20); // Center map on user's location with zoom level 13
    }
  }, [location, map]);

  return null; // No UI elements needed, only adjusting the map's view
};

const Directions = ({ source, destination }) => {
  const map = useMap();

  useEffect(() => {
    if (!source || !destination) return;

    const fetchDirections = async () => {
      const url = `https://router.project-osrm.org/route/v1/driving/${source.lng},${source.lat};${destination.lng},${destination.lat}?overview=full&geometries=geojson`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.routes.length) {
        const routeCoordinates = data.routes[0].geometry.coordinates.map(
          ([lng, lat]) => [lat, lng]
        );
        const polyline = L.polyline(routeCoordinates, { color: "blue" }).addTo(map);
        map.fitBounds(polyline.getBounds());
      }
    };

    fetchDirections();
  }, [source, destination, map]);

  return null;
};

const Maps = () => {
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const userLocation = useLiveLocation(); // Get the user's live location
  const defaultPosition = [51.505, -0.09]; // Default position if live location isn't available

  return (
    <div style={{ position: "relative", marginTop: "100px" }}>
      <MapContainer
        center={defaultPosition} // Initial default center
        zoom={20}
        style={{
          height: "70vh",
          width: "100%",
          position: "relative",
          zIndex: 1,
          borderRadius: "15px", // Rounded map corners
          overflow: "hidden",
        }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {userLocation && <MapCenterOnLocation location={userLocation} />}

        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {source && destination && (
          <Directions source={source} destination={destination} />
        )}

        {userLocation && <RecenterButton location={userLocation} />} {/* Recenter Button */}
      </MapContainer>
    </div>
  );
};

export default Maps;
