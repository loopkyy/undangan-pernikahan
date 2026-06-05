import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { weddingData } from '../data/weddingData'

const Cover = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [guestTitle, setGuestTitle] = useState('')
  const [guestName, setGuestName] = useState('')

  useEffect(() => {
    // Ambil parameter dari URL
    // Contoh: ?to=Bapak%20Ahmad%20Fauzi
    // Atau: ?title=Prof.&to=Dr.%20Ahmad%20Fauzi
    
    const fullName = searchParams.get('to')
    const titleOnly = searchParams.get('title')
    
    if (fullName) {
      // Cek apakah sudah include gelar di depan
      const decoded = decodeURIComponent(fullName)
      const hasTitle = /^(Bapak|Ibu|Prof|Dr|Haji|Hj)/i.test(decoded)
      
      if (hasTitle) {
        // Pisahkan gelar dan nama
        const firstWord = decoded.split(' ')[0]
        const restName = decoded.split(' ').slice(1).join(' ')
        
        if (/(Bapak|Ibu)/i.test(firstWord)) {
          setGuestTitle(firstWord)
          setGuestName(restName || '')
        } else {
          setGuestTitle(firstWord)
          setGuestName(restName)
        }
      } else {
        setGuestTitle('')
        setGuestName(decoded)
      }
    } else if (titleOnly) {
      setGuestTitle(decodeURIComponent(titleOnly))
      setGuestName('')
    }
  }, [searchParams])

  const handleOpenInvitation = (e) => {
    e.preventDefault()
    e.stopPropagation()
    navigate('/quotes')
  }

  // Format tampilan sapaan
  const getGreetingText = () => {
    if (guestTitle && guestName) {
      return `${guestTitle} ${guestName}`
    }
    if (guestTitle && !guestName) {
      return guestTitle
    }
    if (!guestTitle && guestName) {
      return guestName
    }
    return 'Bapak/Ibu/Saudara/i'
  }

  return (
    <div 
      className="page-container min-h-screen flex items-center justify-center relative cursor-pointer"
      style={{ touchAction: 'manipulation' }}
    >
      <div className="absolute top-20 left-10 w-40 h-40 border-l-2 border-t-2 border-[#c9a87c]/20 pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 border-r-2 border-b-2 border-[#c9a87c]/20 pointer-events-none"></div>
      
      <div className="text-center px-4 max-w-md w-full">
        <p className="text-[#c9a87c] tracking-[0.3em] text-xs mb-6">THE WEDDING OF</p>
        
        <div className="mb-6 flex justify-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#c9a87c] p-1 overflow-hidden shadow-xl">
            <img 
              src={weddingData.couple.fotoBersama}
              alt={`${weddingData.couple.pria.nama} & ${weddingData.couple.wanita.nama}`}
              loading="lazy"
              decoding="async"
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${weddingData.couple.pria.nama}+${weddingData.couple.wanita.nama}&background=c9a87c&color=fff&size=200`
              }}
            />
          </div>
        </div>
        
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl text-[#4a3728] font-light leading-tight tracking-wide">
            {weddingData.couple.pria.nama}
          </h1>
          
          <div className="flex items-center justify-center gap-3 my-3">
            <div className="w-8 h-px bg-[#c9a87c]"></div>
            <span className="text-[#c9a87c] text-xl">&</span>
            <div className="w-8 h-px bg-[#c9a87c]"></div>
          </div>
          
          <h1 className="text-2xl md:text-3xl text-[#4a3728] font-light leading-tight tracking-wide">
            {weddingData.couple.wanita.nama}
          </h1>
        </div>
        
        <div className="w-20 h-px bg-[#c9a87c] mx-auto my-6"></div>
        
        <p className="text-[#6b5a4a] mb-2">Kepada Yth.</p>
        <p className="text-[#c9a87c] text-xl md:text-2xl font-semibold mb-4 break-words">
          {getGreetingText()}
        </p>
        <p className="text-[#8b7a6a] text-lg mb-12">di tempat</p>
        
        <div className="flex justify-center">
          <button 
            onClick={handleOpenInvitation}
            onTouchStart={(e) => {
              e.preventDefault()
              handleOpenInvitation(e)
            }}
            className="border-2 border-[#c9a87c] text-[#c9a87c] hover:bg-[#c9a87c] hover:text-white px-10 py-4 tracking-[0.2em] text-sm transition-all duration-500 min-w-[200px] active:scale-95 active:bg-[#c9a87c] active:text-white"
            style={{ 
              touchAction: 'manipulation',
              cursor: 'pointer',
              WebkitTapHighlightColor: 'transparent'
            }}
          >
            BUKA UNDANGAN
          </button>
        </div>
      </div>
    </div>
  )
}

export default Cover