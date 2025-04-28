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

import nuocmatcasaump3 from "./nuocmatcasau.mp3";
import omemthatlaump3 from "./omemthatlaump3.mp3";
import dancingmp3 from "./dancing.mp4";
import emmuontudomp3 from "./emmuontudo.mp3";
import duchotanthemp3 from "./duchotanthe.mp3";
import cautraloimp3 from "./cautraloi.mp3";
import diadangmp3 from "./diadang.mp3";
import tamvan6nganthuongmp3 from "./tamvan6nganthuong.mp3";

//albums
import img8 from "./img8.jpg";
import img9 from "./img9.jpg";
import img10 from "./img10.jpg";
import img11 from "./img11.jpg";
import img15 from "./img15.jpg";
import img16 from "./img16.jpg";

//artist
import ht2 from "./artistHT2.jpg";
import mono from "./artistMONO.jpg";
import soobin from "./artistSOOBIN.jpg";
import jade from "./artistJ.ade.jpg";
import haothien from "./artistHaoThien.jpg";
import erik from "./artistErik.jpg";

//banner
import bannerht2 from "./bannerhieuthu2.jpg";
import bannersoobin from "./bannersoobin.jpg";
import bannerjade from "./bannerjade.jpg";
import bannererik from "./bannererik.jpg";
import bannermono from "./bannermono.jpg";
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

export const songsData = [
  {
    id: 0,
    name: "Nước Mắt Cá Sấu",
    image: nuocmatcasau,
    file: nuocmatcasaump3,
    desc: "HIEUTHUHAI",
    duration: "3:45",
  },
  {
    id: 1,
    name: "Ôm Em Thật Lâu",
    image: omemthatlau,
    file: omemthatlaump3,
    desc: "MONO",
    duration: "4:10",
  },
  {
    id: 2,
    name: "Dancing In The Dark",
    image: dancing,
    file: dancingmp3,
    desc: "SOOBIN",
    duration: "3:55",
  },
  {
    id: 3,
    name: "Em Muốn Tự Do (LUNY Remix)",
    image: emmuontudo,
    file: emmuontudomp3,
    desc: "Du Uyên",
    duration: "3:30",
  },
  {
    id: 4,
    name: "Dù Cho Tận Thế",
    image: duchotanthe,
    file: duchotanthemp3,
    desc: "ERIK",
    duration: "4:05",
  },
  {
    id: 5,
    name: "Câu Trả Lời",
    image: cautraloi,
    file: cautraloimp3,
    desc: "J.ADE",
    duration: "3:40",
  },
  {
    id: 6,
    name: "Địa Đàng (Remix)",
    image: diadang,
    file: diadangmp3,
    desc: "Hoàng Oanh",
    duration: "3:50",
  },
  {
    id: 7,
    name: "8 Vạn 6 Ngàn Thương (H2O Remix)",
    image: tamvan6nganthuong,
    file: tamvan6nganthuongmp3,
    desc: "Hạo Thiên",
    duration: "3:35",
  },
];

export const artistsData = [
  {
    id: 0,
    name: "HIEUTHUHAI",
    image: ht2,
    banner: bannerht2,
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 2,
        name: "Dancing In The Dark",
        image: dancing,
        file: dancingmp3,
        desc: "SOOBIN",
        duration: "3:55",
      },
    ],
  },
  {
    id: 1,
    name: "MONO",
    image: mono,
    banner: bannermono,
    songsData: [
      {
        id: 0,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
  {
    id: 2,
    name: "SOOBIN",
    image: soobin,
    banner: bannersoobin,
    songsData: [
      {
        id: 0,
        name: "Dancing In The Dark",
        image: dancing,
        file: dancingmp3,
        desc: "SOOBIN",
        duration: "3:55",
      },
    ],
  },
  {
    id: 3,
    name: "Du Uyên",
    image: emmuontudo,
    banner: null,
    songsData: [
      {
        id: 0,
        name: "Em Muốn Tự Do (LUNY Remix)",
        image: emmuontudo,
        file: emmuontudomp3,
        desc: "Du Uyên",
        duration: "3:30",
      },
    ],
  },
  {
    id: 4,
    name: "ERIK",
    image: erik,
    banner: bannererik,
    songsData: [
      {
        id: 0,
        name: "Dù Cho Tận Thế",
        image: duchotanthe,
        file: duchotanthemp3,
        desc: "ERIK",
        duration: "4:05",
      },
    ],
  },
  {
    id: 5,
    name: "J.ADE",
    image: jade,
    banner: bannerjade,
    songsData: [
      {
        id: 0,
        name: "Câu Trả Lời",
        image: cautraloi,
        file: cautraloimp3,
        desc: "J.ADE",
        duration: "3:40",
      },
    ],
  },
  {
    id: 6,
    name: "Hoàng Oanh",
    image: diadang,
    banner: null,
    songsData: [
      {
        id: 0,
        name: "Địa Đàng (Remix)",
        image: diadang,
        file: diadangmp3,
        desc: "Hoàng Oanh",
        duration: "3:50",
      },
    ],
  },
  {
    id: 7,
    name: "Hạo Thiên",
    image: haothien,
    banner: null,
    songsData: [
      {
        id: 0,
        name: "8 Vạn 6 Ngàn Thương (H2O Remix)",
        image: tamvan6nganthuong,
        file: tamvan6nganthuongmp3,
        desc: "Hạo Thiên",
        duration: "3:35",
      },
    ],
  },
];

export const albumsData = [
  {
    id: 0,
    name: "Top 50 Global",
    image: img8,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#2a4365",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
  {
    id: 1,
    name: "Top 50 Vietnam",
    image: img9,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#22543d",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
      {
        id: 2,
        name: "Dancing In The Dark",
        image: dancing,
        file: dancingmp3,
        desc: "SOOBIN",
        duration: "3:55",
      },
      {
        id: 3,
        name: "Em Muốn Tự Do (LUNY Remix)",
        image: emmuontudo,
        file: emmuontudomp3,
        desc: "Du Uyên",
        duration: "3:30",
      },
      {
        id: 4,
        name: "Dù Cho Tận Thế",
        image: duchotanthe,
        file: duchotanthemp3,
        desc: "ERIK",
        duration: "4:05",
      },
    ],
  },
  {
    id: 2,
    name: "Trending India",
    image: img10,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#742a2a",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
  {
    id: 3,
    name: "Trending Global",
    image: img16,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#44337a",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
  {
    id: 4,
    name: "Mega Hits,",
    image: img11,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#234e52",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
  {
    id: 5,
    name: "Happy Favorites",
    image: img15,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#744210",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
];

export const playlistsData = [
  {
    id: 0,
    name: "Top 50 Global",
    image: img8,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#2a4365",
    songsData: [
      {
        id: 0,
        name: "Nước Mắt Cá Sấu",
        image: nuocmatcasau,
        file: nuocmatcasaump3,
        desc: "HIEUTHUHAI",
        duration: "3:45",
      },
      {
        id: 1,
        name: "Ôm Em Thật Lâu",
        image: omemthatlau,
        file: omemthatlaump3,
        desc: "MONO",
        duration: "4:10",
      },
    ],
  },
  {
    id: 1,
    name: "Top 50 Vietnam",
    image: img9,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#22543d",
  },
  {
    id: 2,
    name: "Trending Vietnam",
    image: img10,
    desc: "Your weekly update of the most played tracks",
    bgColor: "#742a2a",
  },
];
