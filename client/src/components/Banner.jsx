import { LoadScript } from "@react-google-maps/api";
import First from "./../assets/first.webp";
import { useContext, useState } from "react";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Link } from "react-router-dom";
import Navbar from "./shared/Navbar";

const Banner = () => {
  const [start, setStart] = useState(null);
  const [end, setEnd] = useState(null);

  const { setSource } = useContext(SourceContext);
  const { setdestination } = useContext(DestinationContext);

  const getLatandLng = (place, type) => {
    const placeId = place.value.place_id;
    const service = new window.google.maps.places.PlacesService(
      document.createElement("div")
    );
    service.getDetails({ placeId }, (result, status) => {
      if (status === "OK" && result.geometry && result.geometry.location) {
        if (type == "source") {
          setSource({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            name: result.formatted_address,
            label: result.name,
          });
        } else {
          setdestination({
            lat: result.geometry.location.lat(),
            lng: result.geometry.location.lng(),
            name: result.formatted_address,
            label: result.name,
          });
        }
        // const lat = result.geometry.location.lat();
        // const lng = result.geometry.location.lng();
      }
    });
  };

  return (
    <>
  
    <LoadScript
      libraries={["places"]}
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_API_KEY}
    >
<div className="w-full bg-[url('./assets/bg12.jpg')] bg-cover bg-center h-[100vh] flex items-center justify-center rounded-b-[500px]">
  {/* <div className="container-lg flex items-center justify-between px-5 h-[555px]"> */}
    {/* <div className="container h-[383px]">
      
      <div className="h-[191px]">
       
        <div className="h-[191px] flex text-center md:text-left flex-col justify-between">
          <h1 className="text-[42px] font-semibold leading-tight text-gray-900">
            Go anywhere with RideX
          </h1>
          <p className="text-[16px] text-gray-600 font-normal">
            Request a ride, hop in, and go.
          </p>
        </div>
      </div>
      <div className="h-[191px] mt-4">
        Location input
        <div className="md:w-[396px] h-[47px] bg-white rounded-md flex items-center shadow-sm border border-gray-300">
          <div className="ml-3 text-gray-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              data-baseweb="icon"
            >
              <title>search</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm5-2a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="ml-2 w-full">
            <GooglePlacesAutocomplete
              selectProps={{
                start,
                onChange: (place) => {
                  getLatandLng(place, "source");
                  setStart(place);
                },
                placeholder: "Enter location",
                isClearable: true,
                className: "w-full outline-none",
                components: {
                  DropdownIndicator: false,
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#ffffff",
                    border: "none",
                  }),
                },
              }}
            />
          </div>
        </div>
        
        
        <div className="md:w-[396px] h-[47px] mt-[12px] bg-white rounded-md flex items-center shadow-sm border border-gray-300">
          <div className="ml-3 text-gray-400">
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              data-baseweb="icon"
            >
              <title>search</title>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14 10h-4v4h4v-4ZM7 7v10h10V7H7Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <div className="ml-2 w-full">
            <GooglePlacesAutocomplete
              selectProps={{
                end,
                onChange: (place) => {
                  getLatandLng(place, "destination");
                  setEnd(place);
                },
                placeholder: "Enter destination",
                isClearable: true,
                className: "w-full outline-none",
                components: {
                  DropdownIndicator: false,
                },
                styles: {
                  control: (provided) => ({
                    ...provided,
                    backgroundColor: "#ffffff",
                    border: "none",
                  }),
                },
              }}
            />
          </div>
        </div>

        
        <div className="w-[127px] h-[48px] mt-[25px] rounded-md bg-black flex justify-center items-center">
          <Link
            to="/book-ride"
            className="text-white text-[16px] font-medium"
          >
            See prices
          </Link>
        </div>
      </div>
    </div>

    
    <div className="hidden md:block">
      <img src={First} width={552} height={552} alt="First picture" className="object-cover rounded-md shadow-md" />
    </div> */}
    <div className="flex justify-between items-center gap-32 h-full w-full text-white ">
      <div className="w-1/2 h-full flex flex-col justify-top items-center gap-8 relative top-[25%]">
      <h1 className="animate-slide-from-left font-bold text-[110px] text-submain">COMFORT</h1>
      <p className="animate-fade-in text-[16px] px-[50px] box-border w-[500px] text-left font-semibold text-submain">RIDEX OFFERS ECO-FRIENDLY TRAVEL WITH SECURE, COMFORTABLE RIDES. OUR SUSTAINABLE PRACTICES REDUCE ENVIRONMENTAL IMPACT, WHILE ENSURING SAFETY AND COMFORT REMAIN TOP PRIORITIES FOR EVERY PASSENGER.</p>
      </div>
      <div className="w-1/2 h-full flex flex-col justify-top items-center gap-8 relative top-[25%]">
      <h1 className="animate-slide-from-right font-bold text-[110px]">VOYAGES</h1>
      <p className="animate-fade-in text-[16px] px-[100px] box-border w-[500px] text-right font-semibold">
      
      REQUEST A RIDE FOR NOW OR LATER.
      REQUEST A RIDE, HOP IN, AND GO.
      </p>
      <Link to="/book-ride" className="opacity-0 animate-fade-in-delayed text-[20px] border-2 rounded-md font-semibold border-white px-4 py-2 hover:bg-opacity-50 hover:bg-main transition hover:scale-125 hover:backdrop-blur-sm mr-[-150px] hover:border-purple-700">
      GET STARTED
      </Link>
      </div>

    {/* </div> */}
  </div>
</div>


    </LoadScript>
    </>
  );
};

export default Banner;
