import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import DisplayArtist from "./DisplayArtist";
import DisplayPlaylist from "./DisplayPlaylist";

const Display = ({ isCollapsed, searchQuery,setFromAlbum,setSongsDataQueue }) => {
  return (
    <div
      className={`transition-all duration-300 ${isCollapsed ? "w-[95%]" : "lg:w-[75%]"
        } m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto h-auto`}
    >
      <Routes>
        <Route path="/" element={<DisplayHome searchQuery={searchQuery} />} />
        <Route path="/album/:id" element={<DisplayAlbum setFromAlbum={setFromAlbum} setSongsDataQueue={setSongsDataQueue} />} />
        <Route path="/artist/:id" element={<DisplayArtist />} />
        <Route path="/playlist/:id" element={<DisplayPlaylist setFromAlbum={setFromAlbum} setSongsDataQueue={setSongsDataQueue}/>} />
      </Routes>
    </div>
  );
};

export default Display;
