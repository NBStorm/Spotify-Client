import axios from "axios";

export const getPlaylistById = async ({ id }) => {
  try {
    const token = localStorage.getItem("access"); // Retrieve token from local storage
    console.log("Token:", token); // Log the token for debugging

    const response = await axios.get(
      `http://localhost:8000/api/playlists/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Use the token from local storage
        },
      }
    );
    return response.data.playlist; // Return the entire data for the component to handle
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw error;
  }
};
