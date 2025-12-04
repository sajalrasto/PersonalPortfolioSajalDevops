import React from 'react';
import { INDUSTRIES } from '../constants';

const Industries: React.FC = () => {
  const marqueeItems = [...INDUSTRIES, ...INDUSTRIES, ...INDUSTRIES];

  return (
    <section className="py-24 border-y border-text/5 bg-surface/20 overflow-hidden relative backdrop-blur-sm">
      <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-background to-transparent z-10" />
      
      <div className="flex w-full">
        <div className="flex animate-marquee whitespace-nowrap gap-20">
          {marqueeItems.map((industry, i) => (
            <div
              key={`${industry}-${i}`}
              className="group flex items-center gap-4 cursor-default relative"
            >
              <span 
                className="text-4xl md:text-6xl font-display font-bold text-transparent transition-all duration-500 uppercase tracking-tighter"
                style={{ WebkitTextStroke: '1px var(--text-muted)' }}
              >
                {industry}
              </span>
              <span 
                className="absolute inset-0 text-4xl md:text-6xl font-display font-bold text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-tighter blur-sm"
              >
                {industry}
              </span>
               <span 
                className="absolute inset-0 text-4xl md:text-6xl font-display font-bold text-text opacity-0 group-hover:opacity-100 transition-opacity duration-300 uppercase tracking-tighter"
              >
                {industry}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 50s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Industries;