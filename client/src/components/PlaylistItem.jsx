import { useNavigate } from "react-router-dom";

const PlaylistItem = ({ image, name, id }) => {
  const navigate = useNavigate();

  const imageStyle = { filter: "invert(1)" } ;

  return (
    <div
      onClick={() => navigate(`/playlist/${id}`)}
      className="w-full p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26] flex items-center gap-3"
    >
      <img
        className="rounded w-10 h-10"
        src="/src/assets/Spotify_Primary.png"
        alt="image"
        style={imageStyle}
      />
      <div>
        <p className="font-bold">{name}</p>
      </div>
    </div>
  );
};

export default PlaylistItem;
