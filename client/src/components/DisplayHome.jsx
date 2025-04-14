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
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
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
              name={item.name}
              image={item.image}
              desc={item.desc}
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
              image={item.image}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DisplayHome;
