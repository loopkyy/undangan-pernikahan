import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Camera, X } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  
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
      className="min-h-screen py-20 px-4 md:px-8"
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

        {/* GALLERY GRID - RESPONSIF */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
          {photos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group cursor-pointer"
              onClick={() => setSelectedPhoto(photo)}
            >
              {/* CARD FOTO */}
              <div className="relative overflow-hidden rounded-xl md:rounded-2xl shadow-md hover:shadow-xl transition-all duration-300">
                {/* IMAGE */}
                <div className="aspect-[4/5] md:aspect-square w-full">
                  <img 
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/600x800/faf7f2/4a3728?text=Pre-wedding+${photo.id}`
                    }}
                  />
                </div>
                
                {/* OVERLAY GRADIENT */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* CAPTION - MUNCUL SAAT HOVER */}
                <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-xs md:text-sm font-light">{photo.caption}</p>
                </div>

                {/* IKON CAMERA DI CORNER */}
                <div className="absolute top-3 right-3 bg-white/90 p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera size={14} className="text-[#4a3728] md:w-4 md:h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL LIGHTBOX */}
        <AnimatePresence>
          {selectedPhoto && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 md:p-8"
              onClick={() => setSelectedPhoto(null)}
            >
              {/* CLOSE BUTTON */}
              <button 
                className="absolute top-4 right-4 md:top-8 md:right-8 text-white/70 hover:text-white z-10 bg-black/20 hover:bg-black/40 rounded-full p-2 transition"
                onClick={() => setSelectedPhoto(null)}
              >
                <X size={24} />
              </button>
              
              {/* PREV BUTTON */}
              <button 
                className="absolute left-4 md:left-8 text-white/70 hover:text-white text-4xl font-light"
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
                  const prevIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
                  setSelectedPhoto(photos[prevIndex])
                }}
              >
                ‹
              </button>
              
              {/* NEXT BUTTON */}
              <button 
                className="absolute right-4 md:right-8 text-white/70 hover:text-white text-4xl font-light"
                onClick={(e) => {
                  e.stopPropagation()
                  const currentIndex = photos.findIndex(p => p.id === selectedPhoto.id)
                  const nextIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
                  setSelectedPhoto(photos[nextIndex])
                }}
              >
                ›
              </button>
              
              {/* MODAL CONTENT */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                {/* IMAGE */}
                <div className="relative h-full flex items-center justify-center">
                  <img 
                    src={selectedPhoto.url}
                    alt={selectedPhoto.caption}
                    className="max-w-full max-h-[80vh] w-auto h-auto object-contain rounded-lg"
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/1200x800/faf7f2/4a3728?text=Pre-wedding+${selectedPhoto.id}`
                    }}
                  />
                </div>
                
                {/* CAPTION & COUNTER */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                  <p className="text-white/90 text-center text-sm md:text-base">
                    {selectedPhoto.caption}
                  </p>
                  <p className="text-white/60 text-center text-xs mt-1">
                    {photos.findIndex(p => p.id === selectedPhoto.id) + 1} / {photos.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default Gallery