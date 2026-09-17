import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { journey } from '../data.js';
import { EASE, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

// Seven stops on one line. The line draws itself as the section scrolls
// through the viewport, and each stop lights up as the line reaches it —
// readable in five seconds, and it still reads with motion off.

export default function Journey() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 45%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  const scaleY = scaleX;
  const n = journey.steps.length;

  return (
    <section className="bg-ink text-white py-28 md:py-36 border-t border-white/[0.08] overflow-hidden">
      <div className="section-wrap">
        <SectionHeading eyebrow={journey.eyebrow} heading={journey.heading} sub={journey.sub} align="center" max="30ch" className="mb-16 md:mb-24" />

        <div ref={ref} className="relative">
          {/* Desktop: horizontal */}
          <div className="hidden md:block">
            <div className="relative h-px bg-white/10 mx-[7%]">
              <motion.div
                style={{ scaleX: prefersReducedMotion ? 1 : scaleX }}
                className="absolute inset-0 origin-left bg-gradient-to-r from-white/40 via-white to-white/40"
              />
            </div>
            <div className="grid mt-[-5px]" style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))` }}>
              {journey.steps.map((s, i) => (
                <Stop key={s} label={s} index={i} n={n} progress={progress} reduced={prefersReducedMotion} />
              ))}
            </div>
          </div>

          {/* Mobile: vertical */}
          <div className="md:hidden relative pl-8">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10">
              <motion.div
                style={{ scaleY: prefersReducedMotion ? 1 : scaleY }}
                className="absolute inset-0 origin-top bg-gradient-to-b from-white/40 via-white to-white/40"
              />
            </div>
            <ul className="flex flex-col gap-7">
              {journey.steps.map((s, i) => (
                <StopV key={s} label={s} index={i} n={n} progress={progress} reduced={prefersReducedMotion} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stop({ label, index, n, progress, reduced }) {
  const at = index / (n - 1);
  const opacity = useTransform(progress, [Math.max(0, at - 0.08), at], [0.3, 1]);
  const scale = useTransform(progress, [Math.max(0, at - 0.08), at], [0.6, 1]);
  const last = index === n - 1;
  return (
    <div className="flex flex-col items-center text-center">
      <motion.span
        style={reduced ? undefined : { scale }}
        className={`block w-[11px] h-[11px] rounded-full ${last ? 'bg-white shadow-[0_0_18px_rgba(255,255,255,0.6)]' : 'bg-white'}`}
      />
      <motion.span
        style={reduced ? undefined : { opacity }}
        className={`mt-5 text-[13px] lg:text-[14px] tracking-[-0.01em] ${last ? 'font-semibold text-white' : 'text-white/85'}`}
      >
        {label}
      </motion.span>
    </div>
  );
}

function StopV({ label, index, n, progress, reduced }) {
  const at = index / (n - 1);
  const opacity = useTransform(progress, [Math.max(0, at - 0.1), at], [0.3, 1]);
  const last = index === n - 1;
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewportOnce}
      transition={{ duration: 0.5, delay: index * 0.05, ease: EASE }}
      className="relative flex items-center gap-4"
    >
      <span className={`absolute -left-8 top-1/2 -translate-y-1/2 translate-x-[6px] w-[11px] h-[11px] rounded-full bg-white ${last ? 'shadow-[0_0_18px_rgba(255,255,255,0.6)]' : ''}`} />
      <motion.span style={reduced ? undefined : { opacity }} className={`text-[16px] ${last ? 'font-semibold text-white' : 'text-white/85'}`}>
        {label}
      </motion.span>
    </motion.li>
  );
}
