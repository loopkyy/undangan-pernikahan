import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingFlowers = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    const newFlowers = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 20 + Math.random() * 25,
      rotation: Math.random() * 360,
      rotationSpeed: 0.5 + Math.random() * 2,
      type: Math.floor(Math.random() * 3),
    }));
    setFlowers(newFlowers);
  }, []);

  // Bunga bentuk 1
  const FlowerType1 = ({ size }) => (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * 72) * Math.PI / 180;
        const x = Math.cos(angle) * (size * 0.3);
        const y = Math.sin(angle) * (size * 0.3);
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size * 0.4,
              height: size * 0.4,
              background: '#c9a87c',
              borderRadius: '60% 40% 60% 40%',
              left: '50%',
              top: '50%',
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) rotate(${i * 72}deg)`,
              opacity: 0.7,
            }}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          width: size * 0.2,
          height: size * 0.2,
          background: '#b89b8a',
          borderRadius: '50%',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.9,
        }}
      />
    </div>
  );

  // Bunga bentuk 2 (daun)
  const FlowerType2 = ({ size }) => (
    <div style={{ width: size, height: size, position: 'relative' }}>
      <div
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.4,
          background: '#c9a87c',
          borderRadius: '100% 0 100% 0',
          left: '15%',
          top: '30%',
          transform: 'rotate(-20deg)',
          opacity: 0.7,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: size * 0.7,
          height: size * 0.4,
          background: '#c9a87c',
          borderRadius: '0 100% 0 100%',
          right: '15%',
          top: '30%',
          transform: 'rotate(20deg)',
          opacity: 0.7,
        }}
      />
    </div>
  );

  // Bunga bentuk 3 (bintang)
  const FlowerType3 = ({ size }) => (
    <div style={{ width: size, height: size, position: 'relative' }}>
      {[0, 1, 2, 3].map((i) => {
        const angle = i * 90;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: size * 0.5,
              height: size * 0.5,
              background: '#c9a87c',
              borderRadius: '50%',
              left: '50%',
              top: '50%',
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(${size * 0.25}px)`,
              opacity: 0.6,
            }}
          />
        );
      })}
      <div
        style={{
          position: 'absolute',
          width: size * 0.3,
          height: size * 0.3,
          background: '#b89b8a',
          borderRadius: '50%',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          opacity: 0.8,
        }}
      />
    </div>
  );

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 5,
      pointerEvents: 'none',
      overflow: 'hidden'
    }}>
      {flowers.map((flower) => (
        <motion.div
          key={flower.id}
          style={{
            position: 'absolute',
            left: `${flower.left}%`,
            top: `-${flower.size}px`,
          }}
          animate={{
            y: ['0vh', '120vh'],
            rotate: [flower.rotation, flower.rotation + 360 * flower.rotationSpeed],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          {flower.type === 0 && <FlowerType1 size={flower.size} />}
          {flower.type === 1 && <FlowerType2 size={flower.size} />}
          {flower.type === 2 && <FlowerType3 size={flower.size} />}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingFlowers;