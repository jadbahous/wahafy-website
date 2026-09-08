import { motion } from 'framer-motion';
import { work } from '../data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Work() {
  return (
    <section id="work" className="bg-paper text-ink py-28 md:py-36">
      <div className="section-wrap">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[46ch] mb-16"
        >
          <p className="font-display text-[13px] tracking-[0.16em] uppercase text-gold-deep mb-5">
            {work.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[34px] md:text-[42px] leading-[1.08] tracking-tight">
            {work.heading}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-ink/55">{work.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {work.projects.map((p, i) => (
            <motion.a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="group rounded-2xl overflow-hidden border border-paper-line bg-white block"
            >
              <div
                className="relative h-56 md:h-64 flex items-end p-7 overflow-hidden"
                style={{
                  background: `linear-gradient(155deg, ${p.accent} 0%, #14140f 115%)`,
                }}
              >
                <div
                  className="absolute inset-0 opacity-20 transition-transform duration-700 ease-out group-hover:scale-110"
                  style={{
                    backgroundImage:
                      'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.5) 0, transparent 45%)',
                  }}
                />
                <span className="relative font-display font-semibold text-white text-[26px] leading-tight">
                  {p.name}
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-ink/45">{p.location}</span>
                  <span className="text-[12px] font-medium tracking-wide uppercase text-gold-deep">
                    {p.tier}
                  </span>
                </div>
                <p className="text-[14.5px] leading-relaxed text-ink/60 mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[12px] px-2.5 py-1 rounded-full bg-ink/5 text-ink/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-ink group-hover:text-gold-deep transition-colors duration-200">
                  View live site
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform duration-200 group-hover:translate-x-0.5">
                    <path d="M7 17 17 7M9 7h8v8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
