import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Gift, Copy, CheckCircle, CreditCard } from 'lucide-react'

const GiftPage = () => {  
  const [copied, setCopied] = useState(null)

  const handleCopy = (text, type) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const bankAccounts = [
    {
      bank: 'BANK MANDIRI',
      nama: 'Gagan Maulana Rismandana',
      nomorTampilan: '1080 0310 95764',
      nomorAsli: '1080031095764',
    },
    {
      bank: 'BNI',
      nama: 'Vica Nurrohmayanti',
      nomorTampilan: '1932 3723 82',
      nomorAsli: '1932372382',
    }
  ]

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-20 px-4 md:py-24 md:px-6 bg-gradient-to-b from-pink-50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="mb-4 md:mb-5 text-[#c9a87c]">
            <Gift size={36} strokeWidth={1} className="mx-auto" />
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
                  <CreditCard size={20} className="text-[#c9a87c]" />
                </div>
                
                <p className="text-xs md:text-sm text-[#8b7a6a] mb-3">
                  a.n {account.nama}
                </p>

                <div className="mb-5 md:mb-6 py-3 bg-[#c9a87c]/5 rounded-xl">
                  <p className="text-base md:text-lg font-mono font-bold text-[#4a3728] tracking-wider text-center select-all">
                    {account.nomorTampilan}
                  </p>
                </div>

                <button
                  onClick={() => handleCopy(account.nomorAsli, account.bank)}
                  className="flex items-center justify-center gap-2 text-xs md:text-sm bg-[#c9a87c] text-white hover:bg-[#b89364] rounded-xl md:rounded-2xl px-3 py-2 transition w-full shadow-md"
                >
                  {copied === account.bank ? (
                    <>
                      <CheckCircle size={16} />
                      <span>Tersalin!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={16} />
                      <span>Salin Rekening</span>
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-[11px] md:text-xs text-[#8b7a6a] mt-8 md:mt-10 px-6 leading-relaxed">
          Terima kasih atas doa dan hadiah yang diberikan. 
          Semoga menjadi berkah dan dicatat sebagai amal ibadah.
        </p>
      </div>
    </motion.div>
  )
}

export default GiftPage