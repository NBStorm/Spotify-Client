import { useNavigate } from "react-router-dom";

const ArtistAlbumItem = ({ id, image_url, title }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/artist/album/${id}`)}
            className="min-w-[180px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]"
        >
            <img className="rounded w-45 h-40" src={image_url} alt="image" />
            <p className="font-bold mt-2 mb-1">{title}</p>

        </div>
    );
};

export default ArtistAlbumItem;
