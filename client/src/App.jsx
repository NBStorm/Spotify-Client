// import { useContext } from "react";
import Player from "./components/Player";
import Header from "./components/Header";
import Layout from "./components/main-layout/Layout";
// import { PlayerContext } from "./context/PlayerContext"

const App = () => {
  // const {audioRef,track} = useContext(PlayerContext)
  return (
    <div className="h-screen bg-black">
      <Header />
      <Layout />
      <Player />
      {/* <audio ref={audioRef} src={track.file} preload="auto"> */}

      {/* </audio> */}
    </div>
  );
};

export default App;
