import axios from "axios";

export const getCountFollower = async (artistId) => {
  try {
    const response = await axios.get(
      `http://localhost:8000/api/artists/count_artist/${artistId}`
    );
    return response.data.count;
  } catch (error) {
    console.error("Error fetching artist follower count:", error);
    throw error.response?.data || { error: "Unknown error occurred" };
  }
};
