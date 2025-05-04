import React, { useState, useEffect } from "react";
import { getAllPlaylists } from "../api/getAll-Playlists";
import { addSongToPlaylist } from "../api/add-song-to-playlist";
import { removeSongFromPlaylist } from "../api/remove-song-from-playlist"; // Import remove API

const SongLine = ({ item, index, playWithId }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlaylistIds, setSelectedPlaylistIds] = useState([]);
  const [loginMessage, setLoginMessage] = useState("");
  const [isInAnyPlaylist, setIsInAnyPlaylist] = useState(false); // Track if the song is in any playlist

  useEffect(() => {
    const preloadPlaylists = async () => {
      try {
        const fetchedPlaylists = await getAllPlaylists();
        setPlaylists(fetchedPlaylists);

        // Check if the song is in any playlist
        const inAnyPlaylist = fetchedPlaylists.some((playlist) =>
          playlist.songs.includes(item.id)
        );
        setIsInAnyPlaylist(inAnyPlaylist);
      } catch (error) {
        console.error("Error preloading playlists:", error);
      }
    };

    preloadPlaylists();
  }, [item.id]);

  const toggleModal = async (e) => {
    e.stopPropagation(); // Prevent triggering the parent `onClick`
    const access = localStorage.getItem("access");
    if (!access) {
      setLoginMessage("Vui lòng đăng nhập");
      setTimeout(() => setLoginMessage(""), 3000); // Clear message after 3 seconds
      return; // Prevent modal from opening
    }
    if (!isModalOpen) {
      setLoading(true);
      try {
        // Pre-select playlists where the song is already present
        const preSelected = playlists
          .filter((playlist) => playlist.songs.includes(item.id))
          .map((playlist) => playlist.id);
        setSelectedPlaylistIds(preSelected);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      } finally {
        setLoading(false);
      }
    }
    setIsModalOpen((prev) => !prev);
  };

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylistIds((prev) =>
      prev.includes(playlistId)
        ? prev.filter((id) => id !== playlistId)
        : [...prev, playlistId]
    );
  };

  const handleDone = async (e) => {
    e.stopPropagation(); // Prevent parent click
    try {
      // Add song to selected playlists
      await Promise.all(
        selectedPlaylistIds.map((playlistId) =>
          addSongToPlaylist(playlistId, item.id)
        )
      );

      // Remove song from unselected playlists
      const unselectedPlaylistIds = playlists
        .filter(
          (playlist) =>
            !selectedPlaylistIds.includes(playlist.id) &&
            playlist.songs.includes(item.id)
        )
        .map((playlist) => playlist.id);

      await Promise.all(
        unselectedPlaylistIds.map((playlistId) =>
          removeSongFromPlaylist(playlistId, item.id)
        )
      );

      console.log("Song updated in playlists successfully.");
    } catch (error) {
      console.error("Error updating playlists:", error);
    } finally {
      setIsModalOpen(false);
    }
  };

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      onClick={() => playWithId(item.id)}
      className="relative grid grid-cols-2 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer group"
    >
      {loginMessage && (
        <div className="fixed top-16 right-4 bg-red-500 text-white text-sm px-4 py-2 rounded shadow-lg z-50">
          {loginMessage}
        </div>
      )}
      <div className="text-white text-sm md:text-[15px] flex items-center gap-4">
        <div className="flex items-center justify-center">
          <div className="text-[#a7a7a7]">{index + 1}</div>
        </div>

        <div>
          <div>{item.title.slice(0, 20)}</div>
          <div className="text-[#a7a7a7]">{item.artist.slice(0, 20)}</div>
        </div>
      </div>
      <div className="flex justify-end items-center gap-2">
        <button
          onClick={toggleModal}
          className="hidden group-hover:block text-white bg-[#1db954] w-8 h-8 flex items-center justify-center rounded-full"
        >
          {isInAnyPlaylist ? "✔" : "+"}
        </button>
        <p className="text-[15px] text-right">{item.duration_video}</p>
      </div>

      {isModalOpen && (
        <div className="absolute bottom-12 right-0 bg-[#121212] text-white shadow-lg p-4 rounded w-72 z-10">
          <h4 className="text-sm font-bold mb-4">Add to playlist</h4>
          {loading ? (
            <p>Loading playlists...</p>
          ) : (
            <>
              <input
                type="text"
                placeholder="Find a playlist"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 mb-4 bg-[#333] text-white rounded placeholder-gray-400"
              />
              <ul className="mb-4">
                <li
                  className="flex items-center gap-2 mb-2 cursor-pointer hover:text-[#1db954]"
                  onClick={(e) => e.stopPropagation()} // Prevent parent click
                >
                  <span className="text-lg">+</span> New playlist
                </li>
                {filteredPlaylists.map((playlist) => (
                  <li
                    key={playlist.id}
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent parent click
                      handlePlaylistSelect(playlist.id);
                    }}
                    className="flex items-center gap-2 mb-2 cursor-pointer hover:text-[#1db954]"
                  >
                    <span className="text-lg">🎵</span>
                    {playlist.name}
                    <span className="ml-auto">
                      <input
                        type="checkbox"
                        name="playlist"
                        checked={selectedPlaylistIds.includes(playlist.id)}
                        readOnly
                        onClick={(e) => e.stopPropagation()} // Prevent parent click
                      />
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}
          <div className="flex justify-between">
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent parent click
                setIsModalOpen(false);
              }}
              className="text-sm text-gray-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleDone}
              className="text-sm bg-white text-black px-4 py-1 rounded"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SongLine;
