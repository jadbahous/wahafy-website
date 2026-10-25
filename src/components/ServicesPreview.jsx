import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { servicesPreview } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

// Five service categories as one hairline list — a table of contents for
// the Services page rather than five more cards.
export default function ServicesPreview() {
  return (
    <section className="bg-bg text-fg py-28 md:py-36 border-t border-fg/[0.08]">
      <div className="section-wrap">
        <SectionHeading heading={servicesPreview.heading} cta={servicesPreview.cta} max="20ch" className="mb-14 md:mb-20" />

        <ul className="border-t border-fg/10">
          {servicesPreview.items.map((s, i) => (
            <motion.li key={s.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <Link
                to="/services"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8 py-6 md:py-7 border-b border-fg/10 hover:border-fg/35 transition-colors duration-300"
              >
                <span className="font-display text-[13.5px] font-medium tabular-nums text-fg/60 group-hover:text-fg transition-colors duration-300">
                  0{i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-[20px] md:text-[24px] leading-tight tracking-[-0.02em] text-fg">
                    {s.title}
                  </span>
                  <span className="block mt-1.5 text-[15px] leading-relaxed text-fg/70 max-w-[54ch]">{s.text}</span>
                </span>
                <span className="grid place-items-center w-11 h-11 rounded-full border border-fg/[0.14] text-fg/70 group-hover:text-bg group-hover:bg-fg group-hover:border-fg transition-[color,background-color,border-color] duration-300">
                  <ArrowUpRight className="w-4 h-4 transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-px group-hover:-translate-y-px" strokeWidth={1.8} />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
