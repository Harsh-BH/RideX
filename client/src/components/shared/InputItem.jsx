import { useState, useEffect, useContext } from "react";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import sourceImg from "./../../assets/source.png";
import destImg from "./../../assets/dest.png";
import './InputItem.css'; // Import updated CSS

function InputItem({ type }) {
  const [placeholder, setPlaceholder] = useState("");
  const { setSource, source } = useContext(SourceContext);
  const { setdestination, destination } = useContext(DestinationContext);
  const [value, setValue] = useState(type === "source" ? source : destination);
  const [suggestions, setSuggestions] = useState([]); // For holding location suggestions
  const [isFocused, setIsFocused] = useState(false); // For floating label animation

  useEffect(() => {
    setPlaceholder(type === "source" ? "Enter your pick-up location" : "Enter your destination");
  }, [type]);

  // Fetch location suggestions from Nominatim
  const fetchSuggestions = async (query) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${query}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  // Update location data (source or destination) based on selected suggestion
  const selectSuggestion = (place, type) => {
    const { lat, lon, display_name } = place;
    if (type === "source") {
      setSource({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        name: display_name,
        label: display_name,
      });
    } else {
      setdestination({
        lat: parseFloat(lat),
        lng: parseFloat(lon),
        name: display_name,
        label: display_name,
      });
    }
    setValue({ label: display_name });
    setSuggestions([]); // Clear suggestions after selection
  };

  return (
    <div className="relative bg-submain bg-opacity-25 p-4 rounded-lg shadow-md flex items-center animated-container">
      <img
        src={type === "source" ? sourceImg : destImg}
        alt={type}
        className="w-6 h-6 mr-4"
      />

      <div className="relative w-full">
        {/* Label animation with proper padding and spacing */}
        <label
          className={`absolute left-4 transition-all duration-300 ease-in-out text-gray-400 label ${
            isFocused || value?.label ? 'text-xs top-[-10px] transform -translate-y-0 text-white' : 'top-[20px] transform -translate-y-0'
          }`}
        >
          {placeholder}
        </label>

        <input
          className="w-full bg-transparent text-white border border-gray-500 focus:border-white focus:shadow-lg focus:shadow-teal-500/50 rounded-lg py-4 px-4 placeholder-transparent focus:outline-none text-lg transition-all ease-in-out duration-500 glow-effect"
          value={value?.label || ""}
          onChange={(e) => {
            setValue({ label: e.target.value });
            fetchSuggestions(e.target.value); // Fetch suggestions on input change
          }}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        {/* Render location suggestions with transition animations */}
        {suggestions.length > 0 && (
          <ul className="absolute suggestion-list z-50 w-full rounded-lg">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="p-2 cursor-pointer transition-all ease-in-out duration-300"
                onClick={() => selectSuggestion(suggestion, type)}
              >
                {suggestion.display_name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default InputItem;
