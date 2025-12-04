import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROJECTS } from '../constants';
import { motion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight, Layers, Maximize2 } from 'lucide-react';
import MagneticButton from './ui/MagneticButton';

interface ProjectsProps {
  onCaseStudy?: (id: string) => void;
}

const Projects: React.FC<ProjectsProps> = ({ onCaseStudy }) => {
  const navigate = useNavigate();
  const swiperRef = useRef<any>(null);

  const handleCaseStudy = (id: string) => {
    const routes: Record<string, string> = {
      '1': '/case-study/angelmonkey',
      '2': '/case-study/plationathome',
      '3': '/case-study/cms',
      '4': '/case-study/tripatakaland',
    };
    
    if (routes[id]) {
      if (onCaseStudy) {
        onCaseStudy(id);
      } else {
        navigate(routes[id]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    if (window.Swiper) {
      const isMobile = window.innerWidth < 768;
      swiperRef.current = new window.Swiper('.mySwiper', {
        effect: isMobile ? 'slide' : 'coverflow', // Use slide effect on mobile for better performance
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 'auto',
        speed: isMobile ? 600 : 1000, // Faster on mobile
        parallax: !isMobile, // Disable parallax on mobile for better performance
        coverflowEffect: isMobile ? undefined : {
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
          slideShadows: true,
        },
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index: number, className: string) {
            return '<span class="' + className + ' w-8 sm:w-10 md:w-12 h-1 rounded-full !bg-text/20 !opacity-100 transition-all duration-300 hover:!bg-primary"></span>';
          },
        },
        navigation: {
          nextEl: '.custom-next',
          prevEl: '.custom-prev',
        },
        keyboard: {
          enabled: true,
        },
        touchRatio: 1,
        touchAngle: 45,
        simulateTouch: true,
      });
    }
  }, []);

  return (
    <section className="relative py-32 bg-background overflow-hidden" id="projects">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-surface via-background to-background" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-text/10 to-transparent" />
      
      <div className="w-full relative z-10 flex flex-col items-center">
        
        {/* Section Header */}
        <div className="text-center mb-16 px-6">
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full bg-text/5 border border-text/10"
          >
             <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
             <span className="text-primary font-mono text-xs tracking-widest uppercase">
                Interactive Showcase
             </span>
          </motion.div>
          
          <motion.h2 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-display font-bold text-text mb-6"
          >
             Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-violet-400 to-fuchsia-400">Works.</span>
          </motion.h2>
        </div>

        {/* Swiper Container - Full Width Cinematic */}
        <div className="w-full relative">
          <div className="swiper mySwiper w-full !pb-16 sm:!pb-20 !pt-6 sm:!pt-10 !px-2 sm:!px-4 md:!px-10">
            <div className="swiper-wrapper">
              {PROJECTS.map((project, i) => (
                <div 
                  key={project.id} 
                  className="swiper-slide group relative rounded-xl sm:rounded-2xl overflow-hidden bg-surface border border-text/10 shadow-2xl"
                  style={{ 
                    width: 'clamp(280px, 90vw, 1100px)', 
                    aspectRatio: '16/9',
                    minHeight: '400px'
                  }}
                >
                   {/* Parallax Image Background */}
                   <div 
                      className="absolute inset-0 w-[120%] h-full -left-[10%]" 
                      data-swiper-parallax="-23%"
                   >
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover opacity-60 group-[.swiper-slide-active]:opacity-80 transition-opacity duration-700" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-surface/80 via-transparent to-surface/30" />
                   </div>

                   {/* Cinematic Content Layer */}
                   <div className="absolute inset-0 p-4 sm:p-6 md:p-12 lg:p-16 flex flex-col justify-between">
                      
                      {/* Top Bar */}
                      <div className="flex justify-between items-start mb-4 sm:mb-0" data-swiper-parallax="-300">
                         <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-background/50 backdrop-blur-md border border-text/10">
                            <Layers size={10} className="sm:w-3 sm:h-3 text-primary" />
                            <span className="text-text-muted font-mono text-[9px] sm:text-[10px] uppercase tracking-widest">{project.category}</span>
                         </div>
                         <button
                            onClick={() => handleCaseStudy(project.id)}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-text/5 backdrop-blur-md border border-text/10 flex items-center justify-center text-text/50 group-hover:text-text hover:bg-text/10 hover:border-primary/50 transition-all duration-300 cursor-pointer active:scale-95"
                            aria-label="View Case Study"
                         >
                            <Maximize2 size={14} className="sm:w-4 sm:h-4" />
                         </button>
                      </div>

                      {/* Main Title & Description */}
                      <div className="relative z-10 max-w-4xl flex-1 flex flex-col justify-center">
                         <h3 
                            className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-display font-bold text-text leading-[0.95] sm:leading-[0.9] tracking-tight mb-3 sm:mb-4 md:mb-6"
                            data-swiper-parallax="-500"
                         >
                            {project.title}
                         </h3>
                         
                         <div 
                            className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 items-start sm:items-end md:items-center mt-auto"
                            data-swiper-parallax="-200"
                         >
                            <p className="text-text-muted text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg">
                              {project.description}
                            </p>
                            
                            <MagneticButton
                              className="!px-4 sm:!px-6 !py-2.5 sm:!py-3 bg-primary text-black font-bold text-xs sm:text-sm flex items-center gap-2 hover:bg-white transition-colors w-full sm:w-auto justify-center sm:justify-start"
                              onClick={() => handleCaseStudy(project.id)}
                            >
                              View Case Study <ArrowUpRight size={14} className="sm:w-4 sm:h-4" />
                            </MagneticButton>
                         </div>
                      </div>

                      {/* Bottom HUD (Tech Stack) */}
                      <div 
                        className="flex flex-wrap gap-1.5 sm:gap-2 mt-4 sm:mt-6 md:mt-8"
                        data-swiper-parallax="-100"
                      >
                         {project.tech.map((t) => (
                           <div key={t} className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-md bg-background/50 backdrop-blur-md border border-text/5 text-text-muted font-mono text-[10px] sm:text-xs">
                             {t}
                           </div>
                         ))}
                      </div>
                   </div>

                   {/* Active Slide Glow Border */}
                   <div className="absolute inset-0 border border-text/10 group-[.swiper-slide-active]:border-primary/30 rounded-xl sm:rounded-2xl transition-colors duration-700 pointer-events-none" />
                </div>
              ))}
            </div>
            
            {/* Custom Pagination Container - Mobile Optimized */}
            <div className="swiper-pagination !bottom-4 sm:!bottom-6 md:!bottom-8"></div>
          </div>

          {/* Cinematic Navigation Arrows - Mobile Optimized */}
          <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4 md:left-12 z-20">
            <MagneticButton className="!p-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center custom-prev bg-background/40 backdrop-blur-xl border border-text/20 hover:border-primary text-text hover:text-primary rounded-full transition-all duration-300 group shadow-lg">
               <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:-translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4 md:right-12 z-20">
            <MagneticButton className="!p-0 w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 flex items-center justify-center custom-next bg-background/40 backdrop-blur-xl border border-text/20 hover:border-primary text-text hover:text-primary rounded-full transition-all duration-300 group shadow-lg">
               <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8 group-hover:translate-x-1 transition-transform" />
            </MagneticButton>
          </div>
        </div>
      </div>
      
      <style>{`
        .swiper-pagination-bullet {
          width: 40px !important;
          height: 4px !important;
          border-radius: 2px !important;
          background: var(--text-muted) !important;
          opacity: 0.3 !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          width: 60px !important;
          background: #00F0FF !important;
          opacity: 1 !important;
          box-shadow: 0 0 10px rgba(0, 240, 255, 0.5);
        }
      `}</style>
    </section>
  );
};

export default Projects;