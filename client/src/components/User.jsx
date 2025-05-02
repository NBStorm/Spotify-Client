import React, { useState, useEffect } from 'react';
import { FaUser } from 'react-icons/fa';
import { jwtDecode } from "jwt-decode";
import { assets, playlistsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";

const User = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState(playlistsData);
    const [username, setUsername] = useState('');
    useEffect(() => {
        try {
            const token = localStorage.getItem('access');
            if (token) {
                const decodedToken = jwtDecode(token);
                setUsername(decodedToken.username || 'Unknown User');
            }
        } catch (error) {
            console.error('Invalid token', error);
            setUsername('Unknown User');
        }
    }, []);

    // const handleAddPlaylist = () => {
    //     const newPlaylist = {
    //         id: `${playlists.length}`,
    //         name: `New Playlist #${playlists.length + 1}`,
    //         image: assets.spotify_logo, // Assuming a default image exists
    //     };
    //     setPlaylists([...playlists, newPlaylist]);
    // };
    return (
        <div className="bg-gradient-to-b from-[#2b2b2b] to-black min-h-screen text-white font-sans">
            {/* Header Section */}
            <div className="flex items-end px-10  pb-8 bg-gradient-to-b from-neutral-700 to-transparent">
                <div className="w-48 h-48 rounded-full bg-neutral-800 flex items-center justify-center text-7xl text-neutral-500">
                    <FaUser />
                </div>
                <div className="ml-6">
                    <p className="text-sm text-white font-medium mb-1">Profile</p>
                    <h1 className="text-7xl font-extrabold leading-none">{username}</h1>
                    <p className="text-sm text-white font-light mt-2">1 Public Playlist</p>
                </div>
            </div>

            {/* Divider */}
            <div className="h-[1px] bg-neutral-700 w-full"></div>

            {/* Content Section */}
            <div className="px-10 py-8 space-y-12">
                {/* Top Tracks Section */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">

                            <div>
                                <p className="text-xl font-bold">Top tracks this month</p>
                                <p className="text-sm text-neutral-400">Only visible to you</p>
                            </div>
                        </div>
                    </div>

                    {/* Track Row */}
                    {/* <div className="flex items-center justify-between bg-neutral-800 px-4 py-3 rounded hover:bg-neutral-700">
                        <div className="flex items-center space-x-4">
                            <span className="text-white text-base font-semibold">1</span>
                            <img
                                src=""
                                alt="Track Cover"
                                className="w-12 h-12"
                            />
                            <div>
                                <p className="font-semibold">Sky Tour (Intro)</p>
                                <p className="text-sm text-neutral-400">Sơn Tùng M-TP</p>
                            </div>
                        </div>
                        <div className="text-sm text-neutral-400 text-right">
                            <span>Sky Tour (Original Motion Picture Soundtrack)</span>
                            <div className="mt-1">2:29</div>
                        </div>
                    </div> */}



                </div>

                {/* Public Playlist Section */}
                <div>
                    <p className="text-xl font-bold mb-4">Public Playlists</p>
                    <div className="flex overflow-auto">
                        {playlistsData.map((item) => (
                            <div key={item.id}
                                onClick={() => navigate(`/album/${item.id}`)}
                                className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
                            >
                                <img className="rounded w-45 h-40" src={item.image} alt="image" />
                                <p className="font-bold mt-2 mb-1">{item.name}</p>
                                <p className="text-slate-200 text-sm">By {username}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default User;