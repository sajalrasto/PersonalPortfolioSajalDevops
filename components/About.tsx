import React from 'react';
import { STATS } from '../constants';
import { motion } from 'framer-motion';
import { Check, Globe } from 'lucide-react';

const About: React.FC = () => {
  return (
    <section className="py-32 px-4 relative overflow-hidden" id="about">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
           <div className="flex items-center gap-2 text-primary font-mono text-xs mb-6">
              <Globe size={14} /> GLOBAL REACH
           </div>
           
           <motion.h2 
             initial={{ opacity: 0, x: -20 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
             className="text-5xl md:text-6xl font-display font-bold text-text mb-8 leading-tight"
           >
             Delivering value <br/>
             <span className="text-text-muted">globally.</span>
           </motion.h2>
           
           <div className="space-y-6 text-text-muted text-lg leading-relaxed max-w-lg">
             <p>
               We empower organizations to achieve greater efficiency and impact. By combining technical expertise with a deep understanding of business environments.
             </p>
           </div>

           <div className="mt-12 grid grid-cols-3 gap-8 border-t border-text/10 pt-8">
             {STATS.map((stat, index) => (
               <motion.div 
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
               >
                 <div className="text-4xl font-display font-bold text-text mb-1">{stat.value}</div>
                 <div className="text-xs text-text-muted font-mono uppercase tracking-wider">{stat.label}</div>
               </motion.div>
             ))}
           </div>
        </div>

        <div className="relative">
           {/* Map Container */}
           <div className="relative aspect-[4/3] rounded-2xl bg-surface border border-text/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,240,255,0.1),transparent_70%)]" />
              
              {/* World Map SVG (Simplified Dotted Representation) */}
              <div className="absolute inset-0 opacity-30" 
                 style={{ 
                    maskImage: 'radial-gradient(circle, black 40%, transparent 100%)',
                    backgroundImage: 'radial-gradient(#3B82F6 1.5px, transparent 1.5px)', 
                    backgroundSize: '12px 12px' 
                 }} 
              />
              
              {/* Active Nodes */}
              {[
                  { top: '30%', left: '25%' }, // NA
                  { top: '45%', left: '48%' }, // EU
                  { top: '55%', left: '75%' }, // ASIA
              ].map((pos, i) => (
                  <div key={i} className="absolute w-3 h-3" style={{ top: pos.top, left: pos.left }}>
                      <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary shadow-[0_0_10px_#00F0FF]"></span>
                  </div>
              ))}

              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                 <path d="M 180 120 Q 300 80 350 180" fill="none" stroke="url(#gradient-line)" strokeWidth="1" strokeDasharray="5,5" className="opacity-50" />
                 <defs>
                   <linearGradient id="gradient-line" x1="0%" y1="0%" x2="100%" y2="0%">
                     <stop offset="0%" stopColor="transparent" />
                     <stop offset="50%" stopColor="#00F0FF" />
                     <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                 </defs>
              </svg>

              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background to-transparent">
                  <div className="flex items-center gap-4 text-xs font-mono text-text-muted">
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-primary" /> Active Projects
                      </div>
                      <div className="flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-text-muted" /> Pending
                      </div>
                  </div>
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

export default About;