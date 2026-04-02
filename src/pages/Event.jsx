// src/pages/Event.jsx
import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, MapPin } from 'lucide-react'
import { weddingData } from '../data/weddingData'
import CountdownSection from '../components/CountdownSection.jsx'

const Event = () => {
  const { akad, resepsi } = weddingData.event

  // Fungsi untuk parse tanggal dengan benar
  const parseWeddingDate = (tanggal, waktu) => {
    if (!tanggal || !waktu) return null
    
    // Ambil jam mulai dari format "09:00 - 10:00"
    const startTime = waktu.split(' - ')[0]
    // Gabungkan tanggal dan jam
    const dateTimeString = `${tanggal}T${startTime}:00`
    const date = new Date(dateTimeString)
    
    // Cek apakah tanggal valid
    return isNaN(date.getTime()) ? null : date
  }

  // Parse tanggal untuk countdown (pakai akad)
  const akadDate = parseWeddingDate(akad.tanggal, akad.waktu)

  // Format tanggal untuk display (ubah YYYY-MM-DD ke format lebih rapi)
  const formatTanggal = (tanggal) => {
    if (!tanggal) return ''
    const parts = tanggal.split('-')
    if (parts.length === 3) {
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
    return tanggal
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen py-24 px-6"
    >
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="mb-4 text-[#c9a87c]">
            <Calendar size={32} strokeWidth={1} className="mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#4a3728] mb-3 font-light tracking-wide">
            Acara
          </h2>
          <div className="w-16 h-px bg-[#c9a87c] mx-auto"></div>
        </div>

        {/* COUNTDOWN SECTION - Hanya tampil jika tanggal valid */}
        {akadDate && akadDate.toString() !== 'Invalid Date' && (
          <CountdownSection 
            weddingDate={akadDate} 
            eventName="Akad Nikah Gagan & Vica" 
          />
        )}

        {/* AKAD dan RESEPSI dalam 1 baris/grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* AKAD */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="relative bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-xl overflow-hidden"
          >
            <div className="absolute -top-16 -left-16 w-40 h-40 bg-[#c9a87c]/20 rounded-full blur-3xl"></div>
            
            <div className="text-center relative z-10">
              <span className="inline-block text-[#c9a87c] text-xs tracking-[0.3em] mb-4">
                AKAD NIKAH
              </span>

              <h3 className="text-xl text-[#4a3728] mb-3 font-light">
                {akad.hari}, {formatTanggal(akad.tanggal)}
              </h3>

              <div className="flex items-center justify-center gap-2 text-[#8b7a6a] mb-2">
                <Clock size={15} strokeWidth={1} />
                <span className="text-sm">{akad.waktu}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#8b7a6a]">
                <MapPin size={15} strokeWidth={1} />
                <span className="text-sm">{akad.tempat}</span>
              </div>

              <p className="text-[#8b7a6a] text-xs mt-2 line-clamp-2">
                {akad.alamat}
              </p>
            </div>
          </motion.div>

          {/* RESEPSI */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="relative bg-white/40 backdrop-blur-md p-8 rounded-3xl border border-white/30 shadow-xl overflow-hidden"
          >
            <div className="absolute -bottom-16 -right-16 w-40 h-40 bg-[#c9a87c]/20 rounded-full blur-3xl"></div>
            
            <div className="text-center relative z-10">
              <span className="inline-block text-[#c9a87c] text-xs tracking-[0.3em] mb-4">
                RESEPSI
              </span>

              <h3 className="text-xl text-[#4a3728] mb-3 font-light">
                {resepsi.hari}, {formatTanggal(resepsi.tanggal)}
              </h3>

              <div className="flex items-center justify-center gap-2 text-[#8b7a6a] mb-2">
                <Clock size={15} strokeWidth={1} />
                <span className="text-sm">{resepsi.waktu}</span>
              </div>

              <div className="flex items-center justify-center gap-2 text-[#8b7a6a]">
                <MapPin size={15} strokeWidth={1} />
                <span className="text-sm">{resepsi.tempat}</span>
              </div>

              <p className="text-[#8b7a6a] text-xs mt-2 line-clamp-2">
                {resepsi.alamat}
              </p>
            </div>
          </motion.div>
        </div>

        {/* Footer Note */}
        <p className="text-center text-xs text-[#c9a87c] italic mt-10 leading-relaxed">
          Dengan memohon rahmat dan ridho Allah SWT, <br />
          Merupakan suatu kehormatan dan kebahagiaan bagi kami <br />
          atas kehadiran Bapak/Ibu/Saudara/i sekalian
        </p>

      </div>
    </motion.div>
  )
}

export default Event