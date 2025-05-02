import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ title, image_url, artist, id }) => {
  const { playWithId } = useContext(PlayerContext);

  const fullImageUrl = `http://localhost:8000/media/${image_url}`;
  return (
    <div
      onClick={() => playWithId(id)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-45 h-40" src={fullImageUrl} alt="" />
      <p className="font-bold mt-2 mb-1">{title}</p>
      <p className="text-slate-200 text-sm">{artist}</p>
    </div>
  );
};

export default SongItem;
