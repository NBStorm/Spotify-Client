import { createContext, useEffect, useRef, useState, useCallback } from "react";
import { songsData } from "../assets/assets";
import { playSong } from "../api/play-song"; // Import the playSong API

export const PlayerContext = createContext();

const PlayerContextProvider = (props) => {
  const audioRef = useRef();
  const videoRef = useRef();
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

  const play = useCallback(() => {
    if (audioRef.current) {
      if (!audioRef.current.src) {
        console.error("Play error: No source set for the audio element.");
        return;
      }
      audioRef.current
        .play()
        .then(() => setPlayStatus(true))
        .catch((error) => console.error("Play error:", error));
    }
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setPlayStatus(false);
  }, []);

  const playWithId = useCallback(
    async (id) => {
      const token = localStorage.getItem("access");
      if (!token) {
        console.error("No access token found. Playback is not allowed.");
        return;
      }

      const song = songsData.find((song) => song.id === id) || songsData[0];
      await setTrack(song);

      try {
        await playSong(id); // Call the playSong API
      } catch (error) {
        console.error("Error calling playSong API:", error);
        return;
      }

      // Thêm timeout để đảm bảo audio element đã cập nhật source mới
      setTimeout(() => {
        play();
      }, 100);
    },
    [play]
  );

  const playNext = useCallback(async () => {
    if (queue.length === 0) {
      pause();
      return;
    }

    const nextIndex = currentQueueIndex + 1;
    if (nextIndex < queue.length) {
      await setCurrentQueueIndex(nextIndex);
      await playWithId(queue[nextIndex]);
    } else {
      pause();
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }
    }
  }, [queue, currentQueueIndex, playWithId, pause]);

  const playPrevious = useCallback(async () => {
    if (currentQueueIndex > 0) {
      const prevIndex = currentQueueIndex - 1;
      await setCurrentQueueIndex(prevIndex);
      await playWithId(queue[prevIndex]);
    }
  }, [queue, currentQueueIndex, playWithId]);

  const queueSongs = useCallback((songIds) => {
    setQueue(songIds);
    setCurrentQueueIndex(0);
  }, []);

  const setSongInAlbum = useCallback(
    (id) => {
      const newIndex = queue.findIndex((songId) => songId === id);
      if (newIndex !== -1) {
        setCurrentQueueIndex(newIndex);
        playWithId(queue[newIndex]);
      }
    },
    [queue, playWithId]
  );

  const seekSong = useCallback((e) => {
    if (audioRef.current && seekBg.current) {
      audioRef.current.currentTime =
        (e.nativeEvent.offsetX / seekBg.current.offsetWidth) *
        audioRef.current.duration;
    }
  }, []);

  const mute = useCallback(() => {
    setVolume((prev) => (prev > 0 ? 0 : 1));
  }, []);

  const playVideo = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    if (videoRef.current) {
      videoRef.current.currentTime = audioRef.current?.currentTime || 0;
      videoRef.current.play();
    }
  }, []);

  const pauseVideo = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      if (audioRef.current) {
        audioRef.current.currentTime = videoRef.current.currentTime;
        audioRef.current.play();
      }
    }
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => {
      if (seekBar.current && audio.duration) {
        seekBar.current.style.width =
          Math.floor((audio.currentTime / audio.duration) * 100) + "%";
      }
      setTime({
        currentTime: {
          seconds: Math.floor(audio.currentTime % 60),
          minutes: Math.floor(audio.currentTime / 60),
        },
        totalTime: {
          seconds: Math.floor(audio.duration % 60),
          minutes: Math.floor(audio.duration / 60),
        },
      });
    };

    const handleEnded = () => {
      playNext();
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [playNext]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    if (videoRef.current) {
      const handleVideoPlay = () => {
        if (audioRef.current) {
          audioRef.current.pause();
        }
      };

      videoRef.current.addEventListener("play", handleVideoPlay);

      return () => {
        videoRef.current?.removeEventListener("play", handleVideoPlay);
      };
    }
  }, []);

  const contextValues = {
    audioRef,
    videoRef,
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
    playVideo,
    pauseVideo,
  };

  return (
    <PlayerContext.Provider value={contextValues}>
      {props.children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
