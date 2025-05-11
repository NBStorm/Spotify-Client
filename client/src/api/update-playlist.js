import axios from "axios";

export const updatePlaylistName = async (playlistId, name) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.post(
      `http://localhost:8000/api/playlists/update_name/${playlistId}`,
      { name }, // Ensure the payload is correctly structured
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Explicitly set content type
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(
      "Error updating playlist name:",
      error.response?.data || error.message
    );
    throw error;
  }
};
