import React, { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { getSongById } from "../api/get-Song";

const Queue = ({ songsDataQueue, fromAlbum }) => {
  const { queue, currentQueueIndex, setSongInAlbum } =
    useContext(PlayerContext);
  const [data, setData] = useState();
  // console.log("songsDataQueue", songsDataQueue);
  // console.log("queue", queue);
  // console.log("currentQueueIndex", currentQueueIndex);

  let nowPlaying =
    songsDataQueue.find((song) => song.id === queue[currentQueueIndex]) || {}; // Use id from queue[currentQueueIndex]
  // console.log("nowPlaying", nowPlaying);
  const id = nowPlaying.id || 0; // Fallback to 0 if id is undefined
  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const song = await getSongById({ id });
        setData(song);
      } catch (error) {
        console.error("Error fetching artist data:", error);
      }
    };
    fetchArtistData();
  }, [id]);
  const nextSongs = songsDataQueue.slice(currentQueueIndex + 1);
  // console.log("list", nextSongs);
  const onClick = (id) => {
    setSongInAlbum(id);
  };

  // const fullImageUrl = `http://localhost:8000/media/${data.image_url}`;

  return (
    <div className="p-2 flex-col gap-2 text-white hidden lg:flex h-full overflow-auto w-[25%]">
      <div className="bg-[#121212] h-full rounded">
        <h2 className="text-2xl font-semibold mb-4">Queue</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Now playing</h3>
          <div className="flex items-center hover:bg-[#ffffff26]">
            {/* {fullImageUrl && ( // Conditionally render image
              <img
                src={fullImageUrl}
                alt={nowPlaying.title || "No title"}
                className="w-12 h-12 rounded-md mr-4"
              />
            )} */}
            <div>
              <p className="text-lg font-medium">
                {nowPlaying.title || "Unknown"}
              </p>
              <p className="text-sm text-gray-400">
                {nowPlaying.artist || "No description"}
              </p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Next from: {fromAlbum}</h3>
          {nextSongs.map((song, index) => (
            <div
              className="flex items-center mb-4 hover:bg-[#ffffff26]"
              key={index}
              onClick={() => onClick(song.id)} // Adjust index
            >
              <img
                src={song.image}
                alt={song.name}
                className="w-12 h-12 rounded-md mr-4"
              />
              <div>
                <p className="text-lg font-medium line-clamp-1 overflow-hidden">
                  {song.title}
                </p>
                <p className="text-sm text-gray-400">{song.artist}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queue;
