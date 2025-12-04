import React from 'react';
import { SERVICES } from '../constants';
import SpotlightCard from './ui/SpotlightCard';
import { motion } from 'framer-motion';

const Services: React.FC = () => {
  return (
    <section className="py-40 px-6 relative z-10" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-5">
            <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-fuchsia-400 font-mono text-xs tracking-widest uppercase mb-4 block"
            >
              Capabilities
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-text leading-[1.1]"
            >
              Engineering <br/>
              the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-violet-400">Future.</span>
            </motion.h2>
          </div>
          <div className="lg:col-span-7 flex items-end">
            <p className="text-text-muted text-lg leading-relaxed max-w-xl">
              From automated workflows to immersive web experiences, we provide a full spectrum of engineering services designed to scale with your ambition.
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
          {SERVICES.map((service, index) => {
             // Staggered Layout logic
             const isOffset = index % 2 !== 0 && index !== 0;
             const glowColor = index % 3 === 0 ? "rgba(0, 240, 255, 0.2)" : index % 3 === 1 ? "rgba(139, 92, 246, 0.2)" : "rgba(217, 70, 239, 0.2)";
             
             return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`${index === 1 || index === 4 ? 'lg:translate-y-12' : ''}`}
              >
                <SpotlightCard 
                  className="h-full group bg-surface border-text/10 hover:border-primary/20"
                  spotlightColor={glowColor}
                >
                  <div className="p-8 h-full flex flex-col relative z-20">
                    <div className="mb-8 flex justify-between items-start">
                      <div className={`w-12 h-12 rounded-xl bg-text/5 border border-text/10 flex items-center justify-center text-text group-hover:scale-110 group-hover:bg-primary group-hover:text-black transition-all duration-500 shadow-sm`}>
                        <service.icon size={24} />
                      </div>
                      <span className="font-mono text-xs text-text-muted group-hover:text-primary transition-colors">0{index + 1}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-text mb-4 font-display transition-all">
                      {service.title}
                    </h3>
                    <p className="text-text-muted text-sm leading-relaxed flex-1 group-hover:text-text transition-colors">
                      {service.description}
                    </p>
                  </div>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;