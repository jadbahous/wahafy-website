import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, viewportOnce } from '../lib/motion.js';

// The one heading treatment used across every section, so the site reads as
// a single voice: an optional small label, a tight display heading, a muted
// lead. Most sections carry no label; the heading is enough, and the few
// labels that remain mean something (a page title, a demo).
// `max` is the heading's measure in its own characters (so ~16–22ch gives a
// three-line display heading); `subMax` is the lead paragraph's measure.
export default function SectionHeading({
  eyebrow,
  heading,
  sub,
  cta,
  align = 'left',
  max = '18ch',
  subMax = '52ch',
  className = '',
}) {
  const centered = align === 'center';
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      className={`${centered ? 'flex flex-col items-center text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <p className="font-display font-medium text-[12.5px] tracking-[0.16em] uppercase text-fg/65 mb-5">{eyebrow}</p>
      )}
      <h2
        className="font-display font-semibold text-[clamp(2.1rem,4.6vw,3.4rem)] leading-[1.04] tracking-[-0.03em] text-fg text-balance"
        style={{ maxWidth: max }}
      >
        {heading}
      </h2>
      {sub && (
        <p className="mt-5 text-[16.5px] leading-[1.6] text-fg/70" style={{ maxWidth: subMax }}>
          {sub}
        </p>
      )}
      {cta && (
        <Link
          to={cta.href}
          className="group mt-7 inline-flex items-center gap-2 rounded-full text-[14.5px] font-medium text-fg/85 hover:text-fg transition-colors duration-200"
        >
          {cta.label}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-1" strokeWidth={1.8} />
        </Link>
      )}
    </motion.div>
  );
}
