import { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";
import { Video } from "lucide-react";
const Player = ({ setIsQueueOpen, isQueueOpen, isVideoOpen, setIsVideoOpen }) => {
  const {
    seekBg,
    seekBar,
    track,
    playStatus,
    play,
    pause,
    time,
    seekSong,
    volume,
    setVolume,
    mute,
    playNext,
    playPrevious,
  } = useContext(PlayerContext);

  const [isHoveringVolume, setIsHoveringVolume] = useState(false);

  const onClickPlayNext = () => {
    playNext();
  };

  const onClickPlayPrevious = () => {
    playPrevious();
  };

  return (
    <div
      className="h-[10%] bg-black flex justify-between items-center
    text-white px-4"
    >
      <div className="hidden lg:flex items-center gap-4">
        <img className="w-12" src={track.image} alt="song_Data" />
        <div>
          <p>{track.name}</p>
          <p className="">{track.desc.slice(0, 12)}</p>
        </div>
      </div>

      <div className="flex flex-col items-center gap-1 m-auto">
        <div className="flex gap-4">
          <img
            className="w-4 cursor-pointer"
            src={assets.shuffle_icon}
            alt=""
          />
          <img
            className="w-4 cursor-pointer"
            src={assets.prev_icon}
            onClick={onClickPlayPrevious}
            alt=""
          />
          {playStatus ? (
            <img
              onClick={pause}
              className="w-4 cursor-pointer"
              src={assets.pause_icon}
              alt=""
            />
          ) : (
            <img
              onClick={play}
              className="w-4 cursor-pointer"
              src={assets.play_icon}
              alt=""
            />
          )}

          <img
            className="w-4 cursor-pointer"
            src={assets.next_icon}
            onClick={onClickPlayNext}
            alt=""
          />
          <img className="w-4 cursor-pointer" src={assets.loop_icon} alt="" />
        </div>
        <div className="flex items-center gap-5">
          <p>
            {time.currentTime.minutes}:{time.currentTime.seconds}
          </p>
          <div
            ref={seekBg}
            onClick={seekSong}
            className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
          >
            <hr
              ref={seekBar}
              className="h-1 border-none w-0 bg-green-800 rounded-full"
            />
          </div>
          <p>
            {time.totalTime.minutes}:
            {time.totalTime.seconds === 0 ? "00" : time.totalTime.seconds}
          </p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-2 opacity-75">
        <img
          className="w-4"
          src={assets.plays_icon}
          alt=""
          onClick={() => setIsVideoOpen(!isVideoOpen)}
        />
        <img className="w-4" src={assets.mic_icon} alt="" />
        <img
          className="w-4 cursor-pointer"
          src={assets.queue_icon}
          alt=""
          onClick={() => setIsQueueOpen(!isQueueOpen)}
        />
        <img className="w-4" src={assets.speaker_icon} alt="" />
        {volume === 0 ? (
          <img className="w-5" src={assets.mute_icon} onClick={mute} alt="" />
        ) : (
          <img className="w-4" src={assets.volume_icon} onClick={mute} alt="" />
        )}
        <div
          className="relative w-20 h-4 flex items-center"
          onMouseEnter={() => setIsHoveringVolume(true)}
          onMouseLeave={() => setIsHoveringVolume(false)}
        >
          {/* Background thanh trắng luôn hiển thị */}
          <div className="absolute w-full h-1 bg-gray-600 rounded"></div>

          {/* Thanh volume có chiều dài theo mức âm lượng */}
          <div
            className={`absolute h-1 rounded transition-all duration-75 left-0 ${
              isHoveringVolume ? "bg-green-500" : "bg-white"
            }`}
            style={{ width: `${volume * 100}%` }}
          ></div>

          {/* Slider chỉ hiện khi hover */}
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => {
              setVolume(parseFloat(e.target.value));
              console.log("Volume bar width:", volume * 100 + "%");
            }}
            className={`absolute w-full h-1 cursor-pointer z-10 ${
              isHoveringVolume ? "opacity-100" : "opacity-0"
            } accent-green-500`}
            style={{ WebkitAppearance: "none", background: "transparent" }}
          />
        </div>
        <img className="w-4" src={assets.mini_player_icon} alt="" />
        <img className="w-4" src={assets.zoom_icon} alt="" />
      </div>
    </div>
  );
};

export default Player;
