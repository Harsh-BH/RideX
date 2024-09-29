import { useTronLink } from "../../utils/useTronLink.jsx"; // Import the hook
import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { text: "Book a Ride", link: "/book-ride" },
  { text: "My Trips", link: "/rider/trips" },
  { text: "Notifications", link: "/notification-settings" },
  { text: "Become a Driver", link: "/driver-register" },
];

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { account, tronWebInstalled, connectTronLink, disconnectTronLink } = useTronLink();
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setOpen(false); // Automatically close the mobile menu when navigating
  }, [location]);

  return (
    <header>
      <nav className="w-[90%] fixed top-0 left-1/2 transform -translate-x-1/2 backdrop-blur-md z-10 px-8 py-4 mt-2 border-b-4 border-white rounded-lg">
        <div className="flex flex-wrap justify-between items-center mx-auto md:px-20">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink to="/" className="flex items-center">
              <p className="text-2xl font-bold text-gray-400">RideX</p>
            </NavLink>
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="inline-flex items-center text-sm text-white rounded-lg lg:hidden ml-2"
              onClick={() => setOpen((prev) => !prev)}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                {isOpen ? (
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-8">
            {tronWebInstalled ? (
              account ? (
                <div className="flex items-center gap-4">
                  <div className="text-white font-semibold">
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
                  className="bg-gray-500 hover:bg-gray-600 border-2 transition border-white text-white font-bold py-2 px-4 rounded-lg"
                >
                  Connect TronLink
                </button>
              )
            ) : (
              <button
                onClick={() => window.open("https://www.tronlink.org/", "_blank")}
                className="bg-gray-500 hover:bg-gray-600 border-2 transition border-white text-white font-bold py-2 px-4 rounded-lg"
              >
                Install TronLink
              </button>
            )}
          </div>

          {/* Navigation Links */}
          <div className={`${isOpen ? "" : "hidden"} lg:flex lg:w-auto`}>
            <ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
              {NAV_LINKS.map(({ text, link }) => (
                <li key={text}>
                  <NavLink
                    to={link}
                    className={({ isActive }) =>
                      isActive
                        ? "capitalize block py-2 pr-4 pl-3 text-white font-bold lg:text-primary-700 lg:p-0 dark:text-white"
                        : "capitalize block py-2 pr-4 pl-3 text-white font-semibold lg:p-0 hover:text-primary-700"
                    }
                  >
                    {text}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
