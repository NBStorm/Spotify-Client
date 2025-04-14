import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { artistsData, assets } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Footer from "./Footer";

const DisplayAlbum = () => {
  const { id } = useParams();
  const artistData = artistsData[id];
  const { playWithId } = useContext(PlayerContext);

  return (
    <>
      <div className="relative flex flex-col md:flex-row md:items-end w-full h-[300px]">
        {artistData.banner ? (
          <img
            src={artistData.banner}
            alt=""
            className="inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-end w-full h-full p-6 md:p-10">
            {/* Hình ảnh artist */}
            <img
              src={artistData.image}
              alt={artistData.name}
              className="w-55 h-55 rounded-full object-cover mr-6"
            />
            {/* Thông tin artist */}
            <div className="text-white">
              <div className="flex items-center gap-0.5">
                {/* Increased gap and margin */}
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                  alt="Verified"
                  className="w-5 h-5"
                />
                <span className="text-xl font-medium">Verified Artist</span>
              </div>
              <h1 className="text-8xl md:text-8xl font-bold mb-4">
                {/* Added bottom margin */}
                {artistData.name}
              </h1>
              <p className="text-base mt-4 text-white/80">
                {/* Adjusted top margin */}
                1,122,111 monthly listeners
              </p>
            </div>
          </div>
        )}

        {/* Gradient overlay */}
        {artistData.banner && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        )}

        {artistData.banner && (
          <div className="absolute z-10 p-6 md:p-10 text-white h-full flex flex-col justify-end">
            <div className="flex items-center gap-1">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e4/Twitter_Verified_Badge.svg"
                alt="Verified"
                className="w-5 h-5"
              />
              <span className="text-xl font-medium">Verified Artist</span>
            </div>
            <h1 className="text-10xl md:text-8xl font-bold">
              {artistData.name}
            </h1>
            <p className="text-base mt-2 text-white/80">
              1,656,955 monthly listeners
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 mt-10 mb-4 pl-2 pr-2 text-[#a7a7a7] items-center">
        <p className="flex items-center">
          <b className="mr-4">#</b>Title
        </p>
        <img className="ml-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {artistData.songsData.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          key={item.id}
          className="grid grid-cols-2 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <div className="text-white text-sm md:text-[15px] flex items-center gap-4">
            <div className="flex items-center justify-center">
              <div className="text-[#a7a7a7]">{index + 1}</div>
            </div>
            <img className="w-10" src={item.image} alt={item.name} />
            <div>
              <div>{item.name.slice(0, 20)}</div>
              <div className="text-[#a7a7a7]">{item.desc.slice(0, 20)}</div>
            </div>
          </div>
          <p className="text-[15px] text-right">{item.duration}</p>
        </div>
      ))}
      <Footer />
    </>
  );
};

export default DisplayAlbum;
