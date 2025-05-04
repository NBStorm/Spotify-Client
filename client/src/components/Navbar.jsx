import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="w-full flex justify-between items-center font-semibold">
        <div className="flex items-center gap-2 mt-2">
          <p className="bg-white text-black text-sm px-4 py-1 rounded-2xl hover:bg-gray-200 h-8">
            All
          </p>
          <p className="bg-neutral-800 text-white text-sm px-4 py-1 rounded-2xl hover:bg-neutral-700 h-8">
            Music
          </p>
          {/* <p className="bg-neutral-800 text-white text-sm px-4 py-1 rounded-2xl hover:bg-neutral-700 h-8">
            Podcast
          </p> */}
        </div>
      </div>
    </>
  );
};

export default Navbar;
