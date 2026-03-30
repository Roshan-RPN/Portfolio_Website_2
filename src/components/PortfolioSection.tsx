import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowUpRight,
  Bot,
  Globe,
  FileText,
  Database,
  Sparkles
} from 'lucide-react';

const projects = [
  {
    id: "ai-receptionist",
    title: "AI Receptionist System",
    category: "AI Receptionist System",
    status: "Live System",
    desc: "AI-powered system that handles customer interactions automatically.",
    features: [
      "Responds instantly to inquiries",
      "Captures and qualifies leads",
      "Works 24/7 without breaks",
      "Reduces manual communication workload"
    ],
    image: "/images/AI Receptionist.png",
    icon: Bot,
    color: "#00FF9F"
  },
  {
    id: "website",
    title: "High-Converting Website",
    category: "Website System",
    status: "Automation Ready",
    desc: "Strategically designed website focused on lead generation.",
    features: [
      "Built with conversion-focused structure",
      "Clear user journey and flow",
      "Optimized for engagement",
      "Designed to capture leads effectively"
    ],
    image: "/images/Website.png",
    icon: Globe,
    color: "#4285F4"
  },
  {
    id: "billing",
    title: "Automated Invoice Generator & Sender",
    category: "Billing Automation",
    status: "In Use",
    desc: "System that creates and sends invoices automatically.",
    features: [
      "Eliminates manual billing work",
      "Generates invoices instantly",
      "Sends directly to clients",
      "Reduces errors and delays"
    ],
    image: "/images/Invoice genratir.png",
    icon: FileText,
    color: "#FF3E3E"
  },
  {
    id: "scraper",
    title: "Web Scraper & Data Extraction System",
    category: "Data Extraction",
    status: "Automation Ready",
    desc: "Automated system to collect and organize required data.",
    features: [
      "Extracts targeted information quickly",
      "Saves hours of manual research",
      "Structures data for easy use",
      "Improves decision-making speed"
    ],
    image: "/images/Web Scraper.png",
    icon: Database,
    color: "#F27D26"
  }
];

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Motion values for 3D tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.8 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative bg-[#0A0A0A] border border-white/5 rounded-[2.5rem] overflow-hidden flex flex-col h-full cursor-pointer"
    >
      {/* Visual Header */}
      <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden" style={{ transform: "translateZ(30px)" }}>
        <motion.img
          animate={{ scale: isHovered ? 1.1 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-50 group-hover:opacity-70 transition-opacity"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent" />
        
        {/* Floating Icon */}
        <div className="absolute top-6 left-6" style={{ transform: "translateZ(50px)" }}>
          <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center shadow-xl">
            <project.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
          </div>
        </div>

        {/* Status Badge */}
        <div className="absolute top-6 right-6 flex gap-3" style={{ transform: "translateZ(80px)" }}>
          <span className="px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] md:text-xs font-mono text-white/60 uppercase tracking-[0.2em] hidden sm:block">
            {project.category}
          </span>
          <span className={`px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full text-[10px] md:text-xs font-mono uppercase tracking-[0.2em] ${
            project.status === 'Live System' ? 'text-[#00FF9F]' : 
            project.status === 'In Use' ? 'text-[#4285F4]' : 'text-white/40'
          }`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 lg:p-10 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
        <div className="flex items-start justify-between mb-4">
          <h3 className="h3-card group-hover:text-electric transition-colors">
            {project.title}
          </h3>
          <Sparkles className={`w-5 h-5 text-electric transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />
        </div>
        <p className="text-white/60 text-sm md:text-base mb-8 leading-relaxed font-normal">
          {project.desc}
        </p>

        {/* Feature List */}
        <div className="space-y-4 mb-8 flex-grow">
          {project.features.map((feature, fIndex) => (
            <motion.div 
              key={fIndex} 
              initial={false}
              animate={{ 
                scale: isHovered ? 1.02 : 1,
                color: isHovered ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.5)"
              }}
              transition={{ delay: fIndex * 0.05 }}
              className="flex items-center gap-4 group/item"
            >
              <div className={`w-3 h-3 rounded-full transition-all duration-500 ${isHovered ? 'bg-electric scale-125 shadow-[0_0_12px_#0070FF]' : 'bg-white/10'}`} />
              <span className="text-sm md:text-base transition-colors font-medium">
                {feature}
              </span>
            </motion.div>
          ))}
        </div>

        <div className="pt-6 border-t border-white/5 flex items-center justify-between">
          <button className="group/btn text-xs font-mono uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors flex items-center gap-3">
            Initialize System 
            <motion.div
              animate={{ scale: isHovered ? 1.2 : 1 }}
              transition={{ repeat: Infinity, duration: 1, repeatType: "reverse" }}
            >
              <ArrowUpRight className="w-4 h-4" />
            </motion.div>
          </button>
          
          <div className="hidden sm:flex gap-2">
            {[0, 1, 2].map(i => (
              <motion.div 
                key={i}
                animate={{ 
                  scale: isHovered ? [1, 1.5, 1] : 1,
                  backgroundColor: isHovered ? ["#ffffff10", "#0070FF", "#ffffff10"] : "#ffffff05"
                }}
                transition={{ delay: i * 0.1, repeat: isHovered ? Infinity : 0, duration: 2 }}
                className="w-2 h-2 md:w-3 md:h-3 rounded-full" 
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover Glow & Border */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute inset-0 pointer-events-none border-[3px] border-electric/30 rounded-[2.5rem] shadow-[inset_0_0_60px_rgba(0,112,255,0.1)]"
          />
        )}
      </AnimatePresence>

      {/* Animated Glow Effect (Replacing Sliding Shine) */}
      <motion.div
        animate={{
          opacity: isHovered ? 0.15 : 0,
          scale: isHovered ? 1.2 : 0.8,
        }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="absolute inset-0 bg-radial from-electric/40 to-transparent pointer-events-none"
      />
    </motion.div>
  );
};

export const PortfolioSection: React.FC = () => {
  return (
    <section id="portfolio" className="relative min-h-[100dvh] py-24 bg-[#050505] overflow-hidden flex flex-col justify-center">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-neon/5 blur-[150px] rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-electric/5 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-8 shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-mono text-white/60 uppercase tracking-[0.5em] mb-10"
          >
            <span className="w-2 h-2 rounded-full bg-neon animate-ping" />
            Operational Systems
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-display text-white mb-6 uppercase tracking-tight"
          >
            OPERATIONAL SYSTEMS I'VE <span className="text-electric">BUILT</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto text-white/60 text-xl leading-relaxed font-normal"
          >
            High-performance automation architectures engineered to eliminate manual friction, 
            accelerate response times, and establish autonomous business operations.
          </motion.p>
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 flex-1 items-stretch content-center mb-2 mt-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};
