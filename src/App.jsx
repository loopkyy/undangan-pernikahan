import React, { useRef, useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Gift, Music, Volume2, VolumeX } from 'lucide-react'
import Navbar from './components/Navbar'
import FallingFlowers from './components/FallingFlowers'
import { weddingData } from './data/weddingData'

// Import pages
import Cover from './pages/Cover'
import Quotes from './pages/Quotes'
import Couple from './pages/Couple'
import Event from './pages/Event'
import Gallery from './pages/Gallery'
import Wishes from './pages/Wishes'
import Map from './pages/Map'
import ThankYou from './pages/ThankYou'
import GiftPage from './pages/GiftPage'

function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const hintTimeoutRef = useRef(null)

  // Fungsi untuk memulai musik
  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          // Sembunyikan hint saat musik mulai
          setShowHint(false)
          if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
        })
        .catch(e => console.log("Play error:", e))
    }
  }

  // Fungsi toggle play/pause
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        // Tampilkan hint setelah pause
        showHintTemporary()
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setShowHint(false)
            if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
          })
          .catch(e => console.log("Play error:", e))
      }
    }
  }

  // Fungsi untuk menampilkan hint sementara (5 detik)
  const showHintTemporary = () => {
    // Hapus timeout sebelumnya jika ada
    if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
    
    setShowHint(true)
    
    // Hint hilang setelah 5 detik
    hintTimeoutRef.current = setTimeout(() => {
      setShowHint(false)
    }, 5000)
  }

  // Cek status audio setiap detik (untuk memastikan sinkron)
  useEffect(() => {
    const checkAudioStatus = () => {
      if (audioRef.current) {
        const isAudioPlaying = !audioRef.current.paused && audioRef.current.currentTime > 0
        
        // Sinkronkan state dengan status audio sebenarnya
        if (isAudioPlaying !== isPlaying) {
          setIsPlaying(isAudioPlaying)
        }
        
        // Jika audio sedang bermain, sembunyikan hint
        if (isAudioPlaying && showHint) {
          setShowHint(false)
          if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
        }
        
        // Jika audio tidak bermain dan hint belum muncul, tampilkan hint (tapi jangan terlalu sering)
        if (!isAudioPlaying && !showHint && !audioRef.current.paused === false) {
          // Cek apakah audio benar-benar berhenti (bukan karena belum mulai)
          if (audioRef.current.currentTime > 0 || audioRef.current.paused) {
            showHintTemporary()
          }
        }
      }
    }
    
    // Cek setiap 2 detik
    const interval = setInterval(checkAudioStatus, 2000)
    
    return () => clearInterval(interval)
  }, [isPlaying, showHint])

  // Tampilkan hint pertama kali (setelah 1 detik)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      if (audioRef.current && audioRef.current.paused && !isPlaying) {
        showHintTemporary()
      }
    }, 1000)
    
    return () => clearTimeout(initialTimer)
  }, [])

  // Bersihkan timeout saat unmount
  useEffect(() => {
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#faf7f2] font-serif relative">
      {/* BUNGA GUGUR */}
      <FallingFlowers />
      
      {/* AUDIO - TIDAK AUTOPLAY */}
      <audio ref={audioRef} src={weddingData.music} loop preload="auto" />
      
      {/* NAVBAR */}
      <div className="relative z-30">
        <Navbar />
      </div>
      
      {/* TOMBOL HADIAH */}
      <div className="fixed bottom-24 left-6 z-50">
        <button
          onClick={() => navigate('/gift')}
          className="bg-[#c9a87c] text-white p-3 rounded-full shadow-lg hover:bg-[#b89364] transition flex items-center space-x-2 group"
        >
          <Gift size={20} />
          <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 whitespace-nowrap">
            Kirim Hadiah
          </span>
        </button>
      </div>
      
      {/* TOMBOL MUSIK FLOATING */}
      <div className="relative">
        {/* HINT - Muncul hanya saat musik benar-benar mati */}
        {showHint && !isPlaying && (
          <div className="fixed bottom-32 right-4 md:bottom-20 md:right-20 z-40 animate-bounce">
            <div className="bg-[#c9a87c] text-white text-xs px-3 py-2 rounded-full whitespace-nowrap shadow-lg">
              🎵 Tekan untuk nyalakan musik
            </div>
            <div className="absolute -bottom-1 right-4 w-2 h-2 bg-[#c9a87c] rotate-45"></div>
          </div>
        )}
        
        <button
          onClick={togglePlay}
          className={`fixed z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110
            ${isPlaying
              ? 'bg-[#c9a87c] text-white' 
              : 'bg-[#c9a87c] text-white animate-pulse'
            }
            bottom-24 right-4
            md:bottom-6 md:right-6
          `}
        >
          {isPlaying ? <Volume2 size={20} /> : <Music size={20} />}
        </button>
      </div>
      
      {/* ROUTES */}
      <div className="relative z-20 bg-transparent">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Cover />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/couple" element={<Couple />} />
            <Route path="/event" element={<Event />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/wishes" element={<Wishes />} />
            <Route path="/map" element={<Map />} />
            <Route path="/thankyou" element={<ThankYou />} />
            <Route path="/gift" element={<GiftPage />} />
          </Routes>
        </AnimatePresence>
      </div>
    </div>
  )
}

export default App