import React from 'react'
import { useNavigate } from 'react-router-dom'
import { weddingData } from '../data/weddingData'

const Cover = () => {
  const navigate = useNavigate()

  return (
    <div className="page-container min-h-screen flex items-center justify-center relative">
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-40 h-40 border-l-2 border-t-2 border-[#c9a87c]/20"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 border-r-2 border-b-2 border-[#c9a87c]/20"></div>
      
      <div className="text-center px-4 max-w-md">
        <p className="text-[#c9a87c] tracking-[0.3em] text-xs mb-6">THE WEDDING OF</p>
        
        {/* Foto Mempelai */}
        <div className="mb-6 flex justify-center">
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[#c9a87c] p-1 overflow-hidden shadow-xl">
            <img 
              src={weddingData.couple.fotoBersama}
              alt={`${weddingData.couple.pria.nama} & ${weddingData.couple.wanita.nama}`}
              className="w-full h-full rounded-full object-cover"
              onError={(e) => {
                e.target.src = `https://ui-avatars.com/api/?name=${weddingData.couple.pria.nama}+${weddingData.couple.wanita.nama}&background=c9a87c&color=fff&size=200`
              }}
            />
          </div>
        </div>
        
        {/* Nama mempelai - 2 baris dengan gaya elegan */}
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl text-[#4a3728] font-light leading-tight tracking-wide">
            {weddingData.couple.pria.nama}
          </h1>
          
          {/* Dekorasi & */}
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
        <p className="text-[#6b5a4a] mb-8">Kepada Yth. Bapak/Ibu/Saudara/i</p>
        <p className="text-[#8b7a6a] text-lg mb-12">Keluarga Besar & Sahabat</p>
        
        <button 
          onClick={() => navigate('/quotes')}
          className="border-2 border-[#c9a87c] text-[#c9a87c] hover:bg-[#c9a87c] hover:text-white px-10 py-3 tracking-[0.2em] text-sm transition-all duration-500"
        >
          BUKA UNDANGAN
        </button>
      </div>
    </div>
  )
}

export default Cover