import { Bell, Home, Search, Download, User } from "lucide-react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";

export default function TopBar({ setSearchQuery }) {

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  return (
    <div className="h-[10%] flex items-center justify-between bg-black px-4 py-2">
      {/* Left side */}
      <div className="flex items-center gap-4 h-11">
        <Link to="/">
          <img
            src={assets.spotify_logo}
            alt="Spotify"
            className="w-10 h-10 filter invert"
          />
        </Link>
        <Link to="/">
          <button className="rounded-full p-2 bg-neutral-800 hover:bg-neutral-700">
            <Home className="text-white" size={30} />
          </button>
        </Link>
        {/* Search bar */}
        <div className="flex items-center bg-neutral-800 text-white px-3 py-1 rounded-full w-80 h-full">
          <Search size={30} className="mr-2" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-transparent outline-none flex-1 text-sm placeholder:text-neutral-400"
            onChange={handleSearchChange} />
          <button className="ml-2">
            <svg fill="white" height="25" viewBox="0 0 24 24" width="25">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 h-11">
        <button className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200 h-3/4">
          Explore Premium
        </button>
        <button className="text-white flex items-center gap-1 text-sm hover:text-gray-300 h-3/4">
          <Download size={18} />
          Install App
        </button>
        <Bell className="text-white hover:text-gray-300" size={20} />
        <div className="h-3/4 rounded-ful text-black font-bold flex items-center justify-center cursor-pointer pr-4">
          <img
            src={assets.spotify_logo}
            alt="Spotify"
            className="w-6 h-6 filter invert"
          />
        </div>
      </div>
    </div>
  );
}
