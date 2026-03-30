import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { acquireLock, releaseLock } from '../utils/scrollLock';
import { 
  Target, 
  Cpu, 
  Network, 
  Blocks, 
  Gauge, 
  Rocket 
} from 'lucide-react';

const steps = [
  { id: 1, title: "Discovery Call", desc: "Map goals & friction points.", icon: Target, color: "#00F0FF" },
  { id: 2, title: "Problem Breakdown", desc: "Surgical bottleneck analysis.", icon: Cpu, color: "#7000FF" },
  { id: 3, title: "Strategy Mapping", desc: "Architecting custom blueprint.", icon: Network, color: "#00F0FF" },
  { id: 4, title: "Build & Integrate", desc: "Engineered high-performance.", icon: Blocks, color: "#7000FF" },
  { id: 5, title: "Test & Optimize", desc: "Rigorous stress-testing.", icon: Gauge, color: "#00F0FF" },
  { id: 6, title: "Launch & Scale", desc: "Deploying scaling precision.", icon: Rocket, color: "#7000FF" }
];

export const WorkflowSection: React.FC = () => {
  // Total animation timeline: 2.0 seconds for optimal UX
  const animationDuration = 2.0;
  const pathDuration = 2.0;

  const sectionRef = useRef<HTMLDivElement>(null);
  // Trigger strictly when the middle of the section is visible so bottom boxes are easily in view
  const isInView = useInView(sectionRef, { once: true, amount: 0.6 });

  // Scroll lock strictly bounded to animation duration
  useEffect(() => {
    if (!isInView) return;
    const lockId = acquireLock();
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    const timer = setTimeout(() => releaseLock(lockId), pathDuration * 1000);
    return () => {
      clearTimeout(timer);
      releaseLock(lockId);
    };
  }, [isInView]);

  return (
    <section ref={sectionRef} id="process" className="relative w-full min-h-screen py-24 bg-[#030303] overflow-hidden font-sans flex flex-col justify-center">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16 shrink-0 z-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-[#0A0A0A] backdrop-blur-md text-[11px] font-mono text-white/60 uppercase tracking-[0.5em] mb-10 shadow-[0_0_30px_rgba(0,240,255,0.1)]"
          >
            <span className="w-2 h-2 rounded-full bg-electric animate-ping" />
            Operational Blueprint
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="h2-section mb-6"
          >
            THE CIRCUIT OF <span className="text-electric">GROWTH</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-white/60 text-xl leading-relaxed font-normal"
          >
            A systematic engineering approach extracting maximum leverage from your operations, eliminating friction points, and scaling instantly.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative w-full max-w-7xl mx-auto flex-1 flex flex-col justify-center">
          
          {/* Background Track SVG (Mobile Vertical, Desktop Horizontal) */}
          <div className="absolute inset-0 hidden md:block w-full h-full pointer-events-none z-0">
            <svg width="100%" height="100%" style={{ position: 'absolute', top: '48px', left: 0 }}>
              {/* Static Background Wire */}
              <line x1="0" y1="0" x2="100%" y2="0" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              {/* Animated Light Beam */}
              <motion.line 
                x1="0" y1="0" x2="100%" y2="0" 
                stroke="#00F0FF" strokeWidth="4" 
                className="drop-shadow-[0_0_12px_rgba(0,240,255,1)]"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: pathDuration, ease: "linear" }}
              />
            </svg>
          </div>

          <div className="absolute inset-0 md:hidden w-full h-full pointer-events-none z-0">
            <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: '32px' }}>
              <line x1="0" y1="5%" x2="0" y2="95%" stroke="rgba(255,255,255,0.05)" strokeWidth="4" />
              <motion.line 
                x1="0" y1="5%" x2="0" y2="95%" 
                stroke="#00F0FF" strokeWidth="4" 
                className="drop-shadow-[0_0_12px_rgba(0,240,255,1)]"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-150px" }}
                transition={{ duration: pathDuration, ease: "linear" }}
              />
            </svg>
          </div>

          {/* Grid of Steps */}
          <div className="grid grid-cols-1 md:grid-cols-6 relative z-10 gap-16 md:gap-4 lg:gap-8 items-stretch">
            {steps.map((step, index) => {
              // Calculate when this specific step should light up based on linear 3.5s timing.
              const nodeActivationDelay = (index / (steps.length - 1)) * pathDuration;

              return (
                <div key={step.id} className="relative flex flex-col items-center group w-full gap-4 md:gap-8 min-w-0 md:flex-1 h-full">
                  
                  {/* Node Icon Container */}
                  <motion.div 
                    initial={{ scale: 1, backgroundColor: "rgba(0,0,0,1)", borderColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" }}
                    // It stays dim until its distinct delay, then it flares up instantly and stays glowing.
                    whileInView={{ 
                      scale: [1, 1.2, 1],
                      backgroundColor: ["rgba(0,0,0,1)", "rgba(0,112,255,0.2)", "rgba(0,0,0,1)"],
                      borderColor: ["rgba(255,255,255,0.1)", "#00F0FF", "#00F0FF"],
                      color: ["rgba(255,255,255,0.3)", "#00F0FF", "#ffffff"]
                    }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ 
                      duration: 0.6, 
                      delay: nodeActivationDelay,
                      times: [0, 0.5, 1] // flare halfway
                    }}
                    className="relative w-16 h-16 md:w-24 md:h-24 flex-shrink-0 flex items-center justify-center rounded-2xl border-2 z-10 backdrop-blur-md shadow-[0_0_0_rgba(0,240,255,0)]"
                    style={{
                      // Use inline style to override box shadow during animation dynamically isn't easy, but we can stick to border color glow!
                    }}
                  >
                    <step.icon className="w-6 h-6 md:w-8 md:h-8" />
                    
                    {/* Ripple/Flash Effect underneath node */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: [0, 1, 0], scale: [0.8, 1.5, 2] }}
                      viewport={{ once: true, margin: "-150px" }}
                      transition={{ duration: 1, delay: nodeActivationDelay, ease: "easeOut" }}
                      className="absolute inset-0 rounded-2xl border-2 border-[#00F0FF] pointer-events-none"
                    />
                  </motion.div>

                  {/* Text Container Card */}
                  <motion.div 
                    initial={{ opacity: 0.3, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-150px" }}
                    transition={{ duration: 0.5, delay: nodeActivationDelay }}
                    className="relative w-full flex-1 bg-[#0A0A0A] border border-white/5 rounded-2xl p-4 md:p-6 flex flex-col justify-start gap-3 text-center items-center shadow-xl backdrop-blur-md group-hover:border-electric/30 transition-colors duration-500"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent rounded-2xl pointer-events-none" />
                    
                    <div className="font-mono text-electric text-[10px] tracking-widest uppercase bg-electric/10 px-3 py-1 rounded-full w-min whitespace-nowrap">
                      Phase_0{index + 1}
                    </div>
                    <h3 className="text-sm md:text-base font-display font-bold leading-tight uppercase tracking-tight text-white/90">
                      {step.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed max-w-[150px] mb-0 font-medium h-full">
                      {step.desc}
                    </p>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
};
