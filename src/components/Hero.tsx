import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll, useMotionValueEvent, useAnimation } from 'framer-motion';
import { 
  RefreshCw, Target, TrendingUp, Clock, Mail, Linkedin, Phone, Cpu, Network, Zap, ShieldCheck
} from 'lucide-react';
import { Navbar } from './Navbar'; // Assuming Navbar component is in a separate file

// Helper component for typewriter effect on the name
const TypewriterText: React.FC<{ text: string }> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(interval);
        setIsTypingComplete(true);
      }
    }, 80); // Typing speed
    return () => clearInterval(interval);
  }, [text]);

  return (
    <>
      {displayedText}
      {!isTypingComplete && (
        <motion.span 
          animate={{ opacity: [1, 0] }}
          transition={{ duration: 0.5, repeat: Infinity }}
          className="inline-block w-1 h-8 md:h-12 lg:h-16 bg-electric ml-2 align-middle"
        />
      )}
    </>
  );
};

interface HeroProps {
  onAnimationComplete?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onAnimationComplete }) => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setHasScrolled(true);
    } else {
      setHasScrolled(false);
    }
  });

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0 });
  
  // Simplified animation control since navbar is purely scroll-driven now
  // The original `isTypingDone` state is removed, and animations for other elements
  // will now start immediately when `isInView` is true, or can be controlled
  // by a separate state if a staggered entrance is still desired.
  // For this change, we'll assume the main content animations should start
  // once the name typing is complete (which is now handled by TypewriterText internally)
  // or simply when the section is in view. Let's use a simple state for content visibility.
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (isInView) {
      // A small delay to allow the TypewriterText to start
      const timer = setTimeout(() => {
        setShowContent(true);
        // Unlock scroll shortly after hero content starts animating
        if (onAnimationComplete) {
          setTimeout(() => onAnimationComplete(), 1000);
        }
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [isInView, onAnimationComplete]);


  const features = [
    { icon: <RefreshCw className="w-5 h-5 text-electric" />, text: "Automating Workflows" },
    { icon: <Target className="w-5 h-5 text-electric" />, text: "Capturing Leads" },
    { icon: <TrendingUp className="w-5 h-5 text-electric" />, text: "Scaling Business" },
  ];

  const floatingNodes = [
    { icon: <Cpu className="w-6 h-6" />, top: "10%", left: "15%", delay: 1.5 },
    { icon: <Network className="w-6 h-6" />, top: "20%", right: "10%", delay: 1.6 },
    { icon: <Zap className="w-6 h-6" />, bottom: "30%", left: "10%", delay: 1.7 },
    { icon: <ShieldCheck className="w-6 h-6" />, bottom: "20%", right: "15%", delay: 1.8 },
  ];

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full bg-midnight flex flex-col items-center pt-24 pb-16 px-6 overflow-hidden">
      {/* Navbar controlled by scroll */}
      <AnimatePresence>
        {/* Navbar removed from here to prevent duplicate rendering with App.tsx */}
      </AnimatePresence>

      {/* 1. Typewriter Name at the Top */}
      <div className="text-center mb-8 z-20 shrink-0">
        <h1 className="h1-hero">
          <TypewriterText text="ROSHAN P NAMBISAN" />
        </h1>
      </div>

      {/* 2. Main Grid Layout */}
      <div className="relative w-full max-w-7xl grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-12 items-center z-10 flex-1">
        
        {/* Left Column: Features (Slides from Left to Right) */}
        <AnimatePresence>
          {showContent && (
            <motion.div 
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 order-2 lg:order-1"
            >
              <div>
                <h3 className="text-electric font-display text-base md:text-lg mb-4 tracking-[0.25em] uppercase border-b border-electric/20 pb-2 inline-block">
                  AI Systems Builder
                </h3>
                <div className="flex flex-col gap-4">
                  {features.map((f, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="flex items-center gap-3 group cursor-default"
                    >
                      <div className="p-2 rounded-lg bg-electric/10 border border-electric/20 group-hover:border-electric/50 transition-colors">
                        {f.icon}
                      </div>
                      <span className="text-neon/90 font-sans text-base md:text-lg font-medium group-hover:text-neon transition-colors tracking-wide">
                        {f.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.8 }}
                className="mt-2 px-8 py-4 bg-electric text-midnight font-display text-sm tracking-[0.15em] uppercase rounded-xl shadow-[0_0_25px_rgba(0,112,255,0.4)] hover:shadow-[0_0_40px_rgba(0,112,255,0.6)] transition-all font-bold self-start"
              >
                Get Your Free Audit
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Center Column: Image (Slides from Bottom to Top) */}
        <div className="flex justify-center order-1 lg:order-2">
          <AnimatePresence>
            {showContent && (
              <motion.div
                initial={{ y: 200, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.2,
                  ease: [0.16, 1, 0.3, 1]
                }}
                className="relative w-full max-w-[320px] lg:max-w-[400px] aspect-[4/5] rounded-3xl overflow-hidden border border-electric/30 shadow-[0_0_50px_rgba(0,112,255,0.2)]"
              >
                <img
                  src="/assets/Roshan 1.png"
                  alt="Roshan P Nambisan"
                  className="w-full h-full object-cover object-top transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/60 via-transparent to-transparent" />
                
                {/* Decorative corner elements */}
                <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-electric/50" />
                <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-electric/50" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Column: Contact & About (Slides from Right to Left) */}
        <AnimatePresence>
          {showContent && (
            <motion.div 
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-6 order-3"
            >
              {/* Contact Info */}
              <div className="flex flex-col gap-4 bg-midnight/40 p-5 rounded-xl border border-white/5">
                <a href="mailto:roshanrpn01@gmail.com" className="flex items-center gap-3 text-neon/80 hover:text-electric transition-all group">
                  <div className="p-2 rounded-lg bg-electric/10 border border-electric/20 group-hover:bg-electric/20 transition-colors">
                    <Mail className="w-4 h-4 text-electric" />
                  </div>
                  <span className="text-sm font-sans font-semibold tracking-wide">roshanrpn01@gmail.com</span>
                </a>
                <a href="https://www.linkedin.com/in/roshan-p-nambisan" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-neon/80 hover:text-electric transition-all group">
                  <div className="p-2 rounded-lg bg-electric/10 border border-electric/20 group-hover:bg-electric/20 transition-colors">
                    <Linkedin className="w-4 h-4 text-electric" />
                  </div>
                  <span className="text-sm font-sans font-semibold tracking-wide flex-1 truncate">
                    linkedin.com/in/roshan-p-nambisan
                  </span>
                </a>
                <div className="flex items-center gap-3 text-neon/80 group">
                  <div className="p-2 rounded-lg bg-electric/10 border border-electric/20">
                    <Phone className="w-4 h-4 text-electric" />
                  </div>
                  <span className="text-sm font-sans font-semibold tracking-wide">+91 9947648028</span>
                </div>
              </div>

              {/* About Me */}
              <div className="bg-electric/5 p-5 rounded-xl border border-electric/10">
                <h4 className="text-electric font-display text-[10px] md:text-xs tracking-[0.25em] uppercase mb-3 border-b border-electric/20 pb-1 inline-block">
                  About Me
                </h4>
                <p className="text-neon/80 font-sans text-sm md:text-base leading-relaxed font-normal">
                  Mechanical Design Engineer turned AI Systems Builder focused on transforming how businesses operate. I design complete systems that eliminate manual work, capture leads, and scale operations through engineering precision.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Bottom Quote Statement */}
      <AnimatePresence>
        {showContent && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 w-full max-w-7xl relative group shrink-0 hidden md:block"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-electric/50 to-transparent" />
            
            <div className="py-6 px-8 bg-midnight/40 backdrop-blur-xl border-x border-electric/10 relative overflow-hidden">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-electric/5 animate-pulse rounded-full blur-[80px] pointer-events-none" />
              
              <div className="relative z-10 flex flex-col items-center justify-center text-center">
                <div className="flex flex-col items-center gap-6 w-full max-w-4xl mx-auto">
                  <p className="body-xl">
                    You don't need more software. You need a frictionless system. I engineer autonomous operations that scale instantly, seamlessly tying together your chaotic data streams.
                  </p>
                  <p className="body-xl font-display font-bold text-electric italic">
                    &ldquo;Automate the routine. Humanize the exception.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="absolute -top-1 -left-1 w-3 h-3 border-t-2 border-l-2 border-electric" />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b-2 border-r-2 border-electric" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Decorative Nodes */}
      <AnimatePresence>
        {showContent && floatingNodes.map((node, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.4, y: [0, -15, 0] }}
            transition={{ 
              scale: { delay: node.delay, duration: 0.3 },
              opacity: { delay: node.delay, duration: 0.3 },
              y: { delay: node.delay, duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
            style={{ position: 'absolute', top: node.top, left: node.left, right: node.right, bottom: node.bottom }}
            className="p-3 rounded-full bg-electric/10 border border-electric/30 text-electric hidden lg:block"
          >
            {node.icon}
          </motion.div>
        ))}
      </AnimatePresence>

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};
