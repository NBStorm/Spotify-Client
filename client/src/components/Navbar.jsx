import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2">
          <button className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200 h-8">
            All
          </button>
          <button className="bg-neutral-800 text-white text-sm font-semibold px-4 py-1 rounded-full hover:bg-neutral-700 h-8">
            Music
          </button>
          <button className="bg-neutral-800 text-white text-sm font-semibold px-4 py-1 rounded-full hover:bg-neutral-700 h-8">
            Podcast
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
