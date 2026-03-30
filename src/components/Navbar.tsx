import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';

const scrollTo = (id: string) => {
  const el = id === 'top' ? document.body : document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { name: 'Home',      id: 'top' },
    { name: 'Problems',  id: 'problem-section' },
    { name: 'Services',  id: 'services' },
    { name: 'Process',   id: 'process' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact',   id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    scrollTo(id);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.5 }}
      className="fixed top-0 left-0 w-full z-50 bg-midnight/80 backdrop-blur-xl border-b border-electric/20 px-6 py-4 shadow-[0_4px_30px_rgba(0,112,255,0.1)]"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <motion.button
          onClick={() => scrollTo('top')}
          whileHover={{ scale: 1.05 }}
          className="text-2xl font-display text-neon tracking-tighter cursor-pointer flex items-center gap-2 group"
        >
          <div className="w-8 h-8 bg-electric/20 rounded-lg flex items-center justify-center border border-electric/30 group-hover:bg-electric/30 transition-colors">
            <div className="w-4 h-4 bg-electric rounded-sm shadow-[0_0_10px_rgba(0,112,255,0.8)]" />
          </div>
          Roshan
        </motion.button>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.id)}
              className="relative text-xs font-sans font-semibold text-neon/60 hover:text-electric transition-all tracking-[0.2em] uppercase group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all group-hover:w-full shadow-[0_0_8px_rgba(0,112,255,0.8)]" />
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {/* Desktop CTA */}
          <motion.button
            onClick={() => handleNavClick('contact')}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 112, 255, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            className="hidden sm:flex items-center gap-3 px-6 py-2.5 bg-electric rounded-xl text-midnight font-display text-xs tracking-[0.1em] uppercase font-bold group relative overflow-hidden shadow-[0_0_20px_rgba(0,112,255,0.3)]"
          >
            <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
            Get In Touch
            <ArrowUpRight className="w-4 h-4" />
          </motion.button>

          {/* Mobile Toggle */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 lg:hidden text-white/70 hover:text-white transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden absolute top-full left-0 w-full bg-midnight/95 backdrop-blur-2xl border-b border-electric/20 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left py-3 text-lg font-display font-bold text-white/80 hover:text-electric transition-colors border-b border-white/5 uppercase tracking-widest"
                >
                  {item.name}
                </button>
              ))}
              <button
                onClick={() => handleNavClick('contact')}
                className="mt-4 w-full py-4 bg-electric text-midnight font-display font-bold uppercase tracking-widest rounded-xl text-center"
              >
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
