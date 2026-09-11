import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Clock, MessageCircle, MapPin, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { hero } from '../data.js';

// A single-viewport, bottom-anchored hero on pure black — badge, a
// two-line headline with one word set in Instrument Serif italic, a
// short lede, two actions, and a small stats row underneath. No video,
// no WebGL — just restrained motion on a black field with a fine grain.

const stats = [
  { icon: Clock, label: 'Live in days — not months' },
  { icon: MessageCircle, label: 'AI concierge, answering 24/7' },
  { icon: MapPin, label: 'Qatar-built, for Qatar businesses' },
];

const maskLine = {
  hidden: { y: '100%', opacity: 0 },
  visible: (delay = 0) => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
  }),
};

function fadeUp(delay = 0, y = 14) {
  return {
    hidden: { opacity: 0, y },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] } },
  };
}

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const v = (variants, delay) => (prefersReducedMotion ? { hidden: { opacity: 1 }, visible: { opacity: 1 } } : variants);

  return (
    <section id="top" className="relative bg-ink min-h-screen flex flex-col overflow-hidden">
      <div className="noise-overlay" />

      <div className="relative z-10 flex-1 flex items-end justify-center px-6 pt-28 pb-10 md:pb-14">
        <div className="w-full max-w-[860px] flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.18}
            variants={v(fadeUp(0.18))}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-md text-[12.5px] font-medium"
            style={{
              background: 'linear-gradient(90deg, #7d7d7d 0%, #2a2a2a 52%, #0a0a0a 100%)',
              color: '#f2f2f2',
              letterSpacing: '-0.01em',
            }}
          >
            <Sparkles className="w-3.5 h-3.5 text-white" style={{ filter: 'drop-shadow(0 0 3px rgba(255,255,255,0.45))' }} />
            {hero.eyebrow}
          </motion.div>

          <h1 className="font-display font-medium text-white text-[36px] sm:text-[44px] md:text-[54px] leading-[1.12] tracking-[-0.045em]">
            <span className="block overflow-hidden py-[0.06em] px-[0.15em]">
              <motion.span
                initial="hidden"
                animate="visible"
                custom={0.36}
                variants={v(maskLine)}
                className="inline-block"
              >
                Your website should{' '}
                <em
                  className="not-italic"
                  style={{
                    fontFamily: '"Instrument Serif", "Times New Roman", Times, serif',
                    fontStyle: 'italic',
                    fontWeight: 400,
                    fontSize: '1.08em',
                    letterSpacing: '-0.03em',
                    color: '#9a9a9a',
                  }}
                >
                  sell
                </em>
              </motion.span>
            </span>
            <span className="block overflow-hidden py-[0.06em] px-[0.15em]">
              <motion.span
                initial="hidden"
                animate="visible"
                custom={0.56}
                variants={v(maskLine)}
                className="inline-block"
              >
                while you sleep.
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial="hidden"
            animate="visible"
            custom={0.8}
            variants={v(fadeUp(0.8))}
            className="mt-5 max-w-[470px] text-[15.5px] leading-relaxed"
            style={{ color: '#9a9a9a', letterSpacing: '-0.015em' }}
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            custom={0.96}
            variants={v(fadeUp(0.96))}
            className="mt-7 flex flex-wrap items-center justify-center gap-3"
          >
            <Button asChild size="lg" variant="gradient" className="group h-[42px] px-[18px]">
              <Link to={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-[42px] px-[18px]">
              <Link to={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
            </Button>
          </motion.div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-5 sm:gap-10 px-6 md:px-16 pb-10 md:pb-12 max-w-wrap mx-auto w-full">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial="hidden"
            animate="visible"
            custom={1.12 + i * 0.14}
            variants={v(fadeUp(1.12 + i * 0.14))}
            className="inline-flex items-center gap-3 text-[13.5px] whitespace-nowrap"
            style={{ color: '#d8d8d8', letterSpacing: '-0.015em' }}
          >
            <s.icon className="w-[18px] h-[18px] shrink-0 text-white/70" strokeWidth={1.7} />
            {s.label}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
