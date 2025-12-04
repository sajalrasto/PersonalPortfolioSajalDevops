import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-white/5 bg-surface">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-text-muted text-sm">
          &copy; {new Date().getFullYear()} Vishwjeet Kumar. Crafted with passion.
        </div>
        
        <div className="flex items-center gap-6">
          <a href="#" className="text-text-muted hover:text-text transition-colors p-2 hover:bg-text/5 rounded-full">
            <Github size={20} />
          </a>
          <a href="#" className="text-text-muted hover:text-text transition-colors p-2 hover:bg-text/5 rounded-full">
            <Linkedin size={20} />
          </a>
          <a href="mailto:contact@vishwjeet.dev" className="text-text-muted hover:text-text transition-colors p-2 hover:bg-text/5 rounded-full">
            <Mail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;