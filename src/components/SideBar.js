import React from "react";
import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";

function SideBar() {
  return (
    <div className="sideBar">
      <Navbar />
      <Search />
      <Chats />
    </div>
  );
}

export default SideBar;
