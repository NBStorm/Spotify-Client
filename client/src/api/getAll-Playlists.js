import axios from "axios";

export const getAllPlaylists = async () => {
  try {
    const token = localStorage.getItem("access"); // Retrieve token from local storage
    if (!token) {
      console.warn("No token found. Returning undefined playlists.");
      return undefined; // Return undefined if no token is found
    }
    console.log("Token:", token); // Log the token for debugging
    const response = await axios.get("http://localhost:8000/api/playlists", {
      headers: {
        Authorization: `Bearer ${token}`, // Use the token from local storage
      },
    });
    return response.data.playlists;
  } catch (error) {
    console.error("Error fetching playlists:", error);
    throw error;
  }
};
