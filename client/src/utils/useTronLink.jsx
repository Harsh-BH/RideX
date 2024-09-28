import { useState, useEffect, createContext, useContext } from "react";

// Create a Context for TronLink connection
const TronLinkContext = createContext();

// Create a provider component to wrap your app
export const TronLinkProvider = ({ children }) => {
  const [account, setAccount] = useState(null);
  const [tronWebInstalled, setTronWebInstalled] = useState(false);

  useEffect(() => {
    const checkTronWeb = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronWebInstalled(true);
        const defaultAccount = window.tronWeb.defaultAddress.base58;
        setAccount(defaultAccount); // Set the connected account
      } else {
        console.log("TronWeb not available. Ensure that TronLink is installed.");
        setTronWebInstalled(false);
      }
    };

    const interval = setInterval(checkTronWeb, 1000); // Check TronWeb every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const connectTronLink = async () => {
    try {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const connectedAccount = window.tronWeb.defaultAddress.base58;
        setAccount(connectedAccount); // Set account if already connected
        console.log("Connected to TronLink with account:", connectedAccount);
      } else {
        console.error("TronWeb is not ready. Please ensure TronLink is installed and connected.");
      }
    } catch (error) {
      console.error("Error connecting to TronLink:", error);
    }
  };

  const disconnectTronLink = () => {
    setAccount(null); // Remove the account from state
    console.log("Disconnected from TronLink");
  };

  return (
    <TronLinkContext.Provider
      value={{
        account,
        tronWebInstalled,
        connectTronLink,
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
