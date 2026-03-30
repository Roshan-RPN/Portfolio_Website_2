import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Layout, Target, Workflow, Headphones } from 'lucide-react';

const services = [
  {
    icon: Bot,
    title: "AI Automation Systems",
    desc: "Intelligent workflows that eliminate repetitive work.",
    color: "#4FD1C5", // Teal
    items: [
      "Automates daily operations",
      "Reduces human dependency",
      "Minimizes errors",
      "Saves hours every week"
    ]
  },
  {
    icon: Layout,
    title: "High-Converting Websites",
    desc: "Websites designed to turn visitors into leads.",
    color: "#9F7AEA", // Purple
    items: [
      "Conversion-focused design",
      "Fast, responsive, modern UI",
      "Clear user journey flow",
      "Built to capture and qualify leads"
    ]
  },
  {
    icon: Target,
    title: "Lead Capture & Follow-Up Systems",
    desc: "Never miss a potential customer again.",
    color: "#48BB78", // Green
    items: [
      "Automated lead capture",
      "Instant response systems",
      "Follow-up sequences",
      "CRM integration ready"
    ]
  },
  {
    icon: Workflow,
    title: "Workflow Optimization Systems",
    desc: "Structured processes that remove bottlenecks.",
    color: "#ED8936", // Orange
    items: [
      "Connects tools and operations",
      "Reduces delays",
      "Improves team efficiency",
      "Scales smoothly with growth"
    ]
  },
  {
    icon: Headphones,
    title: "AI Reception & Customer Handling",
    desc: "24/7 intelligent interaction system.",
    color: "#F56565", // Red
    items: [
      "Instant replies to inquiries",
      "Handles repetitive customer queries",
      "Improves customer experience",
      "Captures and qualifies leads automatically"
    ]
  }
];

export const SolutionSection: React.FC = () => {
  return (
    <section id="services" className="relative min-h-[100dvh] w-full bg-midnight overflow-hidden py-24 flex flex-col justify-center">
      <div className="relative z-10 max-w-[1300px] mx-auto px-4 lg:px-6 w-full flex flex-col items-center">
        <div className="text-center mb-12 shrink-0 w-full">
          <motion.h2 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="h2-section mb-8"
          >
            WHAT I <span className="text-electric">BUILD</span> FOR YOUR BUSINESS
          </motion.h2>
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-neon/60 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
          >
            Five focused systems designed to remove bottlenecks, capture more opportunities, 
            and help your business operate with less friction.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4 w-full justify-center lg:max-w-[1200px]">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group relative flex flex-col h-full"
            >
              {/* Card Container */}
              <div 
                className="relative flex flex-col h-full glass-card p-5 border-white/5 transition-all duration-500 backdrop-blur-xl overflow-hidden group-hover:scale-[1.02] shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]"
                style={{ 
                  backgroundColor: `${service.color}08`,
                  borderColor: `${service.color}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${service.color}60`;
                  e.currentTarget.style.boxShadow = `0 0 40px ${service.color}30`;
                  e.currentTarget.style.backgroundColor = `${service.color}15`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${service.color}20`;
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.backgroundColor = `${service.color}08`;
                }}
              >
                {/* Background Shading Glow */}
                <div 
                  className="absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 group-hover:opacity-50 transition-all duration-700"
                  style={{ backgroundColor: service.color }}
                />

                {/* Top Icon with Color Box */}
                <div 
                  className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center mb-4 lg:mb-6 border transition-all duration-500 group-hover:scale-110"
                  style={{ 
                    backgroundColor: `${service.color}20`, 
                    borderColor: `${service.color}50`,
                    color: service.color,
                    boxShadow: `0 0 15px ${service.color}30`
                  }}
                >
                  <service.icon className="w-5 h-5 lg:w-6 lg:h-6 group-hover:text-white transition-colors" />
                </div>

                {/* Title & Description */}
                <h3 
                  className="text-lg lg:text-xl font-display mb-2 leading-tight transition-all duration-500 group-hover:scale-105 origin-left tracking-tight min-h-[2.5rem]"
                  style={{ color: 'var(--neon)' }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = service.color)}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--neon)')}
                >
                  {service.title}
                </h3>
                <p className="text-neon/60 text-xs lg:text-sm mb-6 lg:mb-8 leading-relaxed group-hover:text-neon/90 transition-colors">
                  {service.desc}
                </p>

                {/* Bullet Points in Darker Box */}
                <div className="mt-auto space-y-1.5 lg:space-y-2">
                  {service.items.map((item, i) => (
                    <div 
                      key={i} 
                      className="p-2 lg:p-2.5 rounded-md bg-black/60 border border-white/5 text-[9px] lg:text-[10px] uppercase tracking-wide font-mono text-neon/80 leading-snug group-hover:border-white/20 group-hover:text-white transition-all duration-300 shadow-inner"
                      style={{ borderLeft: `3px solid ${service.color}` }}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Full Element Brightening Overlay on Hover */}
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{ 
                    background: `radial-gradient(circle at center, ${service.color}44, transparent 70%)` 
                  }}
                />

                {/* Subtle Color Accent at Bottom */}
                <div 
                  className="absolute bottom-0 left-0 w-full h-1 opacity-30 group-hover:opacity-100 transition-all duration-500"
                  style={{ 
                    backgroundColor: service.color,
                    boxShadow: `0 0 30px ${service.color}`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
