import React from "react";
import { useParams } from "react-router-dom";
import { assets, playlistsData } from "../assets/assets";

const DisplayPlaylist = () => {
  const { id } = useParams();
  const playlistData = playlistsData[id];
  const playlistName = playlistData
    ? playlistData.name
    : `New Playlist #${parseInt(id) + 1}`;
  const playlistImage = playlistData ? playlistData.image : null;
  const imageStyle = { filter: "invert(1)" };
  return (
    <div className="flex flex-col text-white">
      <div className="flex items-center mb-5">
        <div className="flex items-center">
          <div className="w-36 h-36 bg-gray-800 flex justify-center items-center mr-5">
            {playlistImage && (
              <img className="rounded" src={playlistImage} alt="" />
            )}
            {!playlistImage && (
              <img
                className="rounded"
                src={assets.spotify_logo}
                alt="image"
                style={imageStyle}
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">Public Playlist</p>
            <h1 className="text-5xl font-bold my-2">{playlistName}</h1>
            <p className="text-sm text-gray-400">Nguyen Tung Bao</p>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <p className="mb-2">Let's find something for your playlist</p>
        <input
          type="text"
          className="w-full p-2 text-white rounded-md bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Search for songs or episodes"
        />
      </div>
    </div>
  );
};

export default DisplayPlaylist;
