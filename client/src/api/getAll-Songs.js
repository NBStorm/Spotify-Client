import axios from "axios";

export const getAllSongs = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/songs");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching songs:", error);
    throw error;
  }
};
