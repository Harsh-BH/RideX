import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import First from "./../assets/first.webp";
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";
import { useTronLink } from "../utils/useTronLink"; // Import your custom hook for TronLink

const DriverRegister = () => {
  const [name, setName] = useState(""); // Full name for driver registration
  const [license, setLicense] = useState(""); // Driving license for driver registration
  const { ridexContract, account, tronWebInstalled } = useTronLink(); // Destructure the contract and account from context
  const [loading, setLoading] = useState(true); // Loading state for the registration page

  // registerDriver function using the contract from context
  const registerDriver = async () => {
    if (!account) {
      toast.error("Please connect to TronLink.");
      return;
    }

    if (!name || !license) {
      toast.error("All fields are required.");
      return;
    }

    try {
      if (ridexContract) {
        const result = await ridexContract.registerDriver(name, license).send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: true,
        });
        console.log("Driver registered successfully:", result);

        // Clear input fields after successful registration
        setName("");
        setLicense("");
        toast.success("Driver registered successfully");
      } else {
        console.error("Ridex contract is not set. Please set the contract before registering driver.");
        toast.error("Contract not set. Please try again.");
      }
    } catch (error) {
      console.error("Error registering driver:", error.message);
      toast.error("Error registering driver: " + error.message);
    }
  };

  // Simulate loading for the registration page
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Loading finished after a timeout (for simulating real load)
    }, 4000); // Adjust the time for your loading requirements
  }, []);

  return (
    <>
      {loading ? (
        <div>
          <BikeLoader />
        </div>
      ) : (
        <>
          <Navbar />
          <div className="w-full h-screen flex items-center justify-center bg-gray-50">
            <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white w-full md:w-[80%] h-[80%]">
              {/* Left Side: Driver Registration Form */}
              <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    registerDriver();
                  }}
                >
                  <h3 className="text-3xl font-semibold text-gray-800 mb-6">
                    Become A Driver
                  </h3>
                  <div className="mb-4">
                    <label className="block text-gray-600 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <input
                      className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                      id="fullname"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your Full Name"
                    />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-600 text-sm font-medium mb-2">
                      Driving License Number
                    </label>
                    <input
                      className="shadow-sm border border-gray-300 rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring focus:ring-blue-300"
                      id="License"
                      type="text"
                      value={license}
                      onChange={(e) => setLicense(e.target.value)}
                      placeholder="Enter your Driving License Number"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="bg-blue-500 mx-auto hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-blue-300"
                      type="submit"
                      disabled={!tronWebInstalled || !account}
                    >
                      Register as a Driver
                    </button>
                  </div>
                </form>
              </div>

              {/* Right Side: Image */}
              <div className="hidden md:block w-full md:w-1/2">
                <img
                  src={First}
                  alt="Driver"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DriverRegister;
