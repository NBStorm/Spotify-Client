import React, { useState } from "react";
import Sidebar from "../Sidebar";
import Display from "../Display";

const Layout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-[80%] w-full">
      <Sidebar isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <Display isCollapsed={isCollapsed} />
    </div>
  );
};

export default Layout;
