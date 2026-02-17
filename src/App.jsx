import React, { useState, useEffect } from 'react';
import { weddingData } from './data/weddingData';

// Layout
import MusicButton from './components/layout/MusicButton';

// Sections
import Cover from './components/sections/Cover';
import Quotes from './components/sections/Quotes';
import Couple from './components/sections/Couple';
import Event from './components/sections/Event';
import LoveStory from './components/sections/LoveStory';
import Gallery from './components/sections/Gallery';
import Wishes from './components/sections/Wishes';
import Map from './components/sections/Map';
import ThankYou from './components/sections/ThankYou';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  // Intersection Observer untuk animasi fade in
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0');
            entry.target.classList.remove('opacity-0', 'translate-y-10');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isOpen]);

  return (
    <div className="min-h-screen bg-[#faf7f2] font-serif">
      <MusicButton src={weddingData.music} />
      
      <Cover onOpen={() => setIsOpen(true)} />
      
      {isOpen && (
        <>
          <Quotes quotes={weddingData.quotes} />
          <Couple 
            pria={weddingData.couple.pria} 
            wanita={weddingData.couple.wanita} 
          />
          <Event 
            akad={weddingData.event.akad} 
            resepsi={weddingData.event.resepsi} 
          />
          <LoveStory stories={weddingData.loveStory} />
          <Gallery photos={weddingData.gallery} />
          <Map 
            embedUrl={weddingData.map.embedUrl} 
            link={weddingData.map.link} 
          />
          <Wishes />
          <ThankYou />
        </>
      )}
    </div>
  );
}

export default App;