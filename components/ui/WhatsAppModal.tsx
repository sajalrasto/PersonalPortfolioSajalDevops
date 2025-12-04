import React, { useState } from 'react';
import { openWhatsApp } from '../../utils/whatsapp';
import { X, MessageCircle } from 'lucide-react';

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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-surface dark:bg-[#10182a] rounded-2xl shadow-2xl border border-cyan-400/20 w-full max-w-md p-8 relative animate-fade-in z-[130]">
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 text-2xl font-bold transition-colors"
        >
          &times;
        </button>
        
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
            <MessageCircle size={24} className="text-green-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-cyan-400">Schedule a Call</h2>
            <p className="text-text-muted text-sm">We'll redirect you to WhatsApp</p>
          </div>
        </div>
        
        <p className="text-text-muted text-sm mb-6">
          Please provide your details and we'll open WhatsApp for you to schedule a call.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-text mb-2">
              Your Name <span className="text-red-400">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-3 bg-background border border-cyan-400/20 focus:border-cyan-400 outline-none text-text transition-colors"
            />
          </div>
          
          <div>
            <label htmlFor="reason" className="block text-sm font-medium text-text mb-2">
              Reason for Call <span className="text-red-400">*</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              required
              placeholder="e.g., I would like to discuss my project requirements..."
              value={form.reason}
              onChange={handleChange}
              rows={4}
              className="w-full rounded-lg px-4 py-3 bg-background border border-cyan-400/20 focus:border-cyan-400 outline-none text-text resize-none transition-colors"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading || !form.name.trim() || !form.reason.trim()}
            className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 via-green-400 to-green-500 text-white font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Opening WhatsApp...
              </>
            ) : (
              <>
                <MessageCircle size={20} />
                Open WhatsApp
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default WhatsAppModal;

