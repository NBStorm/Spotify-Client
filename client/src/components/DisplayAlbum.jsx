import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets } from "../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Footer from "./Footer";
import PlayBar from "./PlayBar";
import { getAlbumById } from "../api/get-Album";
import SongLine from "./SongLine";
import { playAlbums } from "../api/play-album"; // Import the playAlbum function

const DisplayAlbum = ({ setFromAlbum, setSongsDataQueue }) => {
  const { id } = useParams();
  const { playWithId, queueSongs, queue } = useContext(PlayerContext);
  const [albumData, setAlbumData] = useState({});

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        console.log("Fetching album data for id:", id); // Debugging log
        const data = await getAlbumById({ id });
        if (data) {
          setAlbumData(data);
          console.log("Album Data:", data);
        } else {
          console.error("No data returned for album id:", id);
        }
      } catch (error) {
        console.error("Error fetching album data:", error);
      }
    };

    if (id) {
      fetchAlbumData();
    } else {
      console.error("Invalid album id:", id);
    }
  }, [id]);

  const totalDuration = albumData.songs
    ? albumData.songs.reduce((acc, song) => {
        const [minutes, seconds] = song.duration_video.split(":").map(Number);
        return acc + minutes * 60 + seconds;
      }, 0)
    : 0;

  const formatDuration = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours > 0 ? `${hours}hr ` : ""}${minutes}min ${seconds}sec`;
  };

  const playAlbum = () => {
    queueSongs(albumData.songs.map((song) => song.id));
    console.log("queue: ", queue);
    setFromAlbum(albumData.title);
    setSongsDataQueue(albumData.songs);
    console.log("songs: ", albumData.songs);
    playWithId(albumData.songs[0].id);
    playAlbums(id);
  };
  useEffect(() => {
    console.log("Queue changed: ", queue);
  }, [queue]);

  const fullImageUrl = `http://localhost:8000/media/${albumData.image_url}`;

  return (
    <div>
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={fullImageUrl} alt="" />
        <div className="flex flex-col">
          <p>Album</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.title}
          </h2>
          <h4>{albumData.artist}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5 filter invert "
              src={assets.spotify_logo}
              alt=""
            />
            <b> Spotify </b>
            <b>• 1,232,123 saves </b>•{" "}
            <b>{albumData.songs ? albumData.songs.length : 0} songs,</b>
            <span className="text-[#a7a7a7]">
              {" "}
              {albumData.songs ? formatDuration(totalDuration) : 0}
            </span>
          </p>
        </div>
      </div>
      <PlayBar playAlbum={playAlbum} />
      <div className="grid grid-cols-2 mt-6 mb-4 pl-2 pr-2 text-[#a7a7a7] items-center">
        <p className="flex items-center">
          <b className="mr-4">#</b>Title
        </p>
        <img className="ml-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {albumData.songs &&
        albumData.songs.map((item, index) => (
          <SongLine
            key={item.id}
            item={item}
            index={index}
            playWithId={playWithId}
          />
        ))}
      <Footer />
    </div>
  );
};

export default DisplayAlbum;
