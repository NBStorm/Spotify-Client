import { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import PlaylistItem from "./PlaylistItem";
import { TbCurrencyRupeeNepalese } from "react-icons/tb";
import { createPlaylist } from "../api/create-Playlist";
import { getAllPlaylists } from "../api/getAll-Playlists";

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hàm fetch playlists
  const getAllPlaylistsForUser = async () => {
    try {
      const response = await getAllPlaylists();
      setPlaylists(response);
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

  // Hiển thị trạng thái loading/error
  if (loading) return <div>Loading playlists...</div>;
  if (error) return <div>Error: {error}</div>;

  const handleAddPlaylist = async () => {
    try {
      const newPlaylistData = {
        name: `New Playlist #${(playlists?.length || 0) + 1}`,
        // image: assets.spotify_logo, // Assuming a default image exists
      };
      const createdPlaylist = await createPlaylist(newPlaylistData);
      if (createdPlaylist.success) {
        getAllPlaylistsForUser(); // Refresh the playlist after adding a new one
      }
    } catch (error) {
      console.error("Error adding playlist:", error);
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isCollapsed ? "w-[5%]" : "w-[25%]"
      } p-2 flex-col gap-2 text-white hidden lg:flex h-full overflow-auto`}
    >
      <div className="bg-[#121212] h-full rounded">
        <div
          className={`transition-all duration-300 ${
            isCollapsed ? "flex flex-col" : "flex justify-between"
          } p-4  items-center `}
        >
          <button
            className="flex items-center gap-3"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <img className="w-8" src={assets.stack_icon} alt="stack_icon" />
            {!isCollapsed && <p className="font-semibold">Your Library</p>}
          </button>

          <img
            className={`${isCollapsed ? "pt-5" : ""} w-5 cursor-pointer`}
            src={assets.plus_icon}
            alt="plus_icon"
            onClick={handleAddPlaylist}
          />
        </div>

        {!isCollapsed && (
          <>
            {/* Playlist block */}
            <div
              className={`pl-2 ${
                playlists && playlists.length > 0
                  ? "bg-[#121212]"
                  : "bg-[#242424] p-4"
              }  m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 `}
            >
              {playlists && playlists.length > 0 && (
                <>
                  <h1>Playlists</h1>
                </>
              )}
              {(!playlists || playlists.length === 0) && (
                <>
                  <h1>Create Your first playlist</h1>
                  <p className="font-light">it's easy we will help you</p>
                  <button
                    className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4"
                    onClick={handleAddPlaylist}
                  >
                    Create Playlist
                  </button>
                </>
              )}

              <div className="overflow-auto w-full ">
                {playlists &&
                  playlists.map((item, index) => (
                    <PlaylistItem
                      key={index}
                      name={item.name}
                      id={item.id}
                      image={item.image}
                    />
                  ))}
              </div>
            </div>
            {!playlists && (
              <>
                {/* Podcast block */}
                <div className="p-4 bg-[#242424] m-2 rounded font-semibold flex flex-col items-start justify-start gap-1 pl-4 mt-4">
                  <h1>Let's find some podcasts to follow</h1>
                  <p className="font-light">
                    We'll keep you updated on new episodes
                  </p>
                  <button className="px-4 py-1.5 bg-white text-[15px] text-black rounded-full mt-4">
                    Browse podcasts
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
