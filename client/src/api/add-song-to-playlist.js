import axios from "axios";

export const addSongToPlaylist = async (playlistId, songId) => {
  try {
    const accessToken = localStorage.getItem("access");
    const response = await axios.put(
      `http://localhost:8000/api/playlists/${playlistId}`,
      {
        song_id: songId,
        method: "add",
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error adding song to playlist:",
      error.response?.data || error.message
    );
    throw error;
  }
};
