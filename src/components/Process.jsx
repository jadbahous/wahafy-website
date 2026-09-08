import { motion } from 'framer-motion';
import { process } from '../data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Process() {
  return (
    <section id="process" className="bg-ink text-white py-28 md:py-36">
      <div className="section-wrap">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[46ch] mb-16"
        >
          <p className="font-display text-[13px] tracking-[0.16em] uppercase text-gold mb-5">
            {process.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[34px] md:text-[42px] leading-[1.08] tracking-tight">
            {process.heading}
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-line rounded-2xl overflow-hidden border border-line">
          {process.steps.map((s, i) => (
            <motion.div
              key={s.n}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="bg-ink p-8"
            >
              <span className="font-display text-[13px] text-gold">{s.n}</span>
              <h3 className="font-display font-semibold text-[19px] mt-4 mb-2.5">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-white/50">{s.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
