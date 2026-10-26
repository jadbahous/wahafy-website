import { motion } from 'framer-motion';
import { useCopy } from '../i18n.jsx';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

// The six steps, compressed to numeral + title + one line. The giant faint
// numerals are the existing Process signature — kept.
export default function ProcessPreview() {
  const { process, processHome } = useCopy();
  return (
    <section className="bg-bg text-fg py-28 md:py-36 border-t border-fg/[0.08]">
      <div className="section-wrap">
        <SectionHeading heading={processHome.heading} cta={processHome.cta} max="16ch" className="mb-14 md:mb-20" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-fg/10 rounded-2xl overflow-hidden" style={{ boxShadow: 'var(--shadow-1)' }}>
          {process.steps.map((s, i) => (
            <motion.div
              key={s.n}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group bg-panel p-7 md:p-8 hover:bg-matte transition-colors duration-300"
            >
              <span aria-hidden="true" data-n={s.n} className="numeral block font-display font-semibold text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.03em] text-fg/15 group-hover:text-fg/50 transition-colors duration-300 mb-4" />
              <h3 className="font-display font-semibold text-[19px] mb-2">{s.title}</h3>
              <p className="text-[14.5px] leading-relaxed text-fg/70">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
