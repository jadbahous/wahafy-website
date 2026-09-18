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
    <section className="relative bg-ink text-white py-32 md:py-44 border-t border-white/[0.08] overflow-hidden">
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
          className="mt-6 text-[17px] leading-relaxed text-white/75 max-w-[36ch] [text-shadow:0_1px_18px_rgba(0,0,0,0.5)]"
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
          <Link
            to={finalCta.primary.href}
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black border border-white text-[15px] font-medium px-7 h-[52px] hover:shadow-[0_0_26px_rgba(186,208,255,0.4)] active:scale-[0.98] transition-[box-shadow,transform] duration-300"
          >
            {finalCta.primary.label}
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            type="button"
            onClick={openChat}
            className="inline-flex items-center rounded-full border border-white/25 bg-white/[0.04] backdrop-blur-md text-white text-[15px] font-medium px-7 h-[52px] hover:border-white/50 hover:bg-white/[0.08] active:scale-[0.98] transition-[border-color,background-color,transform] duration-300"
          >
            {finalCta.secondary.label}
          </button>
        </motion.div>
      </div>
    </section>
  );
}
