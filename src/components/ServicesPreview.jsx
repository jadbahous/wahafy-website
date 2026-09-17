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
    <section className="bg-ink text-white py-28 md:py-36 border-t border-white/[0.08]">
      <div className="section-wrap grid lg:grid-cols-12 gap-12 lg:gap-8">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={servicesPreview.eyebrow} heading={servicesPreview.heading} cta={servicesPreview.cta} max="22ch" className="lg:sticky lg:top-28" />
        </div>

        <ul className="lg:col-span-8 border-t border-white/10">
          {servicesPreview.items.map((s, i) => (
            <motion.li key={s.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce}>
              <Link
                to="/services"
                className="group grid grid-cols-[auto_1fr_auto] items-center gap-5 md:gap-8 py-6 md:py-7 border-b border-white/10 hover:border-white/30 transition-colors duration-300"
              >
                <span className="font-display text-[12px] tabular-nums text-white/30 group-hover:text-white/60 transition-colors duration-300">
                  0{i + 1}
                </span>
                <span className="min-w-0">
                  <span className="block font-display font-semibold text-[20px] md:text-[24px] leading-tight tracking-[-0.02em] text-white">
                    {s.title}
                  </span>
                  <span className="block mt-1.5 text-[14.5px] leading-relaxed text-white/50 max-w-[54ch]">{s.text}</span>
                </span>
                <span className="grid place-items-center w-10 h-10 rounded-full border border-white/[0.12] text-white/50 group-hover:text-black group-hover:bg-white group-hover:border-white transition-[color,background-color,border-color] duration-300">
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.8} />
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
