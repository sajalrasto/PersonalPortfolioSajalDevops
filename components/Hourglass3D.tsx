import React, { useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const Hourglass3D: React.FC<{ size?: 'large' | 'small' }> = ({ size = 'large' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rotateXValue = useMotionValue(0);
  const rotateYValue = useMotionValue(0);
  
  const rotateX = useSpring(rotateXValue, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(rotateYValue, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const x = (e.clientX - centerX) / (rect.width / 2);
      const y = (e.clientY - centerY) / (rect.height / 2);
      
      rotateXValue.set(y * 15);
      rotateYValue.set(x * 15);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [rotateXValue, rotateYValue]);

  const dimensions = size === 'large' ? 'w-96 h-96' : 'w-48 h-48';
  const topSize = size === 'large' ? 'w-40 h-40' : 'w-20 h-20';
  const bottomSize = size === 'large' ? 'w-40 h-40' : 'w-20 h-20';
  const neckWidth = size === 'large' ? 'w-6' : 'w-3';
  const neckHeight = size === 'large' ? 'h-16' : 'h-8';

  return (
    <div ref={containerRef} className={`relative ${dimensions} perspective-1000 flex items-center justify-center`}>
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full relative flex items-center justify-center"
      >
        {/* Hourglass Structure */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Top Bulb */}
          <div 
            className={`${topSize} rounded-full relative overflow-hidden`}
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(250, 204, 21, 0.3), rgba(250, 204, 21, 0.1))',
              border: '2px solid rgba(250, 204, 21, 0.4)',
              transform: 'translateZ(20px)',
            }}
          >
            {/* Sand in top */}
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-400/40 to-transparent" />
          </div>
          
          {/* Middle Neck */}
          <div 
            className={`${neckWidth} ${neckHeight} relative`}
            style={{
              background: 'linear-gradient(to bottom, rgba(250, 204, 21, 0.5), rgba(250, 204, 21, 0.3))',
              transform: 'translateZ(30px)',
              clipPath: 'polygon(0 0, 100% 0, 80% 100%, 20% 100%)',
            }}
          >
            {/* Flowing sand particles */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, size === 'large' ? 80 : 40],
                  opacity: [1, 0],
                }}
                transition={{
                  duration: 2 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeIn",
                  delay: i * 0.4,
                }}
                className="absolute left-1/2 -translate-x-1/2 w-1 h-1 bg-yellow-400 rounded-full"
                style={{ top: '0%' }}
              />
            ))}
          </div>
          
          {/* Bottom Bulb */}
          <div 
            className={`${bottomSize} rounded-full relative overflow-hidden`}
            style={{
              background: 'radial-gradient(circle at 70% 70%, rgba(250, 204, 21, 0.2), rgba(250, 204, 21, 0.05))',
              border: '2px solid rgba(250, 204, 21, 0.3)',
              transform: 'translateZ(20px)',
            }}
          >
            {/* Accumulated sand in bottom */}
            <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-yellow-400/30 to-transparent" />
          </div>
          
          {/* Glass Reflection */}
          <div 
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.15), transparent 60%)',
              transform: 'translateZ(35px)',
            }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default Hourglass3D;
