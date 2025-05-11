import { Bell, Home, Search, Download, User } from "lucide-react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import MessagePopup from "./MessagePopup";
export default function TopBar() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("access")
  );
  const [username, setUsername] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const [isMessageOpen, setIsMessageOpen] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(!!token);
      let decodedToken = jwtDecode(token);
      setUsername(decodedToken.username.toUpperCase());
    }
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      navigate("/");
    }
  }, [searchTerm]);

  const handleLogout = () => {
    console.log("Logout clicked");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setIsLoggedIn(false);
    navigate("/");
    window.location.reload();
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value; // Do not trim here to allow spaces
    setSearchTerm(searchTerm);
  };

  const handleSearchSubmit = () => {
    const trimmedSearchTerm = searchTerm.trim(); // Trim only before navigating
    if (trimmedSearchTerm) {
      navigate(`/search/${trimmedSearchTerm}`);
    } else {
      navigate("/search");
    }
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
            value={searchTerm}
            onChange={handleSearchChange}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchSubmit();
              }
            }}
          />
          <button className="ml-2" onClick={handleSearchSubmit}>
            <svg fill="white" height="25" viewBox="0 0 24 24" width="25">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4 h-11">




        <a href="    https://www.spotify.com/vn-vi/premium/"> <button className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200 h-3/4">
          Explore Premium
        </button></a>

        <a href=" https://www.spotify.com/vn-vi/download/windows/"> <button className="text-white flex items-center gap-1 text-sm hover:text-gray-300 h-3/4">
          <Download size={18} />
          Install App
        </button></a>

        <Bell className="text-white hover:text-gray-300" size={20} />
        <button
          className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200 h-3/4"
          onClick={() => setIsMessageOpen(!isMessageOpen)}
        >
          Message
        </button>
        <Link to="/chatbox" className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200 h-3/4">
          Chatbox
        </Link>
        {isLoggedIn ? (
          <div className="relative ">




            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="w-8 h-8 rounded-full bg-gray-600 text-white text-sm font-semibold flex items-center justify-center hover:opacity-80"
            >
              {username[0]}
            </button>


            {isMessageOpen && <MessagePopup onClose={() => setIsMessageOpen(false)} />}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-neutral-900 rounded-md shadow-lg py-1 z-50 border border-neutral-700">
                <Link
                  to="/user"
                  className="block px-4 py-2 text-sm text-white hover:bg-neutral-800"
                >
                  Profile
                </Link>

                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-white hover:bg-neutral-800"
                >
                  Account
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-white hover:bg-neutral-800 border-t border-neutral-700"
                >
                  Log out
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/signup">
              <button className="text-white flex items-center gap-1 text-sm hover:text-gray-300 h-3/4">
                Sign up
              </button>
            </Link>

            <Link to="/login">
              <button className="bg-white text-black text-sm font-semibold px-4 py-1 rounded-full hover:bg-gray-200 h-3/4">
                Log in
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
