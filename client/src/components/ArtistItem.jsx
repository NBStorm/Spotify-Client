import { useNavigate } from "react-router-dom";

const ArtistItem = ({ avatar_url, name, id }) => {
  const navigate = useNavigate();

  // Thêm base URL của backend vào avatar_url
  const fullImageUrl = `http://localhost:8000${avatar_url}`;

  return (
    <div
      onClick={() => navigate(`/artist/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img
        className="rounded w-45 h-40"
        src={fullImageUrl}
        alt={name}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "path/to/default/image.jpg";
        }}
      />
      <p className="font-bold mt-2 mb-1">{name}</p>
    </div>
  );
};

export default ArtistItem;
