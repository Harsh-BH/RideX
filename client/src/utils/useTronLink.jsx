import { useState, useEffect, createContext, useContext } from "react";

// Create a Context for TronLink connection
const TronLinkContext = createContext();

// Create a provider component to wrap your app
export const TronLinkProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [tronWebInstalled, setTronWebInstalled] = useState(false);
  const [ridexContract,setRidexContract] = useState(null);
  useEffect(() => {
    const checkTronWeb = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronWebInstalled(true);
        const defaultAccount = window.tronWeb.defaultAddress.base58;
        setAccount(defaultAccount); // Set the connected account
        setContract();
      } else {
        console.log("TronWeb not available. Ensure that TronLink is installed.");
        setTronWebInstalled(false);
      }
    };

    const interval = setInterval(checkTronWeb,100000); // Check TronWeb every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  
  const disconnectTronLink = () => {
    setAccount(null); // Remove the account from state
    console.log("Disconnected from TronLink");
  };

  const setContract = async () => {
    try {
      if (window.tronWeb && window.tronWeb.ready) {
        console.log("TronWeb is ready. Setting contract...");
        const contractAddress = 'TAREhBbrj7CDqjeGmJQQXPx59SYNrxo6rN'; // Use your contract address here
        const contract = await window.tronWeb.contract().at(contractAddress);
        console.log("Contract started:", contract);
        setRidexContract(contract);
        console.log("Contract set successfully:", contract);
      } else {
        console.error("TronWeb not available or not ready.");
      }
    } catch (error) {
      console.error("Error setting contract:", error.message);
    }
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

// Create a custom hook to access the TronLink context
export const useTronLink = () => {
  return useContext(TronLinkContext);
};
