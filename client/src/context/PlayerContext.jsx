import { createContext, useEffect, useRef, useState } from "react";
import { songsData } from "../assets/assets";

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const videoRef = useRef(); // Add videoRef
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[0]);
  const [playStatus, setPlayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: {
      seconds: 0,
      minutes: 0,
    },
    totalTime: {
      seconds: 0,
      minutes: 0,
    },
  });

  const [volume, setVolume] = useState(1);
  const [queue, setQueue] = useState([]);
  const [currentQueueIndex, setCurrentQueueIndex] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume, audioRef.current]);

  const mute = () => {
    if (volume > 0) {
      setVolume(0);
    } else {
      setVolume(1); // Hoặc có thể lưu volume trước đó nếu cần
    }
  };

  const play = () => {
    audioRef.current.play();
    setPlayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPlayStatus(false);
  };

  const seekSong = async (e) => {
    audioRef.current.currentTime =
      (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
      audioRef.current.duration;
    console.log(
      "Current Time: ",
      audioRef.current.currentTime,
      "Duration: ",
      audioRef.current.duration
    );
  };

  const playWithId = (id) => {
    setTrack(songsData[id - 1]);
    audioRef.current.play();
    setPlayStatus(true);
  };

  const queueSongs = (songIds) => {
    setQueue(songIds);
    setCurrentQueueIndex(0);
  };

  const playNext = () => {
    if (currentQueueIndex < queue.length - 1) {
      const nextIndex = currentQueueIndex + 1;
      setCurrentQueueIndex(nextIndex);
      playWithId(queue[nextIndex]);
    }
  };

  const playPrevious = () => {
    if (currentQueueIndex > 0) {
      const prevIndex = currentQueueIndex - 1;
      setCurrentQueueIndex(prevIndex);
      playWithId(queue[prevIndex]);
    }
  };

  const setSongInAlbum = (id) => {
    const newIndex = queue.findIndex((songId) => songId === id);
    if (newIndex !== -1) {
      setCurrentQueueIndex(newIndex);
      playWithId(queue[newIndex]);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width =
          Math.floor(
            (audioRef.current.currentTime / audioRef.current.duration) * 100
          ) + "%";
        setTime({
          currentTime: {
            seconds: Math.floor(audioRef.current.currentTime % 60),
            minutes: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            seconds: Math.floor(audioRef.current.duration % 60),
            minutes: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    }, 1000);
  }, [audioRef]);

  const playVideo = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause audio
    }
    if (videoRef.current) {
      videoRef.current.currentTime = audioRef.current.currentTime; // Sync time
      videoRef.current.play(); // Play video
    }
  };

  const pauseVideo = () => {
    if (videoRef.current) {
      videoRef.current.pause(); // Pause video
      if (audioRef.current) {
        audioRef.current.currentTime = videoRef.current.currentTime; // Sync time
        audioRef.current.play(); // Resume audio
      }
    }
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.onplay = () => {
        if (audioRef.current) {
          audioRef.current.pause(); // Ensure audio pauses when video starts
        }
      };
    }
  }, [videoRef]);

  const contextValues = {
    audioRef,
    videoRef, // Add videoRef to context
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPlayStatus,
    time,
    setTime,
    play,
    pause,
    seekSong,
    volume,
    setVolume,
    mute,
    playWithId,
    queue,
    queueSongs,
    playNext,
    playPrevious,
    currentQueueIndex,
    setSongInAlbum,
    playVideo, // Expose playVideo
    pauseVideo, // Expose pauseVideo
  };

  return (
    <PlayerContext.Provider value={contextValues}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
