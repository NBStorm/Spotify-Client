import bell_icon from "./bell.png";
import home_icon from "./home.png";
import like_icon from "./like.png";
import loop_icon from "./loop.png";
import mic_icon from "./mic.png";
import next_icon from "./next.png";
import play_icon from "./play.png";
import pause_icon from "./pause.png";
import plays_icon from "./plays.png";
import prev_icon from "./prev.png";
import search_icon from "./search.png";
import shuffle_icon from "./shuffle.png";
import speaker_icon from "./speaker.png";
import stack_icon from "./stack.png";
import zoom_icon from "./zoom.png";
import plus_icon from "./plus.png";
import arrow_icon from "./arrow.png";
import mini_player_icon from "./mini-player.png";
import queue_icon from "./queue.png";
import volume_icon from "./volume.png";
import arrow_right from "./right_arrow.png";
import arrow_left from "./left_arrow.png";
import spotify_logo from "./Spotify_Primary.png";
import clock_icon from "./clock_icon.png";
import mute_icon from "./mute.jpg";
import music from "./musical-note.png";

//
import nuocmatcasau from "./nuocmatcasau.png";
import omemthatlau from "./omemthatlau.jpg";
import dancing from "./dancing.jpg";
import emmuontudo from "./emmuontudo.jpg";
import duchotanthe from "./duchotanthe.jpg";
import cautraloi from "./cautraloi.jpg";
import diadang from "./diadang.jpg";
import tamvan6nganthuong from "./8van6nganthuong.jpg";



import { getAllArtists } from "../api/getAll-Artist";
import { getAllAlbums } from "../api/getAll-Album";
import { getAllSongs } from "../api/getAll-Songs";

export const assets = {
  bell_icon,
  home_icon,
  like_icon,
  loop_icon,
  mic_icon,
  next_icon,
  play_icon,
  plays_icon,
  prev_icon,
  search_icon,
  shuffle_icon,
  speaker_icon,
  stack_icon,
  zoom_icon,
  plus_icon,
  arrow_icon,
  mini_player_icon,
  volume_icon,
  queue_icon,
  pause_icon,
  arrow_left,
  arrow_right,
  spotify_logo,
  clock_icon,
  mute_icon,
  music,
};

const result = await getAllSongs();

export const songsData = result.songs.map((song) => ({
  ...song,
  artist: song.artist.name,
  album: song.album.title,
  genre: song.genre.name,
  video_url: `http://localhost:8000/media/${song.video_url}`,
}));

export const artistsData = await getAllArtists();

export const albumsData = await getAllAlbums();

export const artistAlbum = [
  {
    id: 1,
    title: "Album HIEUTHUHAI",
    artist: "HIEUTHUHAI",
    release_date: "2024-01-01",
    image_url: nuocmatcasau,
    songs: [
      {
        id: 0,
        title: "Nước Mắt Cá Sấu",
        artist: "HIEUTHUHAI",
        genre: "Rap",
        duration: "3:45",
        file_url: "nuocmatcasaump3",
      },
    ],
  },
  {
    id: 2,
    title: "Album MONO",
    artist: "MONO",
    release_date: "2024-01-01",
    image_url: omemthatlau,
    songs: [
      {
        id: 1,
        title: "Ôm Em Thật Lâu",
        artist: "MONO",
        genre: "Pop",
        duration: "4:10",
        file_url: "omemthatlaump3",
      },
    ],
  },
  {
    id: 3,
    title: "Album SOOBIN",
    artist: "SOOBIN",
    release_date: "2024-01-01",
    image_url: dancing,
    songs: [
      {
        id: 2,
        title: "Dancing In The Dark",
        artist: "SOOBIN",
        genre: "Pop",
        duration: "3:55",
        file_url: "dancingmp3",
      },
    ],
  },
  {
    id: 4,
    title: "Album Du Uyên",
    artist: "Du Uyên",
    release_date: "2024-01-01",
    image_url: emmuontudo,
    songs: [
      {
        id: 3,
        title: "Em Muốn Tự Do (LUNY Remix)",
        artist: "Du Uyên",
        genre: "Pop",
        duration: "3:30",
        file_url: "emmuontudomp3",
      },
    ],
  },
  {
    id: 5,
    title: "Album ERIK",
    artist: "ERIK",
    release_date: "2024-01-01",
    image_url: duchotanthe,
    songs: [
      {
        id: 4,
        title: "Dù Cho Tận Thế",
        artist: "ERIK",
        genre: "Pop",
        duration: "4:05",
        file_url: "duchotanthemp3",
      },
    ],
  },
  {
    id: 6,
    title: "Album J.ADE",
    artist: "J.ADE",
    release_date: "2024-01-01",
    image_url: cautraloi,
    songs: [
      {
        id: 5,
        title: "Câu Trả Lời",
        artist: "J.ADE",
        genre: "Pop",
        duration: "3:40",
        file_url: "cautraloimp3",
      },
    ],
  },
  {
    id: 7,
    title: "Album Hoàng Oanh",
    artist: "Hoàng Oanh",
    release_date: "2024-01-01",
    image_url: diadang,
    songs: [
      {
        id: 6,
        title: "Địa Đàng (Remix)",
        artist: "Hoàng Oanh",
        genre: "Pop",
        duration: "3:50",
        file_url: "diadangmp3",
      },
    ],
  },
  {
    id: 8,
    title: "Album Hạo Thiên",
    artist: "Hạo Thiên",
    release_date: "2024-01-01",
    image_url: tamvan6nganthuong,
    songs: [
      {
        id: 7,
        title: "8 Vạn 6 Ngàn Thương (H2O Remix)",
        artist: "Hạo Thiên",
        genre: "Pop",
        duration: "3:35",
        file_url: "tamvan6nganthuongmp3",
      },
    ],
  },

  {
    id: 9,
    title: "Album HIEUTHUHAI2",
    artist: "HIEUTHUHAI",
    release_date: "2024-01-01",
    image_url: nuocmatcasau,
    songs: [
      {
        id: 0,
        title: "Nước Mắt Cá Sấu",
        artist: "HIEUTHUHAI",
        genre: "Rap",
        duration: "3:45",
        file_url: "nuocmatcasaump3",
      },
    ],
  },
];
