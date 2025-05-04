import axios from "axios";

export const createPlaylist = async (playlistData) => {
  try {
    const token = localStorage.getItem("access"); // Retrieve token from local storage
    console.log("Token:", token); // Log the token for debugging
    const response = await axios.post(
      "http://localhost:8000/api/playlists/",
      playlistData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from local storage
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating playlist:", error);
    throw error;
  }
};
