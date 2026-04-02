import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Book } from 'lucide-react'
import { weddingData } from '../data/weddingData'

const Quotes = () => {
  const quote = weddingData.quotes[0]
  const fullText = quote.text

  const [displayedText, setDisplayedText] = useState('')
  const [index, setIndex] = useState(0)
  const [startTyping, setStartTyping] = useState(false)
  const [finished, setFinished] = useState(false)

  // mulai mengetik
  useEffect(() => {
    const delay = setTimeout(() => {
      setStartTyping(true)
    }, 1000)

    return () => clearTimeout(delay)
  }, [])

  // Efek mengetik
  useEffect(() => {
    if (!startTyping) return

    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[index])
        setIndex(prev => prev + 1)
      }, 35)

      return () => clearTimeout(timeout)
    } else {
      setFinished(true)
    }
  }, [index, fullText, startTyping])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center p-6"
    >
      <div className="max-w-3xl text-center">
        <div className="mb-8 text-[#c9a87c]">
          <Book size={32} strokeWidth={1} className="mx-auto" />
        </div>

        <div className="relative">
          <span className="absolute -top-6 left-0 text-6xl text-[#c9a87c]/50">"</span>

          <p className="text-[#6b5a4a] italic leading-relaxed text-xl md:text-2xl font-light px-12 min-h-[140px]">
            {displayedText}
            {!finished && <span className="animate-pulse">|</span>}
          </p>

          <span className="absolute -bottom-6 right-0 text-6xl text-[#c9a87c]/50">"</span>
        </div>

        {finished && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-[#c9a87c] mt-10 text-sm tracking-wide"
          >
            ({quote.sumber})
          </motion.p>
        )}
      </div>
    </motion.div>
  )
}

export default Quotes