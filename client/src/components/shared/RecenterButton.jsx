import { useMap } from "react-leaflet"; // Import useMap hook from react-leaflet
import { FaMapMarkerAlt } from 'react-icons/fa'; // Import map marker icon from react-icons
import './RecenterButton.css'; // Import the CSS for the button

const RecenterButton = ({ location }) => {
  const map = useMap(); // Access the map instance

  const handleRecenter = () => {
    if (location) {
      map.setView([location.lat, location.lng], 20); // Recenter map on user's location with zoom level 20
    }
  };

  return (
    <button
      className="recenter-button" // CSS class for styling
      onClick={handleRecenter}
    >
      <FaMapMarkerAlt size={20} className="icon" /> {/* Icon for recentering */}
      <span className="button-text">Recenter</span> {/* Button text */}
    </button>
  );
};

export default RecenterButton;
