import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import { assets, playlistsData } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import PlayBar from "./PlayBar";

const DisplayPlaylist = () => {
  const { id } = useParams();
  const playlistData = playlistsData[id];
  const playlistName = playlistData
    ? playlistData.name
    : `New Playlist #${parseInt(id) + 1}`;
  const playlistImage = playlistData ? playlistData.image : null;
  const imageStyle = { filter: "invert(1)" };
  const haveSongs =
    playlistData && playlistData.songsData && playlistData.songsData.length > 0;
  const { playWithId, queueSongs } = useContext(PlayerContext);

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
      {haveSongs ? (
        <>
          <PlayBar
            playArtist={() => {
              queueSongs(playlistData.songsData.map((song) => song.id));
              playWithId(playlistData.songsData[0].id);
            }}
          />
          <div className="grid grid-cols-2 mt-10 mb-4 pl-2 pr-2 text-[#a7a7a7] items-center">
            <p className="flex items-center">
              <b className="mr-4">#</b>Title
            </p>
            <img className="ml-auto w-4" src={assets.clock_icon} alt="" />
          </div>
          <hr />
          {playlistData.songsData.map((item, index) => (
            <div
              onClick={() => playWithId(item.id)}
              key={item.id}
              className="grid grid-cols-2 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
            >
              <div className="text-white text-sm md:text-[15px] flex items-center gap-4">
                <div className="flex items-center justify-center">
                  <div className="text-[#a7a7a7]">{index + 1}</div>
                </div>
                <img className="w-10" src={item.image} alt={item.name} />
                <div>
                  <div>{item.name.slice(0, 20)}</div>
                  <div className="text-[#a7a7a7]">{item.desc.slice(0, 20)}</div>
                </div>
              </div>
              <p className="text-[15px] text-right">{item.duration}</p>
            </div>
          ))}
        </>
      ) : (
        <div className="mt-5 text-center text-gray-400">
          <p>No songs available in this playlist.</p>
        </div>
      )}
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
