import React from 'react'
import { useNavigate } from 'react-router-dom'

const Navigation = ({ prev, next }) => {
  const navigate = useNavigate()

  return (
    <div className="fixed bottom-6 left-0 right-0 flex justify-center gap-4 z-40">
      {prev && (
        <button
          onClick={() => navigate(prev)}
          className="bg-white text-[#4a3728] px-6 py-2 rounded-full shadow-lg hover:bg-[#faf7f2] transition flex items-center gap-2 border border-[#c9a87c]"
        >
          ← Sebelumnya
        </button>
      )}
      
      {next && (
        <button
          onClick={() => navigate(next)}
          className="bg-[#c9a87c] text-white px-6 py-2 rounded-full shadow-lg hover:bg-[#b89364] transition flex items-center gap-2"
        >
          Selanjutnya →
        </button>
      )}
    </div>
  )
}

export default Navigation