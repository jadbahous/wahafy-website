import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { services } from '../data.js';
import { fadeUp, viewportOnce } from '../lib/motion.js';
import SectionHeading from './SectionHeading.jsx';

function Check() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0 mt-0.5">
      <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Services: five categories organised around what a business receives —
// each one a row with the outcome on the left and the capabilities on the
// right — followed by the two plans.
export default function Services() {
  return (
    <>
      <section id="services" className="bg-ink text-white pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="section-wrap">
          <SectionHeading eyebrow={services.eyebrow} heading={services.heading} sub={services.sub} max="16ch" subMax="58ch" className="mb-16 md:mb-24" />

          <div className="border-t border-white/10">
            {services.categories.map((c, i) => (
              <motion.div
                key={c.n}
                variants={fadeUp}
                custom={1}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                className="grid lg:grid-cols-12 gap-8 lg:gap-10 py-12 md:py-16 border-b border-white/10"
              >
                <div className="lg:col-span-5">
                  <span className="block font-display font-semibold text-[clamp(2.4rem,5vw,3.6rem)] leading-none tracking-[-0.03em] text-white/15 mb-5">
                    {c.n}
                  </span>
                  <h3 className="font-display font-semibold text-[clamp(1.6rem,3vw,2.2rem)] leading-[1.05] tracking-[-0.03em]">{c.title}</h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-white/55 max-w-[40ch]">{c.lead}</p>
                </div>
                <ul className="lg:col-span-7 grid sm:grid-cols-2 gap-x-8 gap-y-3.5 lg:pt-[4.6rem]">
                  {c.points.map((p) => (
                    <li key={p} className="flex items-start gap-3 text-[14.5px] text-white/75">
                      <span className="text-white/40">
                        <Check />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="bg-ink text-white py-24 md:py-32 border-t border-white/[0.08] scroll-mt-16">
        <div className="section-wrap">
          <SectionHeading eyebrow={services.tiersEyebrow} heading={services.tiersHeading} sub={services.tiersSub} max="16ch" subMax="52ch" className="mb-16" />

          <div className="grid md:grid-cols-2 gap-6">
            {services.tiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                custom={i + 1}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
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
                  className={`mt-9 inline-flex items-center justify-center rounded-full text-[14.5px] font-medium px-6 py-3.5 active:scale-[0.98] transition-[box-shadow,border-color,background-color,transform] duration-300 ${
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
    </>
  );
}
