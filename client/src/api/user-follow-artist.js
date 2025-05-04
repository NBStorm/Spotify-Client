import axios from 'axios';

export const followArtist = async (artistId) => {
    try {
        const accessToken = localStorage.getItem('access'); // Retrieve access token from local storage
        if (!accessToken) {
            throw new Error('Access token not found');
        }

        const response = await axios.post(
            'http://localhost:8000/api/artists/follow/',
            { artist_id: artistId },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`, // Set Authorization header
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error following artist:', error);
        throw error;
    }
};
