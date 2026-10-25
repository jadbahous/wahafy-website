import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import AuroraField from './AuroraField.jsx';
import { finalCta } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';

// The closing band, shared by every page except Contact. The aurora field
// bookends the hero's fluid so the site ends the way it opened.
export default function FinalCta() {
  function openChat() {
    window.dispatchEvent(new CustomEvent('marhab:open-chat'));
  }
  return (
    <section className="zone-dark relative bg-bg text-fg py-32 md:py-44 border-t border-fg/[0.08] overflow-hidden">
      <div className="absolute inset-0 opacity-60">
        <AuroraField />
      </div>
      <div className="noise-overlay" />

      <div className="section-wrap relative z-10 flex flex-col items-center text-center">
        <motion.h2
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="font-display font-semibold text-[clamp(2.3rem,6.5vw,5rem)] leading-[1.0] tracking-[-0.04em] max-w-[24ch] text-balance [text-shadow:0_2px_28px_rgba(0,0,0,0.5)]"
        >
          {finalCta.heading}
        </motion.h2>
        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-6 text-[17px] leading-relaxed text-fg/80 max-w-[36ch] [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]"
        >
          {finalCta.sub}
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link to={finalCta.primary.href} className="btn-primary group h-[52px] px-7 text-[15px]">
            {finalCta.primary.label}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" strokeWidth={2} />
          </Link>
          <button type="button" onClick={openChat} className="btn-secondary h-[52px] px-7 text-[15px] backdrop-blur-md">
            {finalCta.secondary.label}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
