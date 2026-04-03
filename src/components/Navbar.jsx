import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { 
  Home, Book, Users, Calendar, Heart, Camera, 
  MessageCircle, MapPin, HeartHandshake, Gift, 
  ChevronLeft, ChevronRight 
} from 'lucide-react'

const Navbar = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const checkScroll = () => {
    const container = scrollContainerRef.current
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0)
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 10
      )
    }
  }

  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (container) {
      const scrollAmount = 200
      container.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const menuItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/quotes', label: 'Ayat', icon: Book },
    { path: '/couple', label: 'Mempelai', icon: Users },
    { path: '/event', label: 'Acara', icon: Calendar },
    { path: '/lovestory', label: 'Cerita', icon: Heart },
    { path: '/gallery', label: 'Galeri', icon: Camera },
    { path: '/wishes', label: 'Ucapan', icon: MessageCircle },
    { path: '/gift', label: 'Hadiah', icon: Gift },
    { path: '/map', label: 'Lokasi', icon: MapPin },
    { path: '/thankyou', label: 'Terima Kasih', icon: HeartHandshake },
  ]

  const handleNavigate = (path) => {
    navigate(path)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isActive = (path) => location.pathname === path

  return (
    <>
      {/* Navbar Desktop - Top */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 hidden md:block ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
      }`}>
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* LOGO */}
            <div className="relative">
              <div className={`w-12 h-12 rounded-full overflow-hidden border-2 transition-all duration-300 ${
                isScrolled 
                  ? 'border-[#c9a87c] shadow-md' 
                  : 'border-white/80'
              }`}>
                <img 
                  src="src/assets/images/logo.png"
                  alt="Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className={`absolute inset-0 rounded-full blur-sm transition-opacity duration-300 ${
                isScrolled ? 'opacity-30 bg-[#c9a87c]' : 'opacity-0'
              }`}></div>
            </div>

            <div className="flex items-center space-x-1">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`group relative px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center space-x-2
                      ${isActive(item.path) 
                        ? 'text-[#c9a87c]' 
                        : 'text-[#4a3728] hover:text-[#c9a87c]'
                      }
                    `}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span className="font-light">{item.label}</span>
                    
                    {isActive(item.path) && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-[#c9a87c] rounded-full"></span>
                    )}
                  </button>
                )
              })}
            </div>

            <div className="w-20"></div>
          </div>
        </div>
      </nav>

      {/* Navbar Mobile*/}
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-white/95 backdrop-blur-sm border-t border-[#c9a87c]/20 shadow-lg">
          {/* Tombol scroll kiri */}
          {showLeftArrow && (
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 bottom-1/2 transform translate-y-1/2 z-10 bg-[#c9a87c] text-white rounded-full p-1 shadow-lg ml-2"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Tombol scroll kanan */}
          {showRightArrow && (
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 bottom-1/2 transform translate-y-1/2 z-10 bg-[#c9a87c] text-white rounded-full p-1 shadow-lg mr-2"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Container scroll */}
          <div
            ref={scrollContainerRef}
            onScroll={checkScroll}
            className="overflow-x-auto scrollbar-hide py-2 px-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <div className="flex space-x-2 min-w-max">
              {menuItems.map((item) => {
                const Icon = item.icon
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavigate(item.path)}
                    className={`flex flex-col items-center p-2 rounded-xl transition-colors min-w-[70px] ${
                      isActive(item.path) 
                        ? 'bg-[#c9a87c]/10 text-[#c9a87c]' 
                        : 'text-[#8b7a6a] hover:text-[#c9a87c]'
                    }`}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                    <span className="text-[10px] mt-1 font-light whitespace-nowrap">{item.label}</span>
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Spacer Navbar */}
      {/* Spacer untuk top navbar (desktop) */}
      <div className="hidden md:block h-20"></div>
      
      {/* Spacer untuk top navbar (mobile) */}
      <div className="md:hidden h-0"></div>
      
      {/* Spacer untuk bottom navbar (mobile)*/}
      <div className="md:hidden h-20"></div>
      
      {/* Sembunyikan scrollbar*/}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  )
}

export default Navbar