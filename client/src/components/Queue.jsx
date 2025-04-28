import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const Queue = ({ songsDataQueue, fromAlbum }) => {
  const { queue, currentQueueIndex, setSongInAlbum } =
    useContext(PlayerContext);

  let nowPlaying = songsDataQueue[queue[currentQueueIndex]];

  const nextSongs = songsDataQueue.slice(currentQueueIndex + 1);
  console.log("list", nextSongs);
  const onClick = (index) => {
    setSongInAlbum(index);
  };
  return (
    <div className="p-2 flex-col gap-2 text-white hidden lg:flex h-full overflow-auto w-[25%]">
      <div className="bg-[#121212] h-full rounded">
        <h2 className="text-2xl font-semibold mb-4">Queue</h2>
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">Now playing</h3>
          <div className="flex items-center hover:bg-[#ffffff26]">
            <img
              src={nowPlaying.image}
              alt={nowPlaying.name}
              className="w-12 h-12 rounded-md mr-4"
            />
            <div>
              <p className="text-lg font-medium">{nowPlaying.name}</p>
              <p className="text-sm text-gray-400">{nowPlaying.desc}</p>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Next from: {fromAlbum}</h3>
          {nextSongs.map((song, index) => (
            <div
              className="flex items-center mb-4 hover:bg-[#ffffff26]"
              key={index}
              onClick={() => onClick(index)}
            >
              <img
                src={song.image}
                alt={song.name}
                className="w-12 h-12 rounded-md mr-4"
              />
              <div>
                <p className="text-lg font-medium line-clamp-1 overflow-hidden">
                  {song.name}
                </p>
                <p className="text-sm text-gray-400">{song.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Queue;
