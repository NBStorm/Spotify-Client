import Player from "./components/Player";
import Header from "./components/Header";
import Layout from "./components/main-layout/Layout";
import { PlayerContext } from "./context/PlayerContext";
import { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import VideoPlayer from "./components/VideoPlayer";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import EditAccount from "./components/EditAccount";
import { Routes, Route } from "react-router-dom";
const App = () => {
  const { audioRef, track } = useContext(PlayerContext);

  const [isQueueOpen, setIsQueueOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const location = useLocation();
  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/account";
  return (
    <div className="h-screen bg-black">
      {isAuthPage ? (
        // If on /login or /signup, show only the auth pages
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/account" element={<EditAccount />} />
        </Routes>
      ) : (
        // Otherwise show the main app layout
        <>
          <Header />
          <Layout isQueueOpen={isQueueOpen} />
          <Player
            setIsQueueOpen={setIsQueueOpen}
            isQueueOpen={isQueueOpen}
            setIsVideoOpen={setIsVideoOpen}
            isVideoOpen={isVideoOpen}
          />
          <audio ref={audioRef} src={track.video_url} preload="auto"></audio>
          {isVideoOpen && <VideoPlayer video={track.video_url} onClose={() => setIsVideoOpen(false)} />}
        </>
      )}
    </div>
  );
};

export default App;
