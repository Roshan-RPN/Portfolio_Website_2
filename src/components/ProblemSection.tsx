import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { acquireLock, releaseLock } from '../utils/scrollLock';
import {
  AlertCircle,
  Hand,
  Unplug,
  Timer,
  Droplets,
  ZapOff,
  UserX,
  TrendingDown,
  Database,
  DollarSign,
  Clock,
  ShieldAlert
} from 'lucide-react';

const problems = [
  {
    icon: Hand, 
    title: "Manual Work Dependency", 
    desc: "Your team is stuck in constant manual effort." 
  },
  { 
    icon: Unplug, 
    title: "No Centralized System", 
    desc: "Tools, data, and workflows are disconnected." 
  },
  {
    icon: Database,
    title: "Siloed Data",
    desc: "Key metrics are trapped in disconnected spreadsheets."
  },
  {
    icon: ShieldAlert,
    title: "Compliance Risk",
    desc: "Manual entry creates inevitable human error."
  },
  {
    icon: Timer,
    title: "Inefficient Processes",
    desc: "Tasks take longer than they should."
  },
  {
    icon: Droplets,
    title: "Lead Leakage",
    desc: "Potential customers are not tracked properly."
  },
  {
    icon: ZapOff,
    title: "Lack of Automation",
    desc: "Repetitive operations consume your time."
  },
  {
    icon: UserX,
    title: "Poor Customer Handling",
    desc: "No structured system to respond consistently."
  },
  {
    icon: TrendingDown,
    title: "Scaling Bottlenecks",
    desc: "Growth fails because systems can't support demand."
  },
  {
    icon: Database,
    title: "Data Without Insight",
    desc: "You collect data but don't use it effectively."
  }
];

// New metrics array
const metrics = [
  { label: "Lost Revenue", value: "$4.2M", desc: "Average annual cost of human operational drag in 7-figure businesses.", icon: DollarSign },
  { label: "Wasted Hours", value: "3,200", desc: "Hours burned yearly on manual data entry and routine coordination.", icon: Clock },
  { label: "Missed Leads", value: "40%", desc: "Inbound opportunities permanently lost due to delayed response times.", icon: ShieldAlert }
];

export const ProblemSection: React.FC = () => {
  const [count, setCount] = useState(3);
  const [isBlasted, setIsBlasted] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Handle countdown
  useEffect(() => {
    if (isInView && count > 0) {
      const timer = setTimeout(() => setCount(count - 1), 1000);
      return () => clearTimeout(timer);
    } else if (isInView && count === 0) {
      const timer = setTimeout(() => setIsBlasted(true), 1200);
      return () => clearTimeout(timer);
    }
  }, [isInView, count]);

  // Centralised scroll lock — holds while countdown plays AND while cards animate in
  useEffect(() => {
    let lockId: number | null = null;
    let unlockTimer: ReturnType<typeof setTimeout> | null = null;

    if (isInView && !isBlasted) {
      lockId = acquireLock();
      sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else if (isInView && isBlasted) {
      // Keep locked while cards stagger in, then release
      lockId = acquireLock();
      unlockTimer = setTimeout(() => {
        if (lockId !== null) releaseLock(lockId);
        lockId = null;
      }, 950);
    }

    return () => {
      if (unlockTimer) clearTimeout(unlockTimer);
      if (lockId !== null) releaseLock(lockId);
    };
  }, [isInView, isBlasted]);

  return (
    <section ref={sectionRef} className="relative min-h-screen w-full bg-[#030303] flex flex-col justify-center overflow-hidden pt-24 pb-16">
      <AnimatePresence mode="wait">
        {!isBlasted ? (
          <motion.div
            key="countdown"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{
              scale: [1, 1.2, 0.8, 5],
              opacity: 0,
              filter: ['blur(0px)', 'blur(10px)', 'blur(0px)', 'blur(100px)'],
              rotate: [0, 2, -2, 0]
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="text-center z-20 flex flex-col items-center justify-center h-full"
          >
            <motion.div
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-red-500 font-mono text-xs md:text-sm tracking-[0.5em] uppercase mb-8 flex items-center justify-center gap-4"
            >
              <AlertCircle className="w-5 h-5" />
              CRITICAL SYSTEM ANALYSIS
            </motion.div>

            <h2 className="text-neon font-display text-xl md:text-3xl mb-8 max-w-2xl mx-auto leading-tight">
              Every second your business is <span className="text-red-500">losing opportunity</span>.
            </h2>

            <motion.div
              key={count}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[10rem] md:text-[15rem] lg:text-[20rem] font-display font-bold text-red-600 leading-none drop-shadow-[0_0_50px_rgba(220,38,38,0.5)] my-4"
            >
              {count > 0 ? count : "!!!"}
            </motion.div>

            <p className="text-neon/40 font-mono text-xs mt-8 tracking-widest">
              IDENTIFYING LEAKAGE POINTS...
            </p>
          </motion.div>
        ) : (
          <motion.div
            key="problems"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col justify-center items-center h-full"
          >
            <div className="text-center mb-8 shrink-0">
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="inline-block px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] md:text-xs font-mono tracking-widest uppercase mb-4"
              >
                Diagnostic Report
              </motion.div>
              <h2 className="h2-section mb-3">
                WHAT ACTUALLY <span className="text-red-500">BREAKS</span> YOUR BUSINESS
              </h2>
              <div className="w-12 h-1 bg-red-600 mx-auto rounded-full shadow-[0_0_15px_rgba(220,38,38,0.8)]" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-2 xl:gap-3 flex-1 items-center content-center relative z-10 w-full">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.4 }}
                  whileHover={{ scale: 1.04, transition: { duration: 0.15 } }}
                  className="group relative h-full cursor-pointer"
                >
                  {/* Glow halo behind card */}
                  <div className="absolute inset-0 bg-red-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none" />
                  <div className="relative glass-card p-3 lg:p-4 h-full border border-white/10 group-hover:border-red-500/70 bg-white/[0.02] group-hover:bg-red-500/5 transition-all duration-300 flex flex-col gap-2 group-hover:shadow-[0_0_24px_rgba(239,68,68,0.3)]">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-red-600/10 group-hover:bg-red-500/30 flex items-center justify-center border border-red-600/20 group-hover:border-red-500 transition-all duration-300 group-hover:shadow-[0_0_12px_rgba(239,68,68,0.5)]">
                        <problem.icon className="w-4 h-4 text-red-500 group-hover:text-red-300 transition-colors" />
                      </div>
                      <span className="text-red-500/30 group-hover:text-red-400 font-display text-base font-bold transition-colors duration-300">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-sm lg:text-[13px] font-display font-bold text-neon group-hover:text-white mb-1 uppercase tracking-tight leading-tight transition-colors duration-300">
                        {problem.title}
                      </h3>
                      <p className="text-neon/70 group-hover:text-white/80 text-[10px] lg:text-xs leading-relaxed transition-colors duration-300">
                        {problem.desc}
                      </p>
                    </div>

                    <div className="mt-auto pt-2 flex items-center gap-2 border-t border-white/5 group-hover:border-red-500/20 transition-colors duration-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                      <span className="text-[9px] font-mono text-red-500 uppercase tracking-tighter opacity-60 group-hover:opacity-100 transition-opacity">Leakage Detected</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Urgency Accents */}
      {!isBlasted && (
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.05)_0%,transparent_70%)]" />
          <motion.div 
            animate={{ opacity: [0, 0.1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="absolute inset-0 border-[10px] border-red-600/20" 
          />
        </div>
      )}
    </section>
  );
};
