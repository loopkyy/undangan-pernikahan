import React, { useRef, useState, useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Gift } from 'lucide-react'
import Navbar from './components/Navbar'
import FallingFlowers from './components/FallingFlowers'
import { weddingData } from './data/weddingData'

// Import pages
import Cover from './pages/Cover'
import Quotes from './pages/Quotes'
import Couple from './pages/Couple'
import Event from './pages/Event'
import LoveStory from './pages/LoveStory'
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
  const [hasInteracted, setHasInteracted] = useState(false)

  useEffect(() => {
    if (audioRef.current && !hasInteracted) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setHasInteracted(true)
        })
        .catch(e => console.log("Autoplay blocked"))
    }
  }, [])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
      } else {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true)
            setHasInteracted(true)
          })
          .catch(e => console.log("Play error:", e))
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#faf7f2] font-serif relative">
      {/* BUNGA GUGUR - DI ATAS BACKGROUND */}
      <FallingFlowers />
      
      {/* AUDIO */}
      <audio ref={audioRef} src={weddingData.music} loop preload="auto" />
      
      {/* NAVBAR - Z-INDEX TINGGI */}
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
      
     {/* TOMBOL MUSIK - Responsive */}
<button
  onClick={togglePlay}
  className={`fixed z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110
    ${isPlaying 
      ? 'bg-[#c9a87c] text-white' 
      : 'bg-white text-[#c9a87c] border border-[#c9a87c]'
    }
    /* Mobile: di atas navbar bottom */
    bottom-24 right-4
    /* Desktop: tetap di pojok */
    md:bottom-6 md:right-6
  `}
>
  {isPlaying ? '🔊' : '🔈'}
</button>
      {/* ROUTES - KONTEN UTAMA */}
      <div className="relative z-20 bg-transparent">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Cover />} />
            <Route path="/quotes" element={<Quotes />} />
            <Route path="/couple" element={<Couple />} />
            <Route path="/event" element={<Event />} />
            <Route path="/lovestory" element={<LoveStory />} />
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