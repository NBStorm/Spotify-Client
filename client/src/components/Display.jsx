import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import DisplayArtist from "./DisplayArtist";
import DisplayPlaylist from "./DisplayPlaylist";
import DisplayArtistAlbum from "./DisplayArtistAlbum";
import DisplaySearch from "./DisplaySearch"
import SignUp from "./SignUp"
import Login from "./Login"
import User from "./User"
const Display = ({ isCollapsed, setFromAlbum, setSongsDataQueue }) => {

  return (
    <div
      className={`transition-all duration-300 ${isCollapsed ? "w-[95%]" : "lg:w-[75%]"
        } m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto h-auto`}
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/search/:searchTerm" element={<DisplaySearch />} />
        <Route path="/album/:id" element={<DisplayAlbum setFromAlbum={setFromAlbum} setSongsDataQueue={setSongsDataQueue} />} />
        <Route path="/artist/:id" element={<DisplayArtist />} />
        <Route path="/playlist/:id" element={<DisplayPlaylist setFromAlbum={setFromAlbum} setSongsDataQueue={setSongsDataQueue} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artist/album/:id" element={<DisplayArtistAlbum />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </div>
  );
};

export default Display;
