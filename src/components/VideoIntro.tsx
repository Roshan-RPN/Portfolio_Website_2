import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Unlock } from 'lucide-react';

interface VideoIntroProps {
  onComplete?: () => void;
}

export const VideoIntro: React.FC<VideoIntroProps> = ({ onComplete }) => {
  const [isUnlocking, setIsUnlocking] = useState(false);

  const handleUnlock = () => {
    setIsUnlocking(true);
    // Wait for the slide-up animation to finish before unmounting
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 1200);
  };

  return (
    <AnimatePresence>
      {!isUnlocking && (
        <motion.div
          key="video-intro"
          initial={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
          exit={{ scale: 2.5, opacity: 0, filter: 'blur(20px)' }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-midnight overflow-hidden origin-center"
        >
          {/* Glassmorphism Container */}
          <div className="relative z-10 flex flex-col items-center gap-10 w-full max-w-4xl px-6">
            
            {/* Video Wrapper */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden border border-electric/30 shadow-[0_0_60px_rgba(0,112,255,0.2)] bg-black"
            >
              <div className="absolute inset-0 bg-electric/10 mix-blend-overlay pointer-events-none z-10" />
              <video 
                src="/images/Brain Animation.mp4" 
                autoPlay 
                loop 
                muted 
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Unlock Button */}
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              onClick={handleUnlock}
              className="group relative flex items-center gap-3 px-8 py-4 bg-electric/10 hover:bg-electric/20 text-electric border border-electric/50 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,112,255,0.4)]"
            >
              <Unlock className="w-5 h-5 transition-transform group-hover:scale-110 group-active:scale-95" />
              <span className="font-display font-bold tracking-widest uppercase text-base">
                Click to Unlock the system
              </span>
            </motion.button>
          </div>

          {/* Decorative Background Elements */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electric/20 rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
