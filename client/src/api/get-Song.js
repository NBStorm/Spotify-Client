import axios from "axios";

export const getSongById = async ({id}) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/songs/${id}`);
    return response.data.result;
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
};
