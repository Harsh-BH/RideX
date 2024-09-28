import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [account, setAccount] = useState(null);
  const [tronWebInstalled, setTronWebInstalled] = useState(false);
  const [ridexContract, setRidexContract] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [trip, setTrip] = useState('');
  const [driverName, setDriverName] = useState(''); // State for driver name
  const [driverLicence, setDriverLicence] = useState(''); // State for driver licence
  const [details,setDetails] = useState(''); // State for driver details
  useEffect(() => {
    const checkTronWeb = async () => {
      if (window.tronWeb && window.tronWeb.ready) {
        setTronWebInstalled(true);
        const defaultAccount = window.tronWeb.defaultAddress.base58;
        setAccount(defaultAccount);
      } else {
        console.log("TronWeb not available. Ensure that TronLink is installed.");
        setTronWebInstalled(false);
      }
    };
    const interval = setInterval(checkTronWeb, 1000);
    return () => clearInterval(interval);
  }, []);

  const setContract = async () => {
    try {
      if (window.tronWeb && window.tronWeb.ready) {
        console.log("TronWeb is ready. Setting contract...");
        const contractAddress = 'TAREhBbrj7CDqjeGmJQQXPx59SYNrxo6rN'; // Use your contract address here
        const contract = await window.tronWeb.contract().at(contractAddress);
        setRidexContract(contract);
        console.log("Contract set successfully:", contract);
      } else {
        console.error("TronWeb not available or not ready.");
      }
    } catch (error) {
      console.error("Error setting contract:", error.message);
    }
  };

  const connectTronLink = async () => {
    try {
      if (window.tronWeb && window.tronWeb.defaultAddress.base58) {
        const connectedAccount = window.tronWeb.defaultAddress.base58;
        setAccount(connectedAccount);
        console.log("Connected to TronLink with account:", connectedAccount);
      } else {
        console.error("TronWeb is not ready. Please ensure TronLink is installed and connected.");
      }
    } catch (error) {
      console.error("Error connecting to TronLink:", error);
    }
  };

  const disconnectTronLink = () => {
    setAccount(null);
    console.log("Disconnected from TronLink");
  };

  const postAd = async (title, description, price) => {
    if (ridexContract) {
      const priceInSun = window.tronWeb.toSun(price);
      try {
        console.log("Posting ad...");
        const result = await ridexContract.postBookInfo(title, description, priceInSun).send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: true,
        });
        console.log("Ad posted successfully:", result);
      } catch (error) {
        console.error("Error posting ad:", error.message);
      }
    } else {
      console.log("Contract not set. Please connect to TronLink.");
    }
  };

  const tripCounter = async () => {
    try {
      if (ridexContract) {
        console.log("Fetching trip counter...");
        const count = await ridexContract.tripCounter().call();
        console.log("Trip count retrieved:", count);
        setTrip(count);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling tripCounter.");
      }
    } catch (error) {
      console.error("Error fetching trip counter:", error.message);
    }
  };

  const registerDriver = async () => {
    try {
      if (ridexContract) {
        const result = await ridexContract.registerDriver("driverName", "34567").send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: true,
        });
        console.log("Driver registered successfully:", result);
        // Clear input fields after successful registration
        setDriverName('');
        setDriverLicence('');
      } else {
        console.error("Ridex contract is not set. Please set the contract before registering driver.");
      }
    } catch (error) {
      console.error("Error registering driver:", error.message);
    }
  };

  const createTrip = async () => {
    try {
      if (ridexContract) {
        const result = await ridexContract.createTrip("place1", "place2").send({
          feeLimit: 100_000_000,
          callValue: 0,
          shouldPollResponse: true,
        });
        console.log("trip created:", result);
        // Clear input fields after successful registration
      } else {
        console.error("trip not created");
      }
    } catch (error) {
      console.error("Error trip creation:", error.message);
    }
  };

  const getDriver = async () => {
    try {
      if (ridexContract) {
        const result = await ridexContract.getDriverDetails("TQSouCbDBXHfKjwMueJdWsngAJfzUSvbGY").call();
        console.log("Details:", result);
        setDetails(result);
      } else {
        console.error("Ridex contract is not set. Please set the contract before registering driver.");
      }
    } catch (error) {
      console.error("Error registering driver:", error.message);
    }
  };

  const isContractReady = () => {
    return ridexContract !== null;
  };

  const getTransactionCounter = async () => {
    try {
      if (ridexContract) {
        console.log("Fetching transaction counter...");
        const count = await ridexContract.getTransactionCounter().call();
        console.log("Transaction count retrieved:", count);
        setTrip(count);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getTransactionCounter.");
      }
    } catch (error) {
      console.error("Error fetching transaction counter:", error.message);
    }
  };
  
  const getTripDetails = async (tripId) => {
    try {
      if (ridexContract) {
        console.log("Fetching trip details...");
        const result = await ridexContract.getTripDetails(tripId).call();
        console.log("Trip details retrieved:", result);
        setDetails(result);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getTripDetails.");
      }
    } catch (error) {
      console.error("Error fetching trip details:", error.message);
    }
  };
  
  const getTransactionDetails = async (tripId, transactionId) => {
    try {
      if (ridexContract) {
        console.log("Fetching transaction details...");
        const result = await ridexContract.getTransactionDetails(tripId, transactionId).call();
        console.log("Transaction details retrieved:", result);
        setDetails(result);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getTransactionDetails.");
      }
    } catch (error) {
      console.error("Error fetching transaction details:", error.message);
    }
  };
  
  const getRiderTrips = async () => {
    try {
      if (ridexContract) {
        console.log("Fetching rider trips...");
        const result = await ridexContract.getRiderTrips().call();
        console.log("Rider trips retrieved:", result);
        setDetails(result);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getRiderTrips.");
      }
    } catch (error) {
      console.error("Error fetching rider trips:", error.message);
    }
  };
  
  const getDriverTrips = async () => {
    try {
      if (ridexContract) {
        console.log("Fetching driver trips...");
        const result = await ridexContract.getDriverTrips().call();
        console.log("Driver trips retrieved:", result);
        setDetails(result);
      } else {
        console.error("Ridex contract is not set. Please set the contract before calling getDriverTrips.");
      }
    } catch (error) {
      console.error("Error fetching driver trips:", error.message);
    }
  };

  return (
    <div>
      <p>Account: {JSON.stringify(account)}</p>
      <p>TronWeb Installed: {JSON.stringify(tronWebInstalled)}</p>
      <p>Contract Ready: {JSON.stringify(isContractReady())}</p>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
      <input type="text" value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" />
      <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price in TRX" />
      <button onClick={() => postAd(title, description, price)}>Post Ad</button>
      <br />
      <br />
      <button onClick={connectTronLink}>Connect TronLink</button>
      <button onClick={disconnectTronLink}>Disconnect TronLink</button>
      <button onClick={setContract}>Set Contract</button>
      <br />
      <br />
      <button onClick={tripCounter}>Trip Counter</button>
      <p>Trips: {JSON.stringify(trip)}</p>
      <br />
      <br />
      {/* Driver Registration Inputs */}
      <input type="text" value={driverName} onChange={e => setDriverName(e.target.value)} placeholder="Driver Name" />
      <input type="text" value={driverLicence} onChange={e => setDriverLicence(e.target.value)} placeholder="Driver Licence" />
      <button onClick={registerDriver}>Register Driver</button>
      <br /><br />
      <button onClick={getDriver}>get details Driver</button>
      <button onClick={getTransactionCounter}>Transaction Counter</button>
      <p>Transaction Count: {JSON.stringify(trip)}</p>

      <button onClick={() => getTripDetails("TQSouCbDBXHfKjwMueJdWsngAJfzUSvbGY")}>Trip Details</button>
      <p>Trip Details: {JSON.stringify(details)}</p>

      <button onClick={() => getTransactionDetails("TQSouCbDBXHfKjwMueJdWsngAJfzUSvbGY", "123456")}>Transaction Details</button>
      <p>Transaction Details: {JSON.stringify(details)}</p>

      <button onClick={getRiderTrips}>Rider Trips</button>
      <p>Rider Trips: {JSON.stringify(details)}</p>

      <button onClick={getDriverTrips}>Driver Trips</button>
      <p>Driver Trips: {JSON.stringify(details)}</p>
      <p>details : {JSON.stringify(details)}</p>
      <br /><br />
      <button onClick={createTrip}>create trips</button>
    </div>
  );
}

export default App;
