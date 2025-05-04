import axios from "axios";

export const isUserFollowing = async (artistId) => {
  try {
    const accessToken = localStorage.getItem("access"); // Retrieve access token from local storage
    if (!accessToken) {
      throw new Error("Access token not found");
    }

    const response = await axios.get(
      `http://localhost:8000/api/artists/is_followed/${artistId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`, // Set Authorization header
        },
      }
    );

    return response.data.follow; // Return the follow status
  } catch (error) {
    console.error("Error checking follow status:", error);
    throw error;
  }
};
