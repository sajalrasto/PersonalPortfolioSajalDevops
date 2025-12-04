import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import MagneticButton from './ui/MagneticButton';
import { 
  Terminal, 
  Code2, 
  Globe, 
  Zap, 
  Layout, 
  GitBranch, 
  Command,
  Search,
  MessageSquare,
  MoreHorizontal,
  Lock,
  Cpu,
  Activity,
  ArrowUpRight
} from 'lucide-react';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ 
    target: containerRef, 
    offset: ["start start", "end start"] 
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Smooth spring for mouse parallax interaction could be added here
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[140vh] flex flex-col pt-32 md:pt-48 overflow-hidden px-6"
    >
      {/* Background Ambience */}
      <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-violet/20 blur-[120px] rounded-full pointer-events-none mix-blend-screen opacity-50 dark:opacity-100" />
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/10 blur-[100px] rounded-full pointer-events-none mix-blend-screen opacity-50 dark:opacity-100" />
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center">
        
        {/* Text Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-text/10 bg-surface/50 text-text-muted text-xs font-mono mb-8 backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span>Available for hire</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl font-display font-bold text-text leading-[1.0] tracking-tighter mb-8"
          >
            Crafting Digital <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-text via-text to-text-muted">
              Experiences.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-text-muted text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Full-stack engineering meets premium design. I build scalable applications 
            and immersive interfaces that define the next generation of the web.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-6 justify-center"
          >
            <MagneticButton 
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-text text-background hover:bg-primary hover:text-black font-bold h-14 px-8 text-base"
            >
              View Work
            </MagneticButton>
            <div className="flex items-center gap-4 text-sm font-mono text-text-muted">
              <span className="w-1 h-1 bg-text-muted rounded-full" />
              <span>Available for projects</span>
            </div>
          </motion.div>
        </div>

        {/* 3D Dashboard Interface Visual */}
        <motion.div 
          style={{ 
            rotateX: rotateX, 
            scale: scale,
            y: y,
            opacity: opacity
          }}
          className="relative w-full max-w-[1200px] perspective-1000"
        >
          {/* Main Window Frame */}
          <div className="relative bg-surface rounded-2xl border border-white/10 dark:border-white/5 shadow-2xl dark:shadow-[0_0_100px_-20px_rgba(139,92,246,0.15)] overflow-hidden">
            
            {/* Window Header / Toolbar */}
            <div className="h-14 border-b border-white/5 bg-surface-highlight flex items-center px-6 justify-between">
               <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-black/10" />
                  <div className="w-3 h-3 rounded-full bg-[#28C840] border border-black/10" />
               </div>
               
               <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-black/5 dark:bg-black/40 border border-black/5 dark:border-white/5 text-xs font-mono text-text-muted">
                  <Lock size={10} className="text-text-muted" />
                  <span>vishwjeet.me/dashboard</span>
               </div>
               
               <div className="flex gap-4">
                  <MoreHorizontal size={16} className="text-text-muted" />
               </div>
            </div>

            {/* Application Content */}
            <div className="flex h-[500px] md:h-[700px]">
               
               {/* Sidebar */}
               <div className="hidden md:flex w-64 border-r border-white/5 bg-surface flex-col p-4 justify-between">
                  <div className="space-y-6">
                     <div className="px-2">
                        <div className="text-xs font-mono uppercase text-text-muted mb-4 tracking-wider">Vishwjeet Workspace</div>
                        <div className="space-y-1">
                           <SidebarItem active icon={Layout} label="Overview" />
                           <SidebarItem icon={Globe} label="Deployments" />
                           <SidebarItem icon={Activity} label="Analytics" />
                           <SidebarItem icon={GitBranch} label="Git Integration" />
                        </div>
                     </div>
                     <div className="px-2">
                        <div className="text-xs font-mono uppercase text-text-muted mb-4 tracking-wider">Projects</div>
                        <div className="space-y-1">
                           <SidebarItem icon={Code2} label="E-commerce API" />
                           <SidebarItem icon={Zap} label="SaaS Dashboard" />
                           <SidebarItem icon={Terminal} label="Dev Tools" />
                        </div>
                     </div>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-violet/10 border border-white/5">
                     <div className="text-xs font-bold text-text mb-1">System Status</div>
                     <div className="flex items-center gap-2 text-[10px] text-green-400 font-mono">
                        <span className="relative flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
                        </span>
                        All systems operational
                     </div>
                  </div>
               </div>

               {/* Main Canvas Area */}
               <div className="flex-1 bg-background p-6 md:p-10 overflow-hidden relative">
                  {/* Grid Background */}
                  <div className="absolute inset-0 opacity-[0.05]" 
                       style={{ backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px', color: 'var(--text)' }} 
                  />

                  <div className="relative z-10 max-w-4xl mx-auto">
                     <div className="flex justify-between items-end mb-8">
                        <div>
                           <h3 className="text-2xl font-bold text-text mb-1">Active Deployments</h3>
                           <p className="text-sm text-text-muted">Manage your latest builds and integrations</p>
                        </div>
                        <button className="px-4 py-2 bg-text text-background rounded-lg text-sm font-bold flex items-center gap-2 hover:opacity-90 transition-opacity">
                           <Zap size={14} /> New Project
                        </button>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <ProjectCard 
                           title="Angel Monkey Store" 
                           status="Live" 
                           branch="main" 
                           framework="Next.js" 
                           color="bg-primary"
                        />
                        <ProjectCard 
                           title="Plantation At Home App" 
                           status="Building" 
                           branch="feat/auth" 
                           framework="Angular" 
                           color="bg-fuchsia-500"
                        />
                        <ProjectCard 
                           title="College Management System" 
                           status="Deployed" 
                           branch="production" 
                           framework="Angular" 
                           color="bg-violet-500"
                        />
                        <ProjectCard 
                           title="Tripataka Land Travel" 
                           status="Live" 
                           branch="main" 
                           framework="Angular" 
                           color="bg-green-500"
                        />
                        <ProjectCard 
                           title="Let's Do It" 
                           status="Waiting for Approval" 
                           branch="main" 
                           framework="Customer Choice" 
                           color="bg-purple-500"
                        />
                     </div>
                     
                     {/* Floating Code Snippet Overlay */}
                     <motion.div 
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute -bottom-20 -right-10 w-80 p-6 rounded-2xl bg-surface/90 backdrop-blur-xl border border-white/10 shadow-2xl hidden lg:block"
                     >
                        <div className="flex items-center gap-2 mb-4 border-b border-white/5 pb-2">
                           <Terminal size={14} className="text-text-muted" />
                           <span className="text-xs font-mono text-text-muted">terminal</span>
                        </div>
                        <div className="font-mono text-xs space-y-2">
                           <div className="text-text-muted">$ npm run build</div>
                           <div className="text-green-400">✓ Compiled successfully</div>
                           <div className="text-text-muted">
                              <span className="text-blue-400">info</span> - Generating static pages (4/4)
                           </div>
                           <div className="text-text-muted">
                              <span className="text-blue-400">info</span> - Finalizing page optimization...
                           </div>
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>
          </div>
          
          {/* Reflection Gradient beneath the window */}
          <div className="absolute -bottom-20 left-4 right-4 h-20 bg-gradient-to-b from-white/5 to-transparent blur-2xl rounded-[100%]" />
        </motion.div>

      </div>
    </section>
  );
};

const SidebarItem = ({ active, icon: Icon, label }: { active?: boolean, icon: any, label: string }) => (
   <div className={`flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all ${active ? 'bg-text/5 text-text' : 'text-text-muted hover:text-text hover:bg-text/5'}`}>
      <Icon size={16} />
      <span className="text-sm font-medium">{label}</span>
   </div>
);

const ProjectCard = ({ title, status, branch, framework, color }: any) => (
   <div className="group p-5 rounded-xl bg-surface-highlight border border-white/5 hover:border-white/10 hover:bg-text/5 transition-all cursor-pointer">
      <div className="flex justify-between items-start mb-4">
         <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg ${color}/20 flex items-center justify-center text-text`}>
               <Layout size={18} />
            </div>
            <div>
               <div className="text-text font-medium text-sm">{title}</div>
               <div className="text-text-muted text-xs">{framework}</div>
            </div>
         </div>
         <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-text/5 border border-white/5">
            <div className={`w-1.5 h-1.5 rounded-full ${status === 'Building' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'}`} />
            <span className="text-[10px] text-text-muted uppercase tracking-wide">{status}</span>
         </div>
      </div>
      <div className="flex items-center justify-between text-xs font-mono text-text-muted group-hover:text-text transition-colors">
         <div className="flex items-center gap-1.5">
            <GitBranch size={12} />
            <span>{branch}</span>
         </div>
         <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <ArrowUpRight size={12} />
         </div>
      </div>
   </div>
);

export default Hero;