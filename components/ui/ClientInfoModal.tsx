
import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

// INSTRUCTIONS:
// 1. Go to https://www.emailjs.com/ and sign up for a free account.
// 2. Create an email service and email template (with fields: name, email, phone, message).
// 3. Get your Service ID, Template ID, and Public Key from EmailJS dashboard.
// 4. Replace the placeholders below with your actual values.
const EMAILJS_SERVICE_ID = 'vishwjeet_portfolio';
const EMAILJS_TEMPLATE_ID = 'template_tutkin4';
const EMAILJS_PUBLIC_KEY = 'uzl9e4vyxbqVSsS1Q';

interface ClientInfoModalProps {
  open: boolean;
  onClose: () => void;
}

const ClientInfoModal: React.FC<ClientInfoModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    } catch (err) {
      setError('Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-surface dark:bg-[#10182a] rounded-2xl shadow-2xl border border-cyan-400/20 w-full max-w-md p-8 relative animate-fade-in z-[130]">
        <button onClick={onClose} className="absolute top-4 right-4 text-cyan-400 hover:text-cyan-200 text-2xl font-bold">&times;</button>
        <h2 className="text-2xl font-bold mb-2 text-center text-cyan-400">Contact Me</h2>
        <p className="text-text-muted text-center mb-6">Fill out the form and I'll get back to you soon.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input name="name" type="text" required placeholder="Name" value={form.name} onChange={handleChange} className="rounded-lg px-4 py-3 bg-background border border-cyan-400/20 focus:border-cyan-400 outline-none text-text" />
          <input name="email" type="email" required placeholder="Email" value={form.email} onChange={handleChange} className="rounded-lg px-4 py-3 bg-background border border-cyan-400/20 focus:border-cyan-400 outline-none text-text" />
          <input name="phone" type="tel" required placeholder="Phone" value={form.phone} onChange={handleChange} className="rounded-lg px-4 py-3 bg-background border border-cyan-400/20 focus:border-cyan-400 outline-none text-text" />
          <textarea name="message" required placeholder="Message" value={form.message} onChange={handleChange} rows={4} className="rounded-lg px-4 py-3 bg-background border border-cyan-400/20 focus:border-cyan-400 outline-none text-text resize-none" />
          <button type="submit" disabled={loading} className="mt-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-400 via-sky-400 to-cyan-300 text-black font-bold text-lg shadow-lg hover:bg-cyan-400 transition disabled:opacity-60">
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
        {success && <div className="mt-4 text-green-500 text-center">Message sent! I'll get back to you soon.</div>}
        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
      </div>
    </div>
  );
};

export default ClientInfoModal;
