import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { MeshGradient } from '@paper-design/shaders-react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { hero } from '../data.js';

const title = hero.headline.join(' ');
const words = title.split(' ');

const letterAnimation = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const containerAnimation = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.028, delayChildren: 0.5 } },
};

const capabilities = ['AI Concierge', 'Lead Capture', 'Live Booking', 'WhatsApp Automation', 'Analytics'];

export default function Hero() {
  const containerRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const enter = () => setIsActive(true);
    const leave = () => setIsActive(false);
    el.addEventListener('mouseenter', enter);
    el.addEventListener('mouseleave', leave);
    return () => {
      el.removeEventListener('mouseenter', enter);
      el.removeEventListener('mouseleave', leave);
    };
  }, []);

  return (
    <section id="top" ref={containerRef} className="relative min-h-screen bg-ink overflow-hidden w-full pt-[72px]">
      <svg className="absolute inset-0 w-0 h-0">
        <defs>
          <filter id="glass-effect" x="-50%" y="-50%" width="200%" height="200%">
            <feTurbulence baseFrequency="0.004" numOctaves="1" result="noise" />
            <feDisplacementMap in="SourceGraphic" in2="noise" scale="0.25" />
            <feColorMatrix type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.9 0" />
          </filter>
        </defs>
      </svg>

      <MeshGradient
        className="absolute inset-0 w-full h-full"
        colors={['#0C0C0C', '#141414', '#C9973A', '#0C0C0C']}
        speed={isActive ? 0.42 : 0.22}
        backgroundColor="#0C0C0C"
      />
      <MeshGradient
        className="absolute inset-0 w-full h-full opacity-30"
        colors={['#0C0C0C', '#C9973A', '#1C1C1C']}
        speed={isActive ? 0.28 : 0.14}
        wireframe
        backgroundColor="transparent"
      />

      {/* Fine grid overlay for texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Vignette so foreground text always reads clean */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 35%, #0C0C0C 88%)' }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center text-center min-h-[calc(100vh-72px)] px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 px-4 py-1.5 rounded-full bg-white/10 text-white/90 text-[13px] font-medium flex items-center gap-2 backdrop-blur-lg border border-white/15"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold" />
          {hero.eyebrow}
        </motion.div>

        <motion.h1
          variants={containerAnimation}
          initial="hidden"
          animate="visible"
          className="font-display font-semibold text-white text-[11vw] leading-[1.04] tracking-tightest md:text-[4.6vw] md:leading-[1.05] max-w-[18ch] flex flex-wrap justify-center gap-x-[0.26em]"
        >
          {words.map((word, wi) => (
            <span key={wi} className="inline-flex whitespace-nowrap">
              {word.split('').map((char, ci) => (
                <motion.span key={ci} variants={letterAnimation}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.35, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-[46ch] text-[17px] md:text-[18px] leading-relaxed text-white/60"
        >
          {hero.sub}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button asChild size="lg" variant="white" className="group">
            <a href={hero.primaryCta.href}>
              {hero.primaryCta.label}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.85, duration: 0.8 }}
          className="mt-20 flex flex-wrap justify-center gap-x-8 gap-y-3 border-t border-line pt-8 w-full max-w-3xl"
        >
          {capabilities.map((c) => (
            <span key={c} className="text-[13px] tracking-wide text-white/40 flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-gold" />
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
