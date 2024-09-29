import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import First from "./../assets/first.webp";
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";
import { useTronLink } from "../utils/useTronLink"; // Import your custom hook for TronLink
import "./DriverRegister.css"

const DriverRegister = () => {
  const [name, setName] = useState(""); // Full name for driver registration
  const [license, setLicense] = useState(""); // Driving license for driver registration
  const { ridexContract, account, tronWebInstalled } = useTronLink(); // Destructure the contract and account from context
  const [loading, setLoading] = useState(true); // Loading state for the registration page
  const [isPending, setIsPending] = useState(false); // To manage the registration state

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
      setIsPending(true); // Set pending state when the registration process starts
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
    } finally {
      setIsPending(false); // Reset the pending state after the registration process completes
    }
  };

  // Simulate loading for the registration page
  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // Loading finished after a timeout (for simulating real load)
    }, 1000); // Adjust the time for your loading requirements
  }, []);

  return (
    <>
      {loading ? (
        <BikeLoader />
      ) : (
        <>
          <Navbar />
          <div className="background-container">
            <div className="overlay"></div>

            <div className="form-container">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  registerDriver();
                }}
              >
                <h3 className="form-title">BECOME A DRIVER</h3>

                <div className="form-group">
                  <label className="form-label" htmlFor="fullname">
                    Full Name
                  </label>
                  <input
                    className="form-input"
                    id="fullname"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your Full Name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label" htmlFor="License">
                    Driving License Number
                  </label>
                  <input
                    className="form-input"
                    id="License"
                    type="text"
                    value={license}
                    onChange={(e) => setLicense(e.target.value)}
                    placeholder="Enter your Driving License Number"
                    required
                  />
                </div>

                <div className="button-container">
                  <button
                    className="submit-button"
                    type="submit"
                    disabled={isPending || !tronWebInstalled || !account}
                  >
                    {isPending ? "Registering..." : "Register"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default DriverRegister;
