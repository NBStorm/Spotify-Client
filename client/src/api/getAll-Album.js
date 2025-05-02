import axios from "axios";

export const getAllAlbums = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/albums");
    return response.data.result;
  } catch (error) {
    console.error("Error fetching albums:", error);
    throw error;
  }
};
