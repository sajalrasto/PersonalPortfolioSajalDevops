import React, { useRef, useState } from 'react';
    import { motion } from 'framer-motion';
    
    interface MagneticButtonProps {
      children: React.ReactNode;
      className?: string;
      onClick?: () => void;
    }
    
    const MagneticButton: React.FC<MagneticButtonProps> = ({ children, className = "", onClick }) => {
      const ref = useRef<HTMLDivElement>(null);
      const [position, setPosition] = useState({ x: 0, y: 0 });
    
      const handleMouse = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current?.getBoundingClientRect() || { height: 0, width: 0, left: 0, top: 0 };
        const middleX = clientX - (left + width / 2);
        const middleY = clientY - (top + height / 2);
    
        setPosition({ x: middleX * 0.2, y: middleY * 0.2 });
      };
    
      const reset = () => {
        setPosition({ x: 0, y: 0 });
      };
    
      const { x, y } = position;
    
      return (
        <motion.div
          style={{ position: "relative" }}
          ref={ref}
          onMouseMove={handleMouse}
          onMouseLeave={reset}
          animate={{ x, y }}
          transition={{ type: "spring", stiffness: 200, damping: 15, mass: 0.1 }}
        >
          <button 
            onClick={onClick}
            className={`px-8 py-4 rounded-full bg-white text-black font-medium tracking-wide transition-all hover:shadow-[0_0_30px_rgba(6,182,212,0.4),0_0_60px_rgba(139,92,246,0.3),0_0_90px_rgba(217,70,239,0.2)] hover:scale-105 active:scale-95 ${className}`}
          >
            {children}
          </button>
        </motion.div>
      );
    };
    
    export default MagneticButton;