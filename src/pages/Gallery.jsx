import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const Gallery = () => {
  const [selectedPhoto, setSelectedPhoto] = useState(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  
  const photos = weddingData.gallery.map((item, index) => ({
    id: index + 1,
    url: item.url,
    caption: item.caption
  }))

  // Fungsi buka modal
  const openModal = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
  }

  // Fungsi tutup modal
  const closeModal = () => {
    setSelectedPhoto(null)
  }

  // Fungsi prev foto
  const prevPhoto = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  // Fungsi next foto
  const nextPhoto = () => {
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!selectedPhoto) return
      
      if (e.key === 'Escape') {
        closeModal()
      } else if (e.key === 'ArrowLeft') {
        prevPhoto()
      } else if (e.key === 'ArrowRight') {
        nextPhoto()
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedPhoto, currentIndex])

  // Prevent scroll saat modal terbuka
  useEffect(() => {
    if (selectedPhoto) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [selectedPhoto])

  return (
    <>
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
           Kebahagiaan yang tertuang dalam setiap bingkai
            </p>
          </div>

          {/* GALLERY GRID - BISA DI KLIK */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
            {photos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="relative group cursor-pointer active:scale-95 transition-all duration-150"
                onClick={() => openModal(photo, index)}
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
              ✨ Klik foto untuk melihat lebih besar ✨
            </p>
          </div>
        </div>
      </motion.div>

      {/* MODAL LIGHTBOX - Bisa diklik, geser, dan tutup */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center"
          onClick={closeModal}
        >
          {/* Tombol Close */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 md:top-8 md:right-8 text-white/80 hover:text-white bg-black/50 hover:bg-black/70 rounded-full p-2 md:p-3 transition-all duration-300 z-[10000]"
          >
            <X size={24} className="md:w-7 md:h-7" />
          </button>

          {/* Tombol Prev */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              prevPhoto()
            }}
            className="absolute left-2 md:left-8 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 md:p-3 transition-all duration-300 z-[10000]"
          >
            <ChevronLeft size={32} className="md:w-10 md:h-10" />
          </button>

          {/* Tombol Next */}
          <button
            onClick={(e) => {
              e.stopPropagation()
              nextPhoto()
            }}
            className="absolute right-2 md:right-8 text-white/70 hover:text-white bg-black/30 hover:bg-black/50 rounded-full p-2 md:p-3 transition-all duration-300 z-[10000]"
          >
            <ChevronRight size={32} className="md:w-10 md:h-10" />
          </button>

          {/* Gambar Modal */}
          <div 
            className="relative max-w-[95%] md:max-w-4xl max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[85vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/1200x800/faf7f2/4a3728?text=Pre-wedding+${selectedPhoto.id}`
              }}
            />
            
            {/* Caption & Counter */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <p className="text-white/90 text-center text-sm md:text-base">
                {selectedPhoto.caption}
              </p>
              <p className="text-white/60 text-center text-xs mt-1">
                {currentIndex + 1} / {photos.length}
              </p>
            </div>
          </div>

          {/* Indikator dots (opsional) */}
          <div className="absolute bottom-20 left-0 right-0 flex justify-center gap-2 z-[10000]">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                  setSelectedPhoto(photos[idx])
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery