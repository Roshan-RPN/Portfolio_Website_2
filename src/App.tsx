/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VideoIntro } from './components/VideoIntro';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ProblemSection } from './components/ProblemSection';
import { SolutionSection } from './components/SolutionSection';
import { ComparisonSection } from './components/ComparisonSection';
import { PortfolioSection } from './components/PortfolioSection';
import { WorkflowSection } from './components/WorkflowSection';
import { ClosingStatement } from './components/ClosingStatement';
import { ContactSection } from './components/ContactSection';
import { NeuralBackground } from './components/NeuralBackground';

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showNeuralBg, setShowNeuralBg] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  // Scroll to top on mount and disable scroll restoration
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
    // Lock scroll while VideoIntro is visible
    document.body.style.overflow = 'hidden';
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  // When intro finishes, force jump to top EXPLICITLY before paint to ensure user's name is visible
  useLayoutEffect(() => {
    if (!showIntro) {
      // STRICT SCROLL LOCK: Keep user perfectly at the top of Hero section during animations
      // We keep it locked until Hero animations finish
      document.body.style.overflow = 'hidden';
      window.scrollTo(0, 0);

      const timer = setTimeout(() => {
        window.scrollTo(0, 0);
      }, 10);
      return () => clearTimeout(timer);
    }
  }, [showIntro]);

  // Listen for Navbar appearance (which means Hero animations finished) to unlock scroll
  useEffect(() => {
    if (showNavbar) {
      document.body.style.overflow = ''; // Allow scrolling again
    }
  }, [showNavbar]);

  // Listen for scroll to show NeuralBackground after ProblemSection
  useEffect(() => {
    const handleScroll = () => {
      const problemSection = document.getElementById('problem-section');
      if (problemSection) {
        const rect = problemSection.getBoundingClientRect();
        // Show background when problem section is mostly scrolled past
        if (rect.bottom < window.innerHeight / 2) {
          setShowNeuralBg(true);
        } else {
          setShowNeuralBg(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="bg-midnight min-h-screen relative overflow-x-hidden">
      <AnimatePresence>
        {showNeuralBg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-0 pointer-events-none"
          >
            <NeuralBackground />
          </motion.div>
        )}
      </AnimatePresence>

      {showIntro ? (
        <VideoIntro onComplete={handleIntroComplete} />
      ) : (
        <div key="main" className="relative z-10">
          <AnimatePresence>
            {showNavbar && <Navbar />}
          </AnimatePresence>
          <Hero onAnimationComplete={() => setShowNavbar(true)} />
          <div id="problem-section">
            <ProblemSection />
          </div>
          <div className="w-full h-16 bg-gradient-to-b from-[#030303] to-midnight pointer-events-none" />
          <SolutionSection />
          <div className="w-full h-16 bg-gradient-to-b from-midnight to-[#030303] pointer-events-none" />
          <ComparisonSection />
          <div className="w-full h-16 bg-gradient-to-b from-[#030303] to-midnight pointer-events-none" />
          <WorkflowSection />
          <div className="w-full h-16 bg-gradient-to-b from-[#030303] to-[#050505] pointer-events-none" />
          <PortfolioSection />
          <div className="w-full h-16 bg-gradient-to-b from-[#050505] to-midnight pointer-events-none" />
          <ClosingStatement />
          <ContactSection />
        </div>
      )}
    </main>
  );
}
