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
    setPlaceholder(type === "source" ? "Pickup Location" : "Dropoff Location");
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
    <div className="bg-slate-200 p-3 rounded-lg mt-3 flex items-center gap-4">
      <img
        src={type === "source" ? sourceImg : destImg}
        width={15}
        height={15}
      />

      <div className="w-full relative">
        {/* Input field for searching locations */}
        <input
          className="w-full outline-none bg-transparent border-none"
          value={value?.label || ""}
          placeholder={placeholder}
          onChange={(e) => {
            setValue({ label: e.target.value });
            fetchSuggestions(e.target.value); // Fetch suggestions on input change
          }}
        />

        {/* Render location suggestions */}
        {suggestions.length > 0 && (
          <ul className="absolute bg-white z-50 shadow-md max-h-40 overflow-y-auto w-full">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.place_id}
                className="p-2 cursor-pointer hover:bg-gray-200"
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

InputItem.propTypes = {
  type: String,
};
