import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data.js';

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] },
  }),
};

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function Services() {
  return (
    <section id="services" className="bg-ink text-white py-28 md:py-36">
      <div className="section-wrap">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="max-w-[46ch] mb-16"
        >
          <p className="font-display text-[11px] tracking-[0.18em] uppercase text-white/40 mb-5">
            {services.eyebrow}
          </p>
          <h2 className="font-display font-semibold text-[clamp(2.2rem,5vw,3.6rem)] leading-[1.02] tracking-[-0.035em]">
            {services.heading}
          </h2>
          <p className="mt-5 text-[16px] leading-relaxed text-white/55">{services.sub}</p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.tiers.map((tier, i) => (
            <motion.div
              key={tier.name}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className={`relative rounded-2xl p-9 flex flex-col ${
                tier.highlight
                  ? 'bg-panel border border-white/30 shadow-[0_0_60px_-15px_rgba(255,255,255,0.22)]'
                  : 'bg-panel/60 border border-line'
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 left-9 rounded-full bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black text-[11.5px] font-medium px-3 py-1 tracking-wide">
                  Most popular
                </span>
              )}

              <h3 className="font-display font-semibold text-[24px]">{tier.name}</h3>
              <p className="mt-1.5 text-[15px] text-white/50">{tier.tagline}</p>

              {tier.price && (
                <div className="mt-7 pt-7 border-t border-white/10">
                  <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/40 mb-1.5">From</p>
                      <p className="font-display font-semibold text-[clamp(2rem,3.4vw,2.6rem)] leading-none tracking-[-0.035em] text-white tabular-nums">
                        {tier.price.setup}
                        <span className="ml-1.5 text-[14px] font-medium tracking-normal text-white/55">QAR</span>
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-white/45">one-time setup</p>
                    </div>
                    <div className="pb-[3px]">
                      <p className="text-[11px] uppercase tracking-[0.16em] text-white/40 mb-1.5">Then</p>
                      <p className="font-display font-semibold text-[22px] leading-none tracking-[-0.03em] text-white/85 tabular-nums">
                        {tier.price.monthly}
                        <span className="ml-1 text-[12.5px] font-medium tracking-normal text-white/50">QAR / month</span>
                      </p>
                      <p className="mt-1.5 text-[12.5px] text-white/45">12-month plan</p>
                    </div>
                  </div>
                  <p className="mt-4 text-[13px] leading-relaxed text-white/45 max-w-[40ch]">
                    <span className="text-white/65">Monthly covers:</span> {tier.monthlyCovers}
                  </p>
                </div>
              )}

              <ul className="mt-8 space-y-3.5 flex-1">
                {tier.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-[14.5px] text-white/75">
                    <span className={tier.highlight ? 'text-white' : 'text-white/40'}>
                      <Check />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to={tier.cta.href}
                className={`mt-9 inline-flex items-center justify-center rounded-full text-[14.5px] font-medium px-6 py-3.5 transition-all duration-300 ${
                  tier.highlight
                    ? 'bg-gradient-to-b from-white via-[#e7e7e7] to-[#cfcfcf] text-black border border-white hover:shadow-[0_0_22px_rgba(186,208,255,0.3)]'
                    : 'border border-white/20 text-white hover:border-white/50 hover:bg-white/5'
                }`}
              >
                {tier.cta.label}
              </Link>
            </motion.div>
          ))}
        </div>

        {services.note && (
          <motion.p
            variants={fadeUp}
            custom={3}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="mt-8 text-[13px] leading-relaxed text-white/40 max-w-[78ch]"
          >
            {services.note}
          </motion.p>
        )}
      </div>
    </section>
  );
}
