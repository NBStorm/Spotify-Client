import axios from "axios";

export const getAllArtists = async () => {
  try {
    const response = await axios.get("http://localhost:8000/api/artists");
    console.log("Fetched artists:", response.data.result); // Log the fetched data
    return response.data.result;
  } catch (error) {
    console.error("Error fetching artists:", error);
    throw error;
  }
};
