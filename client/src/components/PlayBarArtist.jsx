import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiList } from "react-icons/fi";

const PlayBarArtist = ({ playArtist }) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <div className="flex items-center space-x-4">
        <button
          onClick={playArtist}
          className="flex items-center justify-center w-15 h-15 rounded-full bg-green-500 text-white"
        >
          <FaPlay className="text-lg" />
        </button>
        {/* Follow Button */}
        <button className="px-4 py-1 border border-gray-300 text-white font-semibold rounded-full bg-transparent hover:border-2 transition-all duration-200">
          Follow
        </button>

        {/* More Options (3 dots) */}
        <button className="flex items-center justify-center text-gray-300 hover:text-white transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="1.5" />
            <circle cx="10" cy="10" r="1.5" />
            <circle cx="16" cy="10" r="1.5" />
          </svg>
        </button>
      </div>

      <button className="text-white">
        <FiList className="text-lg" />
      </button>
    </div>
  );
};

export default PlayBarArtist;
