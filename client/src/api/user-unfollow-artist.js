import axios from "axios";

export const unfollowArtist = async (artistId) => {
  try {
    const accessToken = localStorage.getItem("access"); // Retrieve access token from local storage
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await axios.delete(
      `http://localhost:8000/api/artists/unfollow/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set Authorization header
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error unfollowing artist:", error);
    throw error;
  }
};
