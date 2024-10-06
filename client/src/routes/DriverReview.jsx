import Navbar from "../components/shared/Navbar";

const RiderReviews = () => {
  return (
    <div className="bg-main w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1 items-center justify-center">
        <div className="bg-white bg-opacity-10 border-4 border-white border-opacity-30 shadow-xl rounded-2xl p-8 max-w-xl w-full py-12 hover:scale-105 transition-all">
          <h2 className="text-2xl font-bold mb-6 text-center text-white">Login</h2>
          
          <form>
            <div className="mb-4">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your name"
              />
            </div>

            <div className="mb-6">
              <label className="block text-white text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-center">
              <button
                type="submit"
                onClick={""}
                className="bg-submain hover:bg-opacity-90 hover:scale-110 hover:translate-y-[-10px] transition text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RiderReviews;

