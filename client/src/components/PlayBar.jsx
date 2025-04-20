import React from "react";
import { FaPlay } from "react-icons/fa";
import { FiList } from "react-icons/fi";

const PlayBar = ({ playAlbum }) => {
  return (
    <div className="flex items-center justify-between pt-4">
      <button
        onClick={playAlbum}
        className="flex items-center justify-center w-15 h-15 rounded-full bg-green-500 text-white"
      >
        <FaPlay className="text-lg" />
      </button>

      <button className="text-white">
        <FiList className="text-lg" />
      </button>
    </div>
  );
};

export default PlayBar;
