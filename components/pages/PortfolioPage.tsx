import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Github, Calendar, Clock, ArrowRight, Code, Smartphone, Database, Globe } from 'lucide-react';
import SEO from '../SEO';
import { PROJECTS } from '../../constants';

const PortfolioPage: React.FC = () => {
  const navigate = useNavigate();

  // const handleCaseStudyClick = (projectId: string) => {
  //   const caseStudyRoutes: Record<string, string> = {
  //     '1': '/case-study/angelmonkey',
  //     '2': '/case-study/plationathome', 
  //     '3': '/case-study/cms',
  //     '4': '/case-study/tripatakaland'
  //   };
    
  //   const route = caseStudyRoutes[projectId];
  //   if (route) {
  //     navigate(route);
  //   }
  // };
  const handleCaseStudyClick = () => {
  alert('Detailed case study coming soon.');
  };

  const techIcons: Record<string, React.ElementType> = {
    'Next.js': Code,
    'React': Code,
    'Angular': Code,
    'Laravel': Database,
    'Node.js': Database,
    'MySQL': Database,
    'MongoDB': Database,
    'Stripe': Code,
    'Socket.io': Globe,
    'AWS': Globe,
    'Tailwind': Code
  };

  return (
    <>
      <SEO
        title="Project Portfolio | Senior DevOps Engineer | AWS Cloud Infrastructure"
        description="Explore cloud infrastructure, DevOps automation, platform engineering, and AWS projects delivered by Sajal Rastogi."        url="https://sajalrastogi.com/project-portfolio"
        keywords={[
          'project portfolio',
          'web development projects bihar',
          'full stack developer portfolio gaya',
          'software engineer projects bihar',
          'react projects bihar',
          'next.js projects gaya',
          'e-commerce development bihar',
          'business websites bihar',
          'custom software bihar',
          'devops engineer portfolio',
          'portfolio sajal rastogi',
          'aws cloud engineer portfolio'
        ]}
        breadcrumbs={[
          { name: 'Home', url: 'https://sajalrastogi.com/' },
          { name: 'Project Portfolio', url: 'https://sajalrastogi.com/project-portfolio' }
        ]}
      />

      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-text mb-6">
              Project <span className="text-primary">Portfolio</span>
            </h1>
            <p className="text-xl text-text-muted max-w-3xl mx-auto mb-8">
              Showcasing cloud infrastructure, DevOps automation, platform engineering, and reliability initiatives delivered across enterprise and government environments. Each project demonstrates expertise in AWS, Kubernetes, Infrastructure as Code, and modern DevOps practices.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 text-sm text-text-muted">
              <div className="flex items-center gap-2">
                <Code size={16} className="text-primary" />
                <span>50+ Production Deployments</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-primary" />
                <span>AWS Cloud Platforms</span>
              </div>
              <div className="flex items-center gap-2">
                <Database size={16} className="text-primary" />
                <span>DevOps & Platform Engineering</span>
              </div>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {PROJECTS.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group bg-surface border border-text/10 rounded-xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-lg"
              >
                {/* Project Image */}
                <div className="relative h-64 bg-gradient-to-br from-primary/10 via-violet-500/10 to-fuchsia-500/10 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary text-black text-xs font-bold rounded-full">
                      {project.category}
                    </span>
                  </div>

                  {/* View Case Study Button */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCaseStudyClick(project.id)}
                      className="px-4 py-2 bg-white/90 text-black rounded-lg font-semibold text-sm hover:bg-white transition-colors flex items-center gap-2"
                    >
                      View Case Study <ArrowRight size={14} />
                    </button>
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-text mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-text-muted mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tech.map((tech, techIndex) => {
                      const IconComponent = techIcons[tech] || Code;
                      return (
                        <div
                          key={techIndex}
                          className="flex items-center gap-1 px-3 py-1 bg-text/5 rounded-full text-xs font-medium text-text"
                        >
                          <IconComponent size={12} />
                          {tech}
                        </div>
                      );
                    })}
                  </div>

                  {/* Project Actions */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={() => handleCaseStudyClick(project.id)}
                      className="text-primary hover:text-primary/80 font-semibold text-sm flex items-center gap-2 transition-colors"
                    >
                      Read Case Study <ArrowRight size={14} />
                    </button>
                    
                    <div className="flex items-center gap-3">
                      <button className="w-8 h-8 rounded-full bg-text/10 hover:bg-text/20 flex items-center justify-center transition-colors">
                        <Github size={16} className="text-text" />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-text/10 hover:bg-text/20 flex items-center justify-center transition-colors">
                        <ExternalLink size={16} className="text-text" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Skills & Technologies */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-display font-bold text-text text-center mb-12">
              Technologies & Skills
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'AWS', icon: Globe, color: 'text-orange-400' },
                { name: 'Terraform', icon: Code, color: 'text-purple-500' },
                { name: 'Docker', icon: Globe, color: 'text-blue-400' },
                { name: 'Kubernetes', icon: Globe, color: 'text-blue-500' },
                { name: 'Jenkins', icon: Code, color: 'text-red-500' },
                { name: 'ECS', icon: Globe, color: 'text-orange-500' },
                { name: 'EKS', icon: Globe, color: 'text-cyan-500' },
                { name: 'CloudFront', icon: Globe, color: 'text-indigo-500' },
                { name: 'Aurora PostgreSQL', icon: Database, color: 'text-green-500' },
                { name: 'Redis', icon: Database, color: 'text-red-500' },
                { name: 'Linux', icon: Code, color: 'text-yellow-500' },
                { name: 'Git', icon: Code, color: 'text-orange-600' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + index * 0.05 }}
                  className="flex flex-col items-center p-4 bg-surface border border-text/10 rounded-lg hover:border-primary/30 transition-all group"
                >
                  <tech.icon size={32} className={`${tech.color} mb-2 group-hover:scale-110 transition-transform`} />
                  <span className="text-sm font-medium text-text">{tech.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-center bg-gradient-to-r from-primary/10 to-violet-500/10 rounded-xl p-12"
          >
            <h2 className="text-3xl font-display font-bold text-text mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl text-text-muted mb-8 max-w-2xl mx-auto">
              Let's discuss your requirements and create a custom solution that drives results for your business in Bihar and beyond.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('openClientInfoModal'))}
                className="px-8 py-4 bg-primary text-black rounded-lg font-semibold hover:bg-primary/90 transition-colors"
              >
                Start Your Project
              </button>
              <button
                onClick={() => navigate('/services')}
                className="px-8 py-4 border border-text/20 text-text rounded-lg font-semibold hover:bg-text/5 transition-colors"
              >
                View Services
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default PortfolioPage;