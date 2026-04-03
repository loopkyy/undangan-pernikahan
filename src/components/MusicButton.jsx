import React, { useRef, useState } from 'react'

const MusicButton = ({ src }) => {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  return (
    <>
      <audio ref={audioRef} src={src} loop />
      <button
        onClick={togglePlay}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-[#c9a87c] text-white shadow-lg flex items-center justify-center hover:bg-[#b89364] transition-all duration-300 hover:scale-110"
      >
        {isPlaying ? '⏸' : '♪'}
      </button>
    </>
  )
}

export default MusicButton