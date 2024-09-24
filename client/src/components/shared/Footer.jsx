import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <div className="w-screen h-full bg-gray-400 flex flex-col items-left justify-left py-10 px-4 text-black font_tomato_grotesk overflow-hidden">

          {/* Newsletter Section */}
          <div className="flex mt-6 bg-black p-4 rounded-lg text-white w-96 justify-between items-center">
        <input
          type="email"
          placeholder="Mail"
          className="bg-transparent border-none focus:outline-none text-white placeholder-white flex-1"
        />
        <button className="bg-blue-500 p-2 rounded-full">→</button>
      </div>
      {/* Top Section with Multiple Containers */}
      <div className="flex gap-4">
        {/* Red Container */}
        <div className="bg-red-500 w-80 h-48 flex items-center justify-center rounded-xl">
          {/* Add an icon or image here */}
          <p className="text-[10rem]">🔲</p>
        </div>
        {/* Yellow Container */}
        <div className="bg-yellow-500 w-80 h-48 flex items-center justify-center rounded-xl max-h-96">
          {/* Add an icon or image here */}
          <p className="text-2xl">⚡</p>
        </div>
        {/* Add More Containers */}
        <div className="bg-blue-500 w-48 h-96 flex items-center justify-center rounded-xl">
          {/* Placeholder icon */}
          <p className="text-2xl">📦</p>
        </div>
        <div className="w-screen bg-gray-400 flex flex-col items-center justify-center py-10 px-4 text-black font_tomato_grotesk">
  {/* Row of green containers */}
  <div className="flex w-full gap-4 justify-center">
    <div className="bg-green-500 w-48 h-24 flex items-center justify-center rounded-xl">
      {/* Placeholder icon */}
      <p className="text-2xl text-blue-600">🌐</p>
    </div>
    <div className="bg-green-500 w-48 h-24 flex items-center justify-center rounded-xl">
      {/* Placeholder icon */}
      <p className="text-2xl text-blue-600">🌐</p>
    </div>
  </div>
</div>

      </div>


  


      {/* Footer Note */}
      <p className="mt-4 text-xs opacity-50">
        © 2024 reown inc. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
