import React from "react";
import Navbar from "./Navbar";
import { albumsData, artistsData, songsData } from "../assets/assets";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import Footer from "./Footer";
import Header from "./Header";
import { useContext, useState } from "react";

const DisplayHome = ({ searchQuery }) => {


  const filteredAlbums = albumsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredSongs = songsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredArtists = artistsData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featurned Charts</h1>
        <div className="flex overflow-auto">
          {filteredAlbums.map((item, index) => (
            <AlbumItem key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest hits</h1>
        <div className="flex overflow-auto">
          {filteredSongs.map((item, index) => (
            <SongItem key={index} {...item} />
          ))}
        </div>
      </div>
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Artists</h1>
        <div className="flex overflow-auto">
          {filteredArtists.map((item, index) => (
            <ArtistItem key={index} {...item} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DisplayHome;
