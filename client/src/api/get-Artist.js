import axios from "axios";

export const getArtistById = async ({id}) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/artists/${id}`);
    console.log("Fetched artists:", response.data.result); // Log the fetched data
    return response.data.result;
  } catch (error) {
    console.error("Error fetching artist:", error);
    throw error;
  }
};
