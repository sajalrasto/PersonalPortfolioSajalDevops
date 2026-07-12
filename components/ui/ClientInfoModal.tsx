import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Mail, Send, CheckCircle, AlertCircle, X, Sparkles } from 'lucide-react';

// EmailJS Configuration (Service: sajal_portfolio)
const EMAILJS_SERVICE_ID = 'service_uazy9ul';
const EMAILJS_TEMPLATE_ID = 'template_ge5hqnn';
const EMAILJS_PUBLIC_KEY = 'rO5HA-k6bsp4dj4n7';

interface ClientInfoModalProps {
  open: boolean;
  onClose: () => void;
}

const ClientInfoModal: React.FC<ClientInfoModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking for spotlight effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 200 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!modalRef.current) return;
    const rect = modalRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSuccess(true);
      setForm({ name: '', email: '', phone: '', message: '' });
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err) {
      setError('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formFields = [
    { id: 'name', label: 'Full Name', type: 'text', value: form.name, required: true },
    { id: 'email', label: 'Email Address', type: 'email', value: form.email, required: true },
    { id: 'phone', label: 'Phone Number', type: 'tel', value: form.phone, required: true },
  ];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[120] backdrop-blur-md"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
          />
          
          {/* Modal Container */}
          <div className="fixed inset-0 z-[130] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              ref={modalRef}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8
              }}
              onMouseMove={handleMouseMove}
              className="relative w-full max-w-lg pointer-events-auto"
            >
              {/* Animated Background Glow */}
              <motion.div
                className="absolute -inset-1 rounded-3xl opacity-30 blur-2xl"
                style={{
                  background: 'radial-gradient(circle at 50% 50%, rgba(0, 240, 255, 0.4), rgba(139, 92, 246, 0.2), transparent 70%)',
                  x,
                  y,
                }}
              />

              {/* Main Modal Card */}
              <div className="relative bg-surface/95 dark:bg-surface/90 backdrop-blur-2xl rounded-3xl border border-text/10 dark:border-white/5 shadow-2xl overflow-hidden">
                {/* Animated Gradient Border */}
                <div className="absolute inset-0 rounded-3xl opacity-50">
                  <motion.div
                    className="absolute inset-0 rounded-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(139, 92, 246, 0.1), rgba(217, 70, 239, 0.1))',
                      backgroundSize: '200% 200%',
                    }}
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: 'linear',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="relative z-10 p-8 md:p-10">
                  {/* Close Button */}
                  <motion.button
                    whileHover={{ scale: 1.1, rotate: 90 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={onClose}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-text/5 hover:bg-text/10 text-text-muted hover:text-text transition-all duration-200 group"
                    aria-label="Close modal"
                  >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-200" />
                  </motion.button>

                  {/* Header Section with Stagger Animation */}
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.5 }}
                    className="mb-8"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200, damping: 15 }}
                        className="relative"
                      >
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/20 via-cyan-400/20 to-violet-500/20 dark:from-primary/15 dark:via-cyan-400/15 dark:to-violet-500/15 border border-primary/30 dark:border-primary/20 flex items-center justify-center shadow-lg backdrop-blur-sm">
                          <Mail size={32} className="text-primary dark:text-cyan-400" />
                        </div>
                        {/* Floating particles */}
                        {[...Array(3)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-primary rounded-full"
                            animate={{
                              x: [0, Math.random() * 20 - 10],
                              y: [0, Math.random() * 20 - 10],
                              opacity: [0, 1, 0],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: i * 0.3,
                            }}
                            style={{
                              top: `${20 + i * 15}%`,
                              left: `${20 + i * 15}%`,
                            }}
                          />
                        ))}
                      </motion.div>
                      <div className="flex-1">
                        <motion.h2
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.15, duration: 0.5 }}
                          className="text-3xl font-display font-bold text-text mb-2 bg-gradient-to-r from-text via-text to-text-muted bg-clip-text"
                        >
                          Let's Connect
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="text-text-muted text-sm leading-relaxed"
                        >
                          Share your project details and I'll get back to you within 24 hours
                        </motion.p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Input Fields with Stagger */}
                    {formFields.map((field, index) => (
                      <motion.div
                        key={field.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                        className="relative"
                      >
                        <label
                          htmlFor={field.id}
                          className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                            focusedField === field.id || field.value
                              ? 'top-2 text-xs text-primary font-medium'
                              : 'top-4 text-sm text-text-muted'
                          }`}
                        >
                          {field.label}
                          {field.required && (
                            <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                          )}
                        </label>
                        <input
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          required={field.required}
                          value={field.value}
                          onChange={handleChange}
                          onFocus={() => setFocusedField(field.id)}
                          onBlur={() => setFocusedField(null)}
                          className="w-full pt-6 pb-3 px-4 rounded-xl bg-surface/90 dark:bg-surface/80 border border-text/20 dark:border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text placeholder:text-text-muted transition-all duration-300 hover:border-text/30 dark:hover:border-white/30"
                        />
                        {focusedField === field.id && (
                          <motion.div
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-cyan-400 to-primary origin-left"
                          />
                        )}
                      </motion.div>
                    ))}

                    {/* Message Field */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                      className="relative"
                    >
                      <label
                        htmlFor="message"
                        className={`absolute left-4 transition-all duration-300 pointer-events-none ${
                          focusedField === 'message' || form.message
                            ? 'top-2 text-xs text-primary font-medium'
                            : 'top-4 text-sm text-text-muted'
                        }`}
                      >
                        Project Details
                        <span className="text-red-500 dark:text-red-400 ml-1">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        value={form.message}
                        onChange={handleChange}
                        onFocus={() => setFocusedField('message')}
                        onBlur={() => setFocusedField(null)}
                        rows={5}
                        className="w-full pt-6 pb-3 px-4 rounded-xl bg-surface/90 dark:bg-surface/80 border border-text/20 dark:border-white/20 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-text placeholder:text-text-muted resize-none transition-all duration-300 hover:border-text/30 dark:hover:border-white/30"
                      />
                      {focusedField === 'message' && (
                        <motion.div
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-cyan-400 to-primary origin-left"
                        />
                      )}
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={loading}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7, duration: 0.5 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full mt-8 px-6 py-4 rounded-xl bg-gradient-to-r from-primary via-cyan-400 to-primary dark:from-primary dark:via-cyan-400 dark:to-primary text-black font-bold text-lg shadow-lg hover:shadow-xl hover:shadow-primary/40 dark:hover:shadow-primary/30 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3 group relative overflow-hidden"
                    >
                      {/* Button Shine Effect */}
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ['-100%', '100%'],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatDelay: 1,
                        }}
                      />
                      {loading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full"
                          />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} className="group-hover:translate-x-1 transition-transform" />
                          <span>Send Message</span>
                          <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                        </>
                      )}
                    </motion.button>
        </form>

                  {/* Success Message */}
                  <AnimatePresence>
                    {success && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 dark:from-green-500/5 dark:to-emerald-500/5 border border-green-500/30 dark:border-green-500/20 flex items-center gap-3 backdrop-blur-sm"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", delay: 0.2 }}
                        >
                          <CheckCircle size={24} className="text-green-500 dark:text-green-400" />
                        </motion.div>
                        <div>
                          <p className="text-green-600 dark:text-green-400 font-semibold">Message sent successfully!</p>
                          <p className="text-green-500/80 dark:text-green-400/70 text-sm">I'll get back to you within 24 hours.</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Error Message */}
                  <AnimatePresence>
                    {error && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="mt-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-rose-500/10 dark:from-red-500/5 dark:to-rose-500/5 border border-red-500/30 dark:border-red-500/20 flex items-center gap-3 backdrop-blur-sm"
                      >
                        <AlertCircle size={24} className="text-red-500 dark:text-red-400 flex-shrink-0" />
                        <p className="text-red-600 dark:text-red-400 font-medium text-sm">{error}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
      </div>
    </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default ClientInfoModal;
