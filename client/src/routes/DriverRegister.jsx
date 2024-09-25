import { useState,useEffect } from "react";
import { useWriteContract } from "wagmi";
import abi from "./../abi/contract.abi.json";
import { CONTRACT_ADDRESS } from "../constant";
import { toast } from "react-toastify";
import First from "./../assets/first.webp"; 
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";
const DriverRegister = () => {
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [loading, setLoading] = useState(true); // New state to handle loading


  const { data: hash, isPending, writeContract, error } = useWriteContract();
  console.log(hash);

  if (error) {
    toast.error(error.shortMessage || error.message);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (!name || !license) {
      toast.error("All fields are compulsory");
      return;
    }

    writeContract({
      abi,
      address: CONTRACT_ADDRESS,
      functionName: "registerDriver",
      args: [name, license],
    });
  };

    // Simulate loading for the map and search components
    useEffect(() => {
      // Assuming loading is happening while setting up components (e.g., fetching map data)
      setTimeout(() => {
        setLoading(false); // Simulate loading complete after 2 seconds
      }, 4000); // Adjust time as needed
    }, []);

  return (
    <>
    {loading ? (
      <div>
        <BikeLoader /> 
      </div>
    ) : (
    <>
    <Navbar/>
 
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row shadow-lg rounded-lg overflow-hidden bg-white w-full md:w-[80%] h-[80%]">
        
        {/* Left Side: Driver Registration Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-white">
          <form onSubmit={onSubmit}>
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
                type="number"
                value={license}
                onChange={(e) => setLicense(e.target.value)}
                placeholder="Enter your Driving License Number"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 mx-auto hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline disabled:bg-blue-300"
                type="submit"
                disabled={isPending}
              >
                {isPending ? 'Registering...' : 'Register as a Driver'}
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
    )};
    </>
  );
};

export default DriverRegister;
