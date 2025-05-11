import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import PlayBar from "./PlayBar";
import { getPlaylistById } from "../api/get-Playlist";
import { jwtDecode } from "jwt-decode";
import { getPlaylistSongsById } from "../api/get-song-in-playlist";
import SongLine from "./SongLine";
import { Trash2 } from "lucide-react"; // Import the trash icon
import { deletePlaylistById } from "../api/delete-Playlist"; // Import the delete API
import { updatePlaylistName } from "../api/update-playlist"; // Import API

const DisplayPlaylist = ({ setFromAlbum, setSongsDataQueue }) => {
  const { id } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [username, setUsername] = useState("");

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

  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await getPlaylistById({ id });
        setPlaylistData(response);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    fetchPlaylistData();
  }, [id]);
  const [playlistSongs, setPlaylistSongs] = useState({});
  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await getPlaylistSongsById({ id });
        setPlaylistSongs(response);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    fetchPlaylistSongs();
  }, [id]);
  const playlistImage = false;
  const imageStyle = { filter: "invert(1)" };
  const haveSongs = playlistSongs && playlistSongs.length > 0;
  const { playWithId, queueSongs, queue } = useContext(PlayerContext);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false); // State for delete modal

  const handleNameClick = () => {
    setNewPlaylistName(playlistData.name || "");
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (newPlaylistName && newPlaylistName !== playlistData.name) {
        await updatePlaylistName(id, newPlaylistName); // Ensure correct data is passed
        setPlaylistData((prev) => ({ ...prev, name: newPlaylistName }));
      }
      setIsModalOpen(false);
      navigate(`/playlist/${id}`)
    } catch (error) {
      console.error(
        "Error updating playlist name:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeletePlaylist = async () => {
    try {
      await deletePlaylistById({ id }); // Call the delete API
      console.log("Playlist deleted successfully");
      setIsDeleteModalOpen(false);
      navigate("/"); // Navigate back to the home page
    } catch (error) {
      console.error("Error deleting playlist:", error);
    }
  };

  const playPlaylist = () => {
    queueSongs(playlistSongs.map((song) => song.id));
    console.log("queue: ", queue);
    setFromAlbum(playlistData.title);
    setSongsDataQueue(playlistSongs);
    console.log("songs: ", playlistSongs);
    playWithId(playlistSongs[0].id);
  };
  useEffect(() => {
    console.log("Queue changed: ", queue);
  }, [queue]);

  return (
    <div className="flex flex-col text-white relative">
      {/* Trash Icon */}
      <button
        className="absolute top-0 -right-3 text-gray-400 hover:text-red-500"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <Trash2 size={24} />
      </button>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-neutral-800 p-6 rounded-md text-white w-96">
            <h2 className="text-xl font-bold mb-4">Delete Playlist</h2>
            <p className="mb-4">
              Are you sure you want to delete this playlist?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDeletePlaylist}
                className="px-4 py-2 bg-red-600 rounded-md"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex items-center mb-5">
        <div className="flex items-center">
          <div className="w-36 h-36 bg-gray-800 flex justify-center items-center mr-5">
            {playlistImage && (
              <img className="rounded" src={playlistImage} alt="" />
            )}
            {!playlistImage && (
              <img
                className=""
                src={assets.spotify_logo}
                alt="image"
                style={imageStyle}
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">Public Playlist</p>
            <h1
              className="text-5xl font-bold my-2 cursor-pointer"
              onClick={handleNameClick}
            >
              {playlistData.name}
            </h1>
            <p className="text-sm text-gray-400">{username}</p>
          </div>
        </div>
      </div>
      {haveSongs ? (
        <>
          <PlayBar playAlbum={playPlaylist} />
          <div className="grid grid-cols-2 mt-10 mb-4 pl-2 pr-2 text-[#a7a7a7] items-center">
            <p className="flex items-center">
              <b className="mr-4">#</b>Title
            </p>
            <img className="ml-auto w-4" src={assets.clock_icon} alt="" />
          </div>
          <hr />
          {playlistSongs.map((item, index) => (
            <SongLine
              key={item.id}
              item={item}
              index={index}
              playWithId={playWithId}
            />
          ))}
        </>
      ) : (
        <div className="mt-5 text-center text-gray-400">
          <p>No songs available in this playlist.</p>
        </div>
      )}
      <div className="mt-5">
        <p className="mb-2">Let's find something for your playlist</p>
        <input
          type="text"
          className="w-full p-2 text-white rounded-md bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Search for songs or episodes"
        />
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50">
          <div className="bg-neutral-800 p-6 rounded-md text-white w-96">
            <h2 className="text-xl font-bold mb-4">Edit details</h2>
            <input
              type="text"
              value={newPlaylistName}
              onChange={(e) => setNewPlaylistName(e.target.value)}
              className="w-full p-2 mb-4 text-white rounded-md bg-neutral-600"
              placeholder="Name"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-600 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 rounded-md"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DisplayPlaylist;
