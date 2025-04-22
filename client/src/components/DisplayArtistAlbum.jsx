import { useParams } from "react-router-dom";
import Navbar from "./Navbar";
import { assets, artistAlbum } from "../assets/assets";
import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import Footer from "./Footer";
import PlayBar from "./PlayBar";

const DisplayArtistAlbum = () => {
    const { id } = useParams();

    const albumData = artistAlbum.filter((item) => item.id == id)[0];

    const { playWithId, queueSongs, track } = useContext(PlayerContext);

    const totalDuration = albumData.songs.reduce((acc, song) => {
        const [minutes, seconds] = song.duration.split(":").map(Number);
        return acc + minutes * 60 + seconds;
    }, 0);

    const formatDuration = (totalSeconds) => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${hours > 0 ? `${hours}hr ` : ""}${minutes}min ${seconds}sec`;
    };

    const playAlbum = () => {
        queueSongs(albumData.songs.map((song) => song.id));
        playWithId(albumData.songs[0].id);
    };

    return (
        <div>
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img className="w-48 rounded" src={albumData.image_url} alt="" />
                <div className="flex flex-col">
                    <p>Album</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {albumData.title}
                    </h2>
                    <p className="mt-1">
                        <img
                            className="inline-block w-5 filter invert "
                            src={assets.spotify_logo}
                            alt=""
                        />
                        <b> Spotify </b>
                        <b>• 1,232,123 saves </b>•{" "}
                        <b>{albumData.songs.length} songs,</b>
                        <span className="text-[#a7a7a7]">
                            {" "}
                            {formatDuration(totalDuration)}
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

            {albumData.songs.map((item, index) => {
                const isPlaying = track.id === item.id;

                return (
                    <div
                        onClick={() => playWithId(item.id)}
                        key={item.id}
                        className={`grid grid-cols-2 gap-2 p-2 items-center hover:bg-[#ffffff2b] cursor-pointer ${isPlaying ? "text-[#1ed760]" : "text-[#a7a7a7]"
                            }`}
                    >
                        <div className="text-sm md:text-[15px] flex items-center gap-4">
                            <div className="flex items-center justify-center">
                                {isPlaying ? (
                                    <img class="DZJJ5SCypi2mREbjy5bx" width="14" height="14" alt="" src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f5eb96f2.gif">
                                    </img>
                                ) : (
                                    <div className={isPlaying ? "text-[#1ed760]" : "text-[#a7a7a7]"}>
                                        {index + 1}
                                    </div>
                                )}
                            </div>
                            <div className={isPlaying ? "text-[#1ed760]" : "text-white"}>
                                {item.title.slice(0, 20)}
                            </div>
                        </div>
                        <p className={`text-[15px] text-right  text-[#a7a7a7]`}>
                            {item.duration}
                        </p>
                    </div>
                );
            })}

            <Footer />
        </div >
    );
};

export default DisplayArtistAlbum;
