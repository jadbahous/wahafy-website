import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import CaptureScene from './CaptureScene.jsx';
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
  const wrapperRef = useRef(null);
  const stickyRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = stickyRef.current;
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

  // Scroll progress across the tall wrapper — the visual stays pinned
  // (position: sticky) while this progresses from 0 to 1, then releases
  // naturally into the next section as the page continues scrolling.
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end start'],
  });

  const contentOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : -140]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 0.94]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  return (
    <section id="top" className="relative bg-ink">
      <div ref={wrapperRef} className="relative h-[165vh]">
        <div ref={stickyRef} className="sticky top-0 h-screen w-full overflow-hidden">
          <CaptureScene scrollYProgress={scrollYProgress} isActive={isActive} />

          {/* Readability scrim behind the headline block */}
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] max-w-[94vw] h-[620px] blur-3xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(12,12,12,0.82) 0%, rgba(12,12,12,0.5) 45%, transparent 75%)',
            }}
          />

          <motion.div
            style={{ opacity: contentOpacity, y: contentY, scale: contentScale }}
            className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 pt-[72px] pb-24"
          >
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
                <Link to={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
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
          </motion.div>

          <motion.div
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/40"
          >
            <span className="text-[11px] tracking-[0.2em] uppercase">Scroll</span>
            <motion.div
              animate={prefersReducedMotion ? {} : { y: [0, 6, 0] }}
              transition={prefersReducedMotion ? {} : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown className="w-4 h-4" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
