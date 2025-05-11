import axios from "axios";

export const playAlbums = async (albumId) => {
  try {
    const token = localStorage.getItem("access");
    const response = await axios.post(
      "http://localhost:8000/api/albums/plays/",
      { album_id: albumId },
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
