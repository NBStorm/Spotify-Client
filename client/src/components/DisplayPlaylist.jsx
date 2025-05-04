import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import PlayBar from "./PlayBar";
import { getPlaylistById } from "../api/get-Playlist";
import { jwtDecode } from "jwt-decode";
import { getPlaylistSongsById } from "../api/get-song-in-playlist";
import SongLine from "./SongLine";

const DisplayPlaylist = () => {
  const { id } = useParams();
  const [username, setUsername] = useState("");

  useEffect(() => {
    try {
      const token = localStorage.getItem("access");
      if (token) {
        const decodedToken = jwtDecode(token);
        setUsername(decodedToken.username || "Unknown User");
      }
    } catch (error) {
      console.error("Invalid token", error);
      setUsername("Unknown User");
    }
  }, []);

  const [playlistData, setPlaylistData] = useState({});
  useEffect(() => {
    const fetchPlaylistData = async () => {
      try {
        const response = await getPlaylistById({ id });
        setPlaylistData(response);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    fetchPlaylistData();
  }, [id]);
  const [playlistSongs, setPlaylistSongs] = useState({});
  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      try {
        const response = await getPlaylistSongsById({ id });
        setPlaylistSongs(response);
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };
    fetchPlaylistSongs();
  }, [id]);
  const playlistImage = false;
  const imageStyle = { filter: "invert(1)" };
  const haveSongs = playlistSongs && playlistSongs.length > 0;
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
                className=""
                src={assets.spotify_logo}
                alt="image"
                style={imageStyle}
              />
            )}
          </div>
          <div className="flex flex-col">
            <p className="text-sm text-gray-400">Public Playlist</p>
            <h1 className="text-5xl font-bold my-2">{playlistData.name}</h1>
            <p className="text-sm text-gray-400">{username}</p>
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
          {playlistSongs.map((item, index) => (
            <SongLine
              key={item.id}
              item={item}
              index={index}
              playWithId={playWithId}
            />
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
