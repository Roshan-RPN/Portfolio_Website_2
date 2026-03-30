import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { XCircle, CheckCircle2, Zap, AlertTriangle, ArrowRight } from 'lucide-react';
import { acquireLock, releaseLock } from '../utils/scrollLock';

const comparisonData = [
  {
    id: 1,
    title: "Time",
    manual: {
      label: "Time Drain",
      desc: "Hours wasted on repetitive manual tasks",
      icon: XCircle
    },
    system: {
      label: "Time Freedom",
      desc: "Operations run automatically with minimal effort",
      icon: CheckCircle2
    }
  },
  {
    id: 2,
    title: "Leads",
    manual: {
      label: "Missed Opportunities",
      desc: "Leads come in but are not captured or followed up",
      icon: XCircle
    },
    system: {
      label: "Every Lead Captured",
      desc: "Automated systems track, respond, and nurture leads",
      icon: CheckCircle2
    }
  },
  {
    id: 3,
    title: "Operations",
    manual: {
      label: "Inconsistent Operations",
      desc: "Processes depend on people, not structure",
      icon: XCircle
    },
    system: {
      label: "Structured Workflows",
      desc: "Everything runs through a clear, connected system",
      icon: CheckCircle2
    }
  },
  {
    id: 4,
    title: "Growth",
    manual: {
      label: "Slow Growth",
      desc: "Scaling becomes difficult and chaotic",
      icon: XCircle
    },
    system: {
      label: "Scalable Growth",
      desc: "Business grows without increasing complexity",
      icon: CheckCircle2
    }
  },
  {
    id: 5,
    title: "Accuracy",
    manual: {
      label: "High Error Rate",
      desc: "Manual work leads to mistakes and inefficiencies",
      icon: XCircle
    },
    system: {
      label: "Reduced Errors",
      desc: "Automation ensures consistency and accuracy",
      icon: CheckCircle2
    }
  },
  {
    id: 6,
    title: "Experience",
    manual: {
      label: "Poor Customer Experience",
      desc: "Delayed responses and inconsistent communication",
      icon: XCircle
    },
    system: {
      label: "Better Customer Experience",
      desc: "Instant responses and smooth interactions",
      icon: CheckCircle2
    }
  }
];

export const ComparisonSection: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  
  // Mobile-aware threshold: 0.7 for desktop, 0.3 for mobile
  const threshold = typeof window !== 'undefined' && window.innerWidth < 768 ? 0.3 : 0.7;
  const isInView = useInView(sectionRef, { amount: threshold });

  useEffect(() => {
    let lockId: number | null = null;

    if (isInView && !isActive) {
      lockId = acquireLock();
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    // When isActive becomes true, no new lock is acquired — user unlocked it

    return () => {
      if (lockId !== null) releaseLock(lockId);
    };
  }, [isInView, isActive]);

  // Premium Colors
  const premiumGreen = '#00FF9F';
  const warningRed = '#FF3E3E';

  return (
    <section ref={sectionRef} id="comparison" className="relative min-h-[100dvh] w-full bg-[#050505] overflow-hidden py-8 flex flex-col justify-center">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(${isActive ? premiumGreen : warningRed} 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-4 shrink-0 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="h2-section mb-2">
              WITH AND <span className="text-electric">WITHOUT</span> SYSTEM
            </h2>
            <p className="text-neon/60 font-sans text-xs tracking-wide">
              Manufacturing Timeline: {isActive ? 'Optimized Flow' : 'Fragmented Friction'}
            </p>
          </motion.div>
        </div>

        {/* Toggle Switch */}
        <div className="flex flex-col items-center gap-3 mb-4 shrink-0 relative z-20">
          <div className="flex items-center gap-3 p-1 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 relative">
            <span className={`text-[10px] md:text-xs font-sans font-semibold tracking-wide transition-colors duration-500 ${!isActive ? 'text-[#FF3E3E]' : 'text-white/50'}`}>WITHOUT SYSTEM</span>
            
            <button 
              onClick={() => setIsActive(!isActive)}
              className={`relative w-16 h-8 rounded-full p-1 transition-all duration-500 border ${isActive ? 'bg-[#00FF9F]/20 border-[#00FF9F]/50 shadow-[0_0_15px_rgba(0,255,159,0.3)]' : 'bg-[#FF3E3E]/20 border-[#FF3E3E]/50 shadow-[0_0_15px_rgba(255,62,62,0.3)]'}`}
            >
              <motion.div 
                animate={{ x: isActive ? 32 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className={`w-5 h-5 rounded-full flex items-center justify-center shadow-md ${isActive ? 'bg-[#00FF9F]' : 'bg-[#FF3E3E]'}`}
              >
                <Zap className={`w-3 h-3 text-black transition-transform duration-500 ${isActive ? 'rotate-0' : 'rotate-180'}`} />
              </motion.div>
            </button>

            <span className={`text-[10px] md:text-xs font-sans font-semibold tracking-wide transition-colors duration-500 ${isActive ? 'text-[#00FF9F]' : 'text-white/50'}`}>WITH SYSTEM</span>
          </div>

          <div className="relative mt-4 flex flex-col items-center">
            {/* Attention Arrow */}
            <AnimatePresence>
              {!isActive && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: [0, 5, 0] }}
                  exit={{ opacity: 0, height: 0, overflow: 'hidden' }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-full mb-2 flex flex-col items-center gap-0.5 text-[#FF3E3E]"
                >
                  <span className="text-[9px] whitespace-nowrap font-mono font-bold tracking-[0.1em] uppercase bg-[#FF3E3E]/10 px-1.5 py-0.5 rounded-sm">System Locked</span>
                  <ArrowRight className="w-4 h-4 rotate-90" />
                </motion.div>
              )}
            </AnimatePresence>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              animate={isActive ? { scale: 1, boxShadow: '0 0 20px rgba(0,255,159,0.2)' } : { scale: [1, 1.05, 1], boxShadow: ['0 0 10px rgba(255,62,62,0.4)', '0 0 30px rgba(255,62,62,0.8)', '0 0 10px rgba(255,62,62,0.4)'] }}
              transition={{ duration: 1.5, repeat: isActive ? 0 : Infinity }}
              onClick={() => !isActive && setIsActive(true)}
              className={`px-6 py-2.5 rounded-full font-mono text-xs font-bold tracking-[0.15em] uppercase transition-colors duration-700 group/btn z-10 ${
                isActive 
                  ? 'bg-[#00FF9F]/10 border border-[#00FF9F] text-[#00FF9F]' 
                  : 'bg-[#FF3E3E]/20 border-2 border-[#FF3E3E] text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full animate-ping ${isActive ? 'bg-[#00FF9F]' : 'bg-[#FF3E3E]'}`} />
                {isActive ? 'System Activated' : 'Click to Activate System'}
              </div>
            </motion.button>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 relative flex-1 items-center content-center z-10 -mt-2">
          {/* Connecting Nodes Visual */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-20">
            <svg className="w-full h-full">
              <pattern id="node-grid" width="100" height="100" patternUnits="userSpaceOnUse">
                <circle cx="50" cy="50" r="1" fill={isActive ? premiumGreen : warningRed} />
              </pattern>
              <rect width="100%" height="100%" fill="url(#node-grid)" />
            </svg>
          </div>

          {comparisonData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative group"
            >
              <div className={`h-full p-5 lg:p-6 rounded-2xl border transition-all duration-700 backdrop-blur-sm relative z-10 flex flex-col justify-center ${
                isActive 
                  ? 'bg-[#00FF9F]/[0.03] border-[#00FF9F]/20 shadow-[0_0_20px_rgba(0,255,159,0.05)]' 
                  : 'bg-[#FF3E3E]/[0.03] border-[#FF3E3E]/20 shadow-[0_0_20px_rgba(255,62,62,0.05)]'
              }`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-700 ${
                    isActive ? 'bg-[#00FF9F]/20 border-[#00FF9F]/40' : 'bg-[#FF3E3E]/20 border-[#FF3E3E]/40'
                  }`}>
                    <AnimatePresence mode="wait">
                      {!isActive ? (
                        <motion.div
                          key="manual-icon"
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                        >
                          <AlertTriangle className="w-5 h-5 text-[#FF3E3E]" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="system-icon"
                          initial={{ scale: 0, rotate: 90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: -90 }}
                        >
                          <Zap className="w-5 h-5 text-[#00FF9F]" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] md:text-xs font-mono uppercase tracking-widest transition-colors duration-700 ${isActive ? 'text-[#00FF9F]' : 'text-[#FF3E3E]'}`}>
                        {item.title}
                      </span>
                      {isActive && (
                        <motion.div 
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-1.5 h-1.5 rounded-full bg-[#00FF9F] shadow-[0_0_10px_#00FF9F]"
                        />
                      )}
                    </div>

                    <AnimatePresence mode="wait">
                      {!isActive ? (
                        <motion.div
                          key="manual-content"
                          initial={{ opacity: 0, x: -5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 5 }}
                        >
                          <h4 className="text-base lg:text-lg font-display text-[#FF3E3E] mb-1.5 leading-snug">
                            {item.manual.label}
                          </h4>
                          <p className="text-white/60 text-xs lg:text-sm leading-relaxed">
                            {item.manual.desc}
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="system-content"
                          initial={{ opacity: 0, x: 5 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -5 }}
                        >
                          <h4 className="text-base lg:text-lg font-display text-[#00FF9F] mb-1.5 leading-snug">
                            {item.system.label}
                          </h4>
                          <p className="text-[#00FF9F]/60 text-xs lg:text-sm leading-relaxed">
                            {item.system.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Node Connection Line */}
                {isActive && (
                  <motion.div 
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute -bottom-[2px] left-8 right-8 h-[2px] bg-[#00FF9F] shadow-[0_0_15px_#00FF9F] origin-left"
                  />
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Atmospheric Glow */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[1400px] rounded-full blur-[300px] transition-colors duration-1000 pointer-events-none ${isActive ? 'bg-[#00FF9F]/5' : 'bg-[#FF3E3E]/5'}`} />
    </section>
  );
};
