import { useEffect, useRef, useState } from 'react';
import {
  animate,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion';
import { ArrowRight, Clock, MessageCircle, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { hero } from '../data.js';
import FluidField from './FluidField.jsx';

// The dive. One tall section pins the viewport while a spring-smoothed
// scroll value (0..1) drives everything at once: the fluid field pushes
// forward and down, and three scenes hand off to each other —
//
//   01  the headline, split top-left / bottom-right over the field
//   02  three big numbers that count up as they arrive
//   03  what the site does, one line at a time
//
// — before the section releases into the normal page. The CTA bar and the
// corner labels stay put the whole way down; the site still has to sell.

const stats = [
  { icon: Clock, label: 'Live in days — not months' },
  { icon: MessageCircle, label: 'AI concierge, answering 24/7' },
  { icon: MapPin, label: 'Qatar-built, for Qatar businesses' },
];

const numbers = [
  { value: 24, suffix: '/7', label: 'Answering questions and capturing leads, around the clock.' },
  { value: 100, suffix: '%', label: 'Of enquiries logged and sent to you the moment they land.' },
  { value: 4, suffix: '', label: 'Steps from the first call to a live, connected site.' },
];

const lines = ['Answers questions.', 'Books appointments.', 'Follows up — automatically.'];

const scenes = ['01', '02', '03'];

function CountUp({ value, suffix, active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const ctrl = animate(0, value, {
      duration: 1.3,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => ctrl.stop();
  }, [active, value]);
  return (
    <span className="tabular-nums">
      {n}
      <span className="text-white/55">{suffix}</span>
    </span>
  );
}

export default function Hero() {
  const wrapRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [scene, setScene] = useState(0);
  const [shared, setShared] = useState(false);

  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] });
  const progress = useSpring(scrollYProgress, { stiffness: 70, damping: 22, mass: 0.5 });

  useMotionValueEvent(progress, 'change', (v) => {
    const s = v < 0.24 ? 0 : v < 0.58 ? 1 : 2;
    setScene((prev) => (prev === s ? prev : s));
  });

  // Scene 01 — headline
  const aOpacity = useTransform(progress, [0, 0.12, 0.22], [1, 1, 0]);
  const aLine1Y = useTransform(progress, [0, 0.22], [0, -120]);
  const aLine2Y = useTransform(progress, [0, 0.22], [0, 120]);
  const aSubOpacity = useTransform(progress, [0, 0.1, 0.16], [1, 1, 0]);
  const aSubScale = useTransform(progress, [0, 0.16], [1, 0.94]);
  const metaOpacity = useTransform(progress, [0, 0.08, 0.14], [1, 1, 0]);

  // Scene 02 — numbers
  const bOpacity = useTransform(progress, [0.24, 0.32, 0.5, 0.58], [0, 1, 1, 0]);
  const bY = useTransform(progress, [0.24, 0.32, 0.5, 0.58], [70, 0, 0, -70]);

  // Scene 03 — lines
  const cOpacity = useTransform(progress, [0.58, 0.64, 0.9, 1], [0, 1, 1, 0]);
  const l1 = useTransform(progress, [0.6, 0.68], [40, 0]);
  const l1o = useTransform(progress, [0.6, 0.68], [0, 1]);
  const l2 = useTransform(progress, [0.66, 0.74], [40, 0]);
  const l2o = useTransform(progress, [0.66, 0.74], [0, 1]);
  const l3 = useTransform(progress, [0.72, 0.8], [40, 0]);
  const l3o = useTransform(progress, [0.72, 0.8], [0, 1]);
  const lineYs = [l1, l2, l3];
  const lineOs = [l1o, l2o, l3o];

  const barWidth = useTransform(progress, [0, 1], ['0%', '100%']);

  const v = (style) => (prefersReducedMotion ? undefined : style);

  async function share() {
    const url = window.location.origin;
    try {
      if (navigator.share) {
        await navigator.share({ title: 'Wahafy', text: 'Websites that sell while you sleep.', url });
      } else {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 1600);
      }
    } catch {}
  }

  return (
    <section ref={wrapRef} className="relative bg-ink" style={{ height: prefersReducedMotion ? '100vh' : '520vh' }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        <FluidField progress={prefersReducedMotion ? null : progress} />
        <div className="noise-overlay" />

        <div className="relative z-10 flex flex-col h-full px-6 md:px-10 lg:px-14">
          {/* Top meta row */}
          <motion.div
            style={v({ opacity: metaOpacity })}
            className="pt-24 md:pt-28 flex items-center justify-between gap-6 text-[11px] uppercase tracking-[0.16em] text-white/45"
          >
            <span className="inline-flex items-center gap-2">
              <span className="relative inline-flex w-1.5 h-1.5 rounded-full bg-white/70">
                <span className="absolute inset-0 rounded-full bg-white/70 animate-ping" />
              </span>
              Scroll to explore
            </span>
            <div className="hidden sm:flex items-center gap-7 normal-case tracking-normal">
              {stats.map((s) => (
                <span key={s.label} className="inline-flex items-center gap-2 text-[12.5px] text-white/50">
                  <s.icon className="w-3.5 h-3.5 text-white/40" strokeWidth={1.7} />
                  {s.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Scenes */}
          <div className="relative flex-1">
            {/* 01 — headline */}
            <motion.div
              style={v({ opacity: aOpacity })}
              className="absolute inset-0 flex flex-col justify-between py-10 md:py-12"
            >
              <motion.h1
                style={v({ y: aLine1Y })}
                className="font-display font-semibold text-white text-[clamp(2.3rem,10vw,6.4rem)] leading-[0.95] tracking-[-0.04em] max-w-[16ch]"
              >
                Websites that
              </motion.h1>
              <motion.p
                style={v({ opacity: aSubOpacity, scale: aSubScale })}
                className="mx-auto max-w-[420px] text-center text-[14.5px] md:text-[15.5px] leading-relaxed text-white/55"
              >
                {hero.sub}
              </motion.p>
              <motion.h1
                style={v({ y: aLine2Y })}
                className="self-end font-display font-semibold text-white text-[clamp(2.5rem,11vw,7.2rem)] leading-[0.95] tracking-[-0.04em] text-right max-w-[20ch]"
              >
                sell while you sleep.
              </motion.h1>
            </motion.div>

            {/* 02 — numbers */}
            {!prefersReducedMotion && (
              <motion.div
                style={{ opacity: bOpacity, y: bY }}
                className="absolute inset-0 flex flex-col justify-center"
                aria-hidden={scene !== 1}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-8 md:mb-12">
                  What it does, in numbers
                </p>
                <div className="grid sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-12">
                  {numbers.map((n) => (
                    <div key={n.label} className="border-t border-white/15 pt-6">
                      <div className="font-display font-semibold text-white text-[clamp(3.6rem,9vw,7.5rem)] leading-none tracking-[-0.045em]">
                        <CountUp value={n.value} suffix={n.suffix} active={scene === 1} />
                      </div>
                      <p className="mt-4 max-w-[28ch] text-[14px] md:text-[15px] leading-relaxed text-white/55">
                        {n.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* 03 — lines */}
            {!prefersReducedMotion && (
              <motion.div
                style={{ opacity: cOpacity }}
                className="absolute inset-0 flex flex-col justify-center"
                aria-hidden={scene !== 2}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-6 md:mb-8">Your site, working</p>
                <div className="flex flex-col gap-1 md:gap-2">
                  {lines.map((line, i) => (
                    <motion.h2
                      key={line}
                      style={{ y: lineYs[i], opacity: lineOs[i] }}
                      className={`font-display font-semibold text-[clamp(2.2rem,7.5vw,5.6rem)] leading-[1.02] tracking-[-0.04em] ${
                        i === 2 ? 'text-white' : 'text-white/85'
                      }`}
                    >
                      {line}
                    </motion.h2>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Bottom bar */}
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
            <div className="hidden sm:flex items-center gap-6 text-[12px] uppercase tracking-[0.14em] text-white/35">
              <button type="button" onClick={share} className="hover:text-white transition-colors duration-200">
                {shared ? 'Link copied' : 'Share'}
              </button>
              <span className="whitespace-nowrap">Doha, Qatar</span>
            </div>
          </div>
        </div>

        {/* Scene indicator — right edge */}
        {!prefersReducedMotion && (
          <div className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-end gap-3">
            {scenes.map((s, i) => (
              <span
                key={s}
                className={`font-display text-[11px] tracking-[0.14em] transition-colors duration-300 ${
                  scene === i ? 'text-white' : 'text-white/25'
                }`}
              >
                {s}
              </span>
            ))}
            <span className="mt-2 w-px h-16 bg-white/10 relative overflow-hidden">
              <motion.span style={{ height: barWidth }} className="absolute top-0 left-0 w-full bg-white/70" />
            </span>
          </div>
        )}
      </div>
    </section>
  );
}
