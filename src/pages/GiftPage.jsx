import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Copy, CheckCircle, CreditCard, ZoomIn, Download, X } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const GiftPage = () => {  
  const [copied, setCopied] = useState(null)
  const [showModal, setShowModal] = useState(false)

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleDownloadQR = () => {
    const link = document.createElement('a')
    link.href = weddingData.qris.image
    link.download = `qris-${weddingData.qris.nama.replace(/\s/g, '-')}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // Prevent scroll ketika modal terbuka
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showModal])

  const bankAccounts = [
    {
      bank: 'BRI',
      nama: 'Gagan Maulana R',
      nomor: '1234-01-123456-78-9',
    },
    {
      bank: 'BCA',
      nama: 'Vica Nur',
      nomor: '1234567890',
    }
  ]

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen py-20 px-4 md:py-24 md:px-6 bg-gradient-to-b from-pink-50 to-white"
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="mb-4 md:mb-5 text-[#c9a87c]">
              <Gift size={36} strokeWidth={1} className="mx-auto md:w-[42px] md:h-[42px]" />
            </div>
            <h1 className="text-3xl md:text-5xl text-[#4a3728] mb-3 md:mb-4 font-light">
              Kirim Hadiah
            </h1>
            <div className="w-16 h-px bg-[#c9a87c] mx-auto mb-4 md:mb-6"></div>
            <p className="text-[#8b7a6a] max-w-2xl mx-auto text-xs md:text-sm px-4 leading-relaxed">
              Tanpa mengurangi rasa hormat, bagi keluarga dan sahabat yang ingin 
              memberikan tanda kasih dapat melalui rekening berikut:
            </p>
          </div>

          {/* Grid Bank - Responsive */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 mb-12 md:mb-16 px-4 md:px-0">
            {bankAccounts.map((account, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white/40 backdrop-blur-md p-6 md:p-8 rounded-2xl md:rounded-3xl border border-white/30 shadow-xl overflow-hidden"
              >
                <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#c9a87c]/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-4 md:mb-6">
                    <span className="text-xl md:text-2xl font-light text-[#4a3728] tracking-wider">
                      {account.bank}
                    </span>
                    <CreditCard size={20} className="text-[#c9a87c] md:w-6 md:h-6" />
                  </div>

                  <p className="text-xs md:text-sm text-[#8b7a6a] mb-1">
                    a.n {account.nama}
                  </p>

                  <p className="text-sm md:text-lg font-mono tracking-wider text-[#4a3728] mb-4 md:mb-6 break-all">
                    {account.nomor}
                  </p>

                  <button
                    onClick={() => handleCopy(account.nomor, account.bank)}
                    className="flex items-center justify-center gap-2 text-xs md:text-sm bg-[#c9a87c] text-white hover:bg-[#b89364] rounded-xl md:rounded-2xl px-3 py-2 md:px-4 md:py-2 transition w-full shadow-md"
                  >
                    {copied === account.bank ? (
                      <>
                        <CheckCircle size={16} />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Salin Nomor</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* QRIS - Responsive */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white/40 backdrop-blur-md p-6 md:p-10 rounded-2xl md:rounded-3xl border border-white/30 text-center shadow-xl overflow-hidden mx-4 md:mx-0"
          >
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#c9a87c]/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl text-[#4a3728] mb-4 md:mb-6 font-light">
                QRIS
              </h3>

              {/* QR Code - Responsive */}
              <motion.div 
                className="relative cursor-pointer group inline-block"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
              >
                <div className="w-40 h-40 md:w-52 md:h-52 mx-auto mb-4 md:mb-6 relative">
                  <img 
                    src={weddingData.qris.image} 
                    alt="QRIS"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain rounded-xl md:rounded-2xl shadow-lg"
                  />
                  
                  {/* Overlay hover - lebih ringan untuk mobile */}
                  <div className="absolute inset-0 bg-black/0 group-active:bg-black/10 md:group-hover:bg-black/20 rounded-xl md:rounded-2xl transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 md:group-hover:opacity-100 transition-all duration-300" size={24} />
                  </div>
                </div>
                
                <p className="text-[#c9a87c] text-xs mt-1 md:mt-2 opacity-70 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
                  Tap untuk zoom
                </p>
              </motion.div>

              <p className="text-[#8b7a6a] text-xs md:text-sm mt-3 md:mt-4">
                a.n {weddingData.qris.nama}
              </p>

              <p className="text-[#8b7a6a] text-xs mt-1 px-4">
                {weddingData.qris.keterangan}
              </p>

              {/* Tombol Download */}
              <button
                onClick={handleDownloadQR}
                className="mt-5 md:mt-6 flex items-center justify-center gap-2 text-xs md:text-sm bg-white/50 hover:bg-white/70 text-[#4a3728] rounded-xl md:rounded-2xl px-4 py-2 md:px-6 md:py-2 transition mx-auto border border-[#c9a87c]/30"
              >
                <Download size={16} />
                <span>Unduh QR Code</span>
              </button>
            </div>
          </motion.div>

          {/* Note */}
          <p className="text-center text-[11px] md:text-xs text-[#8b7a6a] mt-8 md:mt-10 px-6 leading-relaxed">
            Terima kasih atas doa dan hadiah yang diberikan. 
            Semoga menjadi berkah dan dicatat sebagai amal ibadah.
          </p>

        </div>
      </motion.div>

      {/* MODAL QRIS - FULLY RESPONSIVE FIX */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-3 md:p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[95%] md:max-w-2xl bg-white rounded-2xl md:rounded-3xl p-5 md:p-8 shadow-2xl mx-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol Close - Posisi lebih aman di mobile */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-2 -right-2 md:-top-3 md:-right-3 bg-white rounded-full p-1.5 md:p-2 shadow-lg hover:bg-gray-100 transition z-10"
              >
                <X size={18} className="text-[#4a3728] md:w-6 md:h-6" />
              </button>

              <div className="text-center">
                <h3 className="text-xl md:text-2xl text-[#4a3728] mb-3 md:mb-4 font-light">
                  QRIS
                </h3>
                
                {/* QR Code - Responsif dengan aspect ratio */}
                <div className="relative w-full max-w-[280px] md:max-w-[320px] mx-auto mb-4 md:mb-6">
                  <div className="aspect-square w-full">
                    <img 
                      src={weddingData.qris.image} 
                      alt="QRIS"
                      className="w-full h-full object-contain rounded-xl md:rounded-2xl shadow-xl"
                    />
                  </div>
                </div>

                <p className="text-[#8b7a6a] text-xs md:text-sm">
                  a.n {weddingData.qris.nama}
                </p>
                <p className="text-[#8b7a6a] text-[10px] md:text-xs mt-1 px-2">
                  {weddingData.qris.keterangan}
                </p>

                {/* Tombol Actions - Responsive */}
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-3 justify-center mt-5 md:mt-6">
                  <button
                    onClick={handleDownloadQR}
                    className="flex items-center justify-center gap-2 bg-[#c9a87c] text-white px-4 py-2 md:px-6 md:py-2 rounded-xl md:rounded-2xl text-sm hover:bg-[#b89364] transition w-full sm:w-auto"
                  >
                    <Download size={16} />
                    <span>Unduh QR</span>
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center justify-center gap-2 bg-gray-200 text-[#4a3728] px-4 py-2 md:px-6 md:py-2 rounded-xl md:rounded-2xl text-sm hover:bg-gray-300 transition w-full sm:w-auto"
                  >
                    <X size={16} />
                    <span>Tutup</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GiftPage