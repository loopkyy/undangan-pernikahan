import React from 'react'
import { motion } from 'framer-motion'
import { Users } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const Couple = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container min-h-screen flex items-center justify-center"
    >
      <div className="max-w-5xl w-full">
        
        {/* HEADER */}
        <div className="text-center mb-16">
          <div className="mb-5 text-[#c9a87c]">
            <Users size={36} strokeWidth={1} className="mx-auto" />
          </div>
          <h2 className="text-4xl text-[#4a3728] mb-4 font-light tracking-wide">
            Mempelai
          </h2>
          <div className="w-16 h-px bg-[#c9a87c] mx-auto"></div>
        </div>

        {/* Couple*/}
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Pempelai Laki laki */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-[#e8ddd0]"
          >
            <div className="relative mb-8 inline-block">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-[#c9a87c]/60 p-2 mx-auto overflow-hidden shadow-md">
                <img 
                  src={weddingData.couple.pria.foto}
                  alt={weddingData.couple.pria.nama}
                  className="w-full h-full rounded-full object-cover hover:scale-105 transition duration-500"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${weddingData.couple.pria.nama}&background=c9a87c&color=fff&size=300`
                  }}
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#c9a87c] text-white px-5 py-1 text-xs tracking-widest rounded-full shadow">
                PRIA
              </div>
            </div>

            <h3 className="text-3xl text-[#4a3728] mb-3 font-light">
              {weddingData.couple.pria.nama}
            </h3>

            <p className="text-[#8b7a6a] text-sm mb-3 leading-relaxed">
              Putra dari {weddingData.couple.pria.orangTua}
            </p>

            <a 
              href={`https://instagram.com/${weddingData.couple.pria.instagram.replace('@','')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a87c] text-sm hover:underline"
            >
              {weddingData.couple.pria.instagram}
            </a>
          </motion.div>


          {/* Pempelai Wanita */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center bg-white/70 backdrop-blur-sm p-8 rounded-3xl shadow-md border border-[#e8ddd0]"
          >
            <div className="relative mb-8 inline-block">
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-4 border-[#c9a87c]/60 p-2 mx-auto overflow-hidden shadow-md">
                <img 
                  src={weddingData.couple.wanita.foto}
                  alt={weddingData.couple.wanita.nama}
                  className="w-full h-full rounded-full object-cover hover:scale-105 transition duration-500"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${weddingData.couple.wanita.nama}&background=c9a87c&color=fff&size=300`
                  }}
                />
              </div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-[#c9a87c] text-white px-5 py-1 text-xs tracking-widest rounded-full shadow">
                WANITA
              </div>
            </div>

            <h3 className="text-3xl text-[#4a3728] mb-3 font-light">
              {weddingData.couple.wanita.nama}
            </h3>

            <p className="text-[#8b7a6a] text-sm mb-3 leading-relaxed">
              Putri dari {weddingData.couple.wanita.orangTua}
            </p>

            <a 
              href={`https://instagram.com/${weddingData.couple.wanita.instagram.replace('@','')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#c9a87c] text-sm hover:underline"
            >
              {weddingData.couple.wanita.instagram}
            </a>
          </motion.div>

        </div>
      </div>
    </motion.div>
  )
}

export default Couple