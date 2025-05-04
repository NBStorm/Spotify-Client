import axios from "axios";

export const getSongById = async ({id}) => {
  try {
    const response = await axios.get(`http://localhost:8000/api/songs/${id}`);
    console.log("Response data1111111111:", response.data); // Debugging log
    return response.data.result;
  } catch (error) {
    console.error("Error fetching song:", error);
    throw error;
  }
};
