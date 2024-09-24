import tronWeb from '../tronHelper';
import abi from './contractABI.json'; // The ABI from the deployed contract

const CONTRACT_ADDRESS = 'TAREhBbrj7CDqjeGmJQQXPx59SYNrxo6rN'; // Replace with your contract address

// Initialize the contract instance
const contract = tronWeb.contract(abi, CONTRACT_ADDRESS);

// Function to register a driver
export const registerDriver = async (name, licenseNumber) => {
  try {
    const result = await contract.methods.registerDriver(name, licenseNumber).send({
      from: tronWeb.defaultAddress.base58,
    });
    console.log('Driver registered:', result);
  } catch (err) {
    console.error('Error registering driver:', err);
  }
};

// Function to create a trip
export const createTrip = async (origin, destination) => {
  try {
    const result = await contract.methods.createTrip(origin, destination).send({
      from: tronWeb.defaultAddress.base58,
    });
    console.log('Trip created:', result);
  } catch (err) {
    console.error('Error creating trip:', err);
  }
};

// Function to get driver trips
export const getDriverTrips = async () => {
  try {
    const trips = await contract.methods.getDriverTrips().call();
    console.log('Driver trips:', trips);
    return trips;
  } catch (err) {
    console.error('Error getting trips:', err);
  }
};

// Add more functions for other contract interactions as needed
