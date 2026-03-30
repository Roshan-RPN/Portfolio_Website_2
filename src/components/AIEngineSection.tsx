import React from 'react';
import { motion } from 'framer-motion';
import { Database, Network, Share2, Terminal } from 'lucide-react';

const features = [
  { icon: Database, title: "Data Processing", desc: "High-speed data ingestion and cleaning for AI model training." },
  { icon: Network, title: "Neural Networks", desc: "Custom deep learning architectures optimized for specific business logic." },
  { icon: Share2, title: "API Integration", desc: "Seamless connectivity between AI models and your existing software ecosystem." },
  { icon: Terminal, title: "Custom Logic", desc: "Bespoke automation scripts that handle complex decision-making processes." }
];

export const AIEngineSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-midnight py-32 overflow-hidden">
      <div className="relative z-10 max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-7xl font-display text-neon mb-6"
          >
            The <span className="text-electric">AI Engine</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neon/60 max-w-2xl mx-auto text-lg"
          >
            Powering the next generation of business intelligence with 
            cutting-edge neural architectures and automated workflows.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-10 group hover:bg-electric/5 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <div className="w-14 h-14 rounded-xl bg-electric/10 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-electric" />
                </div>
                <div>
                  <h3 className="text-2xl font-display text-neon mb-3">{feature.title}</h3>
                  <p className="text-neon/60 leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Central Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-electric/10 blur-[150px] rounded-full -z-10 pointer-events-none" />
      </div>
    </section>
  );
};
