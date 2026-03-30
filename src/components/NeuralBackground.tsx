import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export const NeuralBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      pulse: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.size = Math.random() * 1.5 + 0.5;
        this.pulse = Math.random() * Math.PI;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.pulse += this.pulseSpeed;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw() {
        const opacity = 0.1 + Math.sin(this.pulse) * 0.2;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(0, 112, 255, ${opacity})`;
        ctx!.fill();
        
        // Add a small glow
        if (Math.sin(this.pulse) > 0.8) {
          ctx!.shadowBlur = 10;
          ctx!.shadowColor = '#0070FF';
          ctx!.fillStyle = `rgba(0, 112, 255, 0.4)`;
          ctx!.fill();
          ctx!.shadowBlur = 0;
        }
      }
    }

    const init = () => {
      particles = [];
      const count = Math.min(Math.floor(window.innerWidth / 15), 80);
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const drawLines = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const opacity = (1 - distance / 200) * 0.15;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            
            // Flashing effect on lines
            const pulse = (Math.sin(particles[i].pulse) + Math.sin(particles[j].pulse)) / 2;
            if (pulse > 0.7) {
              ctx!.strokeStyle = `rgba(0, 112, 255, ${opacity * 3})`;
              ctx!.lineWidth = 1.2;
              
              // Occasional spark along the line
              if (Math.random() > 0.98) {
                ctx!.shadowBlur = 15;
                ctx!.shadowColor = '#0070FF';
                ctx!.strokeStyle = '#FFFFFF';
                ctx!.stroke();
                ctx!.shadowBlur = 0;
              }
            } else {
              ctx!.strokeStyle = `rgba(0, 112, 255, ${opacity})`;
              ctx!.lineWidth = 0.5;
            }
            ctx!.stroke();
          }
        }
      }
    };

    const animate = () => {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      drawLines();
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    init();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Canvas for Neural Network */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-40"
      />

      {/* Central Brain Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-electric/5 rounded-full blur-[120px]" />
      
      {/* Floating Light Orbs */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-electric rounded-full shadow-[0_0_15px_#0070FF]"
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: 0 
          }}
          animate={{ 
            opacity: [0, 0.8, 0],
            scale: [0, 2, 0],
            x: (Math.random() * 100) + "%",
            y: (Math.random() * 100) + "%",
          }}
          transition={{ 
            duration: 6 + Math.random() * 6, 
            repeat: Infinity,
            delay: Math.random() * 10,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Large Central Brain Image (Subtle but Clearer) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] opacity-[0.06] mix-blend-screen pointer-events-none select-none">
        <motion.img 
          src="https://images.unsplash.com/photo-1675557009875-436f595b189d?auto=format&fit=crop&q=80&w=1000" 
          alt="Neural Network"
          className="w-full h-full object-contain"
          referrerPolicy="no-referrer"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.04, 0.08, 0.04]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Flashing Electrical Lines (SVG) */}
      <svg className="absolute inset-0 w-full h-full opacity-30" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="spark-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#0070FF" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        
        {[...Array(10)].map((_, i) => (
          <motion.path
            key={i}
            d={`M ${40 + Math.random() * 20}% ${40 + Math.random() * 20}% L ${Math.random() * 100}% ${Math.random() * 100}%`}
            stroke="url(#spark-grad)"
            strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ 
              pathLength: [0, 1, 0], 
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 1.5 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear"
            }}
          />
        ))}
      </svg>
    </div>
  );
};
