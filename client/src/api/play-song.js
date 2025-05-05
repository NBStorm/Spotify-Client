import axios from "axios";

export const playSong = async (songId) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.post(
      "http://localhost:8000/api/songs/plays",
      { song_id: songId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error playing song:", error);
    throw error.response?.data || { error: "Unknown error occurred" };
  }
};
