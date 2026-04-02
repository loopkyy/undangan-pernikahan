import React from 'react'
import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const Map = () => {
  const { embedUrl, link, tempat, alamat } = weddingData.map

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-3xl w-full">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 text-[#c9a87c]">
            <MapPin size={32} strokeWidth={1} className="mx-auto" />
          </div>
          <h2 className="text-3xl md:text-4xl text-[#4a3728] mb-3 font-light">
            Lokasi
          </h2>
          <div className="w-12 h-px bg-[#c9a87c] mx-auto"></div>
        </div>

        {/* Map Box */}
        <div className="bg-[#faf7f2] p-6 rounded-3xl border border-[#e8ddd0] shadow-md mb-8">
          <div className="aspect-video w-full bg-white rounded-2xl overflow-hidden shadow-sm">
            <iframe
              src={embedUrl}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map location"
              className="w-full h-full border-0"
            />
          </div>
        </div>
        
        {/* Button & Address */}
        <div className="text-center">
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-[#c9a87c] text-white px-6 py-3 rounded-2xl hover:bg-[#b89364] transition-all duration-300 shadow-md hover:shadow-lg"
          >
            <Navigation size={18} />
            <span>Buka Google Maps</span>
          </a>
          
          <p className="text-[#8b7a6a] text-sm mt-5 leading-relaxed">
            <span className="font-medium text-[#4a3728]">{tempat}</span><br />
            {alamat}
          </p>
        </div>

      </div>
    </motion.div>
  )
}

export default Map