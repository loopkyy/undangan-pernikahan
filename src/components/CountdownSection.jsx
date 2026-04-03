import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Clock, ChevronRight, Bell, CheckCircle } from 'lucide-react'

const CountdownSection = ({ weddingDate, eventName }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })
  const [showCalendarOptions, setShowCalendarOptions] = useState(false)
  const [isEventOver, setIsEventOver] = useState(false)
  const [isValidDate, setIsValidDate] = useState(true)

  useEffect(() => {
    // Validasi tanggal
    if (!weddingDate || isNaN(weddingDate.getTime())) {
      setIsValidDate(false)
      return
    }
    setIsValidDate(true)

    const timer = setInterval(() => {
      const now = new Date().getTime()
      const distance = weddingDate.getTime() - now

      if (distance < 0) {
        setIsEventOver(true)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        clearInterval(timer)
        return
      }

      setIsEventOver(false)
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [weddingDate])

  if (!isValidDate) {
    return (
      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-xl mb-10">
        <p className="text-center text-red-500">Tanggal tidak valid</p>
      </div>
    )
  }

  const formatDateForCalendar = () => {
    const year = weddingDate.getFullYear()
    const month = String(weddingDate.getMonth() + 1).padStart(2, '0')
    const day = String(weddingDate.getDate()).padStart(2, '0')
    const hours = String(weddingDate.getHours()).padStart(2, '0')
    const minutes = String(weddingDate.getMinutes()).padStart(2, '0')
    
    return `${year}${month}${day}T${hours}${minutes}00`
  }

  const addToGoogleCalendar = () => {
    const startDate = formatDateForCalendar()
    const endDate = new Date(weddingDate.getTime() + 4 * 60 * 60 * 1000)
    const endYear = endDate.getFullYear()
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0')
    const endDay = String(endDate.getDate()).padStart(2, '0')
    const endHours = String(endDate.getHours()).padStart(2, '0')
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0')
    
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${startDate}/${endYear}${endMonth}${endDay}T${endHours}${endMinutes}00&details=Acara%20pernikahan%20Gagan%20Maulana%20Rismandana%20%26%20Vica%20Nurrohmayanti&location=Dusun%20Puhun%20RT.004%20RW.003%2C%20Desa%20Haurkuning%2C%20Kecamatan%20Nusaherang%2C%20Kabupaten%20Kuningan&sf=true&output=xml`
    
    window.open(url, '_blank')
    setShowCalendarOptions(false)
  }

  const addToICalendar = () => {
    const startDate = formatDateForCalendar()
    const endDate = new Date(weddingDate.getTime() + 4 * 60 * 60 * 1000)
    const endYear = endDate.getFullYear()
    const endMonth = String(endDate.getMonth() + 1).padStart(2, '0')
    const endDay = String(endDate.getDate()).padStart(2, '0')
    const endHours = String(endDate.getHours()).padStart(2, '0')
    const endMinutes = String(endDate.getMinutes()).padStart(2, '0')
    
    const url = `data:text/calendar;charset=utf8,BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Gagan & Vica Wedding//EN
BEGIN:VEVENT
SUMMARY:${eventName}
DTSTART:${startDate}
DTEND:${endYear}${endMonth}${endDay}T${endHours}${endMinutes}00
LOCATION:Dusun Puhun RT.004 RW.003, Desa Haurkuning, Kecamatan Nusaherang, Kabupaten Kuningan
DESCRIPTION:Acara pernikahan Gagan Maulana Rismandana & Vica Nurrohmayanti
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT1H
ACTION:DISPLAY
DESCRIPTION:Reminder pernikahan Gagan & Vica
END:VALARM
END:VEVENT
END:VCALENDAR`
    
    const encodedUrl = encodeURI(url)
    const link = document.createElement('a')
    link.href = encodedUrl
    link.download = 'wedding_gagan_vica.ics'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    setShowCalendarOptions(false)
  }

  const formatDate = () => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
    return weddingDate.toLocaleDateString('id-ID', options)
  }

  return (
    <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 border border-white/30 shadow-xl mb-10">
      <div className="text-center mb-6">
        <h3 className="text-2xl text-[#4a3728] font-light mb-2">
          {isEventOver ? 'Acara Telah Berlangsung' : 'Menuju Hari Bahagia'}
        </h3>
        <div className="w-16 h-px bg-[#c9a87c] mx-auto"></div>
      </div>

      <div className="text-center mb-8">
        <div className="flex items-center justify-center gap-2 text-[#c9a87c] mb-2">
          <Calendar size={20} />
          <Clock size={20} />
        </div>
        <p className="text-lg text-[#4a3728] font-medium">
          {formatDate()}
        </p>
        <p className="text-sm text-[#8b7a6a]">
          Pukul {weddingDate.getHours().toString().padStart(2, '0')}:{weddingDate.getMinutes().toString().padStart(2, '0')} WIB
          {!isEventOver && ' - Selesai'}
        </p>
      </div>

      {!isEventOver ? (
        <>
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="text-center">
              <div className="bg-white/50 rounded-2xl p-3">
                <span className="text-3xl md:text-4xl font-light text-[#4a3728]">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <p className="text-xs text-[#8b7a6a] mt-1">Hari</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/50 rounded-2xl p-3">
                <span className="text-3xl md:text-4xl font-light text-[#4a3728]">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <p className="text-xs text-[#8b7a6a] mt-1">Jam</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/50 rounded-2xl p-3">
                <span className="text-3xl md:text-4xl font-light text-[#4a3728]">
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <p className="text-xs text-[#8b7a6a] mt-1">Menit</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white/50 rounded-2xl p-3">
                <span className="text-3xl md:text-4xl font-light text-[#4a3728]">
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <p className="text-xs text-[#8b7a6a] mt-1">Detik</p>
              </div>
            </div>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowCalendarOptions(!showCalendarOptions)}
              className="w-full bg-[#c9a87c] text-white py-3 rounded-2xl hover:bg-[#b89364] transition flex items-center justify-center gap-2"
            >
              <Bell size={18} />
              <span>Ingatkan Saya</span>
              <ChevronRight size={18} className={`transition-transform ${showCalendarOptions ? 'rotate-90' : ''}`} />
            </button>

            {showCalendarOptions && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-10"
              >
                <button
                  onClick={addToGoogleCalendar}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center gap-3"
                >
                  <img src="https://www.gstatic.com/calendar/images/googlecalendar_48.png" alt="Google" className="w-6 h-6" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Google Calendar</p>
                    <p className="text-xs text-gray-500">Tambahkan ke Google Calendar</p>
                  </div>
                </button>
                <button
                  onClick={addToICalendar}
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 transition flex items-center gap-3 border-t"
                >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Apple_Calendar_icon_%28macOS%29.png/1200px-Apple_Calendar_icon_%28macOS%29.png" alt="Apple" className="w-6 h-6" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Apple Calendar</p>
                    <p className="text-xs text-gray-500">Unduh file .ics</p>
                  </div>
                </button>
              </motion.div>
            )}
          </div>

          <p className="text-center text-xs text-[#8b7a6a] mt-4">
            Klik tombol di atas untuk menambahkan ke kalender Anda
          </p>
        </>
      ) : (
        <div className="text-center py-6">
          <CheckCircle size={48} className="mx-auto text-green-500 mb-3" />
          <p className="text-[#4a3728] font-medium mb-2">
            Terima kasih atas doa dan kehadirannya!
          </p>
          <p className="text-sm text-[#8b7a6a]">
            Semoga menjadi keluarga yang sakinah, mawaddah, warahmah
          </p>
        </div>
      )}
    </div>
  )
}

export default CountdownSection