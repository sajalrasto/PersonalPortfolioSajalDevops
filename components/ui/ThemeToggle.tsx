import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}


const ThemeToggle: React.FC<ThemeToggleProps> = ({ isDark, toggle }) => {
  return (
    <>
      {/* Mobile: compact circle button */}
      <button
        onClick={toggle}
        className="md:hidden w-12 h-12 rounded-full bg-surface-highlight border border-white/10 shadow-lg flex items-center justify-center transition-colors duration-300 focus:outline-none active:scale-95"
        aria-label="Toggle Theme"
        style={{ touchAction: 'manipulation' }}
      >
        <span className="text-black dark:text-white flex items-center justify-center">
          {isDark ? <Moon size={22} /> : <Sun size={22} />}
        </span>
      </button>
      {/* Desktop: original toggle */}
      <button
        onClick={toggle}
        className="hidden md:flex relative w-14 h-8 rounded-full bg-surface-highlight border border-white/10 shadow-inner items-center px-1 transition-colors duration-300 focus:outline-none"
        aria-label="Toggle Theme"
      >
        <motion.div
          className="w-6 h-6 rounded-full bg-white shadow-md flex items-center justify-center text-black z-10"
          animate={{ x: isDark ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {isDark ? <Moon size={14} /> : <Sun size={14} />}
        </motion.div>
      </button>
    </>
  );
};

export default ThemeToggle;