import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, CheckCircle2, Loader2, X } from 'lucide-react';

// Google Forms submission endpoint
const GFORM_ENDPOINT =
  'https://docs.google.com/forms/u/0/d/e/1FAIpQLSedBuRZ_tuPZ4HKnjlBWiRO2LWJXhjqBQFtvhlNHE7Fea7fXQ/formResponse';

export const ContactSection: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    website: '',
    message: ''
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const body = new URLSearchParams({
        'entry.2028550378': formState.name,
        'entry.1234954647': formState.email,
        'entry.2010441668': formState.phone,
        'entry.610720882':  formState.company,
        'entry.437828099':  formState.website,
        'entry.1893818565': formState.message,
      });
      // Google Forms requires no-cors; the response is always opaque — we treat the fetch completing as success
      await fetch(GFORM_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      setStatus('success');
      setFormState({ name: '', phone: '', email: '', company: '', website: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="relative w-full min-h-screen bg-[#050505] py-24 overflow-hidden flex items-center justify-center">

      {/* ── Success Confirmation Modal ── */}
      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            key="success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backdropFilter: 'blur(16px)', background: 'rgba(3,3,3,0.75)' }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1,    opacity: 1, y: 0 }}
              exit={{ scale: 0.85,    opacity: 0, y: 30 }}
              transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              className="relative bg-[#0A0B10] border border-white/10 rounded-3xl p-10 max-w-md w-full text-center shadow-[0_0_80px_rgba(0,210,255,0.12)]"
            >
              {/* Close */}
              <button
                onClick={() => setStatus('idle')}
                className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 18 }}
                className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#00D2FF]/10 border border-[#00D2FF]/30 flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8 text-[#00D2FF]" />
              </motion.div>

              <h3 className="text-2xl font-display font-bold text-white mb-3">Message Sent!</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-8">
                Thanks for reaching out. I'll review your inquiry and get back to you within <span className="text-[#00D2FF] font-semibold">24 hours</span>.
              </p>

              <button
                onClick={() => setStatus('idle')}
                className="bg-[#00D2FF] hover:bg-[#00B4FF] text-black font-bold px-8 py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(0,210,255,0.2)] hover:shadow-[0_0_30px_rgba(0,210,255,0.4)] hover:scale-[1.02]"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-electric/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1300px] w-full mx-auto px-6 relative z-10">
        
        {/* Main Card Container */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-[1200px] bg-[#0A0B10] border border-white/5 rounded-[2rem] md:rounded-[3rem] p-6 text-sm md:p-8 lg:p-10 shadow-2xl flex flex-col relative overflow-hidden"
        >
          {/* Subtle Inner Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-electric/[0.02] via-transparent to-transparent pointer-events-none" />

          {/* SHARED HEADING — full width above both columns */}
          <div className="mb-6 relative z-10 shrink-0">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-electric text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest mb-3 block"
            >
              Get In Touch
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-display uppercase tracking-tight text-white leading-tight"
            >
              Start Your System{' '}
              <span className="text-electric">Transformation</span>
            </motion.h2>
          </div>

          {/* TWO COLUMNS — equal height, bottoms aligned */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 flex-1 relative z-10">

            {/* LEFT COLUMN */}
            <div className="flex-1 flex flex-col">

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/70 text-base md:text-lg max-w-md leading-relaxed mb-6"
              >
                Let's turn repetitive work into a clear, scalable system built around your business.
              </motion.p>

              {/* dual CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-3 mb-6"
              >
                <button className="bg-[#00D2FF] hover:bg-[#00B4FF] text-black font-semibold px-8 py-3.5 rounded-lg transition-colors text-sm shadow-[0_0_20px_rgba(0,210,255,0.2)]">
                  Book a Discovery Call
                </button>
                <button className="bg-transparent border box-border border-white/10 hover:border-white/30 text-white font-medium px-4 py-3.5 rounded-lg transition-colors text-sm">
                  Send Project Details
                </button>
              </motion.div>

              {/* Direct Contact Card — pushed to bottom */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-[#12141D] border border-white/5 rounded-2xl p-6 flex flex-col gap-5 shadow-inner mt-auto"
              >
                <h3 className="text-[#00D2FF] text-[10px] font-mono font-bold uppercase tracking-widest">
                  Direct Contact
                </h3>
                <div className="space-y-5">
                  <div className="group cursor-pointer">
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-1">Email</p>
                    <p className="text-white/90 text-sm md:text-base group-hover:text-electric transition-colors">roshanrpn01@gmail.com</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-1">Phone</p>
                    <p className="text-white/90 text-sm md:text-base group-hover:text-electric transition-colors">9947648028</p>
                  </div>
                  <div className="group cursor-pointer">
                    <p className="text-white/60 text-xs font-mono uppercase tracking-widest mb-1">LinkedIn</p>
                    <p className="text-white/90 text-sm md:text-base group-hover:text-electric transition-colors">linkedin.com/in/roshan-p-nambisan</p>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* RIGHT COLUMN: Project Inquiry Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex-[1.2] bg-[#12141D] border border-white/5 rounded-[2rem] p-6 md:p-10 relative flex flex-col h-full overflow-y-auto custom-scrollbar"
          >
            {/* Header / Badge */}
            <div className="flex justify-between items-start mb-4 gap-4">
              <div>
                <h3 className="text-[#00D2FF] text-[10px] font-mono font-bold uppercase tracking-widest mb-4">
                  Project Inquiry
                </h3>
                <h2 className="h2-section leading-tight">
                  Tell me what you want to <br className="hidden sm:block"/> automate
                </h2>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 text-white/70 text-[10px] font-mono whitespace-nowrap hidden sm:block">
                Fast response
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 flex-grow">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-xs font-medium">Name *</label>
                  <div className={`relative rounded-xl bg-[#0A0B10] border transition-colors duration-300 ${focusedField === 'name' ? 'border-[#00D2FF]/50' : 'border-transparent hover:border-white/10'}`}>
                    <input 
                      type="text" required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      onFocus={() => setFocusedField('name')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none"
                      placeholder="Your full name"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-xs font-medium">Phone number *</label>
                  <div className={`relative rounded-xl bg-[#0A0B10] border transition-colors duration-300 ${focusedField === 'phone' ? 'border-[#00D2FF]/50' : 'border-transparent hover:border-white/10'}`}>
                    <input 
                      type="tel" required
                      value={formState.phone}
                      onChange={(e) => setFormState({...formState, phone: e.target.value})}
                      onFocus={() => setFocusedField('phone')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none"
                      placeholder="Your phone number"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-xs font-medium">Email *</label>
                  <div className={`relative rounded-xl bg-[#0A0B10] border transition-colors duration-300 ${focusedField === 'email' ? 'border-[#00D2FF]/50' : 'border-transparent hover:border-white/10'}`}>
                    <input 
                      type="email" required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      onFocus={() => setFocusedField('email')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none"
                      placeholder="Your email address"
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div className="flex flex-col gap-2">
                  <label className="text-white/60 text-xs font-medium">Company name</label>
                  <div className={`relative rounded-xl bg-[#0A0B10] border transition-colors duration-300 ${focusedField === 'company' ? 'border-white/30' : 'border-transparent hover:border-white/10'}`}>
                    <input 
                      type="text" 
                      value={formState.company}
                      onChange={(e) => setFormState({...formState, company: e.target.value})}
                      onFocus={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                      className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none"
                      placeholder="Your company name"
                    />
                  </div>
                </div>
              </div>

              {/* Company Website */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Company website</label>
                <div className={`relative rounded-xl bg-[#0A0B10] border transition-colors duration-300 ${focusedField === 'website' ? 'border-white/30' : 'border-transparent hover:border-white/10'}`}>
                  <input 
                    type="url" 
                    value={formState.website}
                    onChange={(e) => setFormState({...formState, website: e.target.value})}
                    onFocus={() => setFocusedField('website')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none"
                    placeholder="https://yourcompany.com"
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label className="text-white/60 text-xs font-medium">Message *</label>
                <div className={`relative rounded-xl bg-[#0A0B10] border transition-colors duration-300 ${focusedField === 'message' ? 'border-[#00D2FF]/50' : 'border-transparent hover:border-white/10'}`}>
                  <textarea 
                    required rows={3}
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none resize-none h-24"
                    placeholder="What do you want to automate or improve?"
                  />
                </div>
              </div>

              {/* Footer row */}
              <div className="mt-auto pt-6 flex justify-end">
                <button
                  type="submit"
                  disabled={status === 'submitting' || status === 'success'}
                  className="btn-primary w-full disabled:opacity-60"
                >
                  {status === 'submitting' ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Sending...</>
                  ) : status === 'success' ? (
                    <><CheckCircle2 className="w-4 h-4" /> Message Sent!</>
                  ) : (
                    'Submit'
                  )}
                </button>
              </div>

            </form>
          </motion.div>
          </div>{/* end two-column row */}
        </motion.div>

        {/* Global Footer (Outside Main Form Box) */}
        <footer className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-[#00D2FF]/10 flex items-center justify-center text-[#00D2FF] font-display font-bold text-lg border border-[#00D2FF]/20">R</div>
            <p className="text-white/40 text-[11px] font-mono tracking-widest uppercase">© 2026 Roshan P Nambisan.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="text-white/60 hover:text-[#00D2FF] transition-colors text-[10px] font-mono uppercase tracking-widest">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-[#00D2FF] transition-colors text-[10px] font-mono uppercase tracking-widest">Terms of Service</a>
          </div>
        </footer>

      </div>
    </section>
  );
};
