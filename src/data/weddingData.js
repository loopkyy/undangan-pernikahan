import gaganImg from '../assets/images/gagan.jpeg'
import vicaImg from '../assets/images/vica.jpeg'
import coupleImg from '../assets/images/couple.jpeg'

import galery1 from '../assets/images/galery1.jpeg'
import galery2 from '../assets/images/galery2.jpeg'
import galery3 from '../assets/images/galery3.jpeg'
import galery4 from '../assets/images/galery4.jpeg'
import galery5 from '../assets/images/galery5.jpeg'
import galery6 from '../assets/images/galery6.jpeg'

import danaImg from '../assets/images/dana.jpeg'

import musicFile from '../assets/music/Bandaneira Sampai Jadi Debu (unofficial music video).mp3'

export const weddingData = {
  couple: {
    pria: {
      nama: "Gagan Maulana Rismandana",
      panggilan: "Gagan",
      orangTua: "Bpk. Dadang Sugiana & Ibu Teti Rismawati",
      foto: gaganImg,
      instagram: "@gaganmaulana.r",
      anakKe: "Putra pertama"
    },

    wanita: {
      nama: "Vica Nurrohmayanti",
      panggilan: "Vica",
      orangTua: "Bpk. Sutarsa & Ibu Atik",
      foto: vicaImg,
      instagram: "@vicanurr",
      anakKe: "Putri kedua"
    },

    fotoBersama: coupleImg
  },

  event: {
    akad: {
      tanggal: "2026-06-13",
      hari: "Sabtu",
      waktu: "08:00 - selesai",
      tempat: "Desa Haurkuning, Kecamatan Nusaherang, Kabupaten Kuningan",
      alamat:
        "Dusun Puhun RT.004 RW.003, Desa Haurkuning, Kecamatan Nusaherang, Kabupaten Kuningan"
    },

    resepsi: {
      tanggal: "2026-06-13",
      hari: "Sabtu",
      waktu: "08:00 - selesai",
      tempat: "Desa Haurkuning, Kecamatan Nusaherang, Kabupaten Kuningan",
      alamat:
        "Dusun Puhun RT.004 RW.003, Desa Haurkuning, Kecamatan Nusaherang, Kabupaten Kuningan"
    }
  },

  loveStory: [
    {
      tahun: "2020",
      judul: "Pertemuan Pertama",
      cerita:
        "Berawal dari sebuah acara keluarga, takdir mempertemukan kami di sebuah kedai kopi kecil."
    }
  ],

  gallery: [
    { url: galery1, caption: "Pre-wedding 1" },
    { url: galery2, caption: "Pre-wedding 2" },
    { url: galery3, caption: "Pre-wedding 3" },
    { url: galery4, caption: "Pre-wedding 4" },
    { url: galery5, caption: "Pre-wedding 5" },
    { url: galery6, caption: "Pre-wedding 6" }
  ],

  quotes: [
    {
      text:
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri...",
      sumber: "QS. Ar-Rum: 21"
    }
  ],

  map: {
    embedUrl:
      "https://www.google.com/maps/embed?pb=!1m18...",
    link: "https://maps.app.goo.gl/6yTxrcTbNWbT6k2Q8"
  },

  qris: {
    image: danaImg,
    nama: "Gagan Maulana R",
    keterangan: "Scan untuk transfer"
  },

  music: musicFile
}