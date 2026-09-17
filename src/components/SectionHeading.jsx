import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { fadeUp, viewportOnce } from '../lib/motion.js';

// The one heading treatment used across every section, so the site reads as
// a single voice: small tracked eyebrow, tight display heading, muted lead.
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
        <p className="font-display text-[11px] tracking-[0.18em] uppercase text-white/40 mb-5">{eyebrow}</p>
      )}
      <h2
        className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.035em] text-white text-balance"
        style={{ maxWidth: max }}
      >
        {heading}
      </h2>
      {sub && (
        <p className="mt-5 text-[16px] leading-relaxed text-white/55" style={{ maxWidth: subMax }}>
          {sub}
        </p>
      )}
      {cta && (
        <Link
          to={cta.href}
          className="group mt-7 inline-flex items-center gap-2 text-[14px] font-medium text-white/80 hover:text-white transition-colors duration-200"
        >
          {cta.label}
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </motion.div>
  );
}
