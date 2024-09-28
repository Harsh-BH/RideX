import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import { useEffect, useState, useContext } from "react";
import "leaflet/dist/leaflet.css";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";

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

const RecenterButton = ({ location }) => {
  const map = useMap(); // Access the map instance

  const handleRecenter = () => {
    if (location) {
      map.setView([location.lat, location.lng], 20); // Recenter map on user's location with zoom level 13
    }
  };

  return (
    <button
      style={{
        position: "absolute",
        top: "10px",
        right: "10px",
        zIndex: 1000,
        padding: "10px 20px",
        backgroundColor: "white",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={handleRecenter}
    >
      Recenter Map
    </button>
  );
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
    <div style={{ position: "relative", marginTop: "50px" }}> {/* Adjust the margin as needed */}
     

<MapContainer
  center={defaultPosition} // Initial default center
  zoom={20}
  style={{
    height: "70vh",
    width: "100%",
    position: "relative",
    zIndex: 1,
    borderRadius: "15px", // This will give the map rounded corners
    overflow: "hidden", // Ensure content inside respects the rounded corners
  }}
>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Automatically center the map when the user's live location changes */}
        {userLocation && <MapCenterOnLocation location={userLocation} />}

        {/* Show user's live location */}
        {userLocation && (
          <Marker position={userLocation}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}

        {/* Show directions between source and destination if provided */}
        {source && destination && (
          <Directions source={source} destination={destination} />
        )}

        {/* Recenter Button */}
        {userLocation && <RecenterButton location={userLocation} />}
      </MapContainer>
    </div>
  );
};

export default Maps;
