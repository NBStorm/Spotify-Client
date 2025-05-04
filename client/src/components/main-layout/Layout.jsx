import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Display from "../Display";
import Queue from "../Queue";

const Layout = ({ isQueueOpen,nowPlayingPlus }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [fromAlbum, setFromAlbum] = useState(""); // State to determine if the queue is from an album
  const [songsDataQueue, setSongsDataQueue] = useState([]); // State to hold the songs data for the queue
  const [nowPlaying, setNowPlaying] = useState({}); // State to hold the currently playing song data
  console.log("songsDataQueue", songsDataQueue); // Debugging log
  return (
    <div className="flex h-[80%] w-full">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Display
        isCollapsed={isCollapsed}
        setFromAlbum={setFromAlbum}
        setSongsDataQueue={setSongsDataQueue}
        setNowPlaying={setNowPlaying}
      />
      {isQueueOpen && <Queue fromAlbum={fromAlbum} songsDataQueue={songsDataQueue} nowPlaying={nowPlaying} nowPlayingPlus={nowPlayingPlus}/>}
    </div>
  );
};

export default Layout;
