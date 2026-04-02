// src/pages/LoveStory.jsx - Tambahkan state untuk expand
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, ChevronLeft, ChevronRight, BookOpen, Calendar, ChevronDown, ChevronUp } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const LoveStory = () => {
  const stories = weddingData.loveStory
  const [currentPage, setCurrentPage] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [expanded, setExpanded] = useState(false) // State untuk expand cerita

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const nextPage = () => {
    if (currentPage < stories.length - 1) {
      setCurrentPage(currentPage + 1)
      setExpanded(false) // Reset expand saat ganti halaman
    }
  }

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setExpanded(false)
    }
  }

  // Fungsi untuk memotong teks
  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const currentStory = stories[currentPage]
  const shouldTruncate = isMobile && currentStory.cerita.length > 150 && !expanded

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="page-container min-h-screen flex items-center justify-center relative"
    >
      <div className="max-w-4xl w-full">

        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="mb-3 md:mb-4 text-[#c9a87c]">
            <BookOpen size={28} strokeWidth={1} className="mx-auto md:w-9 md:h-9" />
          </div>
          <h2 className="text-2xl md:text-3xl lg:text-4xl text-[#4a3728] mb-2 md:mb-3 font-light">
            Love Story
          </h2>
          <div className="w-12 md:w-16 h-px bg-[#c9a87c] mx-auto"></div>
          <p className="text-[#8b7a6a] text-xs md:text-sm mt-3 md:mt-4">
            Lembaran kisah cinta kami
          </p>
        </div>

        {/* Buku Container */}
        <div className="relative perspective-1000">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ 
                rotateY: isMobile ? 0 : -90,
                opacity: 0,
                transformOrigin: 'left center'
              }}
              animate={{ 
                rotateY: 0,
                opacity: 1,
                transformOrigin: 'left center'
              }}
              exit={{ 
                rotateY: isMobile ? 0 : 90,
                opacity: 0,
                transformOrigin: 'right center'
              }}
              transition={{ 
                duration: isMobile ? 0.3 : 0.6,
                type: "spring",
                stiffness: 100
              }}
              className="relative bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-white/50"
            >
              {!isMobile && (
                <>
                  <div className="absolute left-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-r from-[#c9a87c]/10 to-transparent pointer-events-none"></div>
                  <div className="absolute right-0 top-0 bottom-0 w-8 md:w-12 bg-gradient-to-l from-[#c9a87c]/10 to-transparent pointer-events-none"></div>
                  <div className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-px h-3/4 bg-[#c9a87c]/20"></div>
                  <div className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-px h-3/4 bg-[#c9a87c]/20"></div>
                </>
              )}
              
              <div className="p-6 md:p-8 lg:p-12">
                <div className="flex justify-between items-center mb-4 md:mb-8 text-xs text-[#c9a87c]">
                  <span>✦ {String(currentPage + 1).padStart(2, '0')} ✦</span>
                  <span>✦ {String(stories.length).padStart(2, '0')} ✦</span>
                </div>

                <div className="text-center relative z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#c9a87c]/10 mb-4 md:mb-6"
                  >
                    <Calendar size={24} className="text-[#c9a87c] md:w-8 md:h-8" />
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="text-[#c9a87c] text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] uppercase font-medium">
                      {currentStory.tahun}
                    </span>

                    <h3 className="text-xl md:text-2xl lg:text-3xl text-[#4a3728] mt-3 md:mt-4 mb-4 md:mb-6 font-light px-2">
                      {currentStory.judul}
                    </h3>

                    <div className="flex justify-center gap-1 md:gap-2 my-4 md:my-6">
                      <Heart size={12} className="text-[#c9a87c] fill-[#c9a87c]" />
                      <Heart size={12} className="text-[#c9a87c] fill-[#c9a87c]" />
                      <Heart size={12} className="text-[#c9a87c] fill-[#c9a87c]" />
                    </div>

                    {/* Cerita*/}
                    <div className="text-[#8b7a6a] text-sm md:text-base leading-relaxed max-w-lg mx-auto px-2">
                      <p>
                        {shouldTruncate ? truncateText(currentStory.cerita, 150) : currentStory.cerita}
                      </p>
                      
                      {/* Tombol Baca Selengkapnya */}
                      {currentStory.cerita.length > 150 && isMobile && (
                        <button
                          onClick={() => setExpanded(!expanded)}
                          className="mt-3 text-[#c9a87c] text-xs flex items-center justify-center gap-1 mx-auto hover:text-[#b89364] transition"
                        >
                          {expanded ? (
                            <>
                              <ChevronUp size={14} />
                              <span>Sembunyikan</span>
                            </>
                          ) : (
                            <>
                              <ChevronDown size={14} />
                              <span>Baca Selengkapnya</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "60px" }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="h-px bg-[#c9a87c] mx-auto mt-6 md:mt-8"
                  ></motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Tombol Navigasi */}
          <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4 mt-6 md:mt-8">
            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05, x: isMobile ? 0 : -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`flex items-center justify-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all text-sm md:text-base ${
                currentPage === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white/80 hover:bg-white text-[#4a3728] shadow-lg hover:shadow-xl'
              }`}
            >
              <ChevronLeft size={16} />
              <span className="hidden xs:inline">Cerita Sebelumnya</span>
              <span className="xs:hidden">Sebelum</span>
            </motion.button>

            <div className="flex items-center justify-center gap-1 md:gap-2 order-first sm:order-none mb-3 sm:mb-0">
              {stories.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentPage(idx)
                    setExpanded(false)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    currentPage === idx
                      ? 'w-6 md:w-8 h-1.5 md:h-2 bg-[#c9a87c]'
                      : 'w-1.5 md:w-2 h-1.5 md:h-2 bg-[#c9a87c]/30 hover:bg-[#c9a87c]/60'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: isMobile ? 1 : 1.05, x: isMobile ? 0 : 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={nextPage}
              disabled={currentPage === stories.length - 1}
              className={`flex items-center justify-center gap-1 md:gap-2 px-4 md:px-6 py-2 md:py-3 rounded-full transition-all text-sm md:text-base ${
                currentPage === stories.length - 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-white/80 hover:bg-white text-[#4a3728] shadow-lg hover:shadow-xl'
              }`}
            >
              <span className="hidden xs:inline">Cerita Selanjutnya</span>
              <span className="xs:hidden">Selanjutnya</span>
              <ChevronRight size={16} />
            </motion.button>
          </div>

          <div className="mt-4 md:mt-6">
            <div className="h-0.5 md:h-1 bg-white/30 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[#c9a87c] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((currentPage + 1) / stories.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-center text-[10px] md:text-xs text-[#8b7a6a] mt-2">
              {currentPage + 1} dari {stories.length} kisah cinta
            </p>
          </div>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center text-[10px] md:text-xs text-[#c9a87c] italic mt-8 md:mt-10 px-4"
        >
          "Setiap lembar kisah adalah langkah menuju kebahagiaan bersama"
        </motion.p>

      </div>
    </motion.div>
  )
}

export default LoveStory