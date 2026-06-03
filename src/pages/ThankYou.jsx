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
      className="min-h-screen flex flex-col items-center justify-center p-6 bg-gradient-to-b from-[#4a3728] via-[#3d2d22] to-[#2e221a]"
    >
      {/* CARD UTAMA */}
      <div className="max-w-2xl w-full text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl">
        
        <div className="mb-8 text-[#d6b98c]">
          <HeartHandshake size={48} strokeWidth={1} className="mx-auto" />
        </div>

        <h2 className="text-3xl md:text-4xl font-light mb-6 text-white tracking-wide">
          Terima Kasih
        </h2>

        <p className="text-[#f3ece4] mb-8 leading-relaxed font-light">
          Atas perhatian dan doa restu yang diberikan, 
          kami mengucapkan terima kasih yang sebesar-besarnya.
          Mohon maaf apabila ada kesalahan kata dalam penyampaian undangan.
        </p>

        <div className="w-16 h-px bg-[#c9a87c] mx-auto my-8"></div>

        <p className="text-2xl font-light mb-2 text-white">
          {weddingData.couple.pria.nama} & {weddingData.couple.wanita.nama}
        </p>

        <p className="text-[#d6b98c] text-sm tracking-widest uppercase">
          {weddingData.event.akad.tanggal}
        </p>

        <div className="flex justify-center space-x-2 mt-8">
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
        </div>

        {/* TOMBOL KEMBALI */}
        <button
          onClick={() => navigate('/')}
          className="mt-8 border border-[#d6b98c] text-[#d6b98c] hover:bg-[#d6b98c] hover:text-[#4a3728] px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
        >
          Kembali ke Awal
        </button>
      </div>

      {/* ========== PROMOSI DI BAWAH CARD (PAKAI ICON LUCIDE) ========== */}
      <div className="mt-8 text-center">
        <p className="text-white/40 text-xs mb-3 flex items-center justify-center gap-1">
          
        </p>
        
        <div className="flex justify-center gap-6">
          <a 
            href="https://www.instagram.com/riaadha.rizky/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#d6b98c] transition-colors flex items-center gap-1"
          >
            <Instagram size={14} />
            <span className="text-xs">Instagram</span>
          </a>
          
          <a 
            href="https://github.com/loopkyy" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#d6b98c] transition-colors flex items-center gap-1"
          >
            <Github size={14} />
            <span className="text-xs">GitHub</span>
          </a>
          
          <a 
            href="https://riaadha-portofolio.vercel.app/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white/40 hover:text-[#d6b98c] transition-colors flex items-center gap-1"
          >
            <Globe size={14} />
            <span className="text-xs">Portfolio</span>
          </a>
        </div>
        
        <p className="text-white/20 text-[10px] mt-3">
          React + TailwindCSS + Firebase
        </p>
      </div>
    </motion.div>
  )
}

export default ThankYou