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
    <section id="work" className="bg-ink text-white py-28 md:py-36">
      <div className="section-wrap">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[46ch] mb-16"
        >
          <p className="font-display text-[11px] tracking-[0.18em] uppercase text-white/40 mb-5">
            {work.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.035em]">
            {work.heading}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55">{work.sub}</p>
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
              className="group rounded-2xl overflow-hidden border border-line bg-panel block"
            >
              <div className="relative h-56 md:h-64 flex items-end p-7 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.imageAlt}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:ssale-110"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(180deg, ${p.accent}33 0%, #000000cc 100%)`,
                  }}
                />
                <span className="relative font-display font-semibold text-white text-[26px] leading-tight [text-shadow:0_2px_16px_rgba(0,0,0,0.35)]">
                  {p.name}
                </span>
              </div>

              <div className="p-7">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[13px] text-white/45">{p.location}</span>
                  <span className="text-[12px] font-medium tracking-wide uppercase text-gold-deep">
                    {p.tier}
                  </span>
                </div>
                <p className="text-[14.5px] leading-relaxed text-white/60 mb-5">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[12px] px-2.5 py-1 rounded-full bg-white/5 text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-6 inline-flex items-center gap-1.5 text-[14px] font-medium text-white group-hover:text-gold-deep transition-colors duration-200">
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
