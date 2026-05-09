import React from 'react'
import { motion } from 'framer-motion'
import { Camera } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const Gallery = () => {
  const photos = weddingData.gallery.map((item, index) => ({
    id: index + 1,
    url: item.url,
    caption: item.caption
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-4 md:px-8 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 text-[#c9a87c]">
            <Camera size={40} strokeWidth={1} className="mx-auto" />
          </div>
          <h2 className="text-3xl md:text-5xl text-[#4a3728] mb-4 font-light tracking-wide">Gallery</h2>
          <div className="w-16 h-px bg-[#c9a87c] mx-auto"></div>
          <p className="text-[#8b7a6a] text-sm md:text-base mt-4 max-w-2xl mx-auto">
            Momen-momen indah perjalanan cinta kami
          </p>
        </div>

        {/* GALLERY GRID - TANPA MODAL, HANYA HOVER */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                <div className="aspect-[4/5] md:aspect-square w-full">
                  <img 
                    src={photo.url}
                    alt={photo.caption}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x800/faf7f2/4a3728?text=Pre-wedding+${photo.id}`
                    }}
                  />
                </div>
                
                {/* OVERLAY GRADIENT - MUNCUL SAAT HOVER */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* CAPTION - MUNCUL SAAT HOVER */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs md:text-sm font-light">{photo.caption}</p>
                </div>

                {/* IKON CAMERA - MUNCUL SAAT HOVER */}
                <div className="absolute top-3 right-3 bg-white/90 p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={14} className="text-[#4a3728] md:w-4 md:h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FOOTER NOTE */}
        <div className="text-center mt-12">
          <p className="text-[#8b7a6a] text-sm">
            ✨ Momen terindah dalam satu frame ✨
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default Gallery