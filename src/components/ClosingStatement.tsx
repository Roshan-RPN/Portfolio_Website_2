import React from 'react';
import { motion } from 'framer-motion';

export const ClosingStatement: React.FC = () => {
  return (
    <section className="relative w-full bg-midnight pt-0 pb-16 md:pb-20 overflow-hidden border-y border-white/5">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="mb-4"
            >
              <h2 className="h2-section">
                THESE ARE THE FEATURES: <br />
                <span className="text-electric">SYSTEMS THAT REPLACE WORK.</span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex justify-center w-full mt-8"
            >
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="btn-primary"
              >
                Initialize Your Build
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 h-64 bg-electric/10 blur-[120px] rounded-full" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 bg-electric/10 blur-[120px] rounded-full" />
      
      {/* Scroll Indicator / End Line */}
      <motion.div 
        initial={{ height: 0 }}
        whileInView={{ height: 160 }}
        viewport={{ once: true }}
        transition={{ delay: 1, duration: 1.5 }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-px bg-gradient-to-t from-electric via-electric/20 to-transparent" 
      />
    </section>
  );
};
