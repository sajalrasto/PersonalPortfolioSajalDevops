import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { openWhatsApp } from '../../utils/whatsapp';
import { MessageCircle } from 'lucide-react';

interface WhatsAppModalProps {
  open: boolean;
  onClose: () => void;
}

const WhatsAppModal: React.FC<WhatsAppModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', reason: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.reason.trim()) return;
    
    setLoading(true);
    
    // Create WhatsApp message with name and reason
    const message = `Hello! My name is ${form.name}. ${form.reason}`;
    
    // Open WhatsApp with pre-filled message
    openWhatsApp(message);
    
    // Reset form and close modal after a short delay
    setTimeout(() => {
      setForm({ name: '', reason: '' });
      setLoading(false);
      onClose();
    }, 500);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[120] flex items-center justify-center backdrop-blur-sm"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="bg-surface rounded-2xl shadow-2xl border border-text/10 dark:border-white/5 w-full max-w-md p-8 relative z-[130] backdrop-blur-xl mx-4"
          >
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-text-muted hover:text-text text-2xl font-bold transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-text/5"
          aria-label="Close modal"
        >
          &times;
        </button>
        
        {/* Header Section */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500/20 to-green-600/20 dark:from-green-500/15 dark:to-green-600/15 border border-green-500/30 dark:border-green-500/20 flex items-center justify-center shadow-lg">
            <MessageCircle size={28} className="text-green-500 dark:text-green-400" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-display font-bold text-text mb-1">Schedule a Call</h2>
            <p className="text-text-muted text-sm">We'll redirect you to WhatsApp</p>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-text-muted text-sm mb-6 leading-relaxed">
          Please provide your details and we'll open WhatsApp for you to schedule a call.
        </p>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
              Your Name <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-3 bg-surface/90 dark:bg-surface/80 border border-text/20 dark:border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text placeholder:text-text-muted transition-all duration-200"
            />
          </div>
          
          {/* Reason Field */}
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-text mb-2">
              Reason for Call <span className="text-red-500 dark:text-red-400">*</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              placeholder="e.g., I would like to discuss my project requirements..."
              value={form.reason}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-surface/90 dark:bg-surface/80 border border-text/20 dark:border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text placeholder:text-text-muted resize-none transition-all duration-200"
            />
          </div>
          
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || !form.name.trim() || !form.reason.trim()}
            className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 via-green-500 to-green-600 dark:from-green-500 dark:via-green-500 dark:to-green-600 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-green-500/30 dark:hover:shadow-green-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-lg flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Redirecting...</span>
              </>
            ) : (
              <>
                <MessageCircle size={20} />
                <span>Continue to WhatsApp</span>
              </>
            )}
          </button>
        </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppModal;

