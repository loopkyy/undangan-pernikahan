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

  const openModal = (photo, index) => {
    setSelectedPhoto(photo)
    setCurrentIndex(index)
    // Lock scroll
    document.body.style.overflow = 'hidden'
  }

  const closeModal = () => {
    setSelectedPhoto(null)
    // Unlock scroll
    document.body.style.overflow = 'unset'
  }

  const prevPhoto = (e) => {
    if (e) e.stopPropagation()
    const newIndex = currentIndex > 0 ? currentIndex - 1 : photos.length - 1
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  const nextPhoto = (e) => {
    if (e) e.stopPropagation()
    const newIndex = currentIndex < photos.length - 1 ? currentIndex + 1 : 0
    setCurrentIndex(newIndex)
    setSelectedPhoto(photos[newIndex])
  }

  // Keyboard navigation (Desktop)
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

          {/* GALLERY GRID */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 md:gap-6">
            {photos.map((photo, index) => (
              <div
                key={photo.id}
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
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-xs md:text-sm font-light">{photo.caption}</p>
                  </div>

                  <div className="absolute top-3 right-3 bg-white/90 p-1.5 md:p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera size={14} className="text-[#4a3728] md:w-4 md:h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-[#8b7a6a] text-sm">
              ✨ Klik foto untuk melihat lebih besar ✨
            </p>
          </div>
        </div>
      </motion.div>

      {/* MODAL SEDERHANA - RINGAN UNTUK MOBILE */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          onClick={closeModal}
          style={{ touchAction: 'manipulation' }}
        >
          {/* Tombol Close - Diperbesar untuk mobile */}
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-3 z-[10000] active:bg-black/70"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <X size={22} />
          </button>

          {/* Tombol Prev - Diperbesar untuk mobile */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 text-white/70 bg-black/30 rounded-full p-3 z-[10000] active:bg-black/50"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronLeft size={28} />
          </button>

          {/* Tombol Next - Diperbesar untuk mobile */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 text-white/70 bg-black/30 rounded-full p-3 z-[10000] active:bg-black/50"
            style={{ minWidth: '44px', minHeight: '44px' }}
          >
            <ChevronRight size={28} />
          </button>

          {/* Gambar Modal */}
          <div 
            className="relative max-w-[90%] md:max-w-4xl max-h-[85vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedPhoto.url}
              alt={selectedPhoto.caption}
              className="max-w-full max-h-[75vh] md:max-h-[85vh] w-auto h-auto object-contain rounded-lg"
              style={{ touchAction: 'pan-x pan-y' }}
            />
            
            {/* Caption & Counter - Lebih kecil di mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent rounded-b-lg">
              <p className="text-white/90 text-center text-xs md:text-sm">
                {selectedPhoto.caption}
              </p>
              <p className="text-white/60 text-center text-[10px] md:text-xs mt-1">
                {currentIndex + 1} / {photos.length}
              </p>
            </div>
          </div>

          {/* Indikator dots - lebih kecil di mobile */}
          <div className="absolute bottom-16 left-0 right-0 flex justify-center gap-1.5 z-[10000]">
            {photos.map((_, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation()
                  setCurrentIndex(idx)
                  setSelectedPhoto(photos[idx])
                }}
                className={`transition-all duration-200 rounded-full ${
                  idx === currentIndex 
                    ? 'bg-white w-3 h-3' 
                    : 'bg-white/40 w-1.5 h-1.5'
                }`}
                style={{ minWidth: idx === currentIndex ? '12px' : '6px' }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Gallery