import Player from "./components/Player";
import Header from "./components/Header";
import Layout from "./components/main-layout/Layout";
import { PlayerContext } from "./context/PlayerContext";
import { useContext, useState } from "react";
// import VideoPlayer from "./components/VideoPlayer";
// import video from "./assets/dancing.mp4";
const App = () => {
  const { audioRef, track } = useContext(PlayerContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [isQueueOpen, setIsQueueOpen] = useState(false);
  
  return (
    <div className="h-screen bg-black">
      {/* <Header />
      <Layout /> */}
      <Header setSearchQuery={setSearchQuery} />
      <Layout searchQuery={searchQuery} isQueueOpen={isQueueOpen}/>
      <Player setIsQueueOpen={setIsQueueOpen} isQueueOpen={isQueueOpen}/>
      <audio ref={audioRef} src={track.file} preload="auto"></audio>
      {/* <VideoPlayer video={video} /> */}
    </div>
  );
};

export default App;
