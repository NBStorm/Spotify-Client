import axios from "axios";

export const getAlbumById = async ({id}) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/albums/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching album:", error);
    throw error;
  }
};
