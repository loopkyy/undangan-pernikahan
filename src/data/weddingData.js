import gaganImg from '../assets/images/gagan.webp'
import vicaImg from '../assets/images/vica.webp'
import coupleImg from '../assets/images/depan.webp'

import galery1 from '../assets/images/galery1.webp'
import galery2 from '../assets/images/galery2.webp'
import galery3 from '../assets/images/galery3.webp'
import galery4 from '../assets/images/galery4.webp'
import galery5 from '../assets/images/galery5.webp'
import galery6 from '../assets/images/galery6.webp'


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

  gallery: [
    { url: galery1, caption: "Pre-wedding 1" },
    { url: galery2, caption: "Pre-wedding 2" },
    { url: galery3, caption: "Pre-wedding 3" },
    { url: galery4, caption: "Pre-wedding 4" },
    { url: galery5, caption: "Pre-wedding 5" },
    { url: galery6, caption: "Pre-wedding 6" },

  ],

  quotes: [
    {
      text:
        "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri...",
      sumber: "QS. Ar-Rum: 21"
    }
  ],

map: {
    embedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1793.1612908351876!2d108.4286074790942!3d-6.991384957530554!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6f1516b4719b09%3A0x5a06dd8bd0950119!2sPKBM%20ALIMMUTAMAD!5e1!3m2!1sid!2sid!4v1778311748471!5m2!1sid!2sid",
    link: "https://maps.app.goo.gl/PvFfEmeLPtznJmh97"
},


  music: musicFile
}