import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Display from "../Display";

const Layout = ({ searchQuery }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-[80%] w-full">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Display isCollapsed={isCollapsed} searchQuery={searchQuery} />
    </div>
  );
};

export default Layout;
