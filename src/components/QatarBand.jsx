import { motion } from 'framer-motion';
import { qatar } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

// Local relevance without a single flag or skyline: the word the brand is
// named after, set in the display italic, and four plain facts about how it
// works here.
export default function QatarBand() {
  return (
    <section className="bg-bg text-fg py-28 md:py-36 border-t border-fg/[0.08]">
      <div className="section-wrap grid lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        <div className="lg:col-span-5">
          <SectionHeading eyebrow={qatar.eyebrow} heading={qatar.heading} max="14ch" />
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-8 font-display italic font-medium text-[clamp(1.3rem,2vw,1.55rem)] leading-[1.35] tracking-[-0.01em] text-fg/75 max-w-[30ch]"
          >
            {qatar.origin}
          </motion.p>
        </div>

        <div className="lg:col-span-7 grid sm:grid-cols-2 gap-px bg-fg/10 rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-1)' }}>
          {qatar.points.map((p, i) => (
            <motion.div key={p.title} variants={fadeUp} custom={i + 1} initial="hidden" whileInView="visible" viewport={viewportOnce} className="bg-panel p-7 md:p-8">
              <h3 className="font-display font-semibold text-[18px] mb-2">{p.title}</h3>
              <p className="text-[15px] leading-relaxed text-fg/70">{p.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
