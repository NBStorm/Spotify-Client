import React, { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { getAllPlaylists } from "../api/getAll-Playlists";

const User = () => {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);  // Khởi tạo playlists là một mảng rỗng
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState("");

  // Hàm fetch playlists
  const getAllPlaylistsForUser = async () => {
    try {
      const response = await getAllPlaylists();
      setPlaylists(response || []);  // Đảm bảo playlists là mảng nếu không có dữ liệu
    } catch (error) {
      console.error("Error fetching playlists:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Gọi API khi component mount
  useEffect(() => {
    getAllPlaylistsForUser();
  }, []);

  useEffect(() => {
    try {
      const token = localStorage.getItem("access");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || "Unknown User");
      }
    } catch (error) {
      console.error("Invalid token", error);
      setUsername("Unknown User");
    }
  }, []);

  return (
    <div className="bg-gradient-to-b from-[#2b2b2b] to-black min-h-screen text-white font-sans">
      {/* Header Section */}
      <div className="flex items-end px-10  pb-8 bg-gradient-to-b from-neutral-700 to-transparent">
        <div className="w-48 h-48 rounded-full bg-neutral-800 flex items-center justify-center text-7xl text-neutral-500">
          <FaUser />
        </div>
        <div className="ml-6">
          <p className="text-sm text-white font-medium mb-1">Profile</p>
          <h1 className="text-7xl font-extrabold leading-none">{username}</h1>
          <p className="text-sm text-white font-light mt-2">
            {playlists.length} Public Playlist
          </p>
        </div>
      </div>

      {/* Divider */}
      <div className="h-[1px] bg-neutral-700 w-full"></div>

      {/* Content Section */}
      <div className="px-10 py-8 space-y-12">
        {/* Top Tracks Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4">
              <div>
                <p className="text-xl font-bold">Top tracks this month</p>
                <p className="text-sm text-neutral-400">Only visible to you</p>
              </div>
            </div>
          </div>
        </div>

        {/* Public Playlist Section */}
        <div>
          <p className="text-xl font-bold mb-4">Public Playlists</p>

          {/* Kiểm tra nếu không có playlist */}
          {playlists?.length === 0 ? (
            <div className="text-center text-white bg-neutral-800 p-4 rounded">
              No playlists available.
            </div>
          ) : (
            <div className="flex overflow-auto">
              {playlists.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/album/${item.id}`)}
                  className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
                >
                  <img
                    className="rounded w-45 h-40"
                    src={assets.spotify_logo}
                    alt="image"
                    style={{ filter: "invert(1)" }}
                  />
                  <p className="font-bold mt-2 mb-1">{item.name}</p>
                  <p className="text-slate-200 text-sm">By {username}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default User;
