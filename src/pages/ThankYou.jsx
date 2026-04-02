import React from 'react'
import { motion } from 'framer-motion'
import { HeartHandshake } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  const navigate = useNavigate()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-[#4a3728] via-[#3d2d22] to-[#2e221a]"
    >
      
      {/* Glass Card */}
      <div className="max-w-2xl w-full text-center backdrop-blur-md bg-white/5 border border-white/10 rounded-3xl p-10 shadow-2xl">

        {/* Icon */}
        <div className="mb-8 text-[#d6b98c]">
          <HeartHandshake size={48} strokeWidth={1} className="mx-auto" />
        </div>

        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-light mb-6 text-white tracking-wide">
          Terima Kasih
        </h2>

        {/* Message */}
        <p className="text-[#f3ece4] mb-8 leading-relaxed font-light">
          Atas perhatian dan doa restu yang diberikan, 
          kami mengucapkan terima kasih yang sebesar-besarnya.
          Mohon maaf apabila ada kesalahan kata dalam penyampaian undangan.
        </p>

        <div className="w-16 h-px bg-[#c9a87c] mx-auto my-8"></div>

        {/* Couple */}
        <p className="text-2xl font-light mb-2 text-white">
          {weddingData.couple.pria.nama} & {weddingData.couple.wanita.nama}
        </p>

        <p className="text-[#d6b98c] text-sm tracking-widest uppercase">
          {weddingData.event.akad.tanggal}
        </p>

        {/* Decorative dots */}
        <div className="flex justify-center space-x-2 mt-10">
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
          <span className="w-1.5 h-1.5 bg-[#d6b98c] rounded-full"></span>
        </div>

        {/* Button */}
        <button
          onClick={() => navigate('/')}
          className="mt-10 border border-[#d6b98c] text-[#d6b98c] hover:bg-[#d6b98c] hover:text-[#4a3728] px-8 py-3 rounded-full text-sm tracking-wider transition-all duration-300"
        >
          Kembali ke Awal
        </button>

      </div>
    </motion.div>
  )
}

export default ThankYou