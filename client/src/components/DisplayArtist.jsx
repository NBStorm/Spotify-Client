import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { artistsData, assets, artistAlbum } from "../assets/assets";
import { useContext, useState } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Footer from "./Footer";
import PlayBarArtist from "./PlayBarArtist";
import ArtistAlbumItem from "./ArtistAlbumItem";
const DisplayAlbum = () => {
  const { id } = useParams();
  const artistData = artistsData[id];
  const { playWithId, queueSongs } = useContext(PlayerContext);
  const [isOpen, setIsOpen] = useState(false);


  const filteredArtistAlbum = artistAlbum.filter((item) =>
    item.artist == artistData.name
  );

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

      <PlayBarArtist
        playArtist={() => {
          queueSongs(artistData.songsData.map((song) => song.id));
          playWithId(artistData.songsData[0].id);
        }}
      />

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

      <section className="text-white px-6 py-10">
        <div className="flex flex-col  justify-between items-left gap-10 mb-6">
          <h2 className="text-2xl font-bold">Album</h2>

          <div className="flex gap-4 overflow-auto">
            {filteredArtistAlbum.map((item, index) => (

              <ArtistAlbumItem
                key={index}
                {...item}
                title={item.title}
                image_url={item.image_url}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-6">
          {/* {releases.map((item, index) => (
            <div key={index} className="w-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full aspect-square rounded-md object-cover mb-2"
              />
              <p className="text-sm font-semibold truncate">{item.title}</p>
              <p className="text-xs text-gray-400">{item.type}</p>
            </div>
          ))} */}
        </div>
      </section>

      <section className="text-white p-6">
        <h2 className="text-2xl font-bold mb-4">About</h2>
        <div
          className="relative max-w-2xl cursor-pointer rounded-md overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <img
            src={artistData.image}
            alt="Son Tung M-TP"
            className="w-full h-100 object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/10 p-6">
            <p className="font-bold text-base mb-3">
              1,695,449 monthly listeners
            </p>
            <p className="text-base leading-snug">{artistData.desc}</p>
          </div>
        </div>
      </section>

      {/* MODAL */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex justify-center items-center p-4 overflow-y-auto">
          <div className="relative bg-black text-white max-w-xl w-full rounded-md ">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl font-bold z-10"
            >
              &times;
            </button>

            {/* Image */}
            <img
              src={artistData.image}
              alt="Son Tung M-TP"
              className="w-full h-auto object-cover"
            />

            {/* Text Info Section */}
            <div className="flex flex-col md:flex-row bg-black px-6 py-6 gap-6">
              {/* Stats */}
              <div className="flex-shrink-0 text-left space-y-4 min-w-[160px]">
                <div>
                  <p className="text-2xl font-bold">6,615,599</p>
                  <p className="text-sm uppercase text-gray-400 mt-1 tracking-wider">
                    Followers
                  </p>
                </div>
                <div>
                  <p className="text-xl font-semibold">1,695,449</p>
                  <p className="text-sm text-gray-400 mt-1 tracking-wider">
                    Monthly Listeners
                  </p>
                </div>

                <div className="text-white space-y-4 mt-8">
                  <a
                    href="https://facebook.com"
                    className="flex items-center space-x-2 hover:underline"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M22 12a10 10 0 1 0-11.6 9.87v-6.99H8v-2.88h2.4V9.41c0-2.37 1.42-3.68 3.6-3.68 1.04 0 2.13.19 2.13.19v2.34h-1.2c-1.18 0-1.54.74-1.54 1.49v1.78H17l-.4 2.88h-2.4v6.99A10 10 0 0 0 22 12z" />
                    </svg>
                    <span>Facebook</span>
                  </a>

                  <a
                    href="https://instagram.com"
                    className="flex items-center space-x-2 hover:underline"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M7 2C4.24 2 2 4.24 2 7v10c0 2.76 2.24 5 5 5h10c2.76 0 5-2.24 5-5V7c0-2.76-2.24-5-5-5H7zm10 2c1.66 0 3 1.34 3 3v10c0 1.66-1.34 3-3 3H7c-1.66 0-3-1.34-3-3V7c0-1.66 1.34-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-.9a1.1 1.1 0 1 1-2.2 0 1.1 1.1 0 0 1 2.2 0z" />
                    </svg>
                    <span>Instagram</span>
                  </a>

                  <a
                    href="https://twitter.com"
                    className="flex items-center space-x-2 hover:underline"
                  >
                    <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                      <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.89-2.38 8.56 8.56 0 0 1-2.71 1.03A4.28 4.28 0 0 0 11.07 8c0 .34.04.68.1 1A12.14 12.14 0 0 1 3 5.16a4.28 4.28 0 0 0 1.32 5.71A4.21 4.21 0 0 1 2.8 10v.05a4.28 4.28 0 0 0 3.43 4.2 4.27 4.27 0 0 1-1.12.15c-.28 0-.56-.03-.83-.08a4.29 4.29 0 0 0 4 2.97A8.58 8.58 0 0 1 2 19.54a12.07 12.07 0 0 0 6.56 1.92c7.88 0 12.2-6.53 12.2-12.2 0-.18 0-.36-.01-.53A8.67 8.67 0 0 0 24 5.3a8.48 8.48 0 0 1-2.54.7z" />
                    </svg>
                    <span>x</span>
                  </a>

                  <a
                    href="https://wikipedia.org"
                    className="flex items-center space-x-2 hover:underline"
                  >
                    <svg
                      className="w-5 h-5 stroke-white"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeWidth="2"
                        d="M14 3h7v7m0-7L10 14m-4 1h4v4H5v-9h4z"
                      />
                    </svg>
                    <span>Wikipedia</span>
                  </a>
                </div>
              </div>

              <div>
                {/* Description */}
                <div className="text-sm leading-relaxed text-gray-200">
                  {artistData.desc}
                </div>

                <div className="flex items-center space-x-2 text-white text-sm mt-6 ">
                  <img
                    src={artistData.image}
                    alt="Son Tung M-TP"
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <span>
                    Posted By{" "}
                    <span className="font-medium">{artistData.name}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default DisplayAlbum;
