import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import Footer from "./Footer";
import { albumsData, artistsData, songsData } from "../assets/assets";

const DisplaySearch = () => {
  const { searchTerm } = useParams(); // Lấy từ khóa tìm kiếm từ URL
  const navigate = useNavigate(); // Để điều hướng lại về trang chủ nếu không có từ khóa tìm kiếm

  const [filteredAlbums, setFilteredAlbums] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [filteredArtists, setFilteredArtists] = useState([]);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1000);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      // Filter songs, albums, and artists based on the debounced search term
      const lowerCaseTerm = debouncedSearchTerm.toLowerCase();

      const filteredSongsData = songsData.filter((song) =>
        song.title.toLowerCase().includes(lowerCaseTerm)
      );
      const filteredAlbumsData = albumsData.filter((album) =>
        album.title.toLowerCase().includes(lowerCaseTerm)
      );
      const filteredArtistsData = artistsData.filter((artist) =>
        artist.name.toLowerCase().includes(lowerCaseTerm)
      );

      setFilteredSongs(filteredSongsData);
      setFilteredAlbums(filteredAlbumsData);
      setFilteredArtists(filteredArtistsData);
    } else {
      setFilteredSongs([]);
      setFilteredAlbums([]);
      setFilteredArtists([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      {searchTerm ? (
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl font-bold">
            Search results for: {searchTerm}
          </h1>
          <div className="mb-4">
            {filteredAlbums && filteredAlbums.length > 0 ? (
              <h1 className="my-5 font-bold text-2xl">Album</h1>
            ) : null}
            <div className="flex overflow-auto">
              {filteredAlbums.map((item, index) => (
                <AlbumItem
                  key={index}
                  title={item.title}
                  artist={item.artist}
                  id={item.id}
                  image_url={item.image_url}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            {filteredSongs && filteredSongs.length > 0 ? (
              <h1 className="my-5 font-bold text-2xl">Today's Biggest hits</h1>
            ) : null}
            <div className="flex overflow-auto">
              {filteredSongs.map((item, index) => (
                <SongItem
                  key={index}
                  title={item.title}
                  image_url={item.image_url}
                  artist={item.artist}
                  id={item.id}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            {filteredArtists && filteredArtists.length > 0 ? (
              <h1 className="my-5 font-bold text-2xl">Artists</h1>
            ) : null}
            <div className="flex overflow-auto">
              {filteredArtists.map((item, index) => (
                <ArtistItem
                  key={index}
                  name={item.name}
                  id={item.id}
                  avatar_url={item.avatar_url}
                />
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-4xl font-bold">
            Start searching for your favorite music!
          </h1>
          <p className="text-lg text-neutral-400 mt-2">
            Use the search bar above to find songs, albums, and artists.
          </p>
        </div>
      )}
      <Footer />
    </>
  );
};

export default DisplaySearch;
