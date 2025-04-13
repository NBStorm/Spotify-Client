import { useNavigate } from "react-router-dom";

const ArtistItem = ({ image, name, id }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-45 h-40" src={image} alt="image" />
      <p className="font-bold mt-2 mb-1">{name}</p>
    </div>
  );
};

export default ArtistItem;
