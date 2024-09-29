import { useState, useEffect, createContext, useContext } from "react";

// Create a Context for TronLink connection
const TronLinkContext = createContext();

// Create a provider component to wrap your app
export const TronLinkProvider = ({ children }) => {
  const [account, setAccount] = useState(localStorage.getItem("tronLinkAccount") || null);
  const [tronWebInstalled, setTronWebInstalled] = useState(false);
  const [ridexContract, setRidexContract] = useState(null);

  useEffect(() => {
    const checkTronWeb = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronWebInstalled(true);
        const defaultAccount = window.tronWeb.defaultAddress.base58;
        if (defaultAccount) {
          setAccount(defaultAccount);
          localStorage.setItem("tronLinkAccount", defaultAccount); // Store account in localStorage
          setContract();
        }
      } else {
        console.log("TronWeb not available. Ensure that TronLink is installed.");
        setTronWebInstalled(false);
      }
    };

    checkTronWeb();
    const interval = setInterval(checkTronWeb, 10000); // Check TronWeb every 10 seconds

    // Listen for account changes in TronLink
    window.addEventListener("message", (e) => {
      if (e.data.message && e.data.message.action === "setAccount") {
        const newAccount = e.data.message.data.address;
        setAccount(newAccount);
        localStorage.setItem("tronLinkAccount", newAccount); // Store the new account
        setContract();
      }
    });

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const setContract = async () => {
    try {
      if (window.tronWeb && window.tronWeb.ready) {
        const contractAddress = 'TNas9Zs2MbVhEqc1uhqtwuf9B89WVZVmBo'; // Your contract address here
        const contract = await window.tronWeb.contract().at(contractAddress);
        setRidexContract(contract);
      }
    } catch (error) {
      console.error("Error setting contract:", error.message);
    }
  };

  const disconnectTronLink = () => {
    setAccount(null);
    localStorage.removeItem("tronLinkAccount"); // Remove the account from localStorage
    console.log("Disconnected from TronLink");
  };

  return (
    <TronLinkContext.Provider
      value={{
        account,
        tronWebInstalled,
        ridexContract,
        disconnectTronLink,
      }}
    >
      {children}
    </TronLinkContext.Provider>
  );
};

// Custom hook to access the TronLink context
export const useTronLink = () => {
  return useContext(TronLinkContext);
};
