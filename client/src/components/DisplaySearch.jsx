import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { albumsData, artistsData, songsData } from "../assets/assets";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import Footer from "./Footer";

const DisplaySearch = () => {
    const { searchTerm } = useParams();  // Lấy từ khóa tìm kiếm từ URL
    const navigate = useNavigate();  // Để điều hướng lại về trang chủ nếu không có từ khóa tìm kiếm

    const [filteredAlbums, setFilteredAlbums] = useState([]);
    const [filteredSongs, setFilteredSongs] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            // Lọc dữ liệu dựa trên từ khóa tìm kiếm
            setFilteredAlbums(albumsData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
            setFilteredSongs(songsData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
            setFilteredArtists(artistsData.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())));
        } else {
            // Nếu không có từ khóa tìm kiếm, điều hướng về trang chủ
            navigate('/');
        }
    }, [searchTerm, navigate]);  // Chạy lại khi searchTerm thay đổi

    return (
        <>
            <h1 className="my-5 font-bold text-2xl">Search Results for: "{searchTerm}"</h1>

            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Albums</h1>
                <div className="flex overflow-auto">
                    {filteredAlbums.length ? (
                        filteredAlbums.map((item, index) => (
                            <AlbumItem key={index} name={item.name} desc={item.desc} id={item.id} image={item.image} />
                        ))
                    ) : (
                        <p>No albums found for "{searchTerm}"</p>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Songs</h1>
                <div className="flex overflow-auto">
                    {filteredSongs.length ? (
                        filteredSongs.map((item, index) => (
                            <SongItem key={index} name={item.name} image={item.image} desc={item.desc} id={item.id} />
                        ))
                    ) : (
                        <p>No songs found for "{searchTerm}"</p>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <h1 className="my-5 font-bold text-2xl">Artists</h1>
                <div className="flex overflow-auto">
                    {filteredArtists.length ? (
                        filteredArtists.map((item, index) => (
                            <ArtistItem key={index} name={item.name} id={item.id} image={item.image} />
                        ))
                    ) : (
                        <p>No artists found for "{searchTerm}"</p>
                    )}
                </div>
            </div>

            <Footer />
        </>
    );
};

export default DisplaySearch;
