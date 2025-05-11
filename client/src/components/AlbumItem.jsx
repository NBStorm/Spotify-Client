import { useNavigate } from "react-router-dom";

const AlbumItem = ({ image_url, title, id }) => {
  const navigate = useNavigate();
  const fullImageUrl = `http://localhost:8000/media/${image_url}`;
  return (
    <div
      onClick={() => navigate(`/album/${id}`)}
      className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
    >
      <img className="rounded w-45 h-40" src={fullImageUrl} alt="image" />
      <p className="font-bold mt-2 mb-1">{title}</p>
    </div>
  );
};

export default AlbumItem;
