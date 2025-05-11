import React from "react";
import Navbar from "./Navbar";
import { albumsData, artistsData, songsData } from "../assets/assets";
import SongItem from "./SongItem";
import AlbumItem from "./AlbumItem";
import ArtistItem from "./ArtistItem";
import Footer from "./Footer";

const DisplayHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featurned Charts</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItem
              key={index}
              title={item.title}
              id={item.id}
              image_url={item.image_url}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
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
        <h1 className="my-5 font-bold text-2xl">Artists</h1>
        <div className="flex overflow-auto">
          {artistsData.map((item, index) => (
            <ArtistItem
              key={index}
              name={item.name}
              id={item.id}
              avatar_url={item.avatar_url}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DisplayHome;
