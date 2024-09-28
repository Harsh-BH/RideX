import { useContext, useEffect, useState } from "react";
import {
  Description,
  Dialog,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import CarListItem from "./CarListItem";
import { CarListData } from "../data/data";
import driverAnimation from "./../assets/driver-animation.mp4";
import { CONTRACT_ADDRESS } from "../constant";
import abi from "./../abi/contract.abi.json";
import { useWriteContract } from "wagmi";
import { SourceContext } from "../context/SourceContext";
import { DestinationContext } from "../context/DestinationContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useTronLink } from "../utils/useTronLink";
import "./CarListOption.css"

function CarListOption({ distance }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState();
  const [selectedCar, setSelectedCar] = useState();
  const { source } = useContext(SourceContext);
  const { destination } = useContext(DestinationContext);
  const navigate = useNavigate();
  const { ridexContract, account, tronWebInstalled } = useTronLink();
  const data = useWriteContract();
  const { data: hash, isPending, writeContract, isSuccess } = data;
  const [isBookingInProgress, setIsBookingInProgress] = useState(false);


  const handleBookingSuccess = () => {
    toast.success("Ride booking successful");
    setIsOpen(false);
    window.location.reload(); // Force page reload after booking success
  };

  const handleBookingError = () => {
    toast.error("Failed to create the trip. Please try again.");
    setIsOpen(false);
    setIsBookingInProgress(false);
  };

  return (
    <div className="car-list-container">
      <h2 className="car-list-title">Recommended</h2>
      <div className="car-list-grid">
        {CarListData.map((item, index) => (
          <div
            key={index}
            className={`car-card ${activeIndex === index ? "active" : ""}`}
            onClick={() => {
              setActiveIndex(index);
              setSelectedCar(item);
            }}
          >
            <CarListItem car={item} distance={distance} />
          </div>
        ))}
      </div>

      {selectedCar && !isBookingInProgress ? (
        <div className="fixed-booking-bar">
          <p className="booking-price">
            Book for <b>TRX {Math.floor(selectedCar.amount * distance / 10)}</b>
          </p>
          <button
            className="request-button"
            onClick={async () => {
              setIsOpen(true);
              setIsBookingInProgress(true); // Set booking to true, which will hide the fixed booking bar
              if (ridexContract) {
                const callValue = Math.floor(selectedCar.amount * distance / 10) * 1_000_000;
                const result = await ridexContract.createTrip(
                  source.name,
                  destination.name
                ).send({
                  feeLimit: 100_000_000,
                  callValue: callValue,
                  shouldPollResponse: true,
                });
                console.log("Trip created:", result);
              } else {
                console.error("Trip not created");
              }
            }}
          >
            Request {selectedCar.name}
          </button>
        </div>
      ) : null}

      <Dialog
        open={isOpen && !isPending}
        onClose={() => setIsOpen(false)}
        className="relative z-50"
      >
        <div className="fixed inset-0 flex w-screen items-center justify-center">
          <DialogPanel className="dialog-panel">
            <DialogTitle className="text-3xl capitalize font-bold text-center">
              Finding Driver near you
            </DialogTitle>
            <video className="dialog-video" src={driverAnimation} loop autoPlay muted>
              Your browser does not support the video tag.
            </video>
            <Description className="text-center">
              <p>Please wait while we find the best driver for your ride. This may take a moment.</p>
              <p>Thank you for your patience!</p>
              <p className="bg-red-300 p-2 mt-3">
                <strong>Important:</strong> Please do not close this window, refresh the page, or navigate away while we complete the search.
              </p>
            </Description>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
}

export default CarListOption;
