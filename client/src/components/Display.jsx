import React from "react";
import { Route, Routes } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";

const Display = ({ isCollapsed }) => {
  return (
    <div
      className={`transition-all duration-300 ${
        isCollapsed ? "w-[95%]" : "lg:w-[75%]"
      } m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto h-auto`}
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum />} />
      </Routes>
    </div>
  );
};

export default Display;
