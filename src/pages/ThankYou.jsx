import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake, Instagram, Github, Globe, Heart } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-6 bg-gradient-to-b from-[#4a3728] via-[#3d2d22] to-[#2e221a]"
    >
      {/* CARD UTAMA - Lebih terang di mobile */}
      <div className="max-w-2xl w-full text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-3xl p-6 md:p-10 shadow-2xl">
        
        <div className="mb-6 md:mb-8 text-[#d6b98c]">
          <HeartHandshake size={40} strokeWidth={1} className="mx-auto md:w-12 md:h-12" />
        </div>

        <h2 className="text-2xl md:text-4xl font-light mb-4 md:mb-6 text-white tracking-wide">
          Terima Kasih
        </h2>

        {/* TEKS - Lebih terang dan mudah dibaca */}
        <p className="text-[#e8ddd0] mb-6 md:mb-8 leading-relaxed font-light text-sm md:text-base">
          Atas perhatian dan doa restu yang diberikan, 
          kami mengucapkan terima kasih yang sebesar-besarnya.
          Mohon maaf apabila ada kesalahan kata dalam penyampaian undangan.
        </p>

        <div className="w-16 h-px bg-[#c9a87c] mx-auto my-6 md:my-8"></div>

        <p className="text-xl md:text-2xl font-light mb-2 text-white">
          {weddingData.couple.pria.nama} & {weddingData.couple.wanita.nama}
        </p>

        <p className="text-[#d6b98c] text-xs md:text-sm tracking-widest uppercase">
          {weddingData.event.akad.tanggal}
        </p>

        <div className="flex justify-center space-x-2 mt-6 md:mt-8">
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
        </div>

        {/* TOMBOL KEMBALI - Diperbesar untuk mobile */}
        <button
          onClick={() => navigate('/')}
          className="mt-6 md:mt-8 border-2 border-[#d6b98c] text-[#d6b98c] hover:bg-[#d6b98c] hover:text-[#4a3728] px-6 md:px-8 py-2.5 md:py-3 rounded-full text-sm tracking-wider transition-all duration-300 font-medium"
        >
          Kembali ke Awal
        </button>
      </div>

      {/* ========== PROMOSI DI BAWAH CARD - DIPERJELAS ========== */}
      <div className="mt-6 md:mt-8 text-center w-full max-w-md mx-auto">
        <div className="flex justify-center gap-4 md:gap-6">
          <a 
            href="https://www.instagram.com/riaadha.rizky/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#d6b98c] transition-colors flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full"
          >
            <Instagram size={14} />
            <span className="text-xs">IG</span>
          </a>
          
          <a 
            href="https://github.com/loopkyy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#d6b98c] transition-colors flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full"
          >
            <Github size={14} />
            <span className="text-xs">GitHub</span>
          </a>
          
          <a 
            href="https://riaadha-portofolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/60 hover:text-[#d6b98c] transition-colors flex items-center gap-1.5 bg-white/5 px-3 py-1.5 rounded-full"
          >
            <Globe size={14} />
            <span className="text-xs">Web</span>
          </a>
        </div>
        
        <p className="text-white/30 text-[10px] mt-4">
          React + TailwindCSS + Firebase
        </p>
      </div>
    </motion.div>
  )
}

export default ThankYou