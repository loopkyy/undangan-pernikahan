import React, { useState } from 'react'
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
        className="min-h-screen py-24 px-6"
      >
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="mb-5 text-[#c9a87c]">
              <Gift size={42} strokeWidth={1} className="mx-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl text-[#4a3728] mb-4 font-light">
              Kirim Hadiah
            </h1>
            <div className="w-16 h-px bg-[#c9a87c] mx-auto mb-6"></div>
            <p className="text-[#8b7a6a] max-w-2xl mx-auto text-sm leading-relaxed">
              Tanpa mengurangi rasa hormat, bagi keluarga dan sahabat yang ingin 
              memberikan tanda kasih dapat melalui rekening berikut:
            </p>
          </div>

          {/* Grid Bank */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {bankAccounts.map((account, index) => (
              <motion.div
                key={index}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="relative bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-xl overflow-hidden"
              >
                <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#c9a87c]/20 rounded-full blur-3xl"></div>

                <div className="relative z-10">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-2xl font-light text-[#4a3728] tracking-wider">
                      {account.bank}
                    </span>
                    <CreditCard size={24} className="text-[#c9a87c]" />
                  </div>

                  <p className="text-sm text-[#8b7a6a] mb-1">
                    a.n {account.nama}
                  </p>

                  <p className="text-lg font-mono tracking-wider text-[#4a3728] mb-6">
                    {account.nomor}
                  </p>

                  <button
                    onClick={() => handleCopy(account.nomor, account.bank)}
                    className="flex items-center justify-center gap-2 text-sm bg-[#c9a87c] text-white hover:bg-[#b89364] rounded-2xl px-4 py-2 transition w-full shadow-md"
                  >
                    {copied === account.bank ? (
                      <>
                        <CheckCircle size={18} />
                        <span>Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={18} />
                        <span>Salin Nomor</span>
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* QRIS - Bisa diklik dan diunduh */}
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="relative bg-white/40 backdrop-blur-md p-10 rounded-3xl border border-white/30 text-center shadow-xl overflow-hidden"
          >
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#c9a87c]/20 rounded-full blur-3xl"></div>

            <div className="relative z-10">
              <h3 className="text-2xl text-[#4a3728] mb-6 font-light">
                QRIS
              </h3>

              {/* QR Code dengan efek hover dan klik */}
              <motion.div 
                className="relative cursor-pointer group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setShowModal(true)}
              >
                <div className="w-52 h-52 mx-auto mb-6 relative">
                  <img 
                    src={weddingData.qris.image} 
                    alt="QRIS"
                    className="w-full h-full object-contain rounded-2xl shadow-lg"
                  />
                  
                  {/* Overlay efek saat hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-2xl transition-all duration-300 flex items-center justify-center">
                    <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-all duration-300" size={32} />
                  </div>
                </div>
                
                <p className="text-[#c9a87c] text-xs mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  Klik untuk memperbesar
                </p>
              </motion.div>

              <p className="text-[#8b7a6a] text-sm mt-4">
                a.n {weddingData.qris.nama}
              </p>

              <p className="text-[#8b7a6a] text-xs mt-1">
                {weddingData.qris.keterangan}
              </p>

              {/* Tombol Download */}
              <button
                onClick={handleDownloadQR}
                className="mt-6 flex items-center justify-center gap-2 text-sm bg-white/50 hover:bg-white/70 text-[#4a3728] rounded-2xl px-6 py-2 transition mx-auto border border-[#c9a87c]/30"
              >
                <Download size={18} />
                <span>Unduh QR Code</span>
              </button>
            </div>
          </motion.div>

          {/* Note */}
          <p className="text-center text-xs text-[#8b7a6a] mt-10 leading-relaxed">
            Terima kasih atas doa dan hadiah yang diberikan. 
            Semoga menjadi berkah dan dicatat sebagai amal ibadah.
          </p>

        </div>
      </motion.div>

      {/* Modal untuk QR Code diperbesar */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-2xl w-full bg-white rounded-3xl p-8 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Tombol Close */}
              <button
                onClick={() => setShowModal(false)}
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition"
              >
                <X size={24} className="text-[#4a3728]" />
              </button>

              <div className="text-center">
                <h3 className="text-2xl text-[#4a3728] mb-4 font-light">
                  QRIS
                </h3>
                
                {/* QR Code besar */}
                <div className="w-80 h-80 mx-auto mb-6">
                  <img 
                    src={weddingData.qris.image} 
                    alt="QRIS"
                    className="w-full h-full object-contain rounded-2xl shadow-xl"
                  />
                </div>

                <p className="text-[#8b7a6a] text-sm">
                  a.n {weddingData.qris.nama}
                </p>
                <p className="text-[#8b7a6a] text-xs mt-1">
                  {weddingData.qris.keterangan}
                </p>

                {/* Tombol Download di modal */}
                <div className="flex gap-3 justify-center mt-6">
                  <button
                    onClick={handleDownloadQR}
                    className="flex items-center gap-2 bg-[#c9a87c] text-white px-6 py-2 rounded-2xl hover:bg-[#b89364] transition"
                  >
                    <Download size={18} />
                    <span>Unduh QR Code</span>
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="flex items-center gap-2 bg-gray-200 text-[#4a3728] px-6 py-2 rounded-2xl hover:bg-gray-300 transition"
                  >
                    <X size={18} />
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