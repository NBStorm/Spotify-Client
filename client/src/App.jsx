import Player from "./components/Player";
import Header from "./components/Header";
import Layout from "./components/main-layout/Layout";
import { PlayerContext } from "./context/PlayerContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import { Routes, Route } from "react-router-dom";
const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup";
  return (
    <div className="h-screen bg-black">
      {isAuthPage ? (
        // If on /login or /signup, show only the auth pages
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      ) : (
        // Otherwise show the main app layout
        <>
          <Header setSearchQuery={setSearchQuery} />
          <Layout searchQuery={searchQuery} isQueueOpen={isQueueOpen} />
          <Player
            setIsQueueOpen={setIsQueueOpen}
            isQueueOpen={isQueueOpen}
            setIsVideoOpen={setIsVideoOpen}
            isVideoOpen={isVideoOpen}
          />
          <audio ref={audioRef} src={track.file} preload="auto"></audio>
          {isVideoOpen && <VideoPlayer video={track.file} onClose={()=> setIsVideoOpen(false)}/>}
        </>
      )}
    </div>
  );
};

export default App;
