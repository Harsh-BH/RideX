import { useState, useEffect, useContext } from "react";
import { SourceContext } from "../../context/SourceContext";
import { DestinationContext } from "../../context/DestinationContext";
import sourceImg from "./../../assets/source.png";
import destImg from "./../../assets/dest.png";

function InputItem({ type }) {
  const [placeholder, setPlaceholder] = useState("");
  const { setSource, source } = useContext(SourceContext);
  const { setdestination, destination } = useContext(DestinationContext);
  const [value, setValue] = useState(type === "source" ? source : destination);
  const [suggestions, setSuggestions] = useState([]); // For holding location suggestions

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
    <div className="relative bg-gray-800 p-4 rounded-lg shadow-md flex items-center">
      <img
        src={type === "source" ? sourceImg : destImg}
        alt={type}
        className="w-6 h-6 mr-4"
      />

      <div className="w-full">
        <input
          className="w-full bg-transparent text-white border border-gray-500 focus:border-white rounded-lg py-2 px-4 placeholder-gray-400 focus:outline-none text-lg transition-all ease-in-out duration-300"
          value={value?.label || ""}
          placeholder={placeholder}
          onChange={(e) => {
            setValue({ label: e.target.value });
            fetchSuggestions(e.target.value); // Fetch suggestions on input change
          }}
        />

        {/* Render location suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white z-50 shadow-lg max-h-40 overflow-y-auto w-full rounded-lg mt-2">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="p-2 cursor-pointer hover:bg-gray-100 text-sm"
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
