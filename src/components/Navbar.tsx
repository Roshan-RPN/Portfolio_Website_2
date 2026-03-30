import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

const scrollTo = (id: string) => {
  const el = id === 'top' ? document.body : document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

export const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Home',      id: 'top' },
    { name: 'Problems',  id: 'problem-section' },
    { name: 'Services',  id: 'services' },
    { name: 'Process',   id: 'process' },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Contact',   id: 'contact' },
  ];

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
        <div className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollTo(item.id)}
              className="relative text-sm font-sans font-semibold text-neon/60 hover:text-electric transition-all tracking-widest uppercase group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-electric transition-all group-hover:w-full shadow-[0_0_8px_rgba(0,112,255,0.8)]" />
            </button>
          ))}
        </div>

        {/* CTA Button */}
        <motion.button
          onClick={() => scrollTo('contact')}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0, 112, 255, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-3 px-7 py-3 bg-electric rounded-xl text-midnight font-display text-sm tracking-[0.1em] uppercase font-bold group relative overflow-hidden shadow-[0_0_20px_rgba(0,112,255,0.3)]"
        >
          <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
          Get In Touch
          <div className="p-1.5 bg-midnight/10 rounded-full group-hover:bg-midnight/20 transition-colors">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </motion.button>
      </div>
    </motion.nav>
  );
};
