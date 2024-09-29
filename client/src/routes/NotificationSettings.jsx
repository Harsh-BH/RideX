import styles from "./../styles/Notification.module.css";
import Maps from "../components/shared/Maps";
import { useCallback, useEffect , useState } from "react";
// Wagmi Imports
import { useAccount, useSignMessage } from "wagmi";

// W3I Imports
import {
  //   useNotifications,
  usePrepareRegistration,
  useRegister,
  useSubscribe,
  useSubscription,
  useUnsubscribe,
  useWeb3InboxAccount,
} from "@web3inbox/react";
import { sendNotification } from "./../utils/fetchNotify";
import Messages from "./../components/Messages";
import Navbar from "../components/shared/Navbar";
import BikeLoader from "../components/Loader/BikeLoader";

// const notificationsPerPage = 5;
// const isInfiniteScroll = true;

const NotificationSettings = () => {
  // Wagmi
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const { isRegistered, data: account } = useWeb3InboxAccount(
    `eip155:1:${address}`
  );
  console.log(account);

  // Registration
  const { prepareRegistration } = usePrepareRegistration();
  const { register, isLoading: isRegistering } = useRegister();

  const handleRegistration = async () => {
    try {
      const { message, registerParams } = await prepareRegistration();
      const signature = await signMessageAsync({ message: message });
      await register({ registerParams, signature });
    } catch (registerIdentityError) {
      console.error(registerIdentityError, "💥");
    }
  };

  // Subscription
  const [isAccepted, setIsAccepted] = useState(true)
  const { subscribe, isLoading: isSubscribing } = useSubscribe();
  const { unsubscribe, isLoading: isUnsubscribing } = useUnsubscribe();
  const [loading, setLoading] = useState(true); // New state to handle loading

  const { data: subscription } = useSubscription();
  const isSubscribed = Boolean(subscription);
  const handleClick = () => {
    setIsAccepted(!isAccepted); // Toggle state
  };

  // Handle Test Notification
  //   const handleTestNotification = async () => {
  //     if (isSubscribed) {
  //       try {
  //         console.log({ address });
  //         await sendNotification({
  //           accounts: [`eip155:1:${address}`],
  //           notification: {
  //             title: "GM Stable Test",
  //             body: "Hack it until you make it!",
  //             icon: `${window.location.origin}/WalletConnect-blue.svg`,
  //             url: window.location.origin,
  //             type: "805e6d86-4b35-4b9a-b81a-a2f761e0e687",
  //           },
  //         });
  //       } catch (error) {
  //         console.error("Notification Error", error);
  //       }
  //     }
  //   };

  // Get Notifications
  //   const { data: notificationsData } = useNotifications(
  //     notificationsPerPage,
  //     isInfiniteScroll
  //   );

    // Simulate loading for the map and search components
    useEffect(() => {
      // Assuming loading is happening while setting up components (e.g., fetching map data)
      setTimeout(() => {
        setLoading(false); // Simulate loading complete after 2 seconds
      }, 4000); // Adjust time as needed
    }, []);


  return (
    <>
    {loading ? (
      <div>
        <BikeLoader /> 
      </div>
    ) : (
    <>
    <Navbar/>
    <div className="h-[120vh] bg-main flex flex-col">
      <div className="h-[60vh] w-full relative top-24 px-20 flex justify-evenly">
        <div className="h-full w-[40%] bg-[url(./assets/img3.jpg)] bg-cover rounded-2xl border-2 border-submain"></div>
        <div className="w-[40%] relative top-[-50px]">
          <Maps/>
        </div>
      </div>

    <div  className="h-[40vh] w-full relative top-32 flex flex-col gap-4">
      <div className="font-bold text-white text-[28px] relative left-44 border-b-2 border-white w-56">YOUR REQUESTS</div>
      <div className="h-[10vh] w-full flex items-center justify-center gap-8 text-white font-semibold">
        <div>AT 11:59PM</div>
        <div className="flex gap-2">FROM:
        <div className="w-[20vw] h-[30px] bg-gray-300 rounded"></div>
        </div>
        
        <div className="flex gap-2">TO:
        <div className="w-[20vw] h-[30px] bg-gray-300 rounded"></div>
        </div>
        
        <button
      className={`px-4 py-2 rounded-full w-[100px] ${isAccepted ? 'bg-green-500' : 'bg-red-500'} text-white`}
      onClick={handleClick}
    >
      {isAccepted ? 'ACCEPT' : 'END'}
    </button>
      </div>
    </div>

    </div>
    </>
    )}
    </>
  );
};

export default NotificationSettings;
