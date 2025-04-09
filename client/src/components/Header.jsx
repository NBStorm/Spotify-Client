import { Bell, Home, Search, Download, User } from "lucide-react";
import { assets } from "../assets/assets";
export default function TopBar() {
  return (
    <div className="flex items-center justify-between bg-black px-4 py-2">
      {/* Left side */}
      <div className="flex items-center gap-4">
        <img
          src={assets.spotify_logo}
          alt="Spotify"
          className="w-10 h-10 rounded-full bg-white"
        />
        <button className="rounded-full p-2 hover:bg-neutral-800">
          <Home className="text-white" size={30} />
        </button>
      </div>

      {/* Search bar */}
      <div className="flex items-center bg-neutral-800 text-white px-3 py-1 rounded-full w-full max-w-md">
        <Search size={18} className="mr-2" />
        <input
          type="text"
          placeholder="What do you want to play?"
          className="bg-transparent outline-none flex-1 text-sm placeholder:text-neutral-400"
        />
        <div className="flex items-center gap-1 text-xs text-black font-medium bg-neutral-700 rounded px-1.5 py-0.5 ml-2">
          <kbd className="bg-white rounded px-1">Ctrl</kbd>
          <kbd className="bg-white rounded px-1">K</kbd>
        </div>
        <button className="ml-2">
          <svg fill="white" height="20" viewBox="0 0 24 24" width="20">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </button>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        <button className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200">
          Explore Premium
        </button>
        <button className="text-white flex items-center gap-1 text-sm hover:text-gray-300">
          <Download size={18} />
          Install App
        </button>
        <Bell className="text-white hover:text-gray-300" size={20} />
        <div className="w-8 h-8 rounded-full bg-orange-600 text-black font-bold flex items-center justify-center">
          N
        </div>
      </div>
    </div>
  );
}
