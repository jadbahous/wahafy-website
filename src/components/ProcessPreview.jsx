import { motion } from 'framer-motion';
import { process, processHome } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

// The six steps, compressed to numeral + title + one line. The giant faint
// numerals are the existing Process signature — kept.
export default function ProcessPreview() {
  return (
    <section className="bg-ink text-white py-28 md:py-36 border-t border-white/[0.08]">
      <div className="section-wrap">
        <SectionHeading eyebrow={processHome.eyebrow} heading={processHome.heading} cta={processHome.cta} max="20ch" className="mb-14 md:mb-20" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {process.steps.map((s, i) => (
            <motion.div
              key={s.n}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="group bg-ink p-7 md:p-8 hover:bg-[#0a0a0a] transition-colors duration-300"
            >
              <span className="block font-display font-semibold text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.03em] text-white/15 group-hover:text-white/30 transition-colors duration-300 mb-4">
                {s.n}
              </span>
              <h3 className="font-display font-semibold text-[19px] mb-2">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-white/50">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
