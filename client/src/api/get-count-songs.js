import axios from "axios";

export const getCountSongs = async (songId) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/songs/plays/${songId}`);
    return response.data.counts;
  } catch (error) {
    console.error("Error fetching song count:", error);
    throw error.response?.data || { error: "Unknown error occurred" };
  }
};
