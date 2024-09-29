import { useState, useEffect } from "react";
import { useWriteContract } from "wagmi";
import abi from "./../abi/contract.abi.json";
import { CONTRACT_ADDRESS } from "../constant";
import { toast } from "react-toastify";
import First from "./../assets/first.webp"; 
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";
import '../styles/DriverRegister.css'; // Import the CSS file

const DriverRegister = () => {
  const [name, setName] = useState("");
  const [license, setLicense] = useState("");
  const [loading, setLoading] = useState(true); 

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

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); 
    }, 4000);
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

          <div className="background-container">
            <div className="overlay"></div>

            <div className="form-container">
              <form onSubmit={onSubmit}>
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
                    disabled={isPending}
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
