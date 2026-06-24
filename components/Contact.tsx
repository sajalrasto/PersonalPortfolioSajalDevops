import React from 'react';
import MagneticButton from './ui/MagneticButton';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden" id="contact">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-surface" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           viewport={{ once: true }}
           className="mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-text/10 bg-surface text-text-muted text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Accepting new projects
          </div>
          
          <h2 className="text-6xl md:text-9xl font-display font-bold text-text tracking-tighter mb-8 leading-[0.9]">
            Let's build <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text via-text-muted to-text-muted/50">something iconic.</span>
          </h2>
        </motion.div>

        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ delay: 0.2 }}
           className="flex flex-col md:flex-row justify-center items-center gap-6"
        >
           <MagneticButton className="h-16 px-10 text-lg bg-text text-background hover:bg-primary hover:text-black font-bold flex items-center gap-3 group" onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}>
             Start a Project <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
           </MagneticButton>
           
           <button className="h-16 px-10 text-lg border border-text/20 rounded-full text-text hover:bg-text/5 font-medium flex items-center gap-3 transition-colors">
             <Mail size={20} /> sajalrastogi20@gmail.com
           </button>
        </motion.div>
        
        <div className="mt-20 pt-10 border-t border-text/10 flex flex-wrap justify-center gap-x-12 gap-y-4 text-text-muted text-sm font-mono uppercase tracking-widest">
           <span>India</span>
           <span>USA</span>
           <span>Canada</span>
           <span>Remote Worldwide</span>
        </div>
      </div>
    </section>
  );
};

export default Contact;