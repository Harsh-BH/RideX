import { Route, Routes } from "react-router-dom";

import HomePage from "./routes/HomePage";

import RideBookingPage from "./routes/RideBooking";
import { useState } from "react";
import { SourceContext } from "./context/SourceContext";
import { DestinationContext } from "./context/DestinationContext";

import DriverRegister from "./routes/DriverRegister";
import Notification from "./components/shared/Notification";
import RiderTrips from "./routes/RiderTrips";

import DriverTrips2 from "./routes/DriverTrips2";
import { TronLinkProvider } from "./utils/useTronLink.jsx";

const App = () => {
  const [source, setSource] = useState([]);
  const [destination, setdestination] = useState([]);



  return (
    <TronLinkProvider>
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setdestination }}>
      
        <Notification />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/book-ride" element={<RideBookingPage />} />{" "}
       
          <Route path="/driver-register" element={<DriverRegister />} />{" "}
          <Route path="/rider/trips" element={<RiderTrips />} />{" "}
          <Route path="/rider/DriverTrips2" element={<DriverTrips2 />} />{" "}
          {/* <Route path="/driver/trips" element={<DriverTrips />} /> */}
        </Routes>

    
      </DestinationContext.Provider>
    </SourceContext.Provider>
    </TronLinkProvider>
  );
};

export default App;
