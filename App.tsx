import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { BrowserRouter, useLocation, useNavigate } from 'react-router-dom';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import ThemeToggle from './components/ui/ThemeToggle';
import ErrorBoundary from './components/ErrorBoundary';
import ClientInfoModal from './components/ui/ClientInfoModal';
import WhatsAppModal from './components/ui/WhatsAppModal';
import LocalBusinessSchema from './components/LocalBusinessSchema';
import { AppRoutes } from './routes';
import { Menu, X, FileText, Briefcase, User, Moon, Sun } from 'lucide-react';

// Header Component
const Header: React.FC<{ isDark: boolean; toggleTheme: () => void }> = ({ isDark, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = useCallback((path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-6 py-6">
      <nav className="max-w-7xl mx-auto flex justify-between items-center bg-surface/80 backdrop-blur-xl border border-white/5 rounded-full px-6 py-3 shadow-2xl">
        <button 
          onClick={() => handleNavigation('/')} 
          className="font-display font-bold text-xl tracking-tight text-text flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-2 h-2 bg-gradient-to-r from-primary to-fuchsia rounded-full animate-pulse" />
          Sajal Rastogi
        </button>
        
        <div className="hidden md:flex gap-8 text-sm font-medium text-text-muted">
          <button 
            onClick={() => handleNavigation('/services')} 
            className="hover:text-text transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => handleNavigation('/project-portfolio')} 
            className="hover:text-text transition-colors"
          >
            Portfolio
          </button>
          <button 
            onClick={() => handleNavigation('/blog')} 
            className="hover:text-text transition-colors"
          >
            Journal
          </button>
          <button 
            onClick={() => handleNavigation('/resume')} 
            className="hover:text-text transition-colors"
          >
            Resume
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:block">
            <ThemeToggle isDark={isDark} toggle={toggleTheme} />
          </div>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
            className="px-6 py-2 rounded-full bg-text text-background hover:bg-primary hover:text-black transition-colors text-xs font-bold uppercase tracking-wider"
          >
            Let's Talk
          </button>
        </div>
      </nav>
    </header>
  );
};

// Mobile Menu Component
const MobileMenu: React.FC<{ 
  isMenuOpen: boolean; 
  setIsMenuOpen: (open: boolean) => void;
  navigate: (path: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
}> = ({ isMenuOpen, setIsMenuOpen, navigate, isDark, toggleTheme }) => {
  const handleNav = useCallback((path: string) => {
    navigate(path);
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate, setIsMenuOpen]);

  return (
    <div className="fixed bottom-6 right-6 z-50 md:hidden flex flex-col items-end gap-4">
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm -z-10"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 10 }}
              transition={{ 
                type: "spring", 
                stiffness: 300, 
                damping: 30, 
                mass: 0.6,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="flex flex-col gap-3 mb-2"
            >
              <motion.button
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: 0.03, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNav('/blog')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-cyan-600/30 backdrop-blur-2xl border border-emerald-400/50 text-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.4),0_0_20px_rgba(20,184,166,0.3)]' 
                    : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
                }`}
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <FileText size={22} />
                <span>Journal</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: 0.06, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNav('/services')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-cyan-600/30 backdrop-blur-2xl border border-emerald-400/50 text-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.4),0_0_20px_rgba(20,184,166,0.3)]' 
                    : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
                }`}
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <Briefcase size={22} />
                <span>Services</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: 0.09, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNav('/project-portfolio')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-cyan-600/30 backdrop-blur-2xl border border-emerald-400/50 text-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.4),0_0_20px_rgba(20,184,166,0.3)]' 
                    : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
                }`}
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <Briefcase size={22} />
                <span>Portfolio</span>
              </motion.button>
              
              <motion.button
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                transition={{ delay: 0.12, type: "spring", stiffness: 400, damping: 28, mass: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => handleNav('/resume')}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold text-sm shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                  isDark 
                    ? 'bg-gradient-to-r from-emerald-600/30 via-teal-600/30 to-cyan-600/30 backdrop-blur-2xl border border-emerald-400/50 text-emerald-200 shadow-[0_8px_32px_rgba(16,185,129,0.4),0_0_20px_rgba(20,184,166,0.3)]' 
                    : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
                }`}
                style={{
                  backdropFilter: 'blur(20px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(20px) saturate(180%)',
                }}
              >
                <User size={22} />
                <span>Resume</span>
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 relative z-10 overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-emerald-600/20 via-teal-600/20 to-cyan-600/20 backdrop-blur-2xl border border-emerald-500/40 text-emerald-300 shadow-[0_8px_32px_rgba(16,185,129,0.4),0_0_20px_rgba(20,184,166,0.3)]' 
            : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        {isDark && (
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'conic-gradient(from 0deg, rgba(16,185,129,0.1), rgba(20,184,166,0.1), rgba(6,182,212,0.1), rgba(16,185,129,0.1))',
            }}
          />
        )}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
              >
                <X size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
              >
                <Menu size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {!isMenuOpen && (
          <motion.div
            className={`absolute inset-0 rounded-full border-2 ${
              isDark ? 'border-emerald-400/40' : 'border-cyan-500/30'
            }`}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </motion.button>
      
      {/* Theme Toggle Button - Below Floating Menu */}
      <motion.button
        onClick={toggleTheme}
        className={`w-12 h-12 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 relative z-10 overflow-hidden ${
          isDark 
            ? 'bg-gradient-to-br from-amber-600/20 via-orange-600/20 to-yellow-600/20 backdrop-blur-2xl border border-amber-500/40 text-amber-300 shadow-[0_8px_32px_rgba(217,119,6,0.4),0_0_20px_rgba(251,146,60,0.3)]' 
            : 'bg-white/40 hover:bg-white/50 backdrop-blur-2xl border border-cyan-500/30 text-cyan-700 shadow-[0_8px_32px_rgba(6,182,212,0.25)]'
        }`}
        style={{
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle Theme"
      >
        {isDark && (
          <motion.div
            className="absolute inset-0"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              background: 'conic-gradient(from 0deg, rgba(217,119,6,0.1), rgba(251,146,60,0.1), rgba(234,179,8,0.1), rgba(217,119,6,0.1))',
            }}
          />
        )}
        <div className="relative z-10">
          <AnimatePresence mode="wait">
            {isDark ? (
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
              >
                <Moon size={22} />
              </motion.div>
            ) : (
              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.8 }}
                transition={{ type: "spring", stiffness: 500, damping: 30, mass: 0.4 }}
              >
                <Sun size={22} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        <motion.div
          className={`absolute inset-0 rounded-full border-2 ${
            isDark ? 'border-amber-400/40' : 'border-cyan-500/30'
          }`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.button>
    </div>
  );
};

// Main App Content (inside Router)
const AppContent: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [cursorXY, setCursorXY] = useState({ x: -100, y: -100 });
  const [isDark, setIsDark] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [whatsappModalOpen, setWhatsappModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Cursor tracking
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setCursorXY({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  // Theme management
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDark]);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  // Global modal event listeners
  useEffect(() => {
    const contactHandler = () => setModalOpen(true);
    const whatsappHandler = () => setWhatsappModalOpen(true);
    
    window.addEventListener('openClientInfoModal', contactHandler);
    window.addEventListener('openWhatsAppModal', whatsappHandler);
    
    return () => {
      window.removeEventListener('openClientInfoModal', contactHandler);
      window.removeEventListener('openWhatsAppModal', whatsappHandler);
    };
  }, []);

  const toggleTheme = useCallback(() => setIsDark(!isDark), [isDark]);

  const handleNavigate = useCallback((path: string) => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [navigate]);

  return (
    <div className="bg-background min-h-screen text-text selection:bg-primary/30 selection:text-white relative transition-colors duration-500">
      <div className="bg-noise" />
      
      {/* Local Business Schema */}
      <LocalBusinessSchema />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-violet to-fuchsia origin-left z-50 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
        style={{ scaleX }}
      />

      <div 
        className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(1000px circle at ${cursorXY.x}px ${cursorXY.y}px, ${isDark ? 'rgba(139, 92, 246, 0.08)' : 'rgba(139, 92, 246, 0.05)'}, ${isDark ? 'rgba(0, 240, 255, 0.05)' : 'rgba(0, 240, 255, 0.02)'}, transparent 60%)`
        }}
      />

      <Header isDark={isDark} toggleTheme={toggleTheme} />

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <AppRoutes />
          </motion.div>
        </AnimatePresence>
      </main>
      
      <MobileMenu 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen}
        navigate={handleNavigate}
        isDark={isDark}
        toggleTheme={toggleTheme}
      />

      {/* Global Contact Modal */}
      <ClientInfoModal open={modalOpen} onClose={() => setModalOpen(false)} />
      
      {/* Global WhatsApp Modal */}
      <WhatsAppModal open={whatsappModalOpen} onClose={() => setWhatsappModalOpen(false)} />
    </div>
  );
};

// Main App Component with Router
const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ErrorBoundary>
  );
};

export default App;
