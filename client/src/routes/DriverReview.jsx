import React, { useState } from "react";
import Navbar from "../components/shared/Navbar";
import { useTronLink } from "../utils/useTronLink"; 


const RiderReviews = () => {
  const [name, setName] = useState(""); // State for the name input
  const [rate, setRate] = useState(""); // State for the rating input

  const { ridexContract, account } = useTronLink(); 

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form from refreshing the page

    try {
      const result = await ridexContract.rateDriver(name, rate).send({
        feeLimit: 100_000_000,
        callValue: 0,
        shouldPollResponse: true,
      });
      console.log("Driver registered successfully:", result);
    } catch (error) {
      console.error("Error registering driver:", error);
    }
  };

  return (
    <div className="bg-main w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white bg-opacity-10 border-4 border-white border-opacity-30 shadow-xl rounded-2xl p-8 max-w-xl w-full py-12 hover:scale-105 transition-all">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Review</h2>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                Address
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
                value={name} // Bind the input to state
                onChange={(e) => setName(e.target.value)} // Update state when the value changes
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="rate">
                Rating
              </label>
              <input
                type="text"
                id="rate"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your rating"
                value={rate} // Bind the input to state
                onChange={(e) => setRate(e.target.value)} // Update state when the value changes
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="bg-submain hover:bg-opacity-90 hover:scale-110 hover:translate-y-[-10px] transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RiderReviews;
