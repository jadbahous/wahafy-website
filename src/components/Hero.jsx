import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Clock, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { hero } from '../data.js';
import AuroraField from './AuroraField.jsx';

// A scroll-pinned hero, inspired by mesh3d.gallery: a full-bleed animated
// field behind oversized, asymmetric two-line type (one line upper-left,
// one lower-right) with a small centered line of copy between them. As the
// visitor scrolls, the headline pulls apart and fades while the field
// drifts in — a "dive" into the rest of the site — then releases into the
// normal page flow. The CTA row stays put throughout: this still has to
// convert.

const stats = [
  { icon: Clock, label: 'Live in days — not months' },
  { icon: MessageCircle, label: 'AI concierge, answering 24/7' },
  { icon: MapPin, label: 'Qatar-built, for Qatar businesses' },
];

export default function Hero() {
  const wrapRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ['start start', 'end start'],
  });

  const line1Y = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const line2Y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const linesOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const subScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.94]);
  const metaOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  return (
    <section ref={wrapRef} className="relative bg-ink" style={{ height: prefersReducedMotion ? '100vh' : '220vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
        <motion.div className="absolute inset-0" style={prefersReducedMotion ? undefined : { scale: fieldScale }}>
          <AuroraField />
        </motion.div>
        <div className="noise-overlay" />

        <div className="relative z-10 flex flex-col h-full px-6 md:px-10 lg:px-14">
          <motion.div
            style={prefersReducedMotion ? undefined : { opacity: metaOpacity }}
            className="pt-24 md:pt-28 flex items-center justify-between gap-6 text-[11px] uppercase tracking-[0.16em] text-white/40"
          >
            <span>Scroll to explore</span>
            <div className="hidden sm:flex items-center gap-7 normal-case tracking-normal">
              {stats.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-2 text-[12.5px] text-white/45">
                  <s.icon className="w-3.5 h-3.5 text-white/35" strokeWidth={1.7} />
                  {s.label}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col justify-between py-10 md:py-12">
            <motion.h1
              style={prefersReducedMotion ? undefined : { y: line1Y, opacity: linesOpacity }}
              className="font-display font-semibold text-white text-[clamp(2.3rem,10vw,6.4rem)] leading-[0.95] tracking-[-0.04em] max-w-[16ch]"
            >
              Websites that
            </motion.h1>

            <motion.p
              style={prefersReducedMotion ? undefined : { opacity: subOpacity, scale: subScale }}
              className="mx-auto max-w-[420px] text-center text-[14.5px] md:text-[15.5px] leading-relaxed text-white/50"
            >
              {hero.sub}
            </motion.p>

            <motion.h1
              style={prefersReducedMotion ? undefined : { y: line2Y, opacity: linesOpacity }}
              className="self-end font-display font-semibold text-white text-[clamp(2.5rem,11vw,7.2rem)] leading-[0.95] tracking-[-0.04em] text-right max-w-[20ch]"
            >
              sell while you sleep.
            </motion.h1>
          </div>

          <div className="border-t border-white/10 py-6 md:py-7 flex items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg" variant="gradient" className="group h-[42px] px-[18px]">
                <Link to={hero.primaryCta.href}>
                  {hero.primaryCta.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-[42px] px-[18px]">
                <Link to={hero.secondaryCta.href}>{hero.secondaryCta.label}</Link>
              </Button>
            </div>
            <span className="hidden sm:block text-[12px] uppercase tracking-[0.14em] text-white/30 whitespace-nowrap">
              Doha, Qatar
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
