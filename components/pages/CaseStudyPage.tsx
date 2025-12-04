import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Check, Layers, ExternalLink } from 'lucide-react';
import MagneticButton from '../ui/MagneticButton';
import { Project } from '../../types';

interface CaseStudyPageProps {
  onBack: () => void;
  project: Project; // In a real app, you'd fetch this by ID
}

const CaseStudyPage: React.FC<CaseStudyPageProps> = ({ onBack, project }) => {
  // Mock data if fullCaseStudy is missing
  const details = project.fullCaseStudy || {
    challenge: "The client needed a scalable, high-performance solution to handle massive traffic spikes during product launches. Existing infrastructure was crumbling under load, leading to lost revenue and frustrated users.",
    solution: "We re-architected the entire platform using a microservices approach with Next.js and Node.js. By implementing aggressive caching strategies with Redis and optimizing the database queries, we achieved sub-100ms response times.",
    results: [
      { label: "Performance Increase", value: "300%" },
      { label: "User Retention", value: "+45%" },
      { label: "Load Capacity", value: "10k/sec" },
    ],
    gallery: [
      "https://picsum.photos/800/600?random=10",
      "https://picsum.photos/800/600?random=11"
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-32 pb-20 px-6 min-h-screen bg-background"
    >
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-mono text-text-muted hover:text-primary mb-12 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>

        {/* Hero */}
        <div className="mb-20">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-mono uppercase tracking-widest border border-primary/20">
              {project.category}
            </span>
            <span className="text-text-muted text-xs font-mono">2024</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-display font-bold text-text mb-8 leading-[0.9]">
            {project.title}
          </h1>

          <div className="aspect-video w-full rounded-3xl overflow-hidden mb-12 border border-white/10 shadow-2xl relative">
             <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
          </div>

          <div className="flex flex-col md:flex-row gap-12 justify-between border-b border-white/10 pb-12">
            <div className="max-w-2xl">
              <h3 className="text-xl font-bold text-text mb-4">Overview</h3>
              <p className="text-lg text-text-muted leading-relaxed">
                {project.description}
              </p>
            </div>
            <div className="flex flex-col gap-6">
               <div>
                  <h4 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-2">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-surface-highlight rounded border border-white/5 text-sm text-text font-medium">
                        {t}
                      </span>
                    ))}
                  </div>
               </div>
               <div>
                  <h4 className="text-sm font-mono text-text-muted uppercase tracking-wider mb-2">Links</h4>
                  <a href="#" className="flex items-center gap-2 text-primary hover:underline">
                     Live Site <ExternalLink size={14} />
                  </a>
               </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <h2 className="text-3xl font-display font-bold text-text mb-6">The Challenge</h2>
              <p className="text-text-muted text-lg leading-relaxed">
                {details.challenge}
              </p>
            </section>
            
            <section>
              <h2 className="text-3xl font-display font-bold text-text mb-6">The Solution</h2>
              <p className="text-text-muted text-lg leading-relaxed mb-8">
                {details.solution}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.gallery.map((img, i) => (
                  <div key={i} className="rounded-2xl overflow-hidden border border-white/5">
                    <img src={img} alt="Detail" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4">
             <div className="sticky top-32 p-8 rounded-3xl bg-surface border border-white/5 shadow-xl">
                <h3 className="text-xl font-bold text-text mb-6 flex items-center gap-2">
                  <Layers size={20} className="text-primary" /> Key Results
                </h3>
                <div className="space-y-6">
                  {details.results.map((res, i) => (
                    <div key={i} className="pb-6 border-b border-white/5 last:border-0">
                      <div className="text-4xl font-display font-bold text-text mb-1">{res.value}</div>
                      <div className="text-sm text-text-muted">{res.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8">
                  <MagneticButton 
                    className="w-full bg-primary text-black font-bold py-4 rounded-xl"
                    onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                  >
                    Start Your Project
                  </MagneticButton>
                </div>
             </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CaseStudyPage;