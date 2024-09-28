import { useTronLink } from "../../utils/useTronLink.jsx"; // Import the hook
import { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { text: "Book a Ride", link: "/book-ride" },
  { text: "My Trips", link: "/rider/trips" },
  { text: "Notifications", link: "/notification-settings" },
  { text: "Become a Driver", link: "/driver-register" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { account, tronWebInstalled, connectTronLink, disconnectTronLink } = useTronLink(); // Use the hook

  return (
    <header className="relative z-50 ">
      <nav className="w-full bg-transparent px-8 py-4">
        <div className="flex justify-between items-center mx-auto w-full mt-6">
          
          

          {/* Search Bar */}
          <div className="relative w-[40%] flex justify-center ml-24">
            <input
              type="text"
              placeholder="Enter Destination"
              className="w-full bg-white bg-opacity-20 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-full py-2 pl-10 pr-3 shadow-sm"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a7 7 0 100 14 7 7 0 000-14zM10 1a9 9 0 110 18A9 9 0 0110 1z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Navigation Links */}
          <div className="flex gap-8">
            {NAV_LINKS.map(({ text, link }) => (
              <NavLink
                key={text}
                to={link}
                className="text-black font-semibold hover:text-gray-700 transition-all"
              >
                {text}
              </NavLink>
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-8">
            {tronWebInstalled ? (
              account ? (
                <div className="flex items-center gap-4">
                  <div className="text-black font-semibold">
                    Connected: {account.slice(0, 6)}...{account.slice(-4)}
                  </div>
                  <button
                    onClick={disconnectTronLink}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <button
                  onClick={connectTronLink}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
                >
                  Connect TronLink
                </button>
              )
            ) : (
              <button
                onClick={() => window.open("https://www.tronlink.org/", "_blank")}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg"
              >
                Install TronLink
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
