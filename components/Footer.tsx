import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react';

const Footer: React.FC = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/sajalrasto',
      icon: Github,
      color: 'hover:text-white dark:hover:text-white',
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com/in/sajal-rastogi-5b474b6a',
      icon: Linkedin,
      color: 'hover:text-blue-500 dark:hover:text-blue-400',
    },
    {
      name: 'Email',
      url: 'mailto:sajalrastogi20@gmail.com',
      icon: Mail,
      color: 'hover:text-primary dark:hover:text-cyan-400',
    },
  ];

  return (
    <footer className="py-12 border-t border-text/10 dark:border-white/5 bg-surface/50 dark:bg-surface/30 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="text-text-muted text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Sajal Rastogi. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target={link.url.startsWith('mailto:') ? undefined : '_blank'}
                  rel={link.url.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-text-muted ${link.color} transition-all duration-300 p-3 rounded-full bg-text/5 dark:bg-white/5 hover:bg-text/10 dark:hover:bg-white/10 border border-text/10 dark:border-white/10 hover:border-text/20 dark:hover:border-white/20 hover:shadow-lg hover:shadow-primary/20 dark:hover:shadow-primary/10 group relative`}
                  aria-label={link.name}
                >
                  <Icon
                    size={20}
                    className="transition-transform duration-300 group-hover:rotate-[-5deg]"
                  />

                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-text dark:bg-white text-white dark:text-black text-xs font-medium rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                    {link.name}
                    {!link.url.startsWith('mailto:') && (
                      <ExternalLink size={10} className="inline-block ml-1" />
                    )}
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-text/5 dark:border-white/5 text-center">
          <p className="text-xs text-text-muted">
            Senior DevOps Engineer | AWS | Kubernetes | Terraform | Jenkins
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
