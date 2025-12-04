import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  Layout, 
  GitBranch, 
  Globe, 
  Cpu, 
  Layers, 
  Terminal, 
  Box, 
  Lock 
} from 'lucide-react';

interface TechItemProps {
  label: string;
  icon: any;
  color?: string;
}

const TechItem: React.FC<TechItemProps> = ({ label, icon: Icon, color = "text-text-muted" }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-text/5 border border-text/5 hover:border-text/20 hover:bg-text/10 transition-all duration-300 group">
    <div className={`p-1.5 rounded-lg bg-surface ${color} group-hover:text-text transition-colors shadow-sm`}>
      <Icon size={16} />
    </div>
    <span className="text-sm font-medium text-text-muted group-hover:text-text transition-colors">{label}</span>
  </div>
);

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  subtitle: string;
  icon: any;
  delay?: number;
  glowColor?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ 
  children, 
  className = "", 
  title, 
  subtitle, 
  icon: Icon,
  delay = 0,
  glowColor = "from-primary/20"
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay, duration: 0.5 }}
    className={`relative group overflow-hidden p-8 rounded-3xl bg-surface border border-text/10 hover:border-primary/20 transition-colors duration-500 shadow-xl ${className}`}
  >
    {/* Hover Glow Effect */}
    <div className={`absolute -inset-px bg-gradient-to-br ${glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none blur-2xl`} />
    
    <div className="relative z-10 flex flex-col h-full">
      <div className="flex items-start justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Icon size={18} className="text-text-muted group-hover:text-text transition-colors" />
            <span className="text-xs font-mono uppercase tracking-widest text-text-muted group-hover:text-primary transition-colors">{subtitle}</span>
          </div>
          <h3 className="text-2xl font-display font-bold text-text">{title}</h3>
        </div>
        <div className="w-10 h-10 rounded-full border border-text/10 flex items-center justify-center bg-text/5 group-hover:bg-text/10 transition-colors">
          <div className="w-1.5 h-1.5 rounded-full bg-text-muted group-hover:bg-green-400 transition-colors shadow-[0_0_10px_rgba(74,222,128,0.5)]" />
        </div>
      </div>
      
      <div className="flex-1">
        {children}
      </div>
    </div>
  </motion.div>
);

const TechStack: React.FC = () => {
  return (
    <section className="py-32 px-6 relative" id="tech-stack">
      {/* Schematic Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" 
           style={{ 
             backgroundImage: 'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             color: 'var(--text)'
           }} 
      />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               className="text-primary font-mono text-xs tracking-widest uppercase mb-4 block"
            >
              The Stack
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-6xl font-display font-bold text-text leading-tight"
            >
              System <span className="text-text-muted">Architecture.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:flex items-center gap-2 text-sm text-text-muted font-mono"
          >
            <Terminal size={14} />
            <span>sys_check: optimal</span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-6">
          {/* Frontend Module - Large */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-8"
            title="Frontend Ecosystem"
            subtitle="Client Side"
            icon={Layout}
            glowColor="from-cyan-500/20"
            delay={0.1}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <TechItem label="React.js" icon={Code2} color="text-cyan-400" />
              <TechItem label="Next.js" icon={Globe} color="text-text" />
              <TechItem label="Angular" icon={Box} color="text-red-700" />
              <TechItem label="TypeScript" icon={Code2} color="text-blue-400" />
              <TechItem label="Tailwind CSS" icon={Layout} color="text-cyan-300" />
              <TechItem label="Framer Motion" icon={Layers} color="text-purple-400" />
            </div>
          </BentoCard>

          {/* Database Module - Medium */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-4"
            title="Data Persistence"
            subtitle="Storage"
            icon={Database}
            glowColor="from-yellow-500/20"
            delay={0.2}
          >
            <div className="grid grid-cols-1 gap-3">
              <TechItem label="PostgreSQL" icon={Database} color="text-blue-300" />
              <TechItem label="MongoDB" icon={Database} color="text-green-400" />
              <TechItem label="Redis" icon={Layers} color="text-red-400" />
            </div>
          </BentoCard>

          {/* Backend Module - Tall/Medium */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-5"
            title="Backend Engine"
            subtitle="Server Side"
            icon={Server}
            glowColor="from-violet-500/20"
            delay={0.3}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <TechItem label="Laravel" icon={Code2} color="text-red-500" />
              <TechItem label="Node.js" icon={Server} color="text-green-500" />
              <TechItem label="Java" icon={Globe} color="text-pink-500" />
              <TechItem label="Spring Boot" icon={Cpu} color="text-green-400" />
            </div>
          </BentoCard>

          {/* DevOps Module - Large Wide */}
          <BentoCard 
            className="md:col-span-6 lg:col-span-7"
            title="DevOps & Infrastructure"
            subtitle="Deployment"
            icon={Cloud}
            glowColor="from-fuchsia-500/20"
            delay={0.4}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <TechItem label="AWS Cloud" icon={Cloud} color="text-orange-400" />
              <TechItem label="Docker" icon={Box} color="text-blue-500" />
              <TechItem label="Kubernetes" icon={Layers} color="text-blue-400" />
              <TechItem label="CI/CD Pipelines" icon={GitBranch} color="text-text-muted" />
              <TechItem label="Security" icon={Lock} color="text-red-400" />
              <TechItem label="Nginx" icon={Server} color="text-green-500" />
            </div>
          </BentoCard>
        </div>
      </div>
    </section>
  );
};

export default TechStack;