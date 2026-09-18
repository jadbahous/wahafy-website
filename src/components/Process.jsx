import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { process } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

// Six steps down one line. The line fills as you scroll; each step keeps the
// giant faint numeral from the original design and adds a plain "what you
// get" so the client experience is concrete without describing our methods.
export default function Process() {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 70%', 'end 70%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 24, mass: 0.4 });
  const scaleY = useTransform(progress, [0, 1], [0, 1]);

  return (
    <section id="process" className="bg-ink text-white pt-36 md:pt-44 pb-24 md:pb-32">
      <div className="section-wrap">
        <SectionHeading eyebrow={process.eyebrow} heading={process.heading} sub={process.sub} max="16ch" subMax="46ch" className="mb-16 md:mb-24" />

        <div ref={ref} className="relative">
          <div className="absolute left-[15px] md:left-1/2 top-3 bottom-3 w-px bg-white/10 md:-translate-x-1/2">
            <motion.div style={{ scaleY: prefersReducedMotion ? 1 : scaleY }} className="absolute inset-0 origin-top bg-white" />
          </div>

          <ol className="flex flex-col gap-14 md:gap-20">
            {process.steps.map((s, i) => {
              const left = i % 2 === 0;
              return (
                <li key={s.n} className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-16">
                  <span className="absolute left-[9px] md:left-1/2 top-2 md:-translate-x-1/2 w-[13px] h-[13px] rounded-full bg-ink border-2 border-white" />
                  <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={viewportOnce}
                    className={`${left ? 'md:col-start-1 md:text-right md:pr-4' : 'md:col-start-2 md:pl-4'}`}
                  >
                    <span className="block font-display font-semibold text-[clamp(2.6rem,6vw,4.4rem)] leading-none tracking-[-0.03em] text-white/15 mb-3">
                      {s.n}
                    </span>
                    <h3 className="font-display font-semibold text-[clamp(1.5rem,2.6vw,2rem)] leading-[1.05] tracking-[-0.03em]">{s.title}</h3>
                    <p className={`mt-4 text-[15.5px] leading-relaxed text-white/70 max-w-[44ch] ${left ? 'md:ml-auto' : ''}`}>{s.text}</p>
                    <p className={`mt-4 text-[14px] leading-relaxed text-white/60 max-w-[44ch] ${left ? 'md:ml-auto' : ''}`}>
                      <span className="text-white/70">You get:</span> {s.get}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
